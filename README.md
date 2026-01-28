# Elternherz - Parent Consultation Website

This project is being transformed from an Astro blog template into a professional Elternbegleiterin (parent consultation) website with German and Turkish localization.

## 📋 Project Management

### Implementation Plan & Issues

This repository includes:
- **[Implementation Plan](ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md)** - Comprehensive 5-phase plan for the website transformation
- **[GitHub Issues Templates](GITHUB_ISSUES_TEMPLATE.md)** - Ready-to-use issue templates for tracking progress
- **[Creating Issues Guide](CREATING_ISSUES.md)** - How to automatically create GitHub issues from the plan

### Quick Start - Create Project Issues

To automatically create all project tracking issues on GitHub:

**Option 1: GitHub Actions (Recommended - After PR merge)**
1. Go to the Actions tab in GitHub
2. Select "Create GitHub Issues from Implementation Plan"
3. Click "Run workflow"

**Option 2: Local Script**
```bash
# First, validate setup
npm run validate-setup

# Test the script (no GitHub token needed)
npm run create-issues:dry-run

# Then create the actual issues (requires GitHub token)
GITHUB_TOKEN=your_token_here npm run create-issues
```

See [CREATING_ISSUES.md](CREATING_ISSUES.md) for detailed instructions, or [README_NEXT_STEPS.md](README_NEXT_STEPS.md) for a complete guide.

---

## 👩‍🚀 Getting Started

### Locally

```
npm init astro -- --template Charca/astro-blog-template
```

### On StackBlitz

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/charca/astro-blog-template)

## ✨ Features:

- ✅ Astro 4.0
- ✅ Dark Mode
- ✅ Full Markdown support
- ✅ SEO-friendly setup with canonical URLs and OpenGraph data
- ✅ RSS 2.0 generation
- ✅ Sitemap.xml generation

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Tour.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                      | Action                                         |
| :--------------------------- | :--------------------------------------------- |
| `npm install`                | Installs dependencies                          |
| `npm run dev`                | Starts local dev server at `localhost:3030`    |
| `npm run build`              | Build your production site to `./dist/`        |
| `npm run preview`            | Preview your build locally, before deploying   |
| `npm run validate-setup`     | Validate issue creation setup is complete      |
| `npm run create-issues:dry-run` | Test issue creation script (no GitHub token) |
| `npm run create-issues`      | Create GitHub issues from templates            |

## 📦 Deploying to Cloudflare Pages

This is a static Astro site configured for deployment to Cloudflare Pages.

### Quick Deployment

In your Cloudflare Pages dashboard, use these settings:

| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node version** | `18` or higher |

### Environment Variables

Set these in Cloudflare Pages → Settings → Environment Variables:

```bash
# Required
PUBLIC_CALCOM_USERNAME=elternherz
PUBLIC_CALCOM_URL=https://cal.eu

# Analytics (choose one)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
# or
PUBLIC_PLAUSIBLE_DOMAIN=elternherz.de

# Error Monitoring (optional but recommended)
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Site Configuration
PUBLIC_SITE_URL=https://elternherz.de
```

### Complete Deployment Guide

📘 **See [DEPLOYMENT.md](DEPLOYMENT.md)** for comprehensive deployment instructions including:
- Domain configuration
- SSL certificate setup
- Post-deployment verification
- Rollback procedures

### Pre-Launch Checklist

📋 **See [PRE_LAUNCH_CHECKLIST.md](PRE_LAUNCH_CHECKLIST.md)** for a complete checklist to ensure your site is ready for launch.

### Maintenance

🔧 **See [MAINTENANCE.md](MAINTENANCE.md)** for ongoing maintenance tasks and content updates.

### Troubleshooting

🐛 **See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for solutions to common issues.

## 📅 Cal.com Booking System

### Configuration

This website integrates Cal.com (EU server) for appointment scheduling. To set up:

