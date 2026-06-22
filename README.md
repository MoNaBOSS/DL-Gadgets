# DL Gadgets Malta

DL Gadgets is a production-ready v1 electronics catalog and order-request website for Malta. It intentionally uses a request-first flow: a customer browses stock, sends an enquiry, then DL Gadgets confirms final pricing, availability, collection, delivery, and payment directly.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS
- Local seeded product catalog, generated category and product routes
- Local WebP product/category imagery documented in `docs/image-sources.md`
- Sanity-ready product/category schema and GROQ query definitions
- Resend email delivery with WhatsApp or email fallback
- Vercel-ready static and server route deployment

## Pages and features

- `/` — brand-led homepage, categories, featured products, trust signals, and order process
- `/shop` — searchable and filterable product catalog
- `/shop/[slug]` — static product pages with related products and order prefill
- `/category/[slug]` — static category listings
- `/about`, `/contact`, `/request-order`
- `/api/order-request` — validated request handler with safe, optional email delivery
- `/sitemap.xml`, `/robots.txt`, route-level metadata and canonical URLs

## Local setup

Requirements: Node.js 20.9 or later and npm.

```powershell
cd "E:\Larry Lee\dl-gadgets"
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. Run the production checks before release:

```powershell
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local`. Do not commit `.env.local` or any real secret.

| Variable | Required in production | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | The final `https://...` URL; used by metadata, canonical URLs, sitemap, and robots. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recommended | Digits-only or international number; enables the WhatsApp order fallback. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Public contact address and mailto fallback. |
| `ORDER_NOTIFICATION_EMAIL` | For Resend email | Private recipient address for order notifications. |
| `RESEND_API_KEY` | For Resend email | Private Resend API key. |
| `RESEND_FROM_EMAIL` | For Resend email | Verified sender, e.g. `DL Gadgets Orders <orders@your-domain.com>`. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Only with Sanity | Sanity project ID. |
| `NEXT_PUBLIC_SANITY_DATASET` | Only with Sanity | Dataset name, normally `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Only with Sanity | Version date used by Sanity queries. |
| `SANITY_API_READ_TOKEN` | Only for private Sanity data | Server-only Sanity read token. |

For a working production order flow, configure either Resend (`ORDER_NOTIFICATION_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`) or `NEXT_PUBLIC_WHATSAPP_NUMBER`; configuring both is recommended. The app never exposes `RESEND_API_KEY` or `ORDER_NOTIFICATION_EMAIL` to the browser.

## Order requests

The API validates name, email/phone format, and a whole-number quantity. If Resend is configured, DL Gadgets receives an email. If it is unavailable or not configured, customers get an explicit WhatsApp fallback (or email fallback when a public contact email is configured). The fallback message contains the product, quantity, and customer contact details.

Before launch, verify the sender domain in Resend and set `RESEND_FROM_EMAIL`. `orders@resend.dev` is only a development fallback and should not be relied on for production delivery.

## Product data and Sanity

The initial catalog is in `src/data/products.ts`, derived from the supplied product seed. This is the active fallback source, so the website builds and runs without Sanity credentials.

Product and category imagery is stored locally in `public/products` and `public/placeholders`; no product image is hotlinked. See `docs/image-sources.md` for the asset register and replacement process for verified manufacturer photography.

`src/lib/sanity/schema.ts` defines `product` and `category`; `src/lib/sanity/query.ts` holds the GROQ queries. To introduce editor-managed content, create a Sanity Studio, register those schemas, and connect the production data layer before replacing local fallback reads. The Studio is intentionally not embedded in the storefront so this v1 deploy remains stable without CMS configuration.

## Deploy to GitHub and Vercel

1. Create an empty GitHub repository, then push this project using the commands in the delivery report.
2. In Vercel, select **Add New → Project**, import the GitHub repository, and set the root directory to `.`.
3. Vercel detects Next.js automatically. Leave the default build command (`npm run build`) and install command (`npm install`).
4. In **Project Settings → Environment Variables**, add the production values from the table above. Do not add local `.env.local` to GitHub.
5. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the final deployment URL, redeploy, and verify `/sitemap.xml`, `/robots.txt`, the shop, and an order request.
6. Add the confirmed custom domain under **Project Settings → Domains**. Follow the exact DNS record shown by Vercel at the domain registrar, wait for verification, then update `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain and redeploy.

## Intentionally not included in v1

- Card payments, cart, account system, or inventory reservation
- Embedded Sanity Studio and active remote CMS fetching
- Automated inventory sync, order dashboard, or tax/shipping engine
- Final legal policy text; these must be supplied by the business before launch

## Suggested v2 upgrades

- Verified product photography and CMS-backed image management
- Embedded Sanity Studio with preview, scheduled publishing, and inventory workflows
- Order management dashboard, customer notifications, and spam/rate limiting
- Payment gateway after the desired provider and legal requirements are confirmed
- Analytics, error tracking, consent banner, and final delivery/returns policy pages
