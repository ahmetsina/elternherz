#!/usr/bin/env node

/**
 * Script to create GitHub issues from the GITHUB_ISSUES_TEMPLATE.md file
 * 
 * Usage:
 *   node scripts/create-issues.js [--dry-run]
 * 
 * Environment variables required:
 *   GITHUB_TOKEN - Personal access token with repo scope
 * 
 * Options:
 *   --dry-run - Parse and display issues without creating them
 */

const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

// Parse command line arguments
const isDryRun = process.argv.includes('--dry-run');

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'ahmetsina';
const REPO_NAME = 'elternherz';

// File path
const TEMPLATE_FILE = path.join(__dirname, '..', 'GITHUB_ISSUES_TEMPLATE.md');

/**
 * Parse the GITHUB_ISSUES_TEMPLATE.md file and extract individual issues
 */
function parseIssueTemplate() {
  const content = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  const lines = content.split('\n');
  
  const issues = [];
  let currentIssue = null;
  let inIssueBlock = false;
  let currentSection = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect issue start (e.g., "## Issue #1: Content & Branding Updates")
    if (line.match(/^## Issue #\d+:/)) {
      // Save previous issue if exists
      if (currentIssue) {
        issues.push(currentIssue);
      }
      
      // Start new issue
      const titleMatch = line.match(/^## Issue #(\d+): (.+)/);
      currentIssue = {
        number: parseInt(titleMatch[1]),
        title: '',
        labels: [],
        body: [],
        milestone: null
      };
      inIssueBlock = true;
      currentSection = null;
      continue;
    }
    
    // End of issue block (next main section or end of file)
    if (inIssueBlock && line.startsWith('---') && i > 0 && lines[i-1].trim() === '') {
      if (currentIssue) {
        issues.push(currentIssue);
        currentIssue = null;
      }
      inIssueBlock = false;
      continue;
    }
    
    if (inIssueBlock && currentIssue) {
      // Extract title
      if (line.startsWith('**Title:**')) {
        currentIssue.title = line.replace('**Title:**', '').trim();
        continue;
      }
      
      // Extract labels
      if (line.startsWith('**Labels:**')) {
        const labelsText = line.replace('**Labels:**', '').trim();
        currentIssue.labels = labelsText
          .split(',')
          .map(l => l.trim().replace(/`/g, ''));
        continue;
      }
      
      // Detect description start
      if (line.startsWith('**Description:**')) {
        currentSection = 'body';
        continue;
      }
      
      // Add content to body
      if (currentSection === 'body') {
        currentIssue.body.push(line);
      }
    }
  }
  
  // Add the last issue if exists
  if (currentIssue) {
    issues.push(currentIssue);
  }
  
  return issues;
}

/**
 * Create issues on GitHub
 */
async function createIssues(issues) {
  if (!GITHUB_TOKEN && !isDryRun) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    console.error('Please create a personal access token with "repo" scope at:');
    console.error('https://github.com/settings/tokens');
    process.exit(1);
  }
  
  const octokit = !isDryRun ? new Octokit({
    auth: GITHUB_TOKEN
  }) : null;
  
  console.log(`${isDryRun ? 'Would create' : 'Creating'} ${issues.length} issues in ${REPO_OWNER}/${REPO_NAME}...\n`);
  
  for (const issue of issues) {
    const issueBody = issue.body.join('\n').trim();
    
    console.log(`Creating Issue #${issue.number}: ${issue.title}`);
    console.log(`Labels: ${issue.labels.join(', ')}`);
    console.log(`Body length: ${issueBody.length} characters`);
    
    if (isDryRun) {
      console.log('--- DRY RUN: Issue would be created with this data ---');
      console.log('Title:', issue.title);
      console.log('Labels:', issue.labels);
      console.log('Body preview (first 200 chars):', issueBody.substring(0, 200) + '...');
      console.log('---\n');
    } else {
      try {
        const response = await octokit.rest.issues.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title: issue.title,
          body: issueBody,
          labels: issue.labels
        });
        
        console.log(`✓ Created: ${response.data.html_url}\n`);
      } catch (error) {
        console.error(`✗ Failed to create issue: ${error.message}\n`);
      }
    }
  }
  
  console.log('Done!');
}

/**
 * Main function
 */
async function main() {
  console.log('Elternherz - GitHub Issues Creator\n');
  console.log('Parsing GITHUB_ISSUES_TEMPLATE.md...\n');
  
  const issues = parseIssueTemplate();
  
  console.log(`Found ${issues.length} issues:\n`);
  issues.forEach(issue => {
    console.log(`  ${issue.number}. ${issue.title}`);
  });
  console.log('');
  
  if (isDryRun) {
    console.log('Running in DRY-RUN mode (no issues will be created)\n');
  }
  
  await createIssues(issues);
}

// Run the script
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
