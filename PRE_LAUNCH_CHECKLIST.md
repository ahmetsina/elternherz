# Pre-Launch Checklist - Elternherz

Use this checklist to ensure all aspects of the website are tested and ready for launch.

## Critical Items (Must Complete Before Launch)

### Legal & Compliance ✓ COMPLETED

- [x] Privacy Policy page exists (German) - `/datenschutz`
- [x] Privacy Policy page exists (Turkish) - `/tr/gizlilik-politikasi`
- [x] Impressum page exists (German) - `/impressum`
- [x] Legal Notice page exists (Turkish) - `/tr/yasal-bildirim`
- [ ] All placeholder text replaced with actual information
- [ ] Legal pages reviewed by legal professional (recommended)
- [ ] Cookie consent banner implemented (if using analytics with cookies)
- [ ] GDPR compliance verified for form data
- [ ] Cal.com privacy policy link accessible

### Content Verification

#### German Content Review

- [ ] **Homepage** (`/`)
  - [ ] Headline is compelling and clear
  - [ ] Service descriptions are accurate
  - [ ] Call-to-action buttons work
  - [ ] Images are professional quality
  - [ ] No spelling or grammar errors
  - [ ] Contact information is correct

- [ ] **About/Services Page** (`/about` or `/leistungen`)
  - [ ] Service offerings clearly described
  - [ ] Credentials and qualifications listed
  - [ ] Professional bio is accurate
  - [ ] Pricing information (if applicable) is correct
  - [ ] No spelling or grammar errors

- [ ] **Contact/Booking Page** (`/kontakt`)
  - [ ] All appointment types listed
  - [ ] Descriptions are clear and accurate
  - [ ] Pricing is correct
  - [ ] Contact information is up-to-date
  - [ ] Cal.com widgets load properly
  - [ ] No spelling or grammar errors

- [ ] **Blog Posts** (`/blog`)
  - [ ] All posts reviewed for quality
  - [ ] Images have proper attribution
  - [ ] No broken links in posts
  - [ ] Tags are relevant and consistent
  - [ ] Publication dates are correct

- [ ] **Footer**
  - [ ] Contact information correct
  - [ ] Social media links work (if applicable)
  - [ ] Links to legal pages work
  - [ ] Copyright year is current

#### Turkish Content Review

- [ ] **Homepage** (`/tr/`)
  - [ ] Translation is accurate
  - [ ] Cultural appropriateness verified
  - [ ] Tone matches German version
  - [ ] Turkish characters display correctly (ğ, ı, ş, ç, ö, ü)
  - [ ] No spelling or grammar errors

- [ ] **Booking Page** (`/tr/iletisim`)
  - [ ] All content translated
  - [ ] Appointment descriptions match German
  - [ ] Pricing displays correctly
  - [ ] Cal.com widgets load with Turkish locale
  - [ ] No spelling or grammar errors

- [ ] **Legal Pages**
  - [ ] Privacy policy translated (`/tr/gizlilik-politikasi`)
  - [ ] Legal notice translated (`/tr/yasal-bildirim`)
  - [ ] All required legal information present

#### Multilingual Consistency

- [ ] Both language versions have same page structure
- [ ] All pages exist in both languages
- [ ] Language switcher works on all pages
- [ ] URLs properly structured (German root, `/tr/` prefix for Turkish)
- [ ] Hreflang tags correctly configured
- [ ] Default language redirects work properly

### Technical Configuration ✓ PARTIALLY COMPLETED

- [x] Sitemap configured (`@astrojs/sitemap` installed)
- [x] Robots.txt updated with sitemap reference
- [x] Site URL set correctly in `astro.config.mjs`
- [ ] All environment variables set in Cloudflare Pages:
  - [ ] `PUBLIC_CALCOM_USERNAME`
  - [ ] `PUBLIC_CALCOM_URL`
  - [ ] Analytics ID (Google Analytics or Plausible)
  - [ ] `SENTRY_DSN` (if using error monitoring)
- [ ] Build succeeds locally: `npm run build`
- [ ] Preview works locally: `npm run preview`
- [ ] No console errors in browser DevTools

### Cal.com Integration

