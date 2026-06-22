# DL Gadgets admin guide

## Sign in

1. Create a Sanity project at `sanity.io/manage` and a dataset named `production`.
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET=production` to Vercel and redeploy.
3. Open `https://YOUR_DOMAIN/studio` and sign in with the Sanity account invited to the project.

The Studio route is intentionally unavailable until the project ID and dataset are configured. This avoids presenting a non-functional admin screen in production.

## Add a category

1. In **Category**, select **Create**.
2. Enter title, description, optional image, featured flag, and sort order.
3. Generate the slug and publish.

Keep category titles consistent with the storefront categories until a full catalog migration is complete: Smartphones, Tablets, Gaming Devices, Security Cameras, Accessories, Smart Devices, Enterprise Devices, and Clearance / Used Devices.

## Add or edit a product

1. In **Product**, select **Create** or open an existing product.
2. Enter title, generate a unique slug, brand, category, condition, descriptions, and tags.
3. Upload product photographs in **Product images**. The first image is used on product cards.
4. Add specification key/value rows where useful.
5. Set quantity and in-stock state.
6. Choose the buying path:
   - **Online payment:** positive EUR price, `requestPrice` off, `inStock` on, status **active**.
   - **Manual quote:** `requestPrice` on. The customer sees the request form and WhatsApp option instead of checkout.
7. Publish only when the listing is ready. Use **draft** while preparing and **hidden** to remove a published listing from customers.

## Price, stock, and featured status

- Price and sale price are entered as EUR numbers (for example `249.99`), not cents.
- For sale items, keep the normal price and add a lower sale price.
- Set `quantity` to `0` or disable `inStock` to disable checkout.
- Enable **Featured** to make the product eligible for the homepage featured section.

## Paid orders

When `SANITY_API_WRITE_TOKEN` is configured, the Stripe webhook creates paid order documents after a verified `checkout.session.completed` event. These records are read-only for Stripe/payment details, except operational status and notes. Stripe Dashboard remains the authoritative source for payment disputes, refunds, and financial reporting.

If the write token is not configured, the shop still accepts Stripe payment and sends an email if Resend is configured, but paid orders are not copied into the Studio and webhook email de-duplication is limited. Configure the write token before going live.
