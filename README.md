# Bagaicha Flower Decor and Events

## Project structure

- `app/` contains the Next.js routes, page metadata and global styles.
- `components/` contains reusable page layouts, service UI and shared controls.
- `config/` contains site settings, image configuration and environment validation.
- `data/` contains editable site content for services, products, work and about pages.
- `lib/` contains shared content validation, schemas and browser/server utilities.
- `public/` contains static files served directly, including images and catalogues.
- `tests/` contains unit and end-to-end tests.

## Run and deploy

- Use Node.js 20.9 or later, but earlier than 23, with pnpm. Run `pnpm install` once, then `pnpm dev` to start the local development server.
- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the business WhatsApp number. This value is public because it is used in links on the website; do not put secrets in `NEXT_PUBLIC_*` variables.
- Before release, run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Run `pnpm start` to serve a production build locally.
- Deploy as a Next.js application on Vercel or another compatible host. Configure the public WhatsApp number in the host's environment settings and use the standard production build/start commands for that host.
- There is no application database to back up. Enquiry shortlists stay in each visitor's browser, and a message is shared only if the visitor opens and sends it through WhatsApp.

## How to edit

- **WhatsApp number:** edit `whatsapp` in `config/site.ts`. All WhatsApp links use `buildWhatsAppUrl` from `lib/whatsapp`.
- **Add a bouquet:** add an item to `data/bouquets.ts`, including its image path, price, category and occasions.
- **Add a service:** add a service object to `data/services.ts`. The services listing and detail page are generated from that data.
- **Replace images:** replace the image paths in `data/about.ts`, `data/bouquets.ts`, `data/gifts.ts` and `data/services.ts`. Keep images in `public/` and use the existing `next/image` components.

## Still needed from the client

- Final photography for the hero, gallery, services, bouquets, gifts and team portraits.
- Confirmed bouquet and gift prices, delivery fees and availability.
- The final WhatsApp number and any social profile URLs.
- Founding year and approved story copy.
- Team names, roles and portraits.
- Confirmed address, opening hours and service-area travel policy.

## Security notes

- Production response headers are configured in `next.config.mjs`, including a restrictive Content Security Policy, HSTS, clickjacking protection, and a permissions policy.
- User-entered enquiry text is length-limited and stripped of control characters before it is passed to WhatsApp.
- Persisted enquiry items are schema-validated before being read from browser storage. Browser storage is only used for the enquiry shortlist, never as a source of truth for prices or orders.
- Keep dependency updates current and run `pnpm audit` during release checks.
- Replace the placeholder contact in `public/.well-known/security.txt` with the monitored security-reporting address before launch.
