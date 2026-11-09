# Maragià Express

Premium editorial travel website for Maragià Express, built with Next.js, React 19, TypeScript, and Tailwind CSS v4.

## Local setup

```bash
npm install
npm run dev
```

The site runs at [http://localhost:8443](http://localhost:8443).

Production build:

```bash
npm run build
npm start
```

## Project structure

- `app/` — Next.js App Router pages and layouts
- `src/components/` — Homepage, inner pages, forms, and shared UI
- `src/lib/site-config.ts` — Centralized verified business details
- `src/lib/schema.ts` — Organization, TravelAgency, and WebSite JSON-LD builders
- `SITE_AUDIT.md` — Public-site audit, established URLs, and launch requirements

## Enquiry delivery

The enquiry forms validate required browser fields and prepare a message in the visitor's email application. They do not claim server delivery and do not store form data.

Before production launch, connect the form to a server-side email or CRM integration with:

- Server-side validation
- Spam prevention and rate limiting
- Environment-only credentials
- Explicit success and failure responses
- Appropriate privacy disclosure
