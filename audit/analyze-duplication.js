/**
 * Code Duplication Analyzer
 * Identifies duplicated logic and extractable utilities
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

/**
 * Recursively scan directory for source files
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
 * Extract patterns from file content
 */
function extractPatterns(content, filePath) {
  const patterns = {
    useState: [],
    useEffect: [],
    fetch: [],
    apiCalls: [],
    formValidation: [],
    imageHandling: [],
    animations: [],
    errorHandling: [],
    localStorage: [],
    dateFormatting: [],
  };
  
  // useState patterns
  const useStateMatches = content.match(/useState\s*<[^>]+>|useState\(/g);
  if (useStateMatches) {
    patterns.useState = useStateMatches;
  }
  
  // useEffect patterns
  const useEffectMatches = content.match(/useEffect\s*\(/g);
  if (useEffectMatches) {
    patterns.useEffect = useEffectMatches;
  }
  
  // Fetch/API calls
  const fetchMatches = content.match(/fetch\s*\(|axios\.|await\s+\w+\.\w+\(/g);
  if (fetchMatches) {
    patterns.fetch = fetchMatches;
  }
  
  // Form validation
  const validationMatches = content.match(/\.test\(|\.match\(|\.includes\(|if\s*\([^)]*\.length|if\s*\(!\w+\)/g);
  if (validationMatches && validationMatches.length > 3) {
    patterns.formValidation = validationMatches;
  }
  
  // Image handling
  const imageMatches = content.match(/Image\s+from|<img|\.jpg|\.png|\.webp|\.svg/g);
  if (imageMatches) {
    patterns.imageHandling = imageMatches;
  }
  
  // Animations
  const animationMatches = content.match(/framer-motion|animate|transition|variants|motion\./g);
  if (animationMatches) {
    patterns.animations = animationMatches;
  }
  
  // Error handling
  const errorMatches = content.match(/try\s*{|catch\s*\(|throw\s+new|\.catch\(/g);
  if (errorMatches) {
    patterns.errorHandling = errorMatches;
  }
  
  // localStorage
  const localStorageMatches = content.match(/localStorage\.|sessionStorage\./g);
  if (localStorageMatches) {
    patterns.localStorage = localStorageMatches;
  }
  
  // Date formatting
  const dateMatches = content.match(/new Date\(|\.toLocaleString|\.toISOString|format\(.*date/gi);
  if (dateMatches) {
    patterns.dateFormatting = dateMatches;
  }
  
  return patterns;
}

/**
 * Analyze files for patterns
 */
function analyzeFiles(files) {
  const patternsByFile = new Map();
  const patternCounts = {
    useState: 0,
    useEffect: 0,
    fetch: 0,
    formValidation: 0,
    imageHandling: 0,
    animations: 0,
    errorHandling: 0,
    localStorage: 0,
    dateFormatting: 0,
  };
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const patterns = extractPatterns(content, file);
      
      // Count patterns
      for (const [key, matches] of Object.entries(patterns)) {
        if (matches.length > 0) {
          patternCounts[key]++;
        }
      }
      
      patternsByFile.set(file, patterns);
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  }
  
  return { patternsByFile, patternCounts };
}

/**
 * Identify duplication opportunities
 */
function identifyDuplication(patternsByFile, patternCounts) {
  const opportunities = [];
  
  // Image handling duplication
  const imageFiles = [];
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.imageHandling.length > 0) {
      imageFiles.push(file);
    }
  }
  if (imageFiles.length > 5) {
    opportunities.push({
      type: 'Image Handling',
      severity: 'MEDIUM',
      filesAffected: imageFiles.length,
      description: 'Image handling logic duplicated across multiple components',
      recommendation: 'Create a reusable Image component or hook',
      files: imageFiles.slice(0, 5).map(f => getRelativePath(f)),
    });
  }
  
  // Animation duplication
  const animationFiles = [];
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.animations.length > 3) {
      animationFiles.push(file);
    }
  }
  if (animationFiles.length > 3) {
    opportunities.push({
      type: 'Animation Configurations',
      severity: 'LOW',
      filesAffected: animationFiles.length,
      description: 'Animation configurations duplicated across components',
      recommendation: 'Extract animation variants to shared constants',
      files: animationFiles.slice(0, 5).map(f => getRelativePath(f)),
    });
  }
  
  // Form validation duplication
  const validationFiles = [];
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.formValidation.length > 5) {
      validationFiles.push(file);
    }
  }
  if (validationFiles.length > 3) {
    opportunities.push({
      type: 'Form Validation',
      severity: 'MEDIUM',
      filesAffected: validationFiles.length,
      description: 'Form validation logic duplicated across components',
      recommendation: 'Create validation utility functions or use a validation library',
      files: validationFiles.slice(0, 5).map(f => getRelativePath(f)),
    });
  }
  
  // Error handling duplication
  const errorFiles = [];
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.errorHandling.length > 2) {
      errorFiles.push(file);
    }
  }
  if (errorFiles.length > 5) {
    opportunities.push({
      type: 'Error Handling',
      severity: 'HIGH',
      filesAffected: errorFiles.length,
      description: 'Error handling patterns duplicated across files',
      recommendation: 'Create centralized error handling utilities',
      files: errorFiles.slice(0, 5).map(f => getRelativePath(f)),
    });
  }
  
  // Date formatting duplication
  const dateFiles = [];
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.dateFormatting.length > 0) {
      dateFiles.push(file);
    }
  }
  if (dateFiles.length > 3) {
    opportunities.push({
      type: 'Date Formatting',
      severity: 'LOW',
      filesAffected: dateFiles.length,
      description: 'Date formatting logic duplicated across files',
      recommendation: 'Create date formatting utility functions',
      files: dateFiles.slice(0, 5).map(f => getRelativePath(f)),
    });
  }
  
  // localStorage duplication
  const storageFiles = [];
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.localStorage.length > 0) {
      storageFiles.push(file);
    }
  }
  if (storageFiles.length > 2) {
    opportunities.push({
      type: 'LocalStorage Access',
      severity: 'MEDIUM',
      filesAffected: storageFiles.length,
      description: 'Direct localStorage access scattered across files',
      recommendation: 'Create storage abstraction layer or custom hook',
      files: storageFiles.slice(0, 5).map(f => getRelativePath(f)),
    });
  }
  
  // API call patterns
  const apiFiles = [];
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.fetch.length > 0) {
      apiFiles.push(file);
    }
  }
  if (apiFiles.length > 3) {
    opportunities.push({
      type: 'API Calls',
      severity: 'HIGH',
      filesAffected: apiFiles.length,
      description: 'API calls scattered across components',
      recommendation: 'Create API service layer with consistent error handling',
      files: apiFiles.slice(0, 5).map(f => getRelativePath(f)),
    });
  }
  
  return opportunities;
}

