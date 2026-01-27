# GitHub Workflows

## Create Issues from Implementation Plan

This directory contains a GitHub Actions workflow to automatically create issues from the implementation plan.

### Available Workflow

#### `create-issues.yml`
- **Trigger:** Manual (workflow_dispatch)
- **Purpose:** Creates 5 GitHub issues from the `GITHUB_ISSUES_TEMPLATE.md` file
- **How to use:**
  1. Go to the "Actions" tab in the GitHub repository
  2. Select "Create GitHub Issues from Implementation Plan" workflow
  3. Click "Run workflow" button
  4. Confirm by clicking "Run workflow" in the dropdown
  5. The workflow will execute and create all 5 issues automatically

### Alternative: Local Execution

You can also create issues locally using the npm script:

```bash
# Install dependencies
npm install

# Test (dry run)
npm run create-issues:dry-run

# Create issues (requires GITHUB_TOKEN)
GITHUB_TOKEN=your_token npm run create-issues
```

See [CREATING_ISSUES.md](../CREATING_ISSUES.md) for detailed instructions on local execution.

### Issues Created

The workflow creates 5 issues for the Elternbegleiterin website transformation:

1. **Content & Branding Updates** - Phase 1
2. **German/Turkish Localization** - Phase 2  
3. **Appointment Booking System** - Phase 3
4. **SEO & Performance Optimization** - Phase 4
5. **Pre-Launch Testing & Deployment** - Phase 5

See [ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md](../ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md) for the complete project plan.
