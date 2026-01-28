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

Environment variables can be managed in:
- **Cloudflare Pages** (for runtime/build)
- **GitHub Environments** (for CI/CD automation - recommended)

**Cloudflare Pages** → Settings → Environment Variables:

```bash
# Required
PUBLIC_CALCOM_USERNAME=elternherz
PUBLIC_CALCOM_URL=https://cal.eu

# Analytics and Error Monitoring
PUBLIC_TELEMETRYDECK_APP_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# Site Configuration
PUBLIC_SITE_URL=https://elternherz.de
```

📘 **See [GITHUB_ENVIRONMENTS.md](GITHUB_ENVIRONMENTS.md)** for setting up GitHub repository environments for automated deployments.

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

### Overview

This website uses Cal.com (EU server: https://cal.eu) for appointment scheduling. The main booking page is available at: https://www.cal.eu/elternherz

The integration provides:
- Multiple appointment types with different durations and pricing
- Support for both German and Turkish languages
- Inline booking widgets on contact pages
- Booking CTAs throughout the site
- Alternative contact form as fallback

### Configuration

#### 1. Create a Cal.com Account

1. Go to https://cal.eu (EU server)
2. Sign up with your business email
3. Complete your profile setup
4. Set your availability schedule
5. Configure timezone preferences (Europe/Berlin recommended)
6. Set up notification preferences

#### 2. Create Event Types

Create the following event types in your Cal.com dashboard:

**Event Type 1: Kostenlose Erstberatung / Ücretsiz İlk Danışma**
- **Slug**: `erstgesprach`
- **URL**: https://www.cal.eu/elternherz/erstgesprach
- **Duration**: 30 minutes
- **Price**: Free
- **Description (DE)**: Lernen Sie mich und meine Arbeitsweise kennen. In diesem unverbindlichen Gespräch können wir Ihr Anliegen besprechen und gemeinsam herausfinden, wie ich Sie am besten unterstützen kann.
- **Description (TR)**: Beni ve çalışma şeklimi tanıyın. Bu bağlayıcı olmayan görüşmede konunuzu tartışabilir ve size en iyi şekilde nasıl destek olabileceğimi birlikte keşfedebiliriz.

**Event Type 2: Einzelberatung / Bireysel Danışma**
- **Slug**: `einzelberatung`
- **URL**: https://www.cal.eu/elternherz/einzelberatung
- **Duration**: 60 minutes
- **Price**: 75€
- **Description (DE)**: Intensive Einzelberatung für Eltern, die sich eine tiefgehende Auseinandersetzung mit ihrem Thema wünschen.
- **Description (TR)**: Konularıyla derinlemesine ilgilenmek isteyen ebeveynler için yoğun bireysel danışmanlık.

**Event Type 3: Paarberatung / Çift Danışması**
- **Slug**: `paarberatung`
- **URL**: https://www.cal.eu/elternherz/paarberatung
- **Duration**: 90 minutes
- **Price**: 110€
- **Description (DE)**: Beratung für beide Elternteile gemeinsam. Besonders geeignet, wenn Sie als Paar unterschiedliche Vorstellungen in Erziehungsfragen haben.
- **Description (TR)**: Her iki ebeveyn için birlikte danışmanlık. Özellikle ebeveynlik konularında farklı fikirlere sahipseniz uygundur.

**Event Type 4: Folgetermin / Takip Randevusu**
- **Slug**: `folgetermin`
- **URL**: https://www.cal.eu/elternherz/folgetermin
- **Duration**: 45 minutes
- **Price**: 60€
- **Description (DE)**: Aufbauende Beratung für bestehende Klienten. Nachbesprechung, Reflexion und Anpassung der Strategien.
- **Description (TR)**: Mevcut müşteriler için devam danışmanlığı. Değerlendirme, yansıtma ve stratejilerin uyarlanması.

#### 3. Configure Environment Variables

Create a `.env` file in the project root (or configure in your deployment platform):

```bash
PUBLIC_CALCOM_USERNAME=elternherz
PUBLIC_CALCOM_URL=https://cal.eu
```

**Note**: These are optional. The components have sensible defaults, but you can override them via environment variables.

### Components

#### CalComWidget Component

Legacy component, still functional. Located at `src/components/CalComWidget.astro`.

**Usage:**
```astro
<CalComWidget calLink="elternherz/erstgesprach" locale="de" />
```

#### BookingWidget Component

New, flexible component as per project specifications. Located at `src/components/BookingWidget.astro`.

**Props:**
- `eventType` (optional): Event slug (default: 'erstgesprach')
- `lang` (optional): Language 'de' or 'tr' (default: 'de')

**Usage:**
```astro
<BookingWidget eventType="erstgesprach" lang="de" />
<BookingWidget eventType="einzelberatung" lang="tr" />
```

#### BookingCTA Component

Enhanced call-to-action button with event type support and tracking. Located at `src/components/BookingCTA.astro`.

**Props:**
- `text` (optional): Button text (auto-generated based on eventType and lang if not provided)
- `href` (optional): Link destination (default: '/kontakt')
- `variant` (optional): 'primary' or 'secondary' (default: 'primary')
- `size` (optional): 'small', 'medium', or 'large' (default: 'medium')
- `eventType` (optional): 'erstgesprach', 'einzelberatung', 'paarberatung', or 'folgetermin'
- `lang` (optional): 'de' or 'tr' (default: 'de')
- `trackingLabel` (optional): Label for analytics tracking

**Usage:**
```astro
<!-- Auto-generated text based on event type and language -->
<BookingCTA eventType="erstgesprach" lang="de" variant="primary" size="large" />

<!-- Custom text -->
<BookingCTA text="Jetzt buchen" href="/kontakt" variant="secondary" />

<!-- With tracking -->
<BookingCTA 
  eventType="einzelberatung" 
  lang="de" 
  trackingLabel="homepage-hero-cta" 
/>
```

#### ContactForm Component

Alternative contact form as fallback. Located at `src/components/ContactForm.astro`.

**Props:**
- `lang` (optional): 'de' or 'tr' (default: 'de')

**Usage:**
```astro
<ContactForm lang="de" />
<ContactForm lang="tr" />
```

### Booking Pages

The booking system is integrated on:
- **German Contact Page**: `/kontakt` - All 4 appointment types with inline widgets
- **Turkish Contact Page**: `/tr/iletisim` - Turkish translations of all appointment types
- **Homepage**: Booking CTAs in hero section
- **About Page**: Booking CTAs at bottom

### Testing Bookings

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Navigate to Booking Page**: http://localhost:4321/kontakt

3. **Test Booking Flow**:
   - Select an appointment type
   - Choose a date and time
   - Fill in contact details
   - Verify email confirmation

4. **Test Turkish Version**: http://localhost:4321/tr/iletisim

5. **Test Responsive Design**: Resize browser or use device emulation

6. **Test Alternative Contact Form**: Scroll to "Alternative Kontaktmöglichkeiten" section

### Customizing Appearance

#### Widget Appearance

Edit `src/components/BookingWidget.astro` or `src/components/CalComWidget.astro`:

```javascript
data-cal-config={JSON.stringify({ 
  theme: 'light',  // or 'dark'
  layout: 'month_view'  // or 'week_view', 'day_view'
})}
```

#### CTA Button Colors

Edit `src/components/BookingCTA.astro` styles:

```css
.booking-cta-primary {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
}

.booking-cta-secondary {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
}
```

### Troubleshooting

#### Widget Not Loading

1. Check browser console for errors
2. Verify Cal.com is accessible: https://cal.eu
3. Check event type slugs match your Cal.com configuration
4. Ensure JavaScript is enabled

#### Incorrect Language Display

- Language is determined by the `locale` prop on `CalComWidget` or `lang` prop on `BookingWidget`
- For German page: `locale="de"` or `lang="de"`
- For Turkish page: `locale="tr"` or `lang="tr"`

#### Missing Appointment Types

1. Log into Cal.com dashboard
2. Navigate to Event Types
3. Create missing event types with correct slugs
4. Ensure events are set to "Active"

### Advanced Features

#### API Integration (Optional)

For advanced integrations, you can use the Cal.com API:

1. Generate an API key in Cal.com dashboard
2. Add to `.env`:
   ```bash
   CAL_COM_API_KEY=your_api_key_here
   ```
3. Use for programmatic booking management, availability checking, etc.

#### Calendar Integration

Cal.com integrates with:
- Google Calendar
- Outlook Calendar
- Apple Calendar
- CalDAV

Configure in Cal.com dashboard under "Integrations".

#### Payment Processing (Optional)

For paid appointments, Cal.com supports:
- Stripe
- PayPal
- And other payment processors

Configure in Cal.com dashboard under "Apps & Integrations".

### Privacy & GDPR Compliance

Cal.com is GDPR-compliant and hosted in the EU (cal.eu). Key features:
- Data stored in EU servers
- GDPR-compliant data processing
- Privacy policy included in booking flow
- User consent management
- Right to data deletion

### Support & Documentation

- **Cal.com Documentation**: https://cal.com/docs
- **Cal.com Embed Guide**: https://cal.com/docs/integrations/embed
- **Cal.com Support**: https://cal.com/support
- **Component Documentation**: See inline comments in component files

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
- **[GITHUB_ENVIRONMENTS.md](GITHUB_ENVIRONMENTS.md)** - GitHub repository environments setup
- **[MAINTENANCE.md](MAINTENANCE.md)** - Maintenance and content update guide
- **[PRE_LAUNCH_CHECKLIST.md](PRE_LAUNCH_CHECKLIST.md)** - Pre-launch verification checklist
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[SECURITY_HEADERS.md](SECURITY_HEADERS.md)** - Security configuration guide
- **[ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md](ELTERNBEGLEITERIN_IMPLEMENTATION_PLAN.md)** - Full implementation plan
