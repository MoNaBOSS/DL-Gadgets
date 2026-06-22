import Stripe from "stripe";

let stripe: Stripe | undefined;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  if (!stripe) {
    stripe = new Stripe(secretKey, { apiVersion: "2026-05-27.dahlia", typescript: true });
  }
  return stripe;
}
