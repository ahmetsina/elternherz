# Deployment Guide - Elternherz

This guide covers the complete deployment process for the Elternherz website to Cloudflare Pages.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Cloudflare Pages Setup](#cloudflare-pages-setup)
- [Environment Variables](#environment-variables)
- [Domain Configuration](#domain-configuration)
- [SSL Certificate](#ssl-certificate)
- [Build Configuration](#build-configuration)
- [Deployment Process](#deployment-process)
- [Post-Deployment Verification](#post-deployment-verification)
- [Rollback Procedure](#rollback-procedure)

## Prerequisites

Before deploying, ensure you have:

- [ ] A Cloudflare account (free or paid)
- [ ] GitHub repository access
- [ ] Domain registered (e.g., elternherz.de)
- [ ] Cal.com account configured (EU server: https://cal.eu)
- [ ] All content finalized and reviewed
- [ ] Legal pages completed (Impressum, Datenschutz)

## Cloudflare Pages Setup

### 1. Connect Your Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create Application** → **Pages**
3. Click **Connect to Git**
4. Select **GitHub** and authorize Cloudflare
5. Choose the `ahmetsina/elternherz` repository
6. Click **Begin Setup**

### 2. Configure Build Settings

Use the following build configuration:

| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |
| **Node version** | `18` or higher |

### 3. Set Up Preview Deployments

- ✅ Enable **Automatic Deployments** for the main branch
- ✅ Enable **Preview Deployments** for pull requests
- ✅ Set **Branch Preview Deployments** to automatically deploy from feature branches

## Environment Variables

### Required Variables

Add these environment variables in **Settings** → **Environment Variables**:

```bash
# Cal.com Configuration (EU Server)
PUBLIC_CALCOM_USERNAME=elternherz
PUBLIC_CALCOM_URL=https://cal.eu

# Analytics and Error Monitoring
# TelemetryDeck - Privacy-first analytics and error monitoring
# Get your App ID from: https://dashboard.telemetrydeck.com/
PUBLIC_TELEMETRYDECK_APP_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# Site Configuration
PUBLIC_SITE_URL=https://elternherz.de
```

### Setting Environment Variables

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Variable name**: (e.g., `PUBLIC_CALCOM_USERNAME`)
   - **Value**: (e.g., `elternherz`)
   - **Environment**: Select **Production** (and **Preview** if needed)
4. Click **Save**

### Variable Scopes

- `PUBLIC_*` variables are accessible in client-side code
- Other variables are only available during build time
- Preview deployments can have different values than production

## Domain Configuration

### 1. Add Custom Domain

1. In your Cloudflare Pages project, go to **Custom Domains**
2. Click **Set up a custom domain**
3. Enter your domain: `elternherz.de`
4. Click **Continue**

### 2. DNS Configuration

If your domain is managed by Cloudflare:

1. Cloudflare will automatically add the necessary DNS records
2. Wait for DNS propagation (usually 5-15 minutes)

If your domain is managed elsewhere:

1. Add a **CNAME record**:
   - **Name**: `@` (or your subdomain)
   - **Target**: `[your-project].pages.dev`
   - **TTL**: Automatic or 300 seconds

2. For www subdomain:
   - **Name**: `www`
   - **Target**: `elternherz.de`
   - **TTL**: Automatic or 300 seconds

### 3. Verify Domain

1. After adding DNS records, click **Check again** in Cloudflare
2. Once verified, your domain will show as **Active**
3. Wait up to 48 hours for full DNS propagation

## SSL Certificate

### Automatic SSL (Recommended)

Cloudflare Pages automatically provisions SSL certificates:

1. Certificate is issued within minutes of domain verification
2. Covers both `elternherz.de` and `www.elternherz.de`
3. Auto-renews before expiration
4. No manual configuration needed

### Verify SSL

1. Visit `https://elternherz.de`
2. Check for the padlock icon in browser
3. Click the padlock → **Certificate** to verify:
   - Issued by: Cloudflare
   - Valid until: (should be 3+ months in future)
   - Covers: elternherz.de, www.elternherz.de

### Force HTTPS

1. In Cloudflare Dashboard, go to **SSL/TLS** → **Edge Certificates**
2. Enable **Always Use HTTPS**
3. Set **Minimum TLS Version** to 1.2 or higher
4. Enable **Automatic HTTPS Rewrites**

## Build Configuration

### Local Build Test

Before deploying, test the build locally:

```bash
# Install dependencies
npm install

# Run local build
npm run build

# Preview the build
npm run preview
```

### Build Optimization

The project is configured with:

- **Static output**: Site is pre-rendered as static HTML
- **Image optimization**: Images are optimized during build
- **CSS minification**: Styles are minified and bundled
- **JS tree-shaking**: Unused code is removed

### Build Time Expectations

- **Initial build**: 2-5 minutes
- **Subsequent builds**: 1-3 minutes
- **Preview builds**: 1-2 minutes

## Deployment Process

### Automatic Deployment (Recommended)

1. Merge changes to the `main` branch
2. Cloudflare Pages automatically detects the push
3. Starts a new deployment
4. Monitors build progress in **Deployments** tab
5. Site goes live automatically after successful build

### Manual Deployment

Via Cloudflare Dashboard:

1. Go to your project's **Deployments** page
2. Click **Create deployment**
3. Select branch to deploy
4. Cloudflare builds and deploys

Via Wrangler CLI:

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages publish dist --project-name=elternherz
```

### Deployment Monitoring

Monitor deployment in Cloudflare Dashboard:

1. **Build logs**: View real-time build output
2. **Deployment status**: See success/failure
3. **Build time**: Track build duration
4. **Preview URL**: Test before going live

## Post-Deployment Verification

### Immediate Checks (Within 5 Minutes)

- [ ] Visit production URL: `https://elternherz.de`
- [ ] Verify SSL certificate is valid (padlock icon)
- [ ] Test homepage loads correctly
- [ ] Check browser console for errors (F12 → Console)
- [ ] Verify no 404 errors on internal links

### Content Verification (Within 30 Minutes)

- [ ] Test German language content
- [ ] Test Turkish language content (`/tr/`)
- [ ] Verify language switcher works
- [ ] Check all navigation links
- [ ] Test contact page (`/kontakt`)
- [ ] Verify booking widgets load (`/kontakt`, `/tr/iletisim`)

### Functional Testing (Within 1 Hour)

- [ ] Test Cal.com booking flow (both languages)
- [ ] Submit test booking (use test email)
- [ ] Verify booking confirmation emails arrive
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Verify analytics tracking (if configured)

### SEO & Technical (Within 24 Hours)

- [ ] Verify sitemap is accessible: `https://elternherz.de/sitemap-index.xml`
- [ ] Check robots.txt: `https://elternherz.de/robots.txt`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Run Lighthouse audit (target score: 90+)
- [ ] Test page load speed
- [ ] Verify structured data (Google Rich Results Test)

## Rollback Procedure

If critical issues are discovered after deployment:

### Option 1: Instant Rollback (via Cloudflare Dashboard)

1. Go to **Deployments** tab
2. Find the last working deployment
3. Click the **•••** menu
4. Select **Rollback to this deployment**
5. Confirm the rollback
6. Previous version goes live immediately

### Option 2: Deploy Previous Commit

```bash
# Identify the working commit
git log --oneline

# Create a revert commit
git revert [commit-hash]

# Push to main branch
git push origin main

# Cloudflare auto-deploys the reverted version
```

### Option 3: Branch Deployment

1. Keep a stable `production` branch
2. Merge to `main` for testing
3. When stable, merge `main` to `production`
4. Set `production` as the production branch in Cloudflare

## Monitoring & Alerts

### Set Up Monitoring

1. **Cloudflare Analytics**: Built-in traffic analytics
2. **TelemetryDeck**: Privacy-first analytics and error monitoring
3. **UptimeRobot**: Uptime monitoring (free tier available)

### Alert Thresholds

Set up alerts for:

- Site downtime (> 1 minute)
- Build failures
- JavaScript errors (via TelemetryDeck)
- Slow page load times (> 3 seconds)

## Troubleshooting

### Build Fails

1. Check build logs in Cloudflare Dashboard
2. Test build locally: `npm run build`
3. Verify all dependencies are in `package.json`
4. Check Node.js version compatibility

### Domain Not Working

1. Verify DNS records in Cloudflare DNS settings
2. Check domain status (Active vs. Pending)
3. Wait up to 48 hours for DNS propagation
4. Use DNS lookup tool: `nslookup elternherz.de`

### SSL Certificate Issues

1. Ensure domain is verified in Cloudflare
2. Check SSL/TLS settings in Cloudflare Dashboard
3. Clear browser cache and cookies
4. Try incognito/private browsing mode

### Performance Issues

1. Run Lighthouse audit to identify bottlenecks
2. Check image sizes and optimization
3. Verify CDN is serving assets
4. Review Cloudflare Analytics for traffic patterns

## Support Resources

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Cloudflare Community**: https://community.cloudflare.com/
- **Astro Documentation**: https://docs.astro.build/
- **Cal.com Documentation**: https://cal.com/docs

## Next Steps

After successful deployment:

1. ✅ Complete [Pre-Launch Checklist](PRE_LAUNCH_CHECKLIST.md)
2. ✅ Review [Maintenance Guide](MAINTENANCE.md)
3. ✅ Set up monitoring and alerts
4. ✅ Submit sitemap to search engines
5. ✅ Announce launch
