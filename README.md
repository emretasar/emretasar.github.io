# Developer Portfolio

A calm, static personal portfolio and technical blog built with Astro, Tailwind CSS, and Markdown.

## Architecture

```text
src/
├── components/       # Small reusable view components
├── content/blog/     # One Markdown file per blog post
├── layouts/          # Shared document shell and SEO defaults
├── lib/              # Site configuration and blog helpers
├── pages/            # File-based routes and RSS endpoint
└── styles/           # Global Tailwind theme and prose styling
```

Astro renders pages to static HTML at build time. The `blog` content collection validates Markdown frontmatter and generates one static route per file under `src/content/blog`. There is no runtime database, CMS, or client framework.

## Why this stack

- **Astro** ships static HTML by default and keeps client JavaScript close to zero.
- **Tailwind CSS** provides a small, consistent styling vocabulary without maintaining a separate CSS component system.
- **Markdown content collections** keep writing in version control while supplying TypeScript-validated frontmatter.
- **Astro’s built-in code highlighting** renders fenced code blocks at build time.
- **Sitemap and RSS integrations** improve discoverability without adding server infrastructure.

## Local development

```bash
npm install
npm run dev
```

Run `npm run check` for Astro and TypeScript diagnostics, then `npm run build` before deploying.

## Writing a post

Create `src/content/blog/a-clear-slug.md`:

```md
---
title: "Your post title"
description: "A concise description for readers and search engines."
publishedAt: 2026-07-26
tags: ["c++", "embedded"]
draft: false
---

Write the post here.
```

The post will be published at `/blog/a-clear-slug/`. Set `draft: true` to keep it out of the site, RSS feed, and static routes.

## Configuration checklist

Before deployment, update these values:

1. `src/lib/site.ts` — name, email, and social links.
2. `astro.config.mjs` — replace `https://your-domain.com` with the production URL.
3. `src/pages/index.astro` — replace the example project cards with real projects.

## Deployment

The site builds with `npm run build` and outputs to `dist/`.

- **GitHub Pages:** configure the repository workflow to run `npm ci && npm run build` and publish `dist`.
- **Cloudflare Pages:** connect the repository, set build command to `npm run build`, and set output directory to `dist`.

## Development roadmap

1. Personalize site configuration and project cards.
2. Add initial Markdown posts and refine writing categories.
3. Add a custom domain and deploy through GitHub Pages or Cloudflare Pages.
4. Add privacy-friendly analytics only if they become useful.
5. Revisit content structure before adding larger features such as projects or talks archives.
