/**
 * Component Architecture Analyzer
 * Analyzes component size, complexity, and architecture patterns
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS = ['.tsx', '.jsx'];

function scanDirectory(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', 'dist', 'build'].includes(entry.name)) {
        scanDirectory(fullPath, files);
      }
    } else if (entry.isFile() && EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function analyzeComponent(content, filePath) {
  const lines = content.split('\n');
  const lineCount = lines.length;
  
  const metrics = {
    lineCount,
    propsCount: 0,
    stateCount: 0,
    effectCount: 0,
    hookCount: 0,
    nestingDepth: 0,
    hasReactMemo: false,
    complexity: 0,
  };
  
  // Count props
  const propsMatch = content.match(/(?:function|const)\s+\w+\s*\(\s*{([^}]+)}/);
  if (propsMatch) {
    metrics.propsCount = propsMatch[1].split(',').filter(p => p.trim()).length;
  }
  
  // Count useState
  metrics.stateCount = (content.match(/useState\s*[<(]/g) || []).length;
  
  // Count useEffect
  metrics.effectCount = (content.match(/useEffect\s*\(/g) || []).length;
  
  // Count custom hooks
  metrics.hookCount = (content.match(/use[A-Z]\w+\s*\(/g) || []).length;
  
  // Check for React.memo
  metrics.hasReactMemo = /React\.memo|memo\(/.test(content);
  
  // Calculate nesting depth
  let maxDepth = 0;
  let currentDepth = 0;
  for (const line of lines) {
    currentDepth += (line.match(/{/g) || []).length;
    currentDepth -= (line.match(/}/g) || []).length;
    maxDepth = Math.max(maxDepth, currentDepth);
  }
  metrics.nestingDepth = maxDepth;
  
  // Calculate complexity score
  metrics.complexity = 
    (lineCount > 300 ? 3 : lineCount > 200 ? 2 : lineCount > 100 ? 1 : 0) +
    (metrics.propsCount > 10 ? 2 : metrics.propsCount > 5 ? 1 : 0) +
    (metrics.stateCount > 5 ? 2 : metrics.stateCount > 3 ? 1 : 0) +
    (metrics.effectCount > 3 ? 2 : metrics.effectCount > 2 ? 1 : 0) +
    (metrics.nestingDepth > 10 ? 2 : metrics.nestingDepth > 7 ? 1 : 0);
  
  return metrics;
}

function identifyIssues(results) {
  const issues = {
    largeComponents: [],
    complexComponents: [],
    manyProps: [],
    manyHooks: [],
    deepNesting: [],
    missingMemo: [],
  };
  
  for (const result of results) {
    if (result.metrics.lineCount > 300) {
      issues.largeComponents.push({
        file: result.file,
        lines: result.metrics.lineCount,
        severity: 'HIGH',
      });
    }
    
    if (result.metrics.complexity > 5) {
      issues.complexComponents.push({
        file: result.file,
        complexity: result.metrics.complexity,
        lines: result.metrics.lineCount,
        severity: result.metrics.complexity > 7 ? 'HIGH' : 'MEDIUM',
      });
    }
    
    if (result.metrics.propsCount > 10) {
      issues.manyProps.push({
        file: result.file,
        propsCount: result.metrics.propsCount,
        severity: 'MEDIUM',
      });
    }
    
    if (result.metrics.stateCount > 5 || result.metrics.effectCount > 3) {
      issues.manyHooks.push({
        file: result.file,
        useState: result.metrics.stateCount,
        useEffect: result.metrics.effectCount,
        severity: 'MEDIUM',
      });
    }
    
    if (result.metrics.nestingDepth > 10) {
      issues.deepNesting.push({
        file: result.file,
        depth: result.metrics.nestingDepth,
        severity: 'MEDIUM',
      });
    }
    
    if (result.metrics.lineCount > 200 && !result.metrics.hasReactMemo && result.metrics.propsCount > 3) {
      issues.missingMemo.push({
        file: result.file,
        lines: result.metrics.lineCount,
        severity: 'LOW',
      });
    }
  }
  
  return issues;
}

function getRelativePath(filePath) {
  return path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
}

function generateReport(results, issues) {
  console.log('\n' + '='.repeat(80));
  console.log('COMPONENT ARCHITECTURE ANALYSIS');
  console.log('='.repeat(80));
  
  const avgLines = results.reduce((sum, r) => sum + r.metrics.lineCount, 0) / results.length;
  const avgComplexity = results.reduce((sum, r) => sum + r.metrics.complexity, 0) / results.length;
  
  console.log('\n📊 SUMMARY:');
  console.log(`  Total Components: ${results.length}`);
  console.log(`  Average Lines: ${avgLines.toFixed(0)}`);
  console.log(`  Average Complexity: ${avgComplexity.toFixed(1)}`);
  console.log(`  Large Components (>300 lines): ${issues.largeComponents.length}`);
  console.log(`  Complex Components: ${issues.complexComponents.length}`);
  console.log(`  Components with Many Props (>10): ${issues.manyProps.length}`);
  console.log(`  Components with Many Hooks: ${issues.manyHooks.length}`);
  console.log(`  Components with Deep Nesting (>10): ${issues.deepNesting.length}`);
  console.log(`  Missing React.memo: ${issues.missingMemo.length}`);
  
  console.log('\n🚨 LARGE COMPONENTS (>300 lines):');
  if (issues.largeComponents.length === 0) {
    console.log('  ✅ No components exceed 300 lines!');
  } else {
    issues.largeComponents.slice(0, 10).forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.file} (${c.lines} lines)`);
    });
  }
  
  console.log('\n⚠️  COMPLEX COMPONENTS:');
  if (issues.complexComponents.length === 0) {
    console.log('  ✅ All components have manageable complexity!');
  } else {
    issues.complexComponents.slice(0, 10).forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.file}`);
      console.log(`     Complexity: ${c.complexity} | Lines: ${c.lines}`);
    });
  }
  
  console.log('\n📦 COMPONENTS WITH MANY PROPS (>10):');
  if (issues.manyProps.length === 0) {
    console.log('  ✅ All components have reasonable prop counts!');
  } else {
    issues.manyProps.slice(0, 5).forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.file} (${c.propsCount} props)`);
    });
  }
  
  const reportPath = path.join(__dirname, 'component-analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalComponents: results.length,
      avgLines: avgLines.toFixed(0),
      avgComplexity: avgComplexity.toFixed(1),
    },
    issues,
  }, null, 2));
  console.log(`\n💾 Detailed report saved to: component-analysis-report.json`);
}

console.log('🔍 Starting component analysis...');
const files = scanDirectory(SRC_DIR);
console.log(`\nAnalyzing ${files.length} components...`);

const results = files.map(file => ({
  file: getRelativePath(file),
  metrics: analyzeComponent(fs.readFileSync(file, 'utf-8'), file),
}));

const issues = identifyIssues(results);
generateReport(results, issues);
console.log('\n✅ Analysis complete!');
