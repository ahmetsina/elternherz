# GitHub Issues - Elternbegleiterin Website Transformation

This document contains ready-to-use GitHub issue templates for tracking the Elternbegleiterin website project.

---

## How to Use This Document

1. Copy each issue template below
2. Create a new issue in GitHub
3. Paste the template content
4. Assign appropriate labels and milestones
5. Link related issues as needed

---

## Issue #1: Content & Branding Updates for Elternbegleiterin

**Title:** Content & Branding Updates for Elternbegleiterin Services

**Labels:** `enhancement`, `content`, `design`, `Phase 1`

**Description:**

### Objective
Transform the current blog template into a professional Elternbegleiterin (parent consultation) website with updated content and branding.

### Tasks

#### Content
- [ ] Define and document service offerings
- [ ] Write homepage content (hero, benefits, CTA)
- [ ] Write services/about page content
- [ ] Create contact page content
- [ ] Prepare blog post topics for parent consultation
- [ ] Collect testimonials (if available)

#### Branding & Design
- [ ] Replace placeholder images with professional photos
- [ ] Create/upload logo to `public/assets/`
- [ ] Update favicon
- [ ] Define color scheme
- [ ] Update typography styles
- [ ] Update site metadata (title, description)

#### Page Updates
- [ ] Update `src/pages/index.astro` (Homepage)
- [ ] Rename/update `src/pages/about.astro` → `src/pages/leistungen.astro` (Services)
- [ ] Create `src/pages/kontakt.astro` (Contact)
- [ ] Update navigation menu
- [ ] Update footer with contact info

#### Assets Needed
- Professional photos/illustrations
- Logo (SVG preferred)
- Service descriptions in German
- Contact information

### Acceptance Criteria
- [ ] All pages display Elternbegleiterin-specific content
- [ ] Professional appearance with custom branding
- [ ] Images are optimized (WebP format)
- [ ] Mobile responsive design maintained
- [ ] Build completes without errors

### Related Issues
- Will be followed by #2 (i18n implementation)