- [ ] Cal.com account created at https://cal.eu
- [ ] Event types configured:
  - [ ] `erstgespraech` - 30 min, Free
  - [ ] `einzelberatung` - 60 min, 75€
  - [ ] `paarberatung` - 90 min, 110€
  - [ ] Additional event types (if applicable)
- [ ] Test booking (German) completes successfully
- [ ] Test booking (Turkish) completes successfully
- [ ] Confirmation emails arrive correctly
- [ ] Email notifications work in both languages
- [ ] Calendar integration tested (Google Calendar, etc.)
- [ ] Reschedule functionality works
- [ ] Cancellation functionality works
- [ ] Booking widget displays correctly on mobile
- [ ] Booking data captured accurately

### Cross-Browser Testing

Test on the following browsers and check for:
- Layout consistency
- Font rendering
- Button interactions
- Form submissions
- Language switcher
- Booking widget display
- Responsive behavior

#### Desktop Testing

- [ ] **Chrome** (latest version)
  - [ ] Windows 10/11
  - [ ] macOS
- [ ] **Firefox** (latest version)
  - [ ] Windows 10/11
  - [ ] macOS
- [ ] **Safari** (latest version)
  - [ ] macOS
- [ ] **Edge** (latest version)
  - [ ] Windows 10/11

#### Mobile Testing

- [ ] **Chrome Mobile**
  - [ ] Android phone
- [ ] **Safari Mobile**
  - [ ] iPhone (iOS 15+)
  - [ ] iPad
- [ ] **Samsung Internet**
  - [ ] Samsung Galaxy device

### Mobile Responsiveness

Test on various screen sizes:

- [ ] **Small screens** (320px - 480px)
  - [ ] iPhone SE, older iPhones
  - [ ] Navigation menu works (hamburger if applicable)
  - [ ] Text is readable without zooming
  - [ ] Buttons are tappable (min 44x44px)
  - [ ] No horizontal scrolling

- [ ] **Medium screens** (481px - 768px)
  - [ ] iPhone 12/13/14
  - [ ] Android phones
  - [ ] Images scale appropriately
  - [ ] Booking widget usable

- [ ] **Large screens** (769px - 1024px)
  - [ ] iPad portrait
  - [ ] Android tablets
  - [ ] Layout adapts properly

- [ ] **Extra large screens** (1025px+)
  - [ ] Desktop displays
  - [ ] iPad landscape
  - [ ] Content doesn't stretch too wide

- [ ] Forms are easy to fill on mobile
- [ ] Touch interactions work smoothly
- [ ] Fast loading on 3G/4G connection

### Accessibility Audit (WCAG 2.1 AA)

#### Automated Testing

- [ ] Run Lighthouse accessibility audit (score 90+)
- [ ] Run axe DevTools scan
- [ ] Fix all critical issues
- [ ] Address serious issues
- [ ] Review and address moderate issues

#### Manual Testing

- [ ] **Keyboard Navigation**
  - [ ] Tab through all interactive elements
  - [ ] Tab order is logical
  - [ ] Enter/Space activates buttons and links
  - [ ] Escape closes modals/dropdowns
  - [ ] No keyboard traps
  - [ ] Skip to main content link present

- [ ] **Screen Reader Testing** (NVDA, JAWS, or VoiceOver)
  - [ ] All images have descriptive alt text
  - [ ] Decorative images use empty alt (`alt=""`)
  - [ ] Headings properly structured (h1 → h2 → h3)
  - [ ] Form labels associated correctly
  - [ ] Error messages announced
  - [ ] Landmarks properly defined (nav, main, footer)
  - [ ] ARIA labels used where appropriate

- [ ] **Color Contrast**
  - [ ] Body text contrast ≥ 4.5:1
  - [ ] Large text contrast ≥ 3:1
  - [ ] UI component contrast ≥ 3:1
  - [ ] Test with WebAIM Contrast Checker

- [ ] **Focus Indicators**
  - [ ] All interactive elements have visible focus
  - [ ] Focus indicators have sufficient contrast
  - [ ] Focus order is logical

