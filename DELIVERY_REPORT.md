# Delivery report — DL Gadgets Malta

## What was built

An original, responsive electronics catalog and manual order-request website for DL Gadgets Malta. The implementation uses the supplied product data and DL Gadgets brand direction; it does not contain Scan Malta source code, assets, text, or branding.

## Tech stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS
- Local product seed fallback with Sanity-ready schemas and GROQ queries
- Resend API route with WhatsApp/email fallback
- Vercel-compatible deployment output

## Included pages

- Home, shop, category listing, product detail, about, contact, order request, not found
- Order request API, sitemap, robots

## Included features

- Responsive header, mobile menu, search, product/category/brand filters, related products, stock/condition labels, and empty states
- Product request links prefill the order form
- Browser and server validation for contact details, quantity, and malformed payloads
- Clear email-delivered, fallback, and error states
- SEO metadata, generated OpenGraph image, canonical URLs, sitemap, and robots rules
- Local catalog works without Sanity or Resend credentials

## Environment variables

Use `.env.example` as the source of truth. For production add `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`, `ORDER_NOTIFICATION_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, and `SANITY_API_READ_TOKEN` where applicable.

## Run locally

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Production checks:

```powershell
npm run lint
npm run build
```

## Deploy to Vercel

Import the GitHub repository in Vercel, configure variables in Project Settings, and deploy with the default Next.js detection. Once the final domain is attached, set `NEXT_PUBLIC_SITE_URL` to the HTTPS domain and redeploy.

## Connect a domain

In **Project Settings → Domains**, add the confirmed domain. At the registrar, use the DNS record Vercel presents for that exact domain, wait for verification and HTTPS issuance, then redeploy after changing `NEXT_PUBLIC_SITE_URL`.

## Intentionally excluded from v1

- Online payment processing, cart, accounts, inventory reservation, formal policy pages, and embedded Sanity Studio

## Suggested v2 upgrades

- CMS-backed product imagery/inventory, order-management dashboard, payment gateway, policy pages, rate limiting/anti-spam, analytics, and error monitoring

## Final validation

- `npm run lint` — passed with no lint errors after the final audit changes.
- `npm run build` — passed on Next.js 16.2.9 with no build warnings; TypeScript completed and 103 static pages/routes were generated.
- Browser verification — passed on desktop, tablet, and mobile widths. Homepage, mobile menu, category filtering, search, product request prefill, 404 page, and footer rendered with no runtime console errors or framework overlays.
- Order API verification — malformed JSON/object input and invalid email return `400`; valid development input is handled gracefully; the WhatsApp fallback URL contains the product, quantity, and customer details.
- `npm audit --omit=dev --audit-level=moderate` — reports two moderate PostCSS advisories nested under the current Next.js release. The only automated proposal is an unsafe downgrade to Next 9; no safe local remediation is currently available. Monitor for an upstream Next.js patch before launch.
