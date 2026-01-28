# GitHub Repository Environments Setup

This guide explains how to configure GitHub repository environments to manage environment variables and secrets for the Elternherz website.

## What are GitHub Environments?

GitHub Environments allow you to configure environment-specific secrets and variables, set up protection rules, and manage deployments. This is ideal for managing different configurations for development, staging, and production environments.

## Benefits

- **Centralized Management**: All environment variables in one place
- **Security**: Secrets are encrypted and not exposed in code
- **Environment Protection**: Require approvals for production deployments
- **Deployment History**: Track deployments to each environment
- **Easy Updates**: Change variables without code changes

## Setting Up Environments

### 1. Create Environment

1. Go to your GitHub repository: `https://github.com/ahmetsina/elternherz`
2. Navigate to **Settings** → **Environments**
3. Click **New environment**
4. Create the following environments:
   - `production` - For live website deployments
   - `preview` - For preview/staging deployments (optional)

### 2. Configure Environment Variables

For each environment, add the following variables and secrets:

#### Production Environment Variables

**Repository Variables** (Settings → Environments → production → Environment variables):

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `PUBLIC_CALCOM_USERNAME` | `elternherz` | Cal.com username |
| `PUBLIC_CALCOM_URL` | `https://cal.eu` | Cal.com EU server URL |
| `PUBLIC_SITE_URL` | `https://elternherz.de` | Production site URL |
| `NODE_VERSION` | `18` | Node.js version for builds |

**Repository Secrets** (Settings → Environments → production → Environment secrets):

| Secret Name | Description |
|-------------|-------------|
| `PUBLIC_TELEMETRYDECK_APP_ID` | TelemetryDeck App ID (UUID format) |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token (optional, for automated deployments) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID (optional) |

> **Note**: Even `PUBLIC_*` variables can be stored as secrets if they contain sensitive information like API keys or App IDs.

### 3. Set Up Environment Protection Rules (Production Only)

For the `production` environment:

1. Go to **Settings** → **Environments** → **production**
2. Enable **Required reviewers** (optional):
   - Add team members who must approve production deployments
3. Enable **Wait timer** (optional):
   - Set a delay before deployment can proceed
4. Select **Deployment branches**:
   - Choose **Protected branches only**
   - Or specify `main` branch only

## Using Environment Variables in GitHub Actions

### Example: Build and Deploy Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://elternherz.de
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ vars.NODE_VERSION || '18' }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build site
        env:
          PUBLIC_CALCOM_USERNAME: ${{ vars.PUBLIC_CALCOM_USERNAME }}
          PUBLIC_CALCOM_URL: ${{ vars.PUBLIC_CALCOM_URL }}
          PUBLIC_TELEMETRYDECK_APP_ID: ${{ secrets.PUBLIC_TELEMETRYDECK_APP_ID }}
          PUBLIC_SITE_URL: ${{ vars.PUBLIC_SITE_URL }}
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: elternherz
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### Accessing Variables in Workflows

**Environment Variables** (non-sensitive):
```yaml
${{ vars.VARIABLE_NAME }}
```

**Environment Secrets** (sensitive):
```yaml
${{ secrets.SECRET_NAME }}
```

**Built-in Secrets**:
```yaml
${{ secrets.GITHUB_TOKEN }}  # Automatically provided by GitHub
```

## Using in Cloudflare Pages

While GitHub Environments are useful for CI/CD, you still need to configure environment variables in Cloudflare Pages for runtime:

1. Go to **Cloudflare Pages** dashboard
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Add the same variables for **Production** and **Preview** environments

> **Tip**: You can use GitHub Actions to sync environment variables to Cloudflare Pages programmatically.

## Security Best Practices

### What to Store as Secrets

Store these as **Secrets**:
- API keys and tokens
- Authentication credentials
- App IDs (even if prefixed with `PUBLIC_`)
- Any value you don't want visible in logs

### What to Store as Variables

Store these as **Variables** (visible in logs):
- Public configuration values
- URLs (if not sensitive)
- Version numbers
- Non-sensitive settings

### Never Commit to Repository

- Never commit actual values to `.env` files
- Keep `.env.example` with placeholder values only
- Add `.env` and `.env.local` to `.gitignore`

## Local Development

For local development, create a `.env` file (not committed):

```bash
# Copy from .env.example
cp .env.example .env

# Edit with your values
nano .env
```

Astro automatically loads environment variables from `.env` files during development.

## Migrating Existing Setup

If you're currently using Cloudflare Pages environment variables:

1. **Keep Cloudflare Variables**: They're needed for runtime
2. **Add GitHub Environment Variables**: For CI/CD workflows
3. **Update Documentation**: Reference GitHub Environments as source of truth
4. **Sync on Changes**: Update both GitHub and Cloudflare when values change

## Verification

After setup, verify:

```bash
# Test build locally with .env file
npm run build

# Check workflow runs in GitHub Actions
# Go to Actions tab → Select workflow → View logs
```

## Troubleshooting

### Variables Not Available

**Problem**: Workflow can't access environment variables

**Solution**:
- Ensure environment name matches in workflow (`environment: production`)
- Check variable/secret names match exactly (case-sensitive)
- Verify variables are added to the correct environment

### Build Fails with Missing Variables

**Problem**: Build fails saying environment variable is undefined

**Solution**:
- Check the variable is defined in GitHub Environment
- Ensure it's passed to the build step via `env:`
- For Astro, ensure variable names start with `PUBLIC_` if used in client code

### Deployment Not Using Environment

**Problem**: Workflow doesn't wait for approval

**Solution**:
- Ensure `environment:` is specified in the job
- Check protection rules are configured for that environment
- Verify the branch is allowed to deploy to the environment

## Additional Resources

- [GitHub Environments Documentation](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Cloudflare Pages GitHub Action](https://github.com/cloudflare/pages-action)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)

## Summary

GitHub Environments provide a robust way to manage configuration across different deployment stages. Combined with Cloudflare Pages environment variables, you have a complete solution for secure, manageable deployments.

**Setup Steps**:
1. ✅ Create `production` environment in GitHub
2. ✅ Add variables and secrets
3. ✅ Configure protection rules (optional)
4. ✅ Update workflows to use environment
5. ✅ Keep Cloudflare Pages variables in sync

---

*Last updated: January 2026*
