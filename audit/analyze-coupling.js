/**
 * Module Coupling and Cohesion Analyzer
 * Analyzes module boundaries, coupling, and cohesion
 */

const fs = require('fs');
const path = require('path');

// Load dependency graph
const graphPath = path.join(__dirname, 'dependency-graph-report.json');
const graphData = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));

/**
 * Extract module from file path
 */
function getModule(filePath) {
  const parts = filePath.split('/');
  
  // Handle src/app routes
  if (parts[0] === 'src' && parts[1] === 'app') {
    if (parts[2] === 'api') {
      return 'app/api';
    }
    if (parts.length > 2 && !parts[2].includes('.')) {
      return `app/${parts[2]}`;
    }
    return 'app/root';
  }
  
  // Handle src/components
  if (parts[0] === 'src' && parts[1] === 'components') {
    if (parts.length > 2 && !parts[2].includes('.')) {
      return `components/${parts[2]}`;
    }
    return 'components/root';
  }
  
  // Handle src/lib
  if (parts[0] === 'src' && parts[1] === 'lib') {
    if (parts.length > 2 && !parts[2].includes('.')) {
      return `lib/${parts[2]}`;
    }
    return 'lib/root';
  }
  
  // Handle src/hooks
  if (parts[0] === 'src' && parts[1] === 'hooks') {
    return 'hooks';
  }
  
  // Handle src/store
  if (parts[0] === 'src' && parts[1] === 'store') {
    return 'store';
  }
  
  // Handle src/types
  if (parts[0] === 'src' && parts[1] === 'types') {
    return 'types';
  }
  
  // Default
  return parts.slice(0, 2).join('/');
}

/**
 * Build module dependency map
 */
function buildModuleDependencies() {
  const moduleDeps = new Map();
  const moduleFiles = new Map();
  
  // Group files by module
  for (const fileData of graphData.graph) {
    const module = getModule(fileData.file);
    
    if (!moduleFiles.has(module)) {
      moduleFiles.set(module, []);
    }
    moduleFiles.get(module).push(fileData.file);
    
    if (!moduleDeps.has(module)) {
      moduleDeps.set(module, {
        internal: new Set(),
        external: new Map(),
        files: new Set(),
      });
    }
    
    moduleDeps.get(module).files.add(fileData.file);
    
    // Analyze dependencies
    for (const dep of fileData.dependencies) {
      const depModule = getModule(dep.file);
      
      if (depModule === module) {
        // Internal dependency
        moduleDeps.get(module).internal.add(dep.file);
      } else {
        // External dependency
        if (!moduleDeps.get(module).external.has(depModule)) {
          moduleDeps.get(module).external.set(depModule, 0);
        }
        moduleDeps.get(module).external.set(
          depModule,
          moduleDeps.get(module).external.get(depModule) + 1
        );
      }
    }
  }
  
  return { moduleDeps, moduleFiles };
}

/**
 * Calculate coupling metrics
 */
