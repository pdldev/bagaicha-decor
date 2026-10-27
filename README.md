# Bagaicha Flower Decor and Events

## How to edit

- **WhatsApp number:** edit `whatsapp` in `data/site.ts`. All WhatsApp links use `buildWhatsAppUrl` from `lib/whatsapp.ts`.
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
