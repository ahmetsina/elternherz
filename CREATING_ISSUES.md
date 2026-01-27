# Creating GitHub Issues from Implementation Plan

This document explains how to use the automated issue creation script to generate GitHub issues from the implementation plan.

## Overview

The repository contains:
- `ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md` - Detailed implementation plan for transforming the website
- `GITHUB_ISSUES_TEMPLATE.md` - Ready-to-use templates for 5 GitHub issues
- `scripts/create-issues.js` - Automated script to create issues from templates
- `.github/workflows/create-issues.yml` - GitHub Actions workflow for automatic issue creation

## Methods to Create Issues

### Method 1: GitHub Actions (Recommended - Easiest)

The easiest way to create issues is using the GitHub Actions workflow:

1. Go to the **Actions** tab in the GitHub repository
2. Select **"Create GitHub Issues from Implementation Plan"** workflow
3. Click the **"Run workflow"** button
4. Confirm by clicking **"Run workflow"** in the dropdown
5. Wait for the workflow to complete (usually under 1 minute)
6. Check the **Issues** tab to see the newly created issues

**Advantages:**
- ✅ No need to set up a personal access token
- ✅ No local setup required
- ✅ Works directly from GitHub web interface
- ✅ Uses repository's built-in `GITHUB_TOKEN`

### Method 2: Local Script Execution

Alternatively, you can run the script locally:

## Quick Start

### 1. Test the Script (Dry Run)

First, verify that the script can parse the issues correctly without creating them:

```bash
npm run create-issues:dry-run
```

This will:
- Parse the `GITHUB_ISSUES_TEMPLATE.md` file
- Extract all 5 issue templates
- Display what would be created
- **Not** create any actual issues on GitHub

### 2. Create the Issues

Once you're ready to create the issues on GitHub:

```bash
GITHUB_TOKEN=your_token_here npm run create-issues
```

Or export the token first:

```bash
export GITHUB_TOKEN=your_token_here
npm run create-issues
```

## Setting up GitHub Token

To create issues, you need a GitHub Personal Access Token with `repo` scope.

### Steps to create a token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token" (classic)
3. Give it a descriptive name (e.g., "Elternherz Issue Creator")
4. Select the `repo` scope (full control of private repositories)
5. Click "Generate token"
6. Copy the token (you won't be able to see it again!)

### Storing the token safely:

**Option 1: Environment variable (recommended for one-time use)**
```bash
export GITHUB_TOKEN=ghp_your_token_here
npm run create-issues
```

**Option 2: .env file (for repeated use)**

Create a `.env` file in the project root:
```
GITHUB_TOKEN=ghp_your_token_here
```

Then update the script to use dotenv:
```bash
require('dotenv').config();
```

**Important:** Never commit your `.env` file or token to the repository!

## What Issues Will Be Created?

The script creates 5 issues based on the implementation phases:

1. **Issue #1: Content & Branding Updates for Elternbegleiterin Services**
   - Labels: `enhancement`, `content`, `design`, `Phase 1`
   - Content, branding, and page updates

2. **Issue #2: Add German and Turkish Language Support**
   - Labels: `enhancement`, `i18n`, `Phase 2`
   - Full internationalization setup

3. **Issue #3: Add Parent Consultation Appointment Booking**
   - Labels: `enhancement`, `feature`, `Phase 3`
   - Scheduling system integration

4. **Issue #4: Optimize Website for Search Engines and Performance**
   - Labels: `enhancement`, `performance`, `seo`, `Phase 4`
   - SEO, performance, analytics, and accessibility

5. **Issue #5: Final Testing and Production Launch**
   - Labels: `deployment`, `testing`, `Phase 5`
   - Pre-launch testing and deployment

## Script Options

### Dry Run Mode
```bash
npm run create-issues:dry-run
# or
node scripts/create-issues.js --dry-run
```

This mode:
- ✅ Parses the template file
- ✅ Displays issue details
- ❌ Does NOT require GitHub token
- ❌ Does NOT create issues

### Create Mode
```bash
GITHUB_TOKEN=xxx npm run create-issues
# or
GITHUB_TOKEN=xxx node scripts/create-issues.js
```

This mode:
- ✅ Parses the template file
- ✅ Requires GitHub token
- ✅ Creates issues on GitHub
- ✅ Returns URLs of created issues

## Troubleshooting

### Error: "GITHUB_TOKEN environment variable is required"
- You need to set the `GITHUB_TOKEN` environment variable
- Use `export GITHUB_TOKEN=your_token` before running the script
- Or use `GITHUB_TOKEN=your_token npm run create-issues`

### Error: "Bad credentials"
- Your GitHub token is invalid or expired
- Generate a new token at https://github.com/settings/tokens
- Make sure the token has `repo` scope

### Error: "Resource not accessible by integration"
- The token doesn't have sufficient permissions
- Regenerate with `repo` scope selected

### Issues not appearing in the repository
- Check if you're using the correct repository (ahmetsina/elternherz)
- Verify the token has access to this repository
- Check the script output for error messages

## Modifying the Issues

To modify the issues before creating them:

1. Edit `GITHUB_ISSUES_TEMPLATE.md` with your changes
2. Run `npm run create-issues:dry-run` to verify the changes
3. Run `npm run create-issues` to create the updated issues

## Next Steps After Creating Issues

1. **Set up GitHub Project Board**
   - Create a project to track all issues
   - Add columns: Backlog, In Progress, Review, Testing, Done

2. **Create Milestones**
   - Milestone 1: Content & Branding (Week 2)
   - Milestone 2: Localization (Week 5)
   - Milestone 3: Scheduling (Week 7)
   - Milestone 4: Optimization (Week 8)
   - Milestone 5: Launch (Week 9)

3. **Assign Labels**
   - The script already assigns labels from the templates
   - You can add more labels as needed in GitHub UI

4. **Start Working**
   - Begin with Issue #1 (Content & Branding)
   - Follow the implementation plan
   - Track progress in the project board

## Additional Resources

- [Implementation Plan](ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md) - Full project details
- [Issue Templates](GITHUB_ISSUES_TEMPLATE.md) - Source of the issues
- [Astro Documentation](https://docs.astro.build)
- [GitHub Issues Guide](https://docs.github.com/en/issues)
