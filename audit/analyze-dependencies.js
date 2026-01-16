/**
 * Dependency Graph Analyzer
 * Analyzes import/export statements to build a dependency graph
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

// Data structures
const fileMap = new Map(); // path -> { imports: [], exports: [] }
const dependencyGraph = new Map(); // file -> [dependencies]

/**
 * Recursively scan directory for source files
 */
function scanDirectory(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and build directories
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
 * Extract import statements from file content
 */
function extractImports(content, filePath) {
  const imports = [];
  
  // Match various import patterns
  const patterns = [
    // import { x } from 'module'
    /import\s+{[^}]*}\s+from\s+['"]([^'"]+)['"]/g,
    // import x from 'module'
    /import\s+\w+\s+from\s+['"]([^'"]+)['"]/g,
    // import * as x from 'module'
    /import\s+\*\s+as\s+\w+\s+from\s+['"]([^'"]+)['"]/g,
    // import 'module'
    /import\s+['"]([^'"]+)['"]/g,
    // const x = require('module')
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const importPath = match[1];
      imports.push({
        path: importPath,
        isRelative: importPath.startsWith('.'),
        isAlias: importPath.startsWith('@/'),
        isExternal: !importPath.startsWith('.') && !importPath.startsWith('@/'),
      });
    }
  }
  
  return imports;
}

/**
 * Resolve import path to actual file path
 */
function resolveImportPath(importPath, fromFile) {
  if (importPath.startsWith('@/')) {
    // Resolve alias
    const relativePath = importPath.replace('@/', '');
    return path.join(SRC_DIR, relativePath);
  } else if (importPath.startsWith('.')) {
    // Resolve relative path
    const dir = path.dirname(fromFile);
    return path.resolve(dir, importPath);
  }
  
  // External module
  return null;
}

/**
 * Normalize file path (add extension if missing)
 */
function normalizeFilePath(filePath) {
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  
  // Try adding extensions
  for (const ext of EXTENSIONS) {
    const withExt = filePath + ext;
    if (fs.existsSync(withExt)) {
      return withExt;
    }
  }
  
  // Try index file
  for (const ext of EXTENSIONS) {
    const indexPath = path.join(filePath, `index${ext}`);
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }
  }
  
  return null;
}

/**
 * Build dependency graph
 */
function buildDependencyGraph(files) {
  console.log(`\nAnalyzing ${files.length} files...`);
  
  // First pass: extract all imports
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const imports = extractImports(content, file);
      fileMap.set(file, { imports });
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  }
  
  // Second pass: resolve imports to actual files
  for (const [file, data] of fileMap.entries()) {
    const dependencies = [];
    
    for (const imp of data.imports) {
      if (imp.isExternal) {
        continue; // Skip external modules
      }
      
      const resolvedPath = resolveImportPath(imp.path, file);
      if (resolvedPath) {
        const normalizedPath = normalizeFilePath(resolvedPath);
        if (normalizedPath && normalizedPath !== file) {
          dependencies.push({
            file: normalizedPath,
            type: imp.isRelative ? 'relative' : 'alias',
          });
        }
      }
    }
    
    dependencyGraph.set(file, dependencies);
  }
  
  return dependencyGraph;
}

/**
 * Find circular dependencies using DFS
 */
function findCircularDependencies(graph) {
  const visited = new Set();
  const recursionStack = new Set();
  const cycles = [];
  
  function dfs(node, path = []) {
    if (recursionStack.has(node)) {
      // Found a cycle
      const cycleStart = path.indexOf(node);
      const cycle = path.slice(cycleStart);
      cycle.push(node);
      cycles.push(cycle);
      return;
    }
    
    if (visited.has(node)) {
      return;
    }
    
    visited.add(node);
    recursionStack.add(node);
    path.push(node);
    
    const dependencies = graph.get(node) || [];
    for (const dep of dependencies) {
      dfs(dep.file, [...path]);
    }
    
    recursionStack.delete(node);
  }
  
  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }
  
  return cycles;
}

