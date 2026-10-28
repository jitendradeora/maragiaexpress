# Maragià Express public-site audit

Audit date: 2026-10-20

## Confirmed public business details

- Brand: Maragià Express
- Primary URL: `https://maragiaexpress.com/`
- Telephone shown throughout the site: `+91 978400 2880`
- Emails shown on the contact page: `mail@maragiaexpress.com` and `info@maragiaexpress.com`
- India location shown publicly: Udaipur, Rajasthan, India
- Verified social profiles:
  - `https://www.facebook.com/maragiaexpress/`
  - `https://www.instagram.com/maragia_express`
  - `https://www.youtube.com/@maragiaexpress`

This redesign uses the owner-supplied primary email and intentionally limits location schema to city, region, and country. The full street addresses visible on the existing contact page require owner confirmation before reuse.

## Existing navigation and indexed content families

The audited site is a WordPress site with predominantly Italian content. Its primary navigation exposes:

- Tour dell’India: `/tour-dellindia/`
- Luxury travel in India: `/viaggi-di-lusso-in-india/`
- Indian festival tours: `/tour-dei-festival-indiani/`
- Adventure travel: `/avventure-nel-mondo-india/`
- Cultural tours: `/tour-culturali-dell-india/`
- Beyond India: `/oltre-lindia/`
  - Bhutan: `/viaggio-organizzato-in-bhutan/`
  - Nepal: `/viaggio-organizzato-in-nepal/`
  - Sri Lanka: `/viaggio-organizzato-in-sri-lanka/`
- Information: `/informazione/`
- Cancellation and refund: `/cancellazione-e-rimborso/`
- Journal: `/blog/`
- Contact: `/agenzia-turismo-india/`

The live Yoast sitemap index references post, page, category, and author sitemaps. Existing URLs should be preserved or redirected one-to-one during a production migration.

## Confirmed themes and offerings used in this build

- Personalized and organized journeys in India
- Cultural and heritage tours
- Luxury-oriented travel
- Indian festival travel, including Holi and Pushkar
- Rajasthan cycling
- Himalayan and Ladakh trekking/adventure
- Wildlife and safari experiences
- Selected travel in Bhutan, Nepal, and Sri Lanka

## Intentionally omitted pending confirmation

- Prices and departure dates
- Detailed day-by-day itineraries
- Testimonials and aggregate ratings
- Awards, memberships, hotel partners, and exclusivity claims
- Business hours and exact coordinates
- Policy summaries beyond links to the existing source pages
- Claims about response time, guaranteed availability, or safety

## Production migration notes

This repository is a React + Vite Figma Make scaffold, not a Next.js repository. The implementation therefore keeps the existing supported architecture rather than replacing the toolchain. A production migration still needs:

1. Owner review of English translations and current bookability.
2. A complete sitemap export and redirect map.
3. Confirmation of all postal addresses and legal-policy copy.
4. A configured server-side email or CRM endpoint with rate limiting and spam protection.
5. Local/self-hosted production font files if Google font build-time loading is not adopted.
6. Optimized locally hosted photography and final image-rights review.
7. Per-route metadata, canonical tags, sitemaps, and route-specific schema in the production framework.
