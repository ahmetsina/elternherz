# Troubleshooting Guide - Elternherz

Quick solutions for common issues encountered with the Elternherz website.

## Table of Contents

- [Deployment Issues](#deployment-issues)
- [Build Failures](#build-failures)
- [Domain & DNS Issues](#domain--dns-issues)
- [SSL Certificate Issues](#ssl-certificate-issues)
- [Booking System Issues](#booking-system-issues)
- [Performance Issues](#performance-issues)
- [Content Issues](#content-issues)
- [Browser Compatibility Issues](#browser-compatibility-issues)
- [Analytics & Monitoring](#analytics--monitoring)
- [Email Delivery Issues](#email-delivery-issues)

---

## Deployment Issues

### Site Not Updating After Push

**Symptoms**: Code changes are pushed to GitHub but not reflected on live site.

**Diagnosis**:
```bash
# Check if push succeeded
git log --oneline -5

# Verify branch
git branch -a
```

**Solutions**:

1. **Check Deployment Status**:
   - Go to Cloudflare Pages dashboard
   - Navigate to Deployments tab
   - Look for latest deployment status
   - Review build logs if deployment failed

2. **Verify Branch Configuration**:
   - Ensure pushing to correct branch (`main` for production)
   - Check Cloudflare production branch setting matches

3. **Force Redeploy**:
   - In Cloudflare dashboard, click "Retry deployment"
   - Or make a small commit and push again

4. **Clear CDN Cache**:
   - Cloudflare Dashboard → Caching → Purge Everything
   - Wait 5-10 minutes for propagation

### Deployment Stuck in "Building" Status

**Symptoms**: Deployment shows "Building" for more than 10 minutes.

**Solutions**:

1. **Cancel and Retry**:
   - Cancel the stuck deployment
   - Click "Retry deployment"

2. **Check Build Logs**:
   - May reveal hanging processes
   - Look for npm install timeouts
   - Check for infinite loops in build scripts

3. **Local Build Test**:
   ```bash
   npm run build
   ```
   - If it hangs locally, debug the build script
   - Check for missing dependencies

### Preview Deployment Not Working

**Symptoms**: Pull request preview deployments fail or don't generate.

**Solutions**:

1. **Enable Preview Deployments**:
   - Cloudflare Pages → Settings → Builds & deployments
   - Enable "Enable Preview Deployments"

2. **Check Branch Protection**:
   - Preview deployments only work for authorized branches
   - Check GitHub branch protection rules

3. **Review PR Build Logs**:
   - Click on deployment link in PR
   - Review build errors

---

## Build Failures

### "Module not found" Error

**Symptoms**:
```
Error: Cannot find module '@astrojs/sitemap'
```

**Solutions**:

1. **Install Missing Dependencies**:
   ```bash
   npm install
   ```

2. **Verify package.json**:
   - Ensure all dependencies are listed
   - Check for typos in package names

3. **Clear node_modules**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Astro Build Errors

**Symptoms**:
```
Error: [astro] Unable to render ...
```

**Solutions**:

1. **Check Astro Syntax**:
   - Look for unclosed tags
   - Verify frontmatter is valid YAML
   - Check for TypeScript errors

2. **Test Locally**:
   ```bash
   npm run build
   ```
   - Review detailed error messages
   - Fix errors one at a time

3. **Check File Paths**:
   - Verify imports are correct
   - Check capitalization (case-sensitive)
   - Ensure files exist

### Out of Memory Error

**Symptoms**:
```
JavaScript heap out of memory
```

**Solutions**:

1. **Increase Memory Limit** (local):
   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 npm run build
   ```

2. **Optimize Build**:
   - Reduce image sizes
   - Remove unused dependencies
   - Optimize large files

3. **Contact Cloudflare Support**:
   - If issue persists on Cloudflare Pages
   - May need memory limit increase

---

## Domain & DNS Issues

### Domain Not Resolving

**Symptoms**: `elternherz.de` does not load or shows "Site not found".

**Diagnosis**:
```bash
# Check DNS resolution
nslookup elternherz.de

# Or use dig
dig elternherz.de
```

**Solutions**:

1. **Verify DNS Records**:
   - Cloudflare Dashboard → DNS
   - Check A or CNAME records are correct
   - Ensure records are not proxied incorrectly

2. **Wait for Propagation**:
   - DNS changes take 15 minutes to 48 hours
   - Check progress: https://whatsmydns.net/

3. **Clear Local DNS Cache**:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac/Linux
   sudo dscacheutil -flushcache
   ```

4. **Verify Domain Ownership**:
   - Confirm domain is active in Cloudflare
   - Check domain isn't expired

### WWW Subdomain Not Working

**Symptoms**: `www.elternherz.de` doesn't work but `elternherz.de` does.

**Solutions**:

1. **Add CNAME Record**:
   - Cloudflare Dashboard → DNS
   - Add CNAME record:
     - Name: `www`
     - Target: `elternherz.de`
     - Proxy status: Proxied

2. **Redirect www to non-www** (or vice versa):
   - Cloudflare Dashboard → Rules → Page Rules
   - Create redirect rule

### DNS Propagation Taking Too Long

**Symptoms**: DNS changes not taking effect after 48 hours.

**Solutions**:

1. **Check TTL Settings**:
   - Lower TTL values (300 seconds) for faster propagation
   - After changes, return to higher TTL (3600+)

2. **Verify Nameservers**:
   - Check domain registrar points to Cloudflare nameservers
   - Cloudflare provides nameserver addresses in DNS settings

3. **Use Different DNS Resolver**:
   - Try accessing from different network
   - Use Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)

---

## SSL Certificate Issues

### "Your Connection is Not Private" Error

**Symptoms**: Browser shows SSL warning when accessing site.

**Solutions**:

1. **Check SSL Status**:
   - Cloudflare Dashboard → SSL/TLS
   - Ensure SSL certificate is "Active"

2. **Wait for Certificate Issuance**:
   - New domains take 15-30 minutes
   - Check status in Cloudflare Pages → Custom Domains

3. **Verify SSL Mode**:
   - SSL/TLS → Overview
   - Set to "Full" or "Full (strict)" mode

4. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or try incognito/private mode

### Mixed Content Warnings

**Symptoms**: Browser console shows "Mixed Content" warnings.

**Solutions**:

1. **Find HTTP Resources**:
   - Open DevTools → Console
   - Look for resources loaded over HTTP

2. **Update to HTTPS**:
   - Change `http://` to `https://` in code
   - Or use protocol-relative URLs: `//example.com/file.js`

3. **Enable Auto HTTPS Rewrites**:
   - Cloudflare Dashboard → SSL/TLS → Edge Certificates
   - Enable "Automatic HTTPS Rewrites"

### Certificate Expired

**Symptoms**: Browser shows certificate expired error.

**Solutions**:

1. **Verify Auto-Renewal**:
   - Cloudflare automatically renews certificates
   - If expired, may indicate configuration issue

2. **Remove and Re-add Domain**:
   - Cloudflare Pages → Custom Domains
   - Remove domain and add again
   - Triggers new certificate issuance

3. **Contact Cloudflare Support**:
   - If auto-renewal failed
   - May need manual intervention

---

## Booking System Issues

### Cal.com Widget Not Loading

**Symptoms**: Booking section shows blank space or "Loading..." indefinitely.

**Diagnosis**:
- Open browser DevTools → Console
- Look for JavaScript errors

**Solutions**:

1. **Verify Environment Variables**:
   ```bash
   # Check in Cloudflare Pages dashboard
   # Settings → Environment Variables
   ```
   - `PUBLIC_CALCOM_USERNAME` must be set
   - `PUBLIC_CALCOM_URL` should be `https://cal.eu`

2. **Check Cal.com Account**:
   - Log in to https://cal.eu
   - Verify account is active
   - Ensure event types are published

3. **Test Cal.com Link Directly**:
   - Visit: `https://cal.eu/[username]/[event-type]`
   - If this works, issue is with embed code

4. **Clear Browser Cache**:
   - Cal.com script may be cached
   - Hard refresh or clear cache

5. **Check Network Tab**:
   - DevTools → Network
   - Look for failed requests to cal.com
   - May indicate firewall or adblocker

### Booking Confirmation Not Received

**Symptoms**: User completes booking but doesn't receive confirmation email.

**Solutions**:

1. **Check Spam/Junk Folder**:
   - Cal.com emails may be filtered
   - Add cal.com to safe senders list

2. **Verify Email Settings in Cal.com**:
   - Cal.com Dashboard → Settings → Email
   - Ensure notification settings are correct

3. **Check Email Address**:
   - Verify correct email was entered during booking
   - Check for typos

4. **Cal.com Service Status**:
   - Check https://status.cal.com/
   - May be temporary service disruption

### Booking Times Not Showing

**Symptoms**: Calendar shows "No available times".

**Solutions**:

1. **Check Availability**:
   - Cal.com Dashboard → Availability
   - Ensure working hours are set
   - Check for schedule conflicts

2. **Time Zone Issues**:
   - Verify time zone settings in Cal.com
   - Ensure user's time zone is detected correctly

3. **Buffer Times**:
   - Check if buffer times are too long
   - May be blocking available slots

4. **Calendar Integration**:
   - Verify connected calendar (Google, etc.) is syncing
   - Check for sync errors in Cal.com

---

## Performance Issues

### Slow Page Load Speed

**Symptoms**: Pages take more than 3 seconds to load.

**Diagnosis**:
```bash
# Run Lighthouse audit
# Chrome DevTools → Lighthouse → Run audit
```

**Solutions**:

1. **Optimize Images**:
   ```bash
   # Install sharp for image optimization
   npm install -g sharp-cli
   
   # Convert to WebP
   sharp input.jpg -o output.webp --webp
   ```

2. **Enable Cloudflare Optimizations**:
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - Rocket Loader

3. **Check Third-Party Scripts**:
   - Analytics scripts
   - Cal.com widget
   - May be slowing page load

4. **Reduce JavaScript Bundle**:
   - Remove unused dependencies
   - Code split if needed

### High First Contentful Paint (FCP)

**Symptoms**: Lighthouse shows high FCP time.

**Solutions**:

1. **Preload Critical Resources**:
   ```html
   <link rel="preload" href="/fonts/font.woff2" as="font" />
   ```

2. **Optimize Fonts**:
   - Use system fonts where possible
   - Preload web fonts
   - Use `font-display: swap`

3. **Reduce Render-Blocking Resources**:
   - Inline critical CSS
   - Defer non-critical CSS
   - Async load JavaScript

### Large Page Size

**Symptoms**: Page size exceeds 2-3 MB.

**Solutions**:

1. **Check Image Sizes**:
   ```bash
   # List large files
   find public/assets -type f -size +500k
   ```

2. **Compress Images**:
   - Use WebP format
   - Resize to appropriate dimensions
   - Use image CDN if needed

3. **Audit Dependencies**:
   ```bash
   npm run build
   # Check bundle sizes in dist/_astro/
   ```

---

## Content Issues

### Content Not Displaying

**Symptoms**: Page is blank or content missing.

**Solutions**:

1. **Check File Paths**:
   - Verify file exists in correct location
   - Check imports are correct

2. **Review Build Logs**:
   - Look for errors during content processing
   - Verify markdown frontmatter is valid

3. **Test Locally**:
   ```bash
   npm run dev
   # Visit http://localhost:4321
   ```

### Turkish Characters Not Displaying

**Symptoms**: ğ, ı, ş, ç, ö, ü show as � or boxes.

**Solutions**:

1. **Verify UTF-8 Encoding**:
   - Files should be saved as UTF-8
   - Check file encoding in editor

2. **Check HTML Meta Tag**:
   ```html
   <meta charset="UTF-8" />
   ```

3. **Server Headers**:
   - Cloudflare should send `charset=utf-8`
   - Check in DevTools → Network → Response Headers

### Markdown Not Rendering

**Symptoms**: Raw markdown visible instead of formatted content.

**Solutions**:

1. **Check File Extension**:
   - Should be `.md` or `.mdx`
   - Verify in correct directory

2. **Verify Frontmatter**:
   ```markdown
   ---
   title: "Title"
   ---
   ```
   - Must have valid YAML frontmatter

3. **Check Astro MDX Integration**:
   ```bash
   npm list @astrojs/mdx
   ```

---

## Browser Compatibility Issues

### Site Broken in Internet Explorer

**Solution**: Internet Explorer is no longer supported. Recommend users upgrade to:
- Microsoft Edge
- Google Chrome
- Mozilla Firefox

### Layout Issues in Safari

**Symptoms**: Elements misaligned or not displaying correctly in Safari.

**Solutions**:

1. **Check CSS Compatibility**:
   - Use autoprefixer
   - Test specific CSS properties in Safari

2. **Flexbox Issues**:
   - Add `-webkit-` prefixes if needed
   - Use fallback layouts

3. **Test in Safari DevTools**:
   - Enable Developer menu
   - Use Web Inspector

### Mobile Browser Issues

**Symptoms**: Site works on desktop but not mobile browsers.

**Solutions**:

1. **Check Viewport Meta Tag**:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

2. **Test Touch Interactions**:
   - Ensure buttons are large enough (44x44px minimum)
   - Test scroll behavior

3. **Use Mobile DevTools**:
   - Chrome DevTools → Toggle Device Toolbar
   - Test various devices and screen sizes

---

## Analytics & Monitoring

### Analytics Not Tracking

**Symptoms**: No data in TelemetryDeck dashboard.

**Solutions**:

1. **Verify App ID**:
   - Check `PUBLIC_TELEMETRYDECK_APP_ID` environment variable is set
   - Verify App ID format (UUID format)

2. **Check Browser Extensions**:
   - Some privacy extensions may block tracking
   - Test in incognito mode

3. **Review Script Loading**:
   - DevTools → Network
   - Verify requests to `nom.telemetrydeck.com` are successful

4. **Check Data Processing**:
   - TelemetryDeck data is usually available within minutes
   - Check dashboard at https://dashboard.telemetrydeck.com/

### Error Monitoring Not Working

**Symptoms**: Errors occur but not reported in TelemetryDeck.

**Solutions**:

1. **Verify Configuration**:
   - Check `PUBLIC_TELEMETRYDECK_APP_ID` is set correctly
   - Ensure TelemetryDeck SDK is properly initialized

2. **Test Error Logging**:
   ```javascript
   // Add test signal
   window.TelemetryDeck?.signal('test.error', { message: 'Test error' });
   ```

3. **Check CSP Headers**:
   - Verify `nom.telemetrydeck.com` is allowed in Content Security Policy
   - Check browser console for CSP violations

---

## Email Delivery Issues

### Contact Form Emails Not Arriving

**Symptoms**: Form submits successfully but no email received.

**Solutions**:

1. **Check Spam Folder**:
   - Emails may be filtered
   - Add sender to whitelist

2. **Verify Email Configuration**:
   - Check form action endpoint
   - Verify email server settings

3. **Test with Different Email**:
   - Try Gmail, Outlook, etc.
   - May indicate provider-specific issue

4. **Check Form Implementation**:
   - Verify form fields are correct
   - Test form submission manually

---

## Getting Additional Help

### Support Resources

- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Astro Discord**: https://astro.build/chat
- **Cal.com Support**: https://cal.com/support

### Reporting Bugs

If you discover a bug:

1. Check this troubleshooting guide first
2. Search existing GitHub issues
3. Open new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Emergency Contacts

- **Cloudflare Support**: Via dashboard (paid plans)
- **Domain Registrar**: [Contact info]
- **Developer**: [Contact info]

---

## Quick Command Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Troubleshooting
npm install          # Reinstall dependencies
rm -rf node_modules  # Clear node_modules
npm audit           # Check security issues
npm outdated        # Check for updates

# Git
git status          # Check working tree
git log --oneline   # View recent commits
git pull            # Pull latest changes
git push            # Push changes

# DNS
nslookup [domain]   # Check DNS resolution
dig [domain]        # Detailed DNS info
ping [domain]       # Test connectivity
```

---

*Keep this guide handy for quick reference. Most issues can be resolved in minutes with the right approach.*

---

*Last updated: January 2026*