function calculateCoupling(moduleDeps) {
  const metrics = [];
  
  for (const [module, data] of moduleDeps.entries()) {
    const totalDeps = data.internal.size + 
      Array.from(data.external.values()).reduce((a, b) => a + b, 0);
    
    const externalDeps = Array.from(data.external.values()).reduce((a, b) => a + b, 0);
    const internalDeps = data.internal.size;
    
    // Coupling score: ratio of external to total dependencies
    const couplingScore = totalDeps > 0 ? (externalDeps / totalDeps) : 0;
    
    // Cohesion score: ratio of internal to total dependencies
    const cohesionScore = totalDeps > 0 ? (internalDeps / totalDeps) : 0;
    
    metrics.push({
      module,
      files: data.files.size,
      internalDeps,
      externalDeps,
      totalDeps,
      couplingScore: couplingScore.toFixed(2),
      cohesionScore: cohesionScore.toFixed(2),
      externalModules: Array.from(data.external.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    });
  }
  
  return metrics.sort((a, b) => b.couplingScore - a.couplingScore);
}

/**
 * Identify tightly coupled modules
 */
function identifyTightCoupling(metrics) {
  const tightlyCoupled = [];
  
  for (const metric of metrics) {
    if (metric.couplingScore > 0.7 && metric.externalDeps > 5) {
      tightlyCoupled.push({
        module: metric.module,
        couplingScore: metric.couplingScore,
        externalDeps: metric.externalDeps,
        topDependencies: metric.externalModules,
      });
    }
  }
  
  return tightlyCoupled;
}

/**
 * Identify poorly cohesive modules
 */
function identifyPoorCohesion(metrics) {
  const poorCohesion = [];
  
  for (const metric of metrics) {
    if (metric.cohesionScore < 0.3 && metric.files > 3) {
      poorCohesion.push({
        module: metric.module,
        cohesionScore: metric.cohesionScore,
        files: metric.files,
        internalDeps: metric.internalDeps,
        externalDeps: metric.externalDeps,
      });
    }
  }
  
  return poorCohesion;
}

/**
 * Analyze cross-module dependencies
 */
function analyzeCrossModuleDeps(moduleDeps) {
  const crossModuleDeps = new Map();
  
  for (const [module, data] of moduleDeps.entries()) {
    for (const [depModule, count] of data.external.entries()) {
      const key = `${module} → ${depModule}`;
      crossModuleDeps.set(key, count);
    }
  }
  
  return Array.from(crossModuleDeps.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
}

/**
 * Identify architectural violations
 */
function identifyViolations(moduleDeps) {
  const violations = [];
  
  for (const [module, data] of moduleDeps.entries()) {
    // Check for UI components depending on app routes
    if (module.startsWith('components/') && data.external.has('app/')) {
      violations.push({
        type: 'LAYERING_VIOLATION',
        module,
        issue: 'Component depends on app route',
        severity: 'HIGH',
      });
    }
    
    // Check for lib depending on components
    if (module.startsWith('lib/') && 
        Array.from(data.external.keys()).some(m => m.startsWith('components/'))) {
      violations.push({
        type: 'LAYERING_VIOLATION',
        module,
        issue: 'Library code depends on UI components',
        severity: 'HIGH',
      });
    }
    
    // Check for excessive coupling to single module
    for (const [depModule, count] of data.external.entries()) {
      if (count > 10) {
        violations.push({
          type: 'TIGHT_COUPLING',
          module,
          issue: `Excessive coupling to ${depModule} (${count} dependencies)`,
          severity: 'MEDIUM',
        });
      }
    }
  }
  
  return violations;
}

/**
 * Generate report
 */
function generateReport(metrics, tightlyCoupled, poorCohesion, crossModuleDeps, violations) {
  console.log('\n' + '='.repeat(80));
  console.log('MODULE COUPLING & COHESION ANALYSIS');
  console.log('='.repeat(80));
  
  console.log('\n📊 MODULE OVERVIEW:');
  console.log(`  Total Modules: ${metrics.length}`);
  console.log(`  Average Coupling Score: ${(metrics.reduce((sum, m) => sum + parseFloat(m.couplingScore), 0) / metrics.length).toFixed(2)}`);
  console.log(`  Average Cohesion Score: ${(metrics.reduce((sum, m) => sum + parseFloat(m.cohesionScore), 0) / metrics.length).toFixed(2)}`);
  
  console.log('\n🔗 TOP 10 MODULES BY COUPLING (Higher = More Coupled):');
  metrics.slice(0, 10).forEach((m, i) => {
    console.log(`  ${i + 1}. ${m.module}`);
    console.log(`     Coupling: ${m.couplingScore} | External Deps: ${m.externalDeps} | Files: ${m.files}`);
  });
  
  console.log('\n⚠️  TIGHTLY COUPLED MODULES (Coupling > 0.7):');
  if (tightlyCoupled.length === 0) {
    console.log('  ✅ No tightly coupled modules detected!');
  } else {
    tightlyCoupled.forEach(m => {
      console.log(`\n  ${m.module} (Coupling: ${m.couplingScore})`);
      console.log(`    External Dependencies: ${m.externalDeps}`);
      console.log(`    Top Dependencies:`);
      m.topDependencies.forEach(([dep, count]) => {
        console.log(`      - ${dep}: ${count} imports`);
      });
    });
  }
  
  console.log('\n📦 POORLY COHESIVE MODULES (Cohesion < 0.3):');
  if (poorCohesion.length === 0) {
    console.log('  ✅ All modules show good cohesion!');
  } else {
    poorCohesion.forEach(m => {
      console.log(`\n  ${m.module} (Cohesion: ${m.cohesionScore})`);
      console.log(`    Files: ${m.files} | Internal: ${m.internalDeps} | External: ${m.externalDeps}`);
    });
  }
  
  console.log('\n🔀 TOP CROSS-MODULE DEPENDENCIES:');
  crossModuleDeps.forEach(([dep, count], i) => {
    console.log(`  ${i + 1}. ${dep}: ${count} imports`);
  });
  
  console.log('\n🚨 ARCHITECTURAL VIOLATIONS:');
  if (violations.length === 0) {
    console.log('  ✅ No architectural violations detected!');
  } else {
    const grouped = violations.reduce((acc, v) => {
      if (!acc[v.severity]) acc[v.severity] = [];
      acc[v.severity].push(v);
      return acc;
    }, {});
    
    for (const [severity, viols] of Object.entries(grouped)) {
      console.log(`\n  ${severity} (${viols.length}):`);
      viols.forEach(v => {
        console.log(`    - ${v.module}: ${v.issue}`);
      });
    }
  }
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'coupling-analysis-report.json');
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalModules: metrics.length,
      avgCoupling: (metrics.reduce((sum, m) => sum + parseFloat(m.couplingScore), 0) / metrics.length).toFixed(2),
      avgCohesion: (metrics.reduce((sum, m) => sum + parseFloat(m.cohesionScore), 0) / metrics.length).toFixed(2),
      tightlyCoupledCount: tightlyCoupled.length,
      poorCohesionCount: poorCohesion.length,
      violationsCount: violations.length,
    },
    metrics,
    tightlyCoupled,
    poorCohesion,
    crossModuleDeps: crossModuleDeps.map(([dep, count]) => ({ dependency: dep, count })),
    violations,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n💾 Detailed report saved to: coupling-analysis-report.json`);
}

// Main execution
console.log('🔍 Starting coupling and cohesion analysis...');

const { moduleDeps, moduleFiles } = buildModuleDependencies();
const metrics = calculateCoupling(moduleDeps);
const tightlyCoupled = identifyTightCoupling(metrics);
const poorCohesion = identifyPoorCohesion(metrics);
const crossModuleDeps = analyzeCrossModuleDeps(moduleDeps);
const violations = identifyViolations(moduleDeps);

generateReport(metrics, tightlyCoupled, poorCohesion, crossModuleDeps, violations);

console.log('\n✅ Analysis complete!');