- [ ] **Forms**
  - [ ] All inputs have associated labels
  - [ ] Required fields clearly marked
  - [ ] Error messages are descriptive
  - [ ] Success messages announced

### Performance Testing

- [ ] **Lighthouse Audit** (target: 90+ on all metrics)
  - [ ] Performance score ≥ 90
  - [ ] Accessibility score ≥ 90
  - [ ] Best Practices score ≥ 90
  - [ ] SEO score ≥ 90

- [ ] **Page Load Speed**
  - [ ] Homepage loads in < 3 seconds
  - [ ] Booking page loads in < 3 seconds
  - [ ] Blog pages load in < 3 seconds
  - [ ] Test on slow 3G connection

- [ ] **Optimization**
  - [ ] Images are compressed and optimized
  - [ ] WebP format used where possible
  - [ ] Lazy loading implemented for images
  - [ ] CSS and JS are minified
  - [ ] No console errors or warnings

- [ ] **Internal Links**
  - [ ] No 404 errors on internal links
  - [ ] All navigation links work
  - [ ] Footer links work
  - [ ] Blog post links work

### SEO Verification

- [ ] **Meta Tags**
  - [ ] All pages have unique title tags
  - [ ] All pages have meta descriptions
  - [ ] Titles are 50-60 characters
  - [ ] Descriptions are 150-160 characters
  - [ ] Meta descriptions compelling and accurate

- [ ] **Structured Data**
  - [ ] Test with Google Rich Results Test
  - [ ] Organization schema (if implemented)
  - [ ] LocalBusiness schema (if implemented)
  - [ ] Breadcrumb schema (if implemented)

- [ ] **Sitemap & Robots**
  - [ ] Sitemap accessible: `/sitemap-index.xml`
  - [ ] Sitemap is valid XML
  - [ ] All important pages in sitemap
  - [ ] Robots.txt properly configured
  - [ ] No important pages blocked in robots.txt

- [ ] **Social Media Tags**
  - [ ] OpenGraph tags configured
  - [ ] Test with Facebook Debugger
  - [ ] Twitter Card tags configured
  - [ ] Test with Twitter Card Validator
  - [ ] Images display correctly in previews

- [ ] **Canonical URLs**
  - [ ] Canonical tags set correctly
  - [ ] No duplicate content issues
  - [ ] HTTPS URLs used throughout

### Security Testing

- [ ] **SSL Certificate**
  - [ ] Certificate is valid
  - [ ] HTTPS connection secure
  - [ ] HTTP redirects to HTTPS
  - [ ] Certificate not expired
  - [ ] Covers www and non-www

- [ ] **Security Headers**
  - [ ] No mixed content warnings
  - [ ] Content Security Policy configured
  - [ ] X-Frame-Options set
  - [ ] X-Content-Type-Options set

- [ ] **Form Security**
  - [ ] Form submissions are secure
  - [ ] No sensitive data in URLs
  - [ ] Cal.com connection is secure (HTTPS)

- [ ] **Data Privacy**
  - [ ] No API keys in client-side code
  - [ ] Environment variables properly secured
  - [ ] No sensitive data logged in console

### Analytics & Monitoring

- [ ] **Analytics Setup**
  - [ ] Google Analytics or Plausible installed
  - [ ] Tracking code present on all pages
  - [ ] Test that pageviews are recorded
  - [ ] Goals/conversions configured (booking clicks)
  - [ ] Analytics respect cookie consent (if required)

- [ ] **Error Monitoring**
  - [ ] Sentry configured (if using)
  - [ ] Test error is logged correctly
  - [ ] Alert notifications configured
  - [ ] Error tracking respects privacy

- [ ] **Conversion Tracking**
  - [ ] Booking button clicks tracked
  - [ ] Contact form submissions tracked
  - [ ] Cal.com booking events tracked

## Domain & Deployment

### Domain Configuration

- [ ] Domain registered (elternherz.de or similar)
- [ ] DNS records configured in Cloudflare:
  - [ ] A record or CNAME for root domain
  - [ ] CNAME for www subdomain (if using)
  - [ ] MX records for email (if custom email)
  - [ ] TXT records for verification
