# Stripe setup for DL Gadgets

## 1. Start in test mode

1. Create or sign in to the business Stripe account.
2. Turn on **Test mode** in the Stripe Dashboard.
3. Copy the test secret key (`sk_test_...`) into Vercel as `STRIPE_SECRET_KEY`.
4. Optionally add the test publishable key as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
5. Never add either secret key to GitHub, a browser variable, or a Sanity document.

## 2. Configure the webhook

In Stripe Dashboard → **Developers → Webhooks**, add this endpoint:

```text
https://YOUR_DOMAIN/api/stripe/webhook
```

Select the event:

```text
checkout.session.completed
```

Copy its signing secret (`whsec_...`) to `STRIPE_WEBHOOK_SECRET` in Vercel. Redeploy after changing variables.

For local webhook testing, use the Stripe CLI:

```powershell
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the `whsec_...` value printed by that command in local `.env.local` only.

## 3. Create a testable product

In `/studio`, create or edit a product and set:

- status: `active`
- request price: off
- positive EUR price
- in stock: on
- quantity: at least 1 (or leave quantity blank for untracked stock)

Add it to cart and select **Secure checkout**. Stripe Checkout is hosted by Stripe; no card data enters the DL Gadgets app.

Use Stripe’s standard test card `4242 4242 4242 4242`, any future expiry, any CVC, and any postal code accepted by Stripe test mode.

## 4. Verify outcomes

1. Successful payment returns to `/checkout/success` and clears the local cart.
2. The Stripe Dashboard shows a completed Checkout Session.
3. The webhook returns HTTP 200 and creates an order document in Sanity when `SANITY_API_WRITE_TOKEN` is configured.
4. Resend sends an internal payment notification when its variables are set.
5. Cancelling returns to `/checkout/cancel` without charging the card.

## 5. Go live safely

1. Confirm business, tax, delivery, refund, privacy, and terms-of-sale requirements with the owner/accountant.
2. Replace only the test Stripe secret/publishable keys with live keys in Vercel.
3. Create a new **live-mode** webhook endpoint and replace `STRIPE_WEBHOOK_SECRET` with its live signing secret.
4. Verify one low-value live transaction and refund process with the owner.
5. Keep `requestPrice` enabled for devices whose condition, price, or stock needs manual confirmation.

The app does not fake a successful payment. A returned success page is customer-facing confirmation; fulfillment is driven by Stripe’s verified webhook event.
