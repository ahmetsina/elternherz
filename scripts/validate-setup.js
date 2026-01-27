#!/usr/bin/env node

/**
 * Validation script to verify the issue creation setup is complete
 * Run this to confirm everything is ready before creating issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Issue Creation Setup...\n');

let allChecks = true;

// Check 1: Template file exists
const templatePath = path.join(__dirname, '..', 'GITHUB_ISSUES_TEMPLATE.md');
if (fs.existsSync(templatePath)) {
  console.log('✅ GITHUB_ISSUES_TEMPLATE.md exists');
} else {
  console.log('❌ GITHUB_ISSUES_TEMPLATE.md not found');
  allChecks = false;
}

// Check 2: Script exists
const scriptPath = path.join(__dirname, 'create-issues.js');
if (fs.existsSync(scriptPath)) {
  console.log('✅ scripts/create-issues.js exists');
} else {
  console.log('❌ scripts/create-issues.js not found');
  allChecks = false;
}

// Check 3: Workflow exists
const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'create-issues.yml');
if (fs.existsSync(workflowPath)) {
  console.log('✅ .github/workflows/create-issues.yml exists');
} else {
  console.log('❌ .github/workflows/create-issues.yml not found');
  allChecks = false;
}

// Check 4: Dependencies installed
const nodeModulesPath = path.join(__dirname, '..', 'node_modules', '@octokit');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ Dependencies installed (@octokit/rest)');
} else {
  console.log('⚠️  Dependencies not installed (run: npm install)');
}

// Check 5: Parse template to verify format
try {
  const content = fs.readFileSync(templatePath, 'utf8');
  const issueCount = (content.match(/^## Issue #\d+:/gm) || []).length;
  
  if (issueCount === 5) {
    console.log(`✅ Template contains ${issueCount} issues (expected 5)`);
  } else {
    console.log(`⚠️  Template contains ${issueCount} issues (expected 5)`);
  }
} catch (error) {
  console.log('❌ Failed to parse template:', error.message);
  allChecks = false;
}

// Check 6: Package.json scripts
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (packageJson.scripts['create-issues'] && packageJson.scripts['create-issues:dry-run']) {
    console.log('✅ npm scripts configured');
  } else {
    console.log('❌ npm scripts missing in package.json');
    allChecks = false;
  }
} else {
  console.log('❌ package.json not found');
  allChecks = false;
}

console.log('\n' + '='.repeat(50));

if (allChecks) {
  console.log('✅ All checks passed! Ready to create issues.');
  console.log('\nNext steps:');
  console.log('1. Run: npm run create-issues:dry-run (to test)');
  console.log('2. Use GitHub Actions workflow (after merging to main)');
  console.log('   OR');
  console.log('3. Run: GITHUB_TOKEN=xxx npm run create-issues');
} else {
  console.log('❌ Some checks failed. Please review the errors above.');
  process.exit(1);
}

console.log('='.repeat(50) + '\n');
