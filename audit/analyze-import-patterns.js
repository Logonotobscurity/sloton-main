/**
 * Import Pattern Analyzer
 * Analyzes import statement consistency and patterns
 */

const fs = require('fs');
const path = require('path');

// Load dependency graph
const graphPath = path.join(__dirname, 'dependency-graph-report.json');
const graphData = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));

/**
 * Analyze import patterns from dependency graph
 */
function analyzeImportPatterns() {
  const patterns = {
    relativeImports: [],
    aliasImports: [],
    deepRelativeImports: [],
    mixedPatterns: [],
    inconsistentFiles: [],
  };
  
  const fileImportTypes = new Map();
  
  for (const fileData of graphData.graph) {
    const imports = {
      relative: 0,
      alias: 0,
      deepRelative: [],
    };
    
    for (const dep of fileData.dependencies) {
      if (dep.type === 'relative') {
        imports.relative++;
        patterns.relativeImports.push({
          file: fileData.file,
          imports: dep.file,
        });
        
        // Check for deep relative imports (more than 2 levels)
        const depPath = dep.file;
        const upLevels = (depPath.match(/\.\.\//g) || []).length;
        if (upLevels > 2) {
          imports.deepRelative.push(dep.file);
          patterns.deepRelativeImports.push({
            file: fileData.file,
            imports: dep.file,
            levels: upLevels,
          });
        }
      } else if (dep.type === 'alias') {
        imports.alias++;
        patterns.aliasImports.push({
          file: fileData.file,
          imports: dep.file,
        });
      }
    }
    
    // Check for mixed patterns (both relative and alias in same file)
    if (imports.relative > 0 && imports.alias > 0) {
      patterns.mixedPatterns.push({
        file: fileData.file,
        relativeCount: imports.relative,
        aliasCount: imports.alias,
      });
    }
    
    fileImportTypes.set(fileData.file, imports);
  }
  
  return { patterns, fileImportTypes };
}

/**
 * Calculate import consistency metrics
 */
function calculateMetrics(patterns, fileImportTypes) {
  const totalImports = patterns.relativeImports.length + patterns.aliasImports.length;
  const aliasPercentage = ((patterns.aliasImports.length / totalImports) * 100).toFixed(1);
  const relativePercentage = ((patterns.relativeImports.length / totalImports) * 100).toFixed(1);
  
  const filesWithMixedPatterns = patterns.mixedPatterns.length;
  const filesWithDeepRelative = new Set(patterns.deepRelativeImports.map(p => p.file)).size;
  
  return {
    totalImports,
    aliasImports: patterns.aliasImports.length,
    relativeImports: patterns.relativeImports.length,
    aliasPercentage,
    relativePercentage,
    filesWithMixedPatterns,
    filesWithDeepRelative,
    deepRelativeImports: patterns.deepRelativeImports.length,
  };
}

/**
 * Identify import pattern issues
 */
function identifyIssues(patterns, metrics) {
  const issues = [];
  
  // Issue 1: Files with mixed import patterns
  if (patterns.mixedPatterns.length > 0) {
    issues.push({
      type: 'MIXED_PATTERNS',
      severity: 'MEDIUM',
      count: patterns.mixedPatterns.length,
      description: 'Files mixing relative and alias imports',
      recommendation: 'Standardize to use @/ alias for all imports',
      examples: patterns.mixedPatterns.slice(0, 5),
    });
  }
  
  // Issue 2: Deep relative imports
  if (patterns.deepRelativeImports.length > 0) {
    issues.push({
      type: 'DEEP_RELATIVE',
      severity: 'HIGH',
      count: patterns.deepRelativeImports.length,
      description: 'Deep relative imports (> 2 levels)',
      recommendation: 'Replace with @/ alias imports',
      examples: patterns.deepRelativeImports.slice(0, 5),
    });
  }
  
  // Issue 3: Remaining relative imports
  if (metrics.relativeImports > 0) {
    issues.push({
      type: 'RELATIVE_IMPORTS',
      severity: 'LOW',
      count: metrics.relativeImports,
      description: `${metrics.relativePercentage}% of imports still use relative paths`,
      recommendation: 'Migrate to @/ alias for consistency',
      examples: patterns.relativeImports.slice(0, 5),
    });
  }
  
  return issues;
}

/**
 * Analyze import organization
 */
function analyzeImportOrganization() {
  const SRC_DIR = path.join(__dirname, '..', 'src');
  const files = scanDirectory(SRC_DIR);
  
  const organizationIssues = [];
  let filesAnalyzed = 0;
  let filesWithUnorganizedImports = 0;
  
  for (const file of files.slice(0, 50)) { // Sample 50 files
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      
      let importSection = [];
      let inImportSection = false;
      
      for (const line of lines) {
        if (line.trim().startsWith('import ') || line.trim().startsWith('import{')) {
          inImportSection = true;
          importSection.push(line);
        } else if (inImportSection && line.trim() === '') {
          break;
        } else if (inImportSection) {
          break;
        }
      }
      
      if (importSection.length > 5) {
        filesAnalyzed++;
        
        // Check if imports are grouped (external, then internal)
        let hasExternal = false;
        let hasInternal = false;
        let switchedBack = false;
        
        for (const imp of importSection) {
          if (imp.includes('@/')) {
            if (hasExternal && !hasInternal) {
              hasInternal = true;
            } else if (hasExternal && hasInternal) {
              switchedBack = true;
            }
          } else if (imp.includes('from \'') || imp.includes('from "')) {
            hasExternal = true;
            if (hasInternal) {
              switchedBack = true;
            }
          }
        }
        
        if (switchedBack) {
          filesWithUnorganizedImports++;
        }
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  return {
    filesAnalyzed,
    filesWithUnorganizedImports,
    organizationScore: filesAnalyzed > 0 
      ? (((filesAnalyzed - filesWithUnorganizedImports) / filesAnalyzed) * 100).toFixed(1)
      : 100,
  };
}

/**
 * Scan directory for files
 */
function scanDirectory(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!['node_modules', '.next', 'dist', 'build'].includes(entry.name)) {
          scanDirectory(fullPath, files);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
  
  return files;
}

/**
 * Generate report
 */
function generateReport(patterns, metrics, issues, organization) {
  console.log('\n' + '='.repeat(80));
  console.log('IMPORT PATTERN ANALYSIS');
  console.log('='.repeat(80));
  
  console.log('\n📊 IMPORT METRICS:');
  console.log(`  Total Imports: ${metrics.totalImports}`);
  console.log(`  Alias Imports (@/): ${metrics.aliasImports} (${metrics.aliasPercentage}%)`);
  console.log(`  Relative Imports (../): ${metrics.relativeImports} (${metrics.relativePercentage}%)`);
  console.log(`  Files with Mixed Patterns: ${metrics.filesWithMixedPatterns}`);
  console.log(`  Files with Deep Relative Imports: ${metrics.filesWithDeepRelative}`);
  console.log(`  Deep Relative Imports (>2 levels): ${metrics.deepRelativeImports}`);
  
  console.log('\n📋 IMPORT ORGANIZATION:');
  console.log(`  Files Analyzed: ${organization.filesAnalyzed}`);
  console.log(`  Files with Unorganized Imports: ${organization.filesWithUnorganizedImports}`);
  console.log(`  Organization Score: ${organization.organizationScore}%`);
  
  console.log('\n🚨 IMPORT PATTERN ISSUES:');
  if (issues.length === 0) {
    console.log('  ✅ No import pattern issues detected!');
  } else {
    issues.forEach((issue, index) => {
      console.log(`\n  ${index + 1}. ${issue.type} [${issue.severity}]`);
      console.log(`     Count: ${issue.count}`);
      console.log(`     Issue: ${issue.description}`);
      console.log(`     Recommendation: ${issue.recommendation}`);
      if (issue.examples && issue.examples.length > 0) {
        console.log(`     Examples:`);
        issue.examples.forEach(ex => {
          if (ex.file) {
            console.log(`       - ${ex.file}`);
            if (ex.levels) {
              console.log(`         Imports: ${ex.imports} (${ex.levels} levels up)`);
            }
          }
        });
      }
    });
  }
  
  console.log('\n✅ STRENGTHS:');
  if (metrics.aliasPercentage > 80) {
    console.log(`  ✓ Strong alias import adoption (${metrics.aliasPercentage}%)`);
  }
  if (metrics.filesWithDeepRelative === 0) {
    console.log('  ✓ No deep relative imports detected');
  }
  if (organization.organizationScore > 80) {
    console.log(`  ✓ Good import organization (${organization.organizationScore}%)`);
  }
  
  console.log('\n📝 RECOMMENDATIONS:');
  console.log('  1. Standardize remaining relative imports to @/ alias');
  console.log('  2. Establish import ordering convention (external → internal)');
  console.log('  3. Consider using ESLint import sorting rules');
  console.log('  4. Document import conventions in style guide');
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'import-patterns-report.json');
  const reportData = {
    timestamp: new Date().toISOString(),
    metrics,
    organization,
    issues,
    patterns: {
      mixedPatterns: patterns.mixedPatterns,
      deepRelativeImports: patterns.deepRelativeImports,
    },
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n💾 Detailed report saved to: import-patterns-report.json`);
}

// Main execution
console.log('🔍 Starting import pattern analysis...');

const { patterns, fileImportTypes } = analyzeImportPatterns();
const metrics = calculateMetrics(patterns, fileImportTypes);
const issues = identifyIssues(patterns, metrics);
const organization = analyzeImportOrganization();

generateReport(patterns, metrics, issues, organization);

console.log('\n✅ Analysis complete!');
