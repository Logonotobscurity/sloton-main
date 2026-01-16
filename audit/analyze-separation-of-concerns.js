/**
 * Separation of Concerns Analyzer
 * Identifies components mixing presentation and business logic
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS = ['.tsx', '.jsx'];

/**
 * Recursively scan directory for component files
 */
function scanDirectory(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', 'dist', 'build'].includes(entry.name)) {
        scanDirectory(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Analyze component for separation of concerns violations
 */
function analyzeComponent(content, filePath) {
  const violations = [];
  const metrics = {
    hasJSX: false,
    hasAPICall: false,
    hasBusinessLogic: false,
    hasComplexCalculation: false,
    hasDirectStateManagement: false,
    hasDataFetching: false,
    lineCount: content.split('\n').length,
  };
  
  // Check for JSX
  if (content.includes('return (') || content.includes('return<')) {
    metrics.hasJSX = true;
  }
  
  // Check for API calls
  const apiPatterns = [
    /fetch\s*\(/,
    /axios\./,
    /\.get\(/,
    /\.post\(/,
    /\.put\(/,
    /\.delete\(/,
    /await\s+\w+\.\w+\(/,
  ];
  
  for (const pattern of apiPatterns) {
    if (pattern.test(content)) {
      metrics.hasAPICall = true;
      violations.push({
        type: 'API_IN_COMPONENT',
        severity: 'HIGH',
        description: 'Component contains direct API calls',
        recommendation: 'Move API calls to service layer or use server components',
      });
      break;
    }
  }
  
  // Check for complex calculations in render
  const complexCalcPatterns = [
    /return\s*\([^)]*\.(map|filter|reduce|sort)\(/,
    /const\s+\w+\s*=\s*[^;]*\.(map|filter|reduce|sort)\([^)]*\)\s*;?\s*return/,
  ];
  
  for (const pattern of complexCalcPatterns) {
    if (pattern.test(content)) {
      metrics.hasComplexCalculation = true;
      violations.push({
        type: 'COMPLEX_CALC_IN_RENDER',
        severity: 'MEDIUM',
        description: 'Complex calculations in render method',
        recommendation: 'Move calculations to useMemo or separate utility functions',
      });
      break;
    }
  }
  
  // Check for business logic (sorting, filtering with business rules)
  const businessLogicPatterns = [
    /\.sort\([^)]*=>[^)]*\)/,
    /\.filter\([^)]*=>[^)]*\)/,
    /if\s*\([^)]*status|role|permission|authorized/i,
    /switch\s*\([^)]*\)\s*{[^}]*case/,
  ];
  
  for (const pattern of businessLogicPatterns) {
    if (pattern.test(content)) {
      metrics.hasBusinessLogic = true;
      break;
    }
  }
  
  // Check for direct state management (not just useState)
  const statePatterns = [
    /localStorage\./,
    /sessionStorage\./,
    /document\.cookie/,
  ];
  
  for (const pattern of statePatterns) {
    if (pattern.test(content)) {
      metrics.hasDirectStateManagement = true;
      violations.push({
        type: 'DIRECT_STATE_ACCESS',
        severity: 'MEDIUM',
        description: 'Direct access to browser storage APIs',
        recommendation: 'Use storage abstraction layer or custom hook',
      });
      break;
    }
  }
  
  // Check for data fetching in useEffect
  if (/useEffect\s*\([^)]*fetch|useEffect\s*\([^)]*axios/.test(content)) {
    metrics.hasDataFetching = true;
    violations.push({
      type: 'DATA_FETCHING_IN_COMPONENT',
      severity: 'MEDIUM',
      description: 'Data fetching in useEffect',
      recommendation: 'Use server components or dedicated data hooks',
    });
  }
  
  // Mixed concerns: JSX + API calls
  if (metrics.hasJSX && metrics.hasAPICall) {
    violations.push({
      type: 'MIXED_CONCERNS',
      severity: 'HIGH',
      description: 'Component mixes presentation (JSX) and data access (API calls)',
      recommendation: 'Separate into presentation and container components',
    });
  }
  
  // Mixed concerns: JSX + complex business logic
  if (metrics.hasJSX && metrics.hasBusinessLogic && metrics.lineCount > 100) {
    violations.push({
      type: 'MIXED_CONCERNS',
      severity: 'MEDIUM',
      description: 'Large component with both UI and business logic',
      recommendation: 'Extract business logic to custom hooks or utilities',
    });
  }
  
  return { violations, metrics };
}

/**
 * Analyze all components
 */
function analyzeComponents(files) {
  const results = [];
  const summary = {
    totalComponents: 0,
    withViolations: 0,
    apiInComponent: 0,
    mixedConcerns: 0,
    complexCalc: 0,
    directStateAccess: 0,
    dataFetchingInComponent: 0,
  };
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const { violations, metrics } = analyzeComponent(content, file);
      
      summary.totalComponents++;
      
      if (violations.length > 0) {
        summary.withViolations++;
        
        // Count violation types
        for (const v of violations) {
          if (v.type === 'API_IN_COMPONENT') summary.apiInComponent++;
          if (v.type === 'MIXED_CONCERNS') summary.mixedConcerns++;
          if (v.type === 'COMPLEX_CALC_IN_RENDER') summary.complexCalc++;
          if (v.type === 'DIRECT_STATE_ACCESS') summary.directStateAccess++;
          if (v.type === 'DATA_FETCHING_IN_COMPONENT') summary.dataFetchingInComponent++;
        }
        
        results.push({
          file: getRelativePath(file),
          violations,
          metrics,
        });
      }
    } catch (error) {
      console.error(`Error analyzing ${file}:`, error.message);
    }
  }
  
  return { results, summary };
}

/**
 * Identify single responsibility violations
 */
function identifySingleResponsibilityViolations(results) {
  const violations = [];
  
  for (const result of results) {
    const responsibilityCount = 
      (result.metrics.hasJSX ? 1 : 0) +
      (result.metrics.hasAPICall ? 1 : 0) +
      (result.metrics.hasBusinessLogic ? 1 : 0) +
      (result.metrics.hasDataFetching ? 1 : 0);
    
    if (responsibilityCount > 2) {
      violations.push({
        file: result.file,
        responsibilities: responsibilityCount,
        concerns: [
          result.metrics.hasJSX && 'Presentation',
          result.metrics.hasAPICall && 'API Access',
          result.metrics.hasBusinessLogic && 'Business Logic',
          result.metrics.hasDataFetching && 'Data Fetching',
        ].filter(Boolean),
        lineCount: result.metrics.lineCount,
      });
    }
  }
  
  return violations.sort((a, b) => b.responsibilities - a.responsibilities);
}

/**
 * Get relative path from project root
 */
function getRelativePath(filePath) {
  return path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
}

/**
 * Generate report
 */
function generateReport(results, summary, srpViolations) {
  console.log('\n' + '='.repeat(80));
  console.log('SEPARATION OF CONCERNS ANALYSIS');
  console.log('='.repeat(80));
  
  console.log('\n📊 SUMMARY:');
  console.log(`  Total Components Analyzed: ${summary.totalComponents}`);
  console.log(`  Components with Violations: ${summary.withViolations} (${((summary.withViolations / summary.totalComponents) * 100).toFixed(1)}%)`);
  console.log(`  Clean Components: ${summary.totalComponents - summary.withViolations} (${(((summary.totalComponents - summary.withViolations) / summary.totalComponents) * 100).toFixed(1)}%)`);
  
  console.log('\n🚨 VIOLATION BREAKDOWN:');
  console.log(`  API Calls in Components: ${summary.apiInComponent}`);
  console.log(`  Mixed Concerns: ${summary.mixedConcerns}`);
  console.log(`  Complex Calculations in Render: ${summary.complexCalc}`);
  console.log(`  Direct State Access: ${summary.directStateAccess}`);
  console.log(`  Data Fetching in Components: ${summary.dataFetchingInComponent}`);
  
  console.log('\n⚠️  TOP 10 COMPONENTS WITH MOST VIOLATIONS:');
  const topViolators = results
    .sort((a, b) => b.violations.length - a.violations.length)
    .slice(0, 10);
  
  topViolators.forEach((result, index) => {
    console.log(`\n  ${index + 1}. ${result.file}`);
    console.log(`     Violations: ${result.violations.length} | Lines: ${result.metrics.lineCount}`);
    result.violations.forEach(v => {
      console.log(`     - [${v.severity}] ${v.description}`);
    });
  });
  
  console.log('\n🎯 SINGLE RESPONSIBILITY PRINCIPLE VIOLATIONS:');
  if (srpViolations.length === 0) {
    console.log('  ✅ All components follow single responsibility principle!');
  } else {
    console.log(`  Found ${srpViolations.length} components with multiple responsibilities:\n`);
    srpViolations.slice(0, 10).forEach((v, index) => {
      console.log(`  ${index + 1}. ${v.file}`);
      console.log(`     Responsibilities: ${v.concerns.join(', ')}`);
      console.log(`     Lines: ${v.lineCount}`);
    });
  }
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'separation-of-concerns-report.json');
  const reportData = {
    timestamp: new Date().toISOString(),
    summary,
    results: results.slice(0, 50), // Top 50 violators
    srpViolations,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n💾 Detailed report saved to: separation-of-concerns-report.json`);
}

// Main execution
console.log('🔍 Starting separation of concerns analysis...');
console.log(`📁 Scanning directory: ${SRC_DIR}`);

const files = scanDirectory(SRC_DIR);
console.log(`\nAnalyzing ${files.length} component files...`);

const { results, summary } = analyzeComponents(files);
const srpViolations = identifySingleResponsibilityViolations(results);

generateReport(results, summary, srpViolations);

console.log('\n✅ Analysis complete!');
