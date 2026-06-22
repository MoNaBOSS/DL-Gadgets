# Delivery report — DL Gadgets e-commerce upgrade

## What was upgraded

- Converted the request-first catalogue into a dual-path electronics store: online checkout for confirmed-price stock and enquiries for quote-only stock.
- Added a polished persistent cart, header cart indicator, cart review/update/remove UI, secure checkout error handling, and success/cancel pages.
- Added an embedded Sanity Studio at `/studio`, with product, category, and paid-order schemas.
- Added a secure Stripe Checkout API and a raw-body signature-verified webhook for `checkout.session.completed`.
- Preserved the original order-request API, form validation, Resend notification behavior, WhatsApp/email fallback, product imagery, SEO, sitemap, and Vercel deployment model.

## Tech stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS
- Sanity 6, next-sanity embedded Studio, Sanity image assets
- Stripe Node SDK and Stripe-hosted Checkout
- Resend HTTP API, localStorage cart, Vercel server routes

## Pages and routes

- `/`, `/shop`, `/shop/[slug]`, `/category/[slug]`, `/categories`, `/categories/[slug]`
- `/products/[slug]` legacy-friendly redirect to product detail
- `/cart`, `/checkout/success`, `/checkout/cancel`
- `/request-order`, `/about`, `/contact`, `/studio`
- `/api/checkout`, `/api/stripe/webhook`, `/api/order-request`
- `/sitemap.xml`, `/robots.txt`

## Admin panel status

The embedded Studio is implemented and production-ready once Larry creates a Sanity project and adds the project ID/dataset environment variables. It supports product titles, slugs, brand, category reference, condition, EUR price/sale price, request-price toggle, quantity, stock, featured, text, product image uploads, tags, specifications, status, optional Stripe IDs, categories, and paid orders.

Sanity is deliberately authoritative when configured. Until then, the original local seed is the store’s working fallback. Only active Sanity products are public or eligible for checkout.

## Stripe integration status

- Server-side Checkout Session creation is implemented; browser prices are never accepted.
- Products must be active, in stock, non-request-price, and have a positive price before checkout is allowed.
- The webhook verifies the raw Stripe signature, handles `checkout.session.completed`, creates deterministic paid-order records when a Sanity write token exists, and can send Resend notification email.
- No Stripe test keys were provided in this workspace, so a real test-mode Checkout Session and webhook signature could not be executed here. The code returns a clear configuration error until keys are added; the exact test process is documented in `docs/stripe-setup.md`.

## Cart and checkout status

- Add, remove, quantity updates, localStorage persistence, header counter, cart page, and checkout redirect are implemented.
- Request-price and out-of-stock products cannot enter Stripe Checkout; they preserve the enquiry/WhatsApp path.
- The success page clears the local cart; the cancel page preserves it.

## Image status

Existing product/category imagery remains local and optimized through `next/image`. New Sanity uploads use Sanity’s managed CDN, allowed explicitly in Next image configuration. See `docs/image-sources.md`; no random remote image URLs are used.

## Required environment variables

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=
ORDER_NOTIFICATION_EMAIL=
RESEND_FROM_EMAIL="DL Gadgets Orders <orders@your-domain.com>"
NEXT_PUBLIC_WHATSAPP_NUMBER=356...
NEXT_PUBLIC_CONTACT_EMAIL=
```

## Run locally

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
npm run lint
npm run build
```

## Vercel deployment

1. Push the repository to GitHub.
2. In Vercel, import the repo and keep the default Next.js settings.
3. Add all production environment variables under **Settings → Environment Variables**.
4. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the assigned Vercel URL and redeploy.
5. Attach the final domain in **Settings → Domains**, follow the exact DNS record Vercel presents, update `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain, and redeploy.
6. Create the Stripe webhook endpoint at `https://YOUR_DOMAIN/api/stripe/webhook` for `checkout.session.completed` and set its `whsec_...` signing secret.

## Intentional v1 limits and risks

- No Stripe/Sanity accounts or test keys were supplied, so owner setup is still required before a real payment test and live sale.
- Payment is authorized by Stripe; delivery rates, tax rules, refunds, legal policies, and inventory reservation require owner/business decisions before live commerce launch.
- Without `SANITY_API_WRITE_TOKEN`, Stripe Dashboard is the source of truth and webhook email de-duplication cannot be durable.
- Local product images are generic commercial fallbacks until Larry replaces them with verified product photography in Sanity.

## Suggested v2 upgrades

- Sanity import/migration script for all legacy products and official product photos
- Stripe shipping/tax configuration after business rules are confirmed
- Customer accounts, saved addresses, delivery zones, stock reservation, and order tracking
- Automated email receipts, analytics, error monitoring, rate limiting, privacy/returns/terms pages, and accessibility testing across target devices

## Validation

- `npm run lint` — passed after the e-commerce implementation.
- `npm run build` — passed; 109 static/dynamic routes generated, including Studio, cart, Checkout, Stripe webhook, and Sanity-aware catalog routes.
- Browser QA is performed after environment-independent smoke checks; real Stripe checkout requires the owner’s test credentials.
