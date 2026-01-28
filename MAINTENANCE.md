# Maintenance Guide - Elternherz

This guide covers routine maintenance tasks, content updates, and troubleshooting for the Elternherz website.

## Table of Contents

- [Daily Maintenance](#daily-maintenance)
- [Weekly Maintenance](#weekly-maintenance)
- [Monthly Maintenance](#monthly-maintenance)
- [Content Updates](#content-updates)
- [Managing Bookings](#managing-bookings)
- [Updating Dependencies](#updating-dependencies)
- [Performance Optimization](#performance-optimization)
- [Security Updates](#security-updates)
- [Backup & Recovery](#backup--recovery)
- [Common Issues](#common-issues)

## Daily Maintenance

### Monitor Website Health

**Time Required**: 5-10 minutes

- [ ] Visit the website: `https://elternherz.de`
- [ ] Check for any visible errors or broken elements
- [ ] Verify booking widgets are loading
- [ ] Check for any error notifications (TelemetryDeck)
- [ ] Review Cloudflare Analytics for unusual traffic patterns

### Check Booking Submissions

- [ ] Log in to Cal.com dashboard
- [ ] Review new booking requests
- [ ] Respond to booking inquiries promptly
- [ ] Check calendar for upcoming appointments

### Monitor Email Delivery

- [ ] Check inbox for contact form submissions
- [ ] Verify booking confirmation emails are being sent
- [ ] Respond to client inquiries within 24 hours

## Weekly Maintenance

### Performance Check

**Time Required**: 15-20 minutes

- [ ] Run Lighthouse audit on key pages:
  - Homepage: `https://elternherz.de`
  - German booking page: `https://elternherz.de/kontakt`
  - Turkish booking page: `https://elternherz.de/tr/iletisim`
  - Target score: 90+ for Performance, Accessibility, SEO
- [ ] Check page load speed on slow connection (3G throttling)
- [ ] Verify no console errors in browser DevTools
- [ ] Test mobile responsiveness on different devices

### Content Review

- [ ] Review blog posts for accuracy and relevance
- [ ] Check for broken links (use tools like broken-link-checker)
- [ ] Verify contact information is up-to-date
- [ ] Ensure service descriptions are current

### Analytics Review

- [ ] Review TelemetryDeck analytics dashboard
- [ ] Track key metrics:
  - Page views
  - Session duration
  - Booking conversion rate
  - Error rates
- [ ] Identify popular content
- [ ] Note any traffic anomalies

## Monthly Maintenance

### Security & Updates

**Time Required**: 30-60 minutes

- [ ] Check for npm package updates:
  ```bash
  npm outdated
  ```
- [ ] Update dependencies (see [Updating Dependencies](#updating-dependencies))
- [ ] Review Cloudflare security dashboard
- [ ] Check SSL certificate expiration date (should auto-renew)
- [ ] Review and update privacy policy if needed
- [ ] Audit user data collection practices

### SEO Maintenance

- [ ] Review Google Search Console data
  - Check for crawl errors
  - Review search performance
  - Verify sitemap is being processed
  - Check mobile usability issues
- [ ] Review Bing Webmaster Tools
- [ ] Update meta descriptions for underperforming pages
- [ ] Add new blog content (1-2 posts per month recommended)

### Backup & Documentation

- [ ] Verify automatic GitHub backups are working
- [ ] Document any configuration changes made
- [ ] Update README or documentation if needed
- [ ] Export Cal.com booking data (for records)

### Performance Optimization

- [ ] Review and optimize images
- [ ] Check for unused CSS/JavaScript
- [ ] Verify CDN cache is working effectively
- [ ] Review Cloudflare Analytics for optimization opportunities

## Content Updates

### Adding a Blog Post

1. Create a new markdown file in `src/data/blog-posts/`:
   ```bash
   touch src/data/blog-posts/your-post-slug.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: "Your Blog Post Title"
   description: "A brief description of your post"
   publishDate: "2026-01-28"
   tags: ["parenting", "advice", "child-development"]
   draft: false
   language: "de"  # or "tr" for Turkish
   ---

   Your blog content here...
   ```

3. Test locally:
   ```bash
   npm run dev
   ```

4. Preview at: `http://localhost:4321/blog/your-post-slug`

5. Commit and push:
   ```bash
   git add src/data/blog-posts/your-post-slug.md
   git commit -m "Add blog post: Your Blog Post Title"
   git push origin main
   ```

### Updating Service Descriptions

1. Open the relevant page:
   - German: `src/pages/about.astro` or `src/pages/kontakt.astro`
   - Turkish: `src/pages/tr/[page].astro`

2. Edit the content directly in the Astro component

3. Test changes locally:
   ```bash
   npm run dev
   ```

4. Commit and push changes:
   ```bash
   git add src/pages/...
   git commit -m "Update service descriptions"
   git push origin main
   ```

### Updating Contact Information

1. Update in multiple locations:
   - Footer: `src/components/Footer.astro`
   - Contact page: `src/pages/kontakt.astro` and `src/pages/tr/iletisim.astro`
   - Impressum: `src/pages/impressum.astro` and `src/pages/tr/yasal-bildirim.astro`

2. Test all pages to verify updates

3. Commit and push changes

### Adding a New Page

1. Create new Astro file:
   - German: `src/pages/new-page.astro`
   - Turkish: `src/pages/tr/new-page.astro`

2. Use existing pages as templates:
   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   
   const title = 'Page Title';
   const description = 'Page description';
   const permalink = `${Astro.site.href}new-page`;
   ---
   
   <BaseLayout title={title} description={description} permalink={permalink}>
     <!-- Your content here -->
   </BaseLayout>
   ```

3. Update navigation if needed (Header component)

4. Test and deploy

## Managing Bookings

### Cal.com Dashboard

Access: https://cal.eu

**Daily Tasks:**
- Review new booking requests
- Confirm or reschedule appointments
- Update availability calendar
- Respond to booking inquiries

### Booking Types

Ensure these event types exist in Cal.com:

1. **Free Initial Consultation** (`erstgespraech`)
   - Duration: 30 minutes
   - Price: Free
   - Buffer time: 15 minutes

2. **Individual Session** (`einzelberatung`)
   - Duration: 60 minutes
   - Price: 75€
   - Buffer time: 15 minutes

3. **Couples/Family Session** (`paarberatung`)
   - Duration: 90 minutes
   - Price: 110€
   - Buffer time: 15 minutes

### Modifying Booking Types

1. Log in to Cal.com dashboard
2. Navigate to **Event Types**
3. Edit the relevant event type
4. Update duration, pricing, or availability
5. Save changes (affects new bookings immediately)

### Handling Booking Issues

**Client can't book:**
- Verify Cal.com event types are published
- Check availability calendar has free slots
- Confirm Cal.com widget is loading on website
- Test booking flow yourself

**Confirmation emails not arriving:**
- Check Cal.com email settings
- Verify email addresses are correct
- Check spam/junk folders
- Review Cal.com notification settings

## Updating Dependencies

### Check for Updates

```bash
# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit
```

### Update Process

**Minor Updates (recommended monthly):**

```bash
# Update all dependencies to latest compatible versions
npm update

# Test the build
npm run build

# Test locally
npm run dev

# If everything works, commit
git add package.json package-lock.json
git commit -m "Update npm dependencies"
git push origin main
```

**Major Updates (proceed with caution):**

```bash
# Update specific package
npm install astro@latest

# Or update multiple packages
npm install @astrojs/mdx@latest @astrojs/sitemap@latest

# Test thoroughly
npm run build
npm run dev

# Check for breaking changes in package changelogs
# Test all functionality before deploying
```

### Security Updates

If `npm audit` shows vulnerabilities:

```bash
# Try automatic fix
npm audit fix

# If that doesn't work, update specific packages
npm update [package-name]

# For breaking changes, may need manual intervention
npm audit fix --force  # Use with caution!
```

## Performance Optimization

### Image Optimization

**Before adding images:**

1. Use WebP format for better compression
2. Resize images to appropriate dimensions
3. Compress images (use tools like TinyPNG)
4. Add alt text for accessibility

**Optimizing existing images:**

```bash
# Install image optimization tools
npm install -g sharp-cli

# Optimize images
sharp input.jpg -o output.webp --webp
```

### Code Optimization

**Check bundle size:**

```bash
# Build and check output
npm run build

# Review bundle sizes in dist/ directory
ls -lh dist/_astro/
```

**Reduce bundle size:**
- Remove unused dependencies
- Lazy load components when possible
- Split large JavaScript files
- Minimize third-party scripts

### CDN & Caching

Cloudflare automatically:
- Caches static assets
- Compresses files (gzip/brotli)
- Serves content from nearest edge location

**Verify caching:**
1. Open DevTools → Network tab
2. Check response headers for `cf-cache-status`
3. Should see `HIT` for cached resources

## Security Updates

### Regular Security Checks

**Monthly:**
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Review Cloudflare security dashboard
- [ ] Check for Astro security advisories
- [ ] Verify SSL certificate is valid
- [ ] Review access logs for suspicious activity

**After Updates:**
- [ ] Test booking flow for security issues
- [ ] Verify form submission security
- [ ] Check for XSS vulnerabilities
- [ ] Test CSRF protection (if applicable)

### Security Best Practices

- Never commit sensitive data (API keys, passwords)
- Keep all dependencies up-to-date
- Use environment variables for secrets
- Enable Cloudflare security features:
  - WAF (Web Application Firewall)
  - DDoS protection
  - Rate limiting
- Regular backups of content and configuration

## Backup & Recovery

### Automatic Backups

**Git Repository:**
- All code and content is version-controlled
- Pushed to GitHub automatically on deployment
- Complete history of changes available

**Cal.com Data:**
- Booking data stored in Cal.com
- Export regularly for local backup

### Manual Backup

**Export content:**

```bash
# Clone repository
git clone https://github.com/ahmetsina/elternherz.git

# Create backup archive
tar -czf elternherz-backup-$(date +%Y%m%d).tar.gz elternherz/

# Store securely (external drive, cloud storage)
```

**Export Cal.com bookings:**
1. Log in to Cal.com
2. Navigate to Bookings
3. Export to CSV/Excel
4. Store securely

### Recovery Procedure

**If website goes down:**

1. Check Cloudflare status page
2. Verify DNS settings
3. Check deployment status in Cloudflare Dashboard
4. Rollback to previous deployment if needed (see [DEPLOYMENT.md](DEPLOYMENT.md))

**If content is lost:**

1. Restore from Git history:
   ```bash
   git log --all -- path/to/file
   git checkout [commit-hash] -- path/to/file
   ```

2. Re-deploy:
   ```bash
   git push origin main
   ```

## Common Issues

### Issue: Build Fails on Cloudflare

**Symptoms**: Deployment fails, build logs show errors

**Solutions:**
1. Test build locally: `npm run build`
2. Check for missing dependencies
3. Verify Node.js version compatibility
4. Review build logs for specific errors
5. Check environment variables are set

### Issue: Booking Widget Not Loading

**Symptoms**: Cal.com iframe shows error or blank

**Solutions:**
1. Verify Cal.com account is active
2. Check event types are published
3. Verify `PUBLIC_CALCOM_USERNAME` environment variable
4. Check browser console for JavaScript errors
5. Test Cal.com link directly: `https://cal.eu/elternherz/erstgespraech`

### Issue: Slow Page Load

**Symptoms**: Pages take >3 seconds to load

**Solutions:**
1. Run Lighthouse audit to identify bottleneck
2. Optimize images (compress, resize, convert to WebP)
3. Check Cloudflare caching is working
4. Review third-party scripts (analytics, widgets)
5. Enable Cloudflare Auto Minify (HTML, CSS, JS)

### Issue: 404 Errors

**Symptoms**: Pages return 404 Not Found

**Solutions:**
1. Verify file exists in `src/pages/`
2. Check file name and path
3. Rebuild and redeploy
4. Clear Cloudflare cache
5. Check `wrangler.jsonc` configuration

### Issue: Language Switcher Not Working

**Symptoms**: Can't switch between German and Turkish

**Solutions:**
1. Verify both language versions of pages exist
2. Check URL structure (`/tr/` prefix for Turkish)
3. Test language switcher component
4. Verify routing configuration in `astro.config.mjs`

## Getting Help

### Internal Resources

- [Deployment Guide](DEPLOYMENT.md)
- [Pre-Launch Checklist](PRE_LAUNCH_CHECKLIST.md)
- [README](README.md)

### External Resources

- **Astro Docs**: https://docs.astro.build/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Cal.com Support**: https://cal.com/support
- **Astro Discord**: https://astro.build/chat

### Contact Support

- **Cloudflare Support**: Via dashboard (paid plans only)
- **Cal.com Support**: support@cal.com
- **GitHub Issues**: Report bugs in repository

---

## Maintenance Schedule Summary

| Task | Frequency | Time Required |
|------|-----------|---------------|
| Check website health | Daily | 5-10 min |
| Review bookings | Daily | 5-10 min |
| Performance audit | Weekly | 15-20 min |
| Content review | Weekly | 15-20 min |
| Security updates | Monthly | 30-60 min |
| SEO maintenance | Monthly | 30-45 min |
| Dependency updates | Monthly | 30-60 min |

**Total monthly time**: ~4-6 hours

---

*Last updated: January 2026*