1. **Create a Cal.com account** at https://cal.eu
2. **Create event types** in your Cal.com dashboard:
   - `erstgespraech` - 30 minutes, Free (Initial Consultation)
   - `einzelberatung` - 60 minutes, 75€ (Individual Counseling)
   - `paarberatung` - 90 minutes, 110€ (Couples Counseling)

3. **Configure environment variables** (optional):
   ```bash
   PUBLIC_CALCOM_USERNAME=elternherz
   PUBLIC_CALCOM_URL=https://cal.eu
   ```

### Booking Pages

The booking system is available in two languages:
- **German**: `/kontakt` - Full booking page with all appointment types
- **Turkish**: `/tr/iletisim` - Turkish translation of booking page

### Adding New Appointment Types

To add a new appointment type:

1. Create the event in your Cal.com dashboard
2. Add a new appointment card in `src/pages/kontakt.astro`:
   ```astro
   <div class="appointment-card">
     <div class="card-header">
       <h3>Your Appointment Type</h3>
       <div class="card-meta">
         <span class="duration">Duration</span>
         <span class="price">Price</span>
       </div>
     </div>
     <div class="card-body">
       <p>Description...</p>
     </div>
     <CalComWidget calLink="elternherz/your-event-type" locale="de" />
   </div>
   ```
3. Add the same to `src/pages/tr/iletisim.astro` with Turkish translations

### Customizing the Widget

The CalComWidget component (`src/components/CalComWidget.astro`) accepts:
- `calLink` (required): Your Cal.com event link (e.g., "elternherz/erstgespraech")
- `locale` (optional): "de" or "tr" for language-specific loading messages

To customize appearance, edit the CSS in `CalComWidget.astro` or adjust the `config` object in the component.

### Testing Bookings

1. Start the development server: `npm run dev`
2. Navigate to http://localhost:4321/kontakt
3. Test the booking flow (Cal.com provides a test mode)
4. Verify email confirmations are sent correctly

**Note**: The Cal.com embed script will show loading placeholders in development. The actual booking calendar will only appear when the Cal.com script successfully loads.

## 📄 Legal Pages & Compliance

The website includes legally required pages for German/Turkish websites:

### German Pages
- **Datenschutzerklärung** (Privacy Policy): `/datenschutz`
- **Impressum** (Legal Notice): `/impressum`

### Turkish Pages
- **Gizlilik Politikası** (Privacy Policy): `/tr/gizlilik-politikasi`
- **Yasal Bildirim** (Legal Notice): `/tr/yasal-bildirim`

⚠️ **Important**: Before going live, replace all placeholder text `[in square brackets]` with actual information. We recommend having these pages reviewed by a legal professional to ensure compliance with GDPR and German law (TMG).

## 🗺️ SEO & Sitemap

The website is configured with:
- ✅ **Automatic sitemap generation** via `@astrojs/sitemap`
- ✅ **Sitemap accessible at**: `/sitemap-index.xml`
- ✅ **Robots.txt** configured in `public/robots.txt`
- ✅ **Multi-language support** with proper hreflang tags

Site URL is configured as `https://elternherz.de` in `astro.config.mjs`. Update this before deployment if using a different domain.

## 🚀 Production Readiness

This website is production-ready with:
- Legal compliance pages (Privacy Policy, Impressum)
- Sitemap configuration for search engines
- Multi-language support (German/Turkish)
- Cal.com booking integration
- SSL/HTTPS ready
- Optimized build configuration
- Mobile-responsive design

## 👀 Want to learn more?

Feel free to check [Astro's documentation](https://github.com/withastro/astro) or jump into Astro's [Discord server](https://astro.build/chat).

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[MAINTENANCE.md](MAINTENANCE.md)** - Maintenance and content update guide
- **[PRE_LAUNCH_CHECKLIST.md](PRE_LAUNCH_CHECKLIST.md)** - Pre-launch verification checklist
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md](ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md)** - Full implementation plan
