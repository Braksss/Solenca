// apps/backend/src/routes/payments.ts

import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10' as Stripe.LatestApiVersion,
});

// Utilitaire pour générer un ID de devis unique
const generateQuoteReference = (): string => {
  const today = new Date();
  return `SOL365-${today.toLocaleDateString('fr-FR').split('/').join('')}`;
};

// Création de session de paiement Stripe
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  const { isPro, email } = req.body;

  const lineItems = [
    {
      price_data: {
        currency: 'eur',
        product_data: {
          name: isPro ? 'Offre Pro Solenca' : 'Formule Tranquilidad 365',
          description: isPro
            ? 'Gestion externalisée pour agences et pros'
            : 'Abonnement annuel pour résidence secondaire',
        },
        unit_amount: isPro ? 24900 : 23900, // €249 ou €239 TTC
      },
      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: email,
      metadata: {
        devis_reference: generateQuoteReference(),
        offre: isPro ? 'pro' : 'particulier',
      },
      success_url: 'https://solenca.fr/merci?success=true',
      cancel_url: 'https://solenca.fr/abonnement?canceled=true',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erreur de création de session Stripe :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du paiement' });
  }
});

export default router;