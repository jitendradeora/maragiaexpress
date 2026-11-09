# maragia-express

Next.js App Router + React + Tailwind CSS project for Maragià Express.

## Development Server

```bash
npm run dev
```

The app runs on port `8443` by default.

## Project Structure

- `app/layout.tsx` - Root layout, global metadata, and JSON-LD
- `app/page.tsx` - Homepage
- `app/(inner)/` - Inner pages with shared header and footer
- `app/globals.css` - Global CSS and Tailwind CSS v4 import
- `src/components/` - Shared UI and page components
- `src/lib/` - Site config and schema helpers
- `package.json` - Dependencies and Next.js scripts
- `next.config.ts` - Next.js config, image hosts, and legacy redirects

## Dependencies

- Runtime: Next.js 15, React 19, React DOM 19
- Styling: Tailwind CSS v4 with `@tailwindcss/postcss`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through `@tailwindcss/postcss`. `app/globals.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or theme customization in `app/globals.css`.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.
- Export route pages and shared components as default exports where the file is a route entry.
