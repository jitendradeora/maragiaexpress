# Maragia Express redesign

Premium editorial travel website concept for Maragia Express, built with React 19, Vite 8, TypeScript, and Tailwind CSS v4.

## Local setup

```bash
pnpm install
pnpm dev
```

Production bundle:

```bash
pnpm build
```

## Project structure

- `src/App.tsx` — responsive homepage and interactions
- `src/index.css` — design tokens, responsive layout, and visual system
- `src/lib/site-config.ts` — centralized verified business details
- `src/lib/schema.ts` — Organization, TravelAgency, and WebSite JSON-LD builders
- `SITE_AUDIT.md` — public-site audit, established URLs, and launch requirements
- `.env.example` — placeholder server-integration configuration

## Enquiry delivery

The current enquiry form validates required browser fields and prepares a message in the visitor's email application. It does not claim server delivery and does not store form data.

Before production launch, connect the form to a server-side email or CRM integration with:

- Server-side validation
- Spam prevention and rate limiting
- Environment-only credentials
- Explicit success and failure responses
- Appropriate privacy disclosure

## SEO and structured-data checklist

- [x] Unique homepage title and description
- [x] Open Graph title, description, and image
- [x] One clear homepage H1 and logical heading order
- [x] Centralized Organization, TravelAgency, and WebSite JSON-LD
- [x] Verified contact and social details only
- [x] Descriptive image alternative text
- [x] Existing public URLs documented for redirect planning
- [ ] Build production route templates in the final hosting framework
- [ ] Add route-specific canonicals and social metadata
- [ ] Generate a canonical sitemap and production robots.txt
- [ ] Add BreadcrumbList to detail routes
- [ ] Validate final markup in Schema.org Validator and Rich Results Test
- [ ] Complete a one-to-one redirect map from the WordPress sitemap

Enable indexing only after content, redirects, forms, policies, and canonical production hosting have been reviewed.

## Performance and accessibility checklist

- [x] Static hero rather than autoplay video
- [x] Responsive layout from mobile through desktop
- [x] Reduced-motion support
- [x] Visible keyboard focus styles
- [x] Accessible mobile navigation and FAQ controls
- [x] Image aspect sizing throughout the layout
- [ ] Move approved imagery to locally hosted optimized AVIF/WebP files
- [ ] Self-host approved production fonts
- [ ] Measure representative production routes with Lighthouse and real-user monitoring
- [ ] Run screen-reader and keyboard testing against the final deployed routes

## Content governance

Prices, departures, testimonials, awards, detailed policies, and unsupported credentials are intentionally omitted. See `SITE_AUDIT.md` for verified source content and owner-confirmation items.
