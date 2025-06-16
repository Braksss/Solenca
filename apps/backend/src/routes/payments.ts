// apps/backend/src/routes/payments.ts
import dotenv from 'dotenv';
import express, { Router, Request, Response } from 'express';
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // on omet apiVersion pour lever l'erreur de type
});

const router: Router = express.Router();

// 1) Création de session Checkout
router.post(
  '/create-checkout-session',
  async (
    req: Request<{}, {}, { priceId: string; email: string }>,
    res: Response<{ url: string } | { error: string }>
  ) => {
    const { priceId, email } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        customer_email: email,
      });
      res.json({ url: session.url! });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// 2) Webhook Stripe
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      // TODO gérer event.type et mettre à jour MongoDB...
      res.json({ received: true });
    } catch (err: any) {
      console.error('⚠️ Webhook signature failed.', err.message);
      res.sendStatus(400);
    }
  }
);

export default router;