/**
 * Identify extractable hooks
 */
function identifyExtractableHooks(patternsByFile) {
  const hookOpportunities = [];
  
  // Files with multiple useState + useEffect
  for (const [file, patterns] of patternsByFile.entries()) {
    if (patterns.useState.length > 3 && patterns.useEffect.length > 2) {
      hookOpportunities.push({
        file: getRelativePath(file),
        useStateCount: patterns.useState.length,
        useEffectCount: patterns.useEffect.length,
        recommendation: 'Consider extracting state logic to custom hook',
      });
    }
  }
  
  return hookOpportunities.slice(0, 10);
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
function generateReport(opportunities, hookOpportunities, patternCounts) {
  console.log('\n' + '='.repeat(80));
  console.log('CODE DUPLICATION ANALYSIS');
  console.log('='.repeat(80));
  
  console.log('\n📊 PATTERN USAGE OVERVIEW:');
  console.log(`  Files with useState: ${patternCounts.useState}`);
  console.log(`  Files with useEffect: ${patternCounts.useEffect}`);
  console.log(`  Files with API calls: ${patternCounts.fetch}`);
  console.log(`  Files with form validation: ${patternCounts.formValidation}`);
  console.log(`  Files with image handling: ${patternCounts.imageHandling}`);
  console.log(`  Files with animations: ${patternCounts.animations}`);
  console.log(`  Files with error handling: ${patternCounts.errorHandling}`);
  console.log(`  Files with localStorage: ${patternCounts.localStorage}`);
  console.log(`  Files with date formatting: ${patternCounts.dateFormatting}`);
  
  console.log('\n🔄 DUPLICATION OPPORTUNITIES:');
  if (opportunities.length === 0) {
    console.log('  ✅ No significant duplication detected!');
  } else {
    opportunities.forEach((opp, index) => {
      console.log(`\n  ${index + 1}. ${opp.type} [${opp.severity}]`);
      console.log(`     Files Affected: ${opp.filesAffected}`);
      console.log(`     Issue: ${opp.description}`);
      console.log(`     Recommendation: ${opp.recommendation}`);
      console.log(`     Example Files:`);
      opp.files.forEach(f => console.log(`       - ${f}`));
    });
  }
  
  console.log('\n🪝 EXTRACTABLE HOOK OPPORTUNITIES:');
  if (hookOpportunities.length === 0) {
    console.log('  ✅ No obvious hook extraction opportunities!');
  } else {
    console.log(`  Found ${hookOpportunities.length} components with complex state logic:\n`);
    hookOpportunities.forEach((opp, index) => {
      console.log(`  ${index + 1}. ${opp.file}`);
      console.log(`     useState: ${opp.useStateCount} | useEffect: ${opp.useEffectCount}`);
      console.log(`     ${opp.recommendation}`);
    });
  }
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'duplication-analysis-report.json');
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalOpportunities: opportunities.length,
      highSeverity: opportunities.filter(o => o.severity === 'HIGH').length,
      mediumSeverity: opportunities.filter(o => o.severity === 'MEDIUM').length,
      lowSeverity: opportunities.filter(o => o.severity === 'LOW').length,
      extractableHooks: hookOpportunities.length,
    },
    patternCounts,
    opportunities,
    hookOpportunities,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n💾 Detailed report saved to: duplication-analysis-report.json`);
}

// Main execution
console.log('🔍 Starting code duplication analysis...');
console.log(`📁 Scanning directory: ${SRC_DIR}`);

const files = scanDirectory(SRC_DIR);
console.log(`\nAnalyzing ${files.length} files for duplication patterns...`);

const { patternsByFile, patternCounts } = analyzeFiles(files);
const opportunities = identifyDuplication(patternsByFile, patternCounts);
const hookOpportunities = identifyExtractableHooks(patternsByFile);

generateReport(opportunities, hookOpportunities, patternCounts);

console.log('\n✅ Analysis complete!');