/**
 * Calculate dependency metrics
 */
function calculateMetrics(graph) {
  const metrics = {
    totalFiles: graph.size,
    totalDependencies: 0,
    avgDependenciesPerFile: 0,
    maxDependencies: 0,
    maxDependenciesFile: null,
    filesWithNoDependencies: 0,
    relativeImports: 0,
    aliasImports: 0,
  };
  
  for (const [file, deps] of graph.entries()) {
    metrics.totalDependencies += deps.length;
    
    if (deps.length === 0) {
      metrics.filesWithNoDependencies++;
    }
    
    if (deps.length > metrics.maxDependencies) {
      metrics.maxDependencies = deps.length;
      metrics.maxDependenciesFile = file;
    }
    
    for (const dep of deps) {
      if (dep.type === 'relative') {
        metrics.relativeImports++;
      } else {
        metrics.aliasImports++;
      }
    }
  }
  
  metrics.avgDependenciesPerFile = (metrics.totalDependencies / metrics.totalFiles).toFixed(2);
  
  return metrics;
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
function generateReport(graph, cycles, metrics) {
  console.log('\n' + '='.repeat(80));
  console.log('DEPENDENCY GRAPH ANALYSIS REPORT');
  console.log('='.repeat(80));
  
  console.log('\n📊 METRICS:');
  console.log(`  Total Files: ${metrics.totalFiles}`);
  console.log(`  Total Dependencies: ${metrics.totalDependencies}`);
  console.log(`  Average Dependencies per File: ${metrics.avgDependenciesPerFile}`);
  console.log(`  Max Dependencies: ${metrics.maxDependencies}`);
  console.log(`  Files with No Dependencies: ${metrics.filesWithNoDependencies}`);
  console.log(`  Relative Imports: ${metrics.relativeImports}`);
  console.log(`  Alias Imports (@/): ${metrics.aliasImports}`);
  
  if (metrics.maxDependenciesFile) {
    console.log(`\n  File with Most Dependencies:`);
    console.log(`    ${getRelativePath(metrics.maxDependenciesFile)}`);
  }
  
  console.log('\n🔄 CIRCULAR DEPENDENCIES:');
  if (cycles.length === 0) {
    console.log('  ✅ No circular dependencies detected!');
  } else {
    console.log(`  ⚠️  Found ${cycles.length} circular dependency chain(s):\n`);
    cycles.forEach((cycle, index) => {
      console.log(`  Cycle ${index + 1}:`);
      cycle.forEach((file, i) => {
        const arrow = i < cycle.length - 1 ? ' →' : '';
        console.log(`    ${getRelativePath(file)}${arrow}`);
      });
      console.log('');
    });
  }
  
  // Top 10 most dependent files
  console.log('\n📦 TOP 10 FILES BY DEPENDENCY COUNT:');
  const sorted = Array.from(graph.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10);
  
  sorted.forEach(([file, deps], index) => {
    console.log(`  ${index + 1}. ${getRelativePath(file)} (${deps.length} dependencies)`);
  });
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'dependency-graph-report.json');
  const reportData = {
    timestamp: new Date().toISOString(),
    metrics,
    circularDependencies: cycles.map(cycle => cycle.map(getRelativePath)),
    graph: Array.from(graph.entries()).map(([file, deps]) => ({
      file: getRelativePath(file),
      dependencies: deps.map(d => ({
        file: getRelativePath(d.file),
        type: d.type,
      })),
    })),
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n💾 Detailed report saved to: ${getRelativePath(reportPath)}`);
}

// Main execution
console.log('🔍 Starting dependency analysis...');
console.log(`📁 Scanning directory: ${SRC_DIR}`);

const files = scanDirectory(SRC_DIR);
const graph = buildDependencyGraph(files);
const cycles = findCircularDependencies(graph);
const metrics = calculateMetrics(graph);

generateReport(graph, cycles, metrics);

console.log('\n✅ Analysis complete!');
