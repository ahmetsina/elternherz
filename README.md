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

This is a static Astro site that can be deployed to Cloudflare Pages. 

The `wrangler.jsonc` configuration file specifies the static assets directory (`dist`) for deployment. 

In your Cloudflare Pages dashboard, use:
- **Build command**: `npm run build`
- **Build output directory**: `dist`

## 👀 Want to learn more?

Feel free to check [Astro's documentation](https://github.com/withastro/astro) or jump into Astro's [Discord server](https://astro.build/chat).