### Notes
This issue focuses on German content only. Turkish translations will be added in Phase 2 (Issue #2).

---

## Issue #2: Implement German and Turkish Localization (i18n)

**Title:** Add German and Turkish Language Support

**Labels:** `enhancement`, `i18n`, `Phase 2`

**Description:**

### Objective
Implement full internationalization with German (primary) and Turkish (secondary) language support.

### Tasks

#### Setup
- [ ] Install and configure Astro i18n integration
- [ ] Update `astro.config.mjs` with i18n configuration
- [ ] Set German (de) as default locale
- [ ] Configure routing strategy (no prefix for German, `/tr/` for Turkish)

#### Content Structure
- [ ] Create `src/content/de/` directory for German content
- [ ] Create `src/content/tr/` directory for Turkish content
- [ ] Create `src/i18n/` directory for translations
- [ ] Set up translation JSON files (`de.json`, `tr.json`)

#### Translation Files
- [ ] Translate navigation items
- [ ] Translate UI elements (buttons, forms, etc.)
- [ ] Translate SEO metadata
- [ ] Translate error messages
- [ ] Translate form labels and validation

#### Components
- [ ] Create `LanguageSwitcher.astro` component
- [ ] Update `BaseLayout.astro` to handle locales
- [ ] Make navigation locale-aware
- [ ] Add `hreflang` tags for SEO

#### Content Translation
- [ ] Translate homepage content to Turkish
- [ ] Translate services page to Turkish
- [ ] Translate contact page to Turkish
- [ ] Set up Turkish blog posts structure

#### Localized Assets
- [ ] Organize images in `public/assets/de/` and `public/assets/tr/`
- [ ] Prepare language-specific images if needed

#### Testing
- [ ] Test language switcher functionality
- [ ] Verify all content displays correctly in both languages
- [ ] Check URL routing works properly
- [ ] Validate SEO tags for both languages
- [ ] Test language persistence across navigation

### Acceptance Criteria
- [ ] Users can switch between German and Turkish
- [ ] All UI text is properly translated
- [ ] URLs follow locale convention (/, /tr/)
- [ ] Language preference is maintained during navigation
- [ ] Search engines can index both language versions
- [ ] Build completes without errors

### Dependencies
- Requires Issue #1 (Content Updates) to be completed

### Resources
- [Astro i18n Documentation](https://docs.astro.build/en/guides/internationalization/)
- [astro-i18next](https://github.com/yassinedoghri/astro-i18next)

---

## Issue #3: Integrate Appointment Scheduling System

**Title:** Add Parent Consultation Appointment Booking

**Labels:** `enhancement`, `feature`, `Phase 3`

**Description:**

### Objective
Implement an appointment scheduling system for parent consultation bookings with support for both German and Turkish languages.

### Decision Required
Choose scheduling solution (add comment with decision):
- [ ] **Option A: Calendly** (Recommended - fastest, easiest)
- [ ] **Option B: Cal.com** (Open source alternative)
- [ ] **Option C: Custom solution** (More control, more work)

### Tasks (assuming Calendly - adjust if different)

#### Setup
- [ ] Create Calendly account for Elternbegleiterin
- [ ] Configure appointment types:
  - Initial consultation (30 min)
  - Standard session (60 min)
  - Follow-up session (45 min)
- [ ] Set availability schedule
- [ ] Configure timezone settings
- [ ] Set up booking notifications
- [ ] Configure confirmation emails (German/Turkish)

#### Integration
- [ ] Create `src/components/BookingWidget.astro` component
- [ ] Add Calendly embed to contact page
- [ ] Add booking CTAs to homepage
- [ ] Style widget to match site design
- [ ] Test widget responsiveness

#### Language Support
- [ ] Configure German language settings in Calendly
- [ ] Configure Turkish language settings in Calendly
- [ ] Ensure widget displays correct language based on site locale

#### Alternative: Contact Form (if scheduling widget not ready)
- [ ] Create `src/components/ContactForm.astro`
- [ ] Set up form handling (Netlify Forms/Formspree)
- [ ] Configure email notifications
- [ ] Add form validation
- [ ] Test form submission

#### Testing
- [ ] Test booking flow in German
- [ ] Test booking flow in Turkish
- [ ] Verify email confirmations work
- [ ] Test on mobile devices
- [ ] Test calendar integration
- [ ] Verify timezone handling

### Acceptance Criteria
- [ ] Users can book appointments through the website
- [ ] Booking system works in both German and Turkish
- [ ] Confirmation emails are sent in correct language
- [ ] Mobile-friendly booking interface
- [ ] Calendar events are created properly
- [ ] Build completes without errors

### Dependencies
- Can be developed in parallel with Issue #2
- Should be tested with both languages after Issue #2 is complete

### Resources
- [Calendly API Documentation](https://developer.calendly.com/)
- [Cal.com Documentation](https://cal.com/docs)

---

## Issue #4: SEO and Performance Optimization

**Title:** Optimize Website for Search Engines and Performance

**Labels:** `enhancement`, `performance`, `seo`, `Phase 4`

**Description:**

### Objective
Optimize the website for search engines, improve performance scores, and set up analytics.

### Tasks

#### SEO Optimization
- [ ] Add structured data (JSON-LD) for local business
- [ ] Implement OpenGraph tags for social media
- [ ] Create multilingual sitemap (`sitemap-de.xml`, `sitemap-tr.xml`)
- [ ] Update `robots.txt` configuration
- [ ] Add meta descriptions to all pages (both languages)
- [ ] Optimize page titles for SEO
- [ ] Add canonical URLs
- [ ] Implement proper heading hierarchy

#### Performance
- [ ] Enable Astro view transitions
- [ ] Optimize all images (WebP format, proper sizing)
- [ ] Implement lazy loading for images
- [ ] Add caching headers in `wrangler.jsonc`
- [ ] Minimize CSS and JavaScript bundles
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Test Core Web Vitals

#### Analytics & Monitoring
- [ ] Set up Google Analytics 4 or Plausible Analytics
- [ ] Configure conversion tracking for bookings
- [ ] Set up goal tracking (form submissions, booking clicks)
- [ ] Add error monitoring (optional: Sentry)
- [ ] Configure user privacy settings (GDPR compliance)

#### Accessibility
- [ ] Run accessibility audit (WCAG 2.1 AA)
- [ ] Fix any accessibility issues
- [ ] Test with screen readers
- [ ] Verify keyboard navigation works
- [ ] Check color contrast ratios

#### Testing
- [ ] Run Lighthouse on all pages
- [ ] Test on PageSpeed Insights
- [ ] Verify SEO in Google Search Console
- [ ] Test social media previews
- [ ] Check mobile usability

### Acceptance Criteria
- [ ] Lighthouse scores: Performance 90+, SEO 95+, Accessibility 95+
- [ ] All images optimized (< 200KB each)
- [ ] Structured data validates without errors
- [ ] Analytics tracking works correctly
- [ ] Site indexed by Google and Bing
- [ ] GDPR-compliant analytics setup
- [ ] Build completes without errors

### Dependencies
- Requires Issues #1, #2, and #3 to be completed for full testing

### Resources
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema.org Local Business](https://schema.org/LocalBusiness)
- [Google Search Console](https://search.google.com/search-console)

---

## Issue #5: Pre-Launch Testing and Production Deployment

**Title:** Final Testing and Production Launch

**Labels:** `deployment`, `testing`, `Phase 5`

**Description:**

### Objective
Complete final testing, prepare for launch, and deploy the Elternbegleiterin website to production.

### Pre-Launch Checklist

#### Content Review
- [ ] Proofread all German content
- [ ] Proofread all Turkish content
- [ ] Verify all links work
- [ ] Check all images load correctly
- [ ] Verify contact information is correct
- [ ] Test booking system end-to-end

#### Technical Testing
- [ ] Test all pages in both languages
- [ ] Cross-browser testing:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Device testing:
  - [ ] Desktop (1920x1080)
  - [ ] Tablet (iPad)
  - [ ] Mobile (iPhone, Android)
- [ ] Test language switcher on all pages
- [ ] Verify forms submit correctly
- [ ] Test 404 error page
- [ ] Check loading performance

#### SEO & Social
- [ ] Verify meta tags on all pages
- [ ] Test social media sharing (Facebook, Twitter, LinkedIn)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test structured data with Google Rich Results Test

#### Security & Privacy
- [ ] Verify SSL certificate is active
- [ ] Test HTTPS redirects
- [ ] Add privacy policy page (if needed)
- [ ] Add cookie consent banner (if using analytics)
- [ ] Check GDPR compliance

#### Deployment Setup
- [ ] Configure custom domain DNS
- [ ] Set up email forwarding (@elternbegleiterin.de)
- [ ] Configure Cloudflare Pages environment variables
- [ ] Set up production environment
- [ ] Create backup of current site (if applicable)

#### Launch
- [ ] Deploy to production (merge to main)
- [ ] Verify deployment successful
- [ ] Monitor Cloudflare Pages logs
- [ ] Test production site thoroughly
- [ ] Update DNS if needed
- [ ] Monitor for errors in first 24 hours

#### Post-Launch
- [ ] Announce launch on social media
- [ ] Send email to existing clients (if applicable)
- [ ] Monitor analytics for first week
- [ ] Collect user feedback
- [ ] Fix any urgent issues

### Acceptance Criteria
- [ ] Website is live and accessible at production domain
- [ ] All features work correctly in production
- [ ] No console errors on any page
- [ ] Mobile experience is smooth
- [ ] Booking system works end-to-end
- [ ] Both languages display correctly
- [ ] Analytics tracking works
- [ ] Search engines can crawl the site

### Dependencies
- Requires all previous issues (#1-4) to be completed

### Rollback Plan
If critical issues are found:
1. Document the issue
2. Revert to previous deployment if necessary
3. Fix in development environment
4. Re-test before re-deploying

---

## Project Management Suggestions

### GitHub Project Board Setup

Create columns:
1. **Backlog** - Issues not yet started
2. **In Progress** - Currently being worked on
3. **Review** - Awaiting code review
4. **Testing** - Being tested
5. **Done** - Completed and deployed

### Milestones

- **Milestone 1:** Content & Branding (End of Week 2)
- **Milestone 2:** Localization (End of Week 5)
- **Milestone 3:** Scheduling (End of Week 7)
- **Milestone 4:** Optimization (End of Week 8)
- **Milestone 5:** Launch (End of Week 9)

### Labels to Create

- `Phase 1`, `Phase 2`, `Phase 3`, `Phase 4`, `Phase 5`
- `content`, `design`, `i18n`, `feature`, `bug`, `enhancement`
- `seo`, `performance`, `deployment`, `testing`
- `priority: high`, `priority: medium`, `priority: low`
- `help wanted`, `good first issue`

---

## Next Steps After Creating Issues

1. ✅ **Merge this PR** - The Cloudflare deployment configuration is working
2. 📋 **Create all 5 issues** using the templates above
3. 📊 **Set up GitHub Project board** to track progress
4. 📝 **Review the implementation plan** (`ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md`)
5. 🚀 **Start with Issue #1** - Content and branding updates

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-27