- [ ] DNS propagation complete (check with DNS lookup tool)
- [ ] Domain active in Cloudflare Pages
- [ ] Domain verification successful

### Email Setup (Optional)

- [ ] Professional email addresses set up:
  - [ ] info@elternherz.de
  - [ ] kontakt@elternherz.de
  - [ ] [consultant-name]@elternherz.de
- [ ] Email forwarding configured
- [ ] Test sending and receiving emails
- [ ] Contact forms updated with correct email

### Cloudflare Pages Deployment

- [ ] Project connected to GitHub repository
- [ ] Build settings configured:
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `dist`
  - [ ] Node version: 18 or higher
- [ ] Environment variables set (see Technical Configuration)
- [ ] Automatic deployments enabled for main branch
- [ ] Preview deployments enabled for pull requests
- [ ] Test deployment successful
- [ ] Production URL accessible
- [ ] Custom domain configured and working

## Pre-Launch Final Checks

### 48 Hours Before Launch

- [ ] Complete final content review
- [ ] Test all functionality one more time
- [ ] Verify backups are current
- [ ] Prepare rollback plan
- [ ] Notify team of launch schedule
- [ ] Schedule time to monitor post-launch

### 24 Hours Before Launch

- [ ] Run full test suite (content, technical, performance)
- [ ] Verify all environment variables
- [ ] Check SSL certificate status
- [ ] Test booking flow end-to-end
- [ ] Verify email notifications working
- [ ] Prepare launch announcement content

### Launch Day - Before Going Live

- [ ] Final visual check of all pages
- [ ] Verify no placeholder content remains
- [ ] Check all external links work
- [ ] Test from different locations/networks
- [ ] Verify analytics and monitoring active
- [ ] Have emergency contact list ready

### Launch Day - Go Live

- [ ] Update DNS to point to production (if not done)
- [ ] Verify site is live on custom domain
- [ ] Test all functionality on live domain
- [ ] Verify SSL works on custom domain
- [ ] Check booking flow on production
- [ ] Monitor for immediate issues

## Post-Launch Tasks

### Immediate (Within 1 Hour)

- [ ] Verify site is accessible
- [ ] Check for any errors in Sentry
- [ ] Monitor Cloudflare Analytics
- [ ] Test booking submission
- [ ] Verify email delivery

### First 24 Hours

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Search Console property
- [ ] Set up Bing Webmaster Tools account
- [ ] Monitor analytics for traffic
- [ ] Check for error reports
- [ ] Respond to any booking inquiries
- [ ] Monitor page load times

### First Week

- [ ] Announce launch on social media (if applicable):
  - [ ] Facebook
  - [ ] Instagram
  - [ ] LinkedIn
  - [ ] Twitter/X
- [ ] Notify existing clients/contacts
- [ ] Update business listings:
  - [ ] Google My Business
  - [ ] Yelp (if applicable)
  - [ ] Local directories
- [ ] Add website to email signature
- [ ] Update business cards (note for reprinting)
- [ ] Monitor traffic and engagement
- [ ] Collect initial user feedback
- [ ] Fix any minor issues discovered

## Rollback Plan

If critical issues are discovered:

1. **Immediate Rollback**: In Cloudflare Pages dashboard, rollback to previous deployment
2. **Communication**: Notify affected users if booking system is down
3. **Fix**: Address issues in development environment
4. **Test**: Thoroughly test fixes before redeploying
5. **Redeploy**: Push fixes and monitor closely

Keep these contacts handy:
- Cloudflare support (paid plans)
- Cal.com support
- Domain registrar support
- Development team contact

## Sign-Off

When all items are checked and verified:

- [ ] Content manager approval
- [ ] Technical lead approval
- [ ] Consultant/owner approval
- [ ] Legal compliance reviewed
- [ ] Ready for launch

**Launch Date**: _______________

**Signed**: _______________

---

## Resources

- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [Maintenance Guide](MAINTENANCE.md) - Ongoing maintenance procedures
- [README](README.md) - Development documentation

---

*Use this checklist methodically. Don't skip items. Quality over speed.*

**Remember**: It's better to delay launch by a day to fix issues than to launch with problems.

---

*Last updated: January 2026*
