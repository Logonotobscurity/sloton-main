/**
 * Aggregate Findings from All Analysis Reports
 */

const fs = require('fs');
const path = require('path');

const reports = [
  'dependency-graph-report.json',
  'coupling-analysis-report.json',
  'duplication-analysis-report.json',
  'separation-of-concerns-report.json',
  'import-patterns-report.json',
  'component-analysis-report.json',
];

function loadReports() {
  const data = {};
  for (const report of reports) {
    const reportPath = path.join(__dirname, report);
    if (fs.existsSync(reportPath)) {
      const name = report.replace('-report.json', '');
      data[name] = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    }
  }
  return data;
}

function aggregateFindings(data) {
  const findings = {
    critical: [],
    high: [],
    medium: [],
    low: [],
  };
  
  // Dependency graph findings
  if (data['dependency-graph']) {
    if (data['dependency-graph'].circularDependencies && data['dependency-graph'].circularDependencies.length === 0) {
      findings.low.push({
        category: 'Modularity',
        type: 'STRENGTH',
        title: 'No Circular Dependencies',
        description: 'Zero circular dependencies detected across 237 files',
        impact: 'Clean dependency graph enables better code splitting',
      });
    }
  }
  
  // Coupling findings
  if (data['coupling-analysis']) {
    const summary = data['coupling-analysis'].summary;
    if (summary.violationsCount > 0) {
      findings.medium.push({
        category: 'Modularity',
        type: 'COUPLING',
        title: 'Architectural Violations',
        description: `${summary.violationsCount} architectural violations detected`,
        impact: 'Tight coupling between modules',
        count: summary.violationsCount,
      });
    }
    
    if (summary.tightlyCoupledCount > 0) {
      findings.high.push({
        category: 'Modularity',
        type: 'TIGHT_COUPLING',
        title: 'Tightly Coupled Modules',
        description: `${summary.tightlyCoupledCount} modules with coupling > 0.7`,
        impact: 'Difficult to test and maintain',
        count: summary.tightlyCoupledCount,
      });
    }
    
    if (summary.poorCohesionCount > 0) {
      findings.high.push({
        category: 'Modularity',
        type: 'POOR_COHESION',
        title: 'Poor Module Cohesion',
        description: `${summary.poorCohesionCount} modules with cohesion < 0.3`,
        impact: 'Files grouped without logical relationship',
        count: summary.poorCohesionCount,
      });
    }
  }
  
  // Duplication findings
  if (data['duplication-analysis']) {
    const summary = data['duplication-analysis'].summary;
    if (summary.highSeverity > 0) {
      findings.high.push({
        category: 'Code Quality',
        type: 'DUPLICATION',
        title: 'Code Duplication',
        description: `${summary.highSeverity} high-severity duplication issues`,
        impact: 'Increased maintenance burden',
        count: summary.highSeverity,
      });
    }
  }
  
  // Separation of concerns findings
  if (data['separation-of-concerns']) {
    const summary = data['separation-of-concerns'].summary;
    const violationRate = (summary.withViolations / summary.totalComponents * 100).toFixed(1);
    
    if (summary.apiInComponent > 0) {
      findings.high.push({
        category: 'Separation of Concerns',
        type: 'API_IN_COMPONENT',
        title: 'API Calls in UI Components',
        description: `${summary.apiInComponent} components with direct API calls`,
        impact: 'Tight coupling to data sources',
        count: summary.apiInComponent,
      });
    }
    
    if (summary.complexCalc > 0) {
      findings.medium.push({
        category: 'Separation of Concerns',
        type: 'COMPLEX_CALC',
        title: 'Complex Calculations in Render',
        description: `${summary.complexCalc} components with complex calculations`,
        impact: 'Performance issues and reduced readability',
        count: summary.complexCalc,
      });
    }
  }
  
  // Import pattern findings
  if (data['import-patterns']) {
    const metrics = data['import-patterns'].metrics;
    if (metrics.filesWithMixedPatterns > 0) {
      findings.medium.push({
        category: 'Code Style',
        type: 'MIXED_IMPORTS',
        title: 'Mixed Import Patterns',
        description: `${metrics.filesWithMixedPatterns} files mix relative and alias imports`,
        impact: 'Inconsistent codebase style',
        count: metrics.filesWithMixedPatterns,
      });
    }
    
    if (parseFloat(metrics.aliasPercentage) > 80) {
      findings.low.push({
        category: 'Code Style',
        type: 'STRENGTH',
        title: 'Strong Alias Import Adoption',
        description: `${metrics.aliasPercentage}% of imports use @/ alias`,
        impact: 'Improved code readability and maintainability',
      });
    }
  }
  
  // Component analysis findings
  if (data['component-analysis']) {
    const summary = data['component-analysis'].summary;
    if (parseInt(summary.avgLines) < 100) {
      findings.low.push({
        category: 'Component Architecture',
        type: 'STRENGTH',
        title: 'Excellent Component Size',
        description: `Average component size: ${summary.avgLines} lines`,
        impact: 'Easy to understand and maintain',
      });
    }
  }
  
  return findings;
}

function calculateSeverityCounts(findings) {
  return {
    critical: findings.critical.length,
    high: findings.high.length,
    medium: findings.medium.length,
    low: findings.low.length,
    total: findings.critical.length + findings.high.length + findings.medium.length + findings.low.length,
  };
}

function generateReport(findings, counts) {
  console.log('\n' + '='.repeat(80));
  console.log('AGGREGATED FINDINGS SUMMARY');
  console.log('='.repeat(80));
  
  console.log('\n📊 SEVERITY BREAKDOWN:');
  console.log(`  Critical: ${counts.critical}`);
  console.log(`  High: ${counts.high}`);
  console.log(`  Medium: ${counts.medium}`);
  console.log(`  Low: ${counts.low}`);
  console.log(`  Total: ${counts.total}`);
  
  console.log('\n🚨 CRITICAL ISSUES:');
  if (findings.critical.length === 0) {
    console.log('  ✅ No critical issues!');
  } else {
    findings.critical.forEach((f, i) => {
      console.log(`  ${i + 1}. ${f.title}`);
      console.log(`     ${f.description}`);
    });
  }
  
  console.log('\n⚠️  HIGH PRIORITY ISSUES:');
  if (findings.high.length === 0) {
    console.log('  ✅ No high priority issues!');
  } else {
    findings.high.forEach((f, i) => {
      console.log(`  ${i + 1}. ${f.title} [${f.category}]`);
      console.log(`     ${f.description}`);
    });
  }
  
  console.log('\n📋 MEDIUM PRIORITY ISSUES:');
  findings.medium.slice(0, 5).forEach((f, i) => {
    console.log(`  ${i + 1}. ${f.title} [${f.category}]`);
  });
  
  console.log('\n✅ STRENGTHS:');
  const strengths = [...findings.low].filter(f => f.type === 'STRENGTH');
  strengths.forEach((f, i) => {
    console.log(`  ${i + 1}. ${f.title}`);
  });
  
  const reportPath = path.join(__dirname, 'aggregated-findings.json');
  fs.writeFileSync(reportPath, JSON.stringify({ findings, counts }, null, 2));
  console.log(`\n💾 Report saved to: aggregated-findings.json`);
}

console.log('🔍 Aggregating findings from all analyzers...');
const data = loadReports();
const findings = aggregateFindings(data);
const counts = calculateSeverityCounts(findings);
generateReport(findings, counts);
console.log('\n✅ Aggregation complete!');
