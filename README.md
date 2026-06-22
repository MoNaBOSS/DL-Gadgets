# DL Gadgets Malta

DL Gadgets is a Next.js electronics store for Malta. It supports two legitimate purchase paths:

- **Online price** products can be added to a persisted cart and paid through Stripe Checkout.
- **Request price** products stay on the existing enquiry flow, with Resend notification and WhatsApp/email fallback.

The local seed catalog keeps the storefront usable before a CMS is connected. Once valid Sanity environment variables are configured, Sanity becomes the authoritative public catalog: only `active` products are shown and hidden/draft products cannot be purchased.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS
- Embedded Sanity Studio at `/studio` for products, categories, images, stock, and paid-order records
- Stripe-hosted Checkout and a signature-verified Stripe webhook
- LocalStorage cart with server-side price and stock validation
- Resend notification support plus WhatsApp/email enquiry fallback
- Vercel and GitHub ready

## Local setup

Requirements: Node.js 20.9+ and npm.

```powershell
cd "E:\Larry Lee\dl-gadgets"
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. Production checks:

```powershell
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`, Stripe keys, Resend keys, or Sanity tokens.

| Variable | Required when | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL, sitemap, robots, Checkout return URLs. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recommended | Digits-only international WhatsApp fallback. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Public email fallback. |
| `RESEND_API_KEY` | Email delivery | Server-side Resend key. |
| `ORDER_NOTIFICATION_EMAIL` | Email delivery | Private notification recipient. |
| `RESEND_FROM_EMAIL` | Email delivery | Verified Resend sender. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Studio/store | Sanity project ID. |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity Studio/store | Usually `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity Studio/store | Sanity query API date. |
| `SANITY_API_READ_TOKEN` | Private dataset | Server-only read token. |
| `SANITY_API_WRITE_TOKEN` | Paid order records | Server-only write token used only by the Stripe webhook. |
| `STRIPE_SECRET_KEY` | Stripe Checkout | Server-only Stripe test/live secret key. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe integration | Publishable key for future client Stripe features; never place the secret key here. |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook | Signing secret for `/api/stripe/webhook`. |

## Admin and product management

After creating a Sanity project and setting its public project ID/dataset, open `/studio`. The embedded Studio lets Larry manage categories and products, upload images to Sanity, set price/sale price, quantity, condition, `requestPrice`, `inStock`, `featured`, specifications, and status.

For an online-payment product, set all of the following:

1. `status` to **active**.
2. `requestPrice` to **false**.
3. A positive EUR price (or sale price).
4. `inStock` to **true** and a positive quantity if stock is tracked.

Products that do not meet those rules cannot be purchased by the cart or checkout API. Detailed instructions: [docs/admin-guide.md](docs/admin-guide.md).

## Payments and orders

The cart sends only product IDs and quantities. `/api/checkout` fetches products again on the server, checks status, request-price, stock, quantity, price, and currency, then creates a Stripe Checkout Session using server-calculated line items. Browser prices are never trusted.

`/api/stripe/webhook` reads the raw body and verifies `STRIPE_WEBHOOK_SECRET`. For `checkout.session.completed`, it creates a deterministic paid-order document in Sanity when `SANITY_API_WRITE_TOKEN` is configured, which prevents duplicate email processing. Stripe Dashboard remains the payment source of truth.

Use Stripe **test** keys first. Full setup, test commands, and going-live checklist: [docs/stripe-setup.md](docs/stripe-setup.md).

## Images

Current local product/category fallback imagery is stored under `public/products` and `public/placeholders`. Sanity uploads use Sanity’s controlled image CDN and are rendered with `next/image`; no random images are hotlinked. See [docs/image-sources.md](docs/image-sources.md).

## Deploy to Vercel

1. Push `main` to GitHub.
2. Import the repository in Vercel. It auto-detects Next.js.
3. Add the production variables above under **Settings → Environment Variables**.
4. Set `NEXT_PUBLIC_SITE_URL` to the production Vercel URL, deploy, then replace it with the custom domain when connected and redeploy.
5. In Stripe, add the webhook endpoint `https://YOUR_DOMAIN/api/stripe/webhook` and select `checkout.session.completed`.
6. Verify `/studio`, one request-price product, one priced test-mode product, checkout cancellation, and webhook delivery before using live Stripe keys.

## GitHub workflow

```powershell
git status
git add .
git commit -m "feat: add DL Gadgets ecommerce checkout and admin"
git push origin main
```

See [DELIVERY_REPORT.md](DELIVERY_REPORT.md) for the current delivery status and manual launch checklist.
