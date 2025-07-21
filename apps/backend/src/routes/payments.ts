import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

// Utilitaire pour générer un ID de devis unique
const generateQuoteReference = (): string => {
  const today = new Date();
  return `SOL365-${today.toLocaleDateString('fr-FR').split('/').join('')}`;
};

// Création de session de paiement Stripe
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  const { isPro, email, total, billingPeriod } = req.body;

  if (!total || !billingPeriod) {
    return res.status(400).json({ error: 'Total et période de facturation requis' });
  }

  const isOneTime = billingPeriod === 'once';
  const productName = isPro ? 'Offre Pro Solenca' : 'Formule Tranquilidad 365';

  try {
    if (isOneTime) {
      // Paiement unique (annuel avec 20% de réduction)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `${productName} - Paiement Annuel`,
                metadata: {
                  description: isPro
                    ? 'Gestion externalisée pour agences et pros (20% de réduction appliquée)'
                    : 'Abonnement personnalisé pour résidence secondaire (20% de réduction appliquée)',
                },
              },
              unit_amount: Math.round(total * 0.8 * 100), // 20% de réduction
            },
            quantity: 1,
          },
        ],
        customer_email: email,
        metadata: {
          devis_reference: generateQuoteReference(),
          offre: isPro ? 'pro' : 'particulier',
          billingPeriod: 'annual',
        },
        success_url: 'https://solenca.fr/merci?success=true',
        cancel_url: 'https://solenca.fr/abonnement?canceled=true',
      });

      res.status(200).json({ url: session.url });
    } else {
      // Abonnement récurrent (mensuel ou semestriel)
      const price = await stripe.prices.create({
        currency: 'eur',
        unit_amount: billingPeriod === 'semiannual' ? Math.round(total * 0.9 * 100) : Math.round(total * 100), // 10% de réduction pour semestriel
        recurring: {
          interval: 'month',
          interval_count: billingPeriod === 'semiannual' ? 6 : 1,
        },
        product_data: {
          name: `${productName} - ${billingPeriod === 'semiannual' ? 'Semestriel' : 'Mensuel'}`,
          metadata: {
            description: isPro
              ? `Gestion externalisée pour agences et pros${billingPeriod === 'semiannual' ? ' (10% de réduction appliquée)' : ''}`
              : `Abonnement personnalisé pour résidence secondaire${billingPeriod === 'semiannual' ? ' (10% de réduction appliquée)' : ''}`,
          },
        },
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        customer_email: email,
        metadata: {
          devis_reference: generateQuoteReference(),
          offre: isPro ? 'pro' : 'particulier',
          billingPeriod,
        },
        success_url: 'https://solenca.fr/merci?success=true',
        cancel_url: 'https://solenca.fr/abonnement?canceled=true',
      });

      res.status(200).json({ url: session.url });
    }
  } catch (error) {
    console.error('Erreur de création de session Stripe :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du paiement' });
  }
});

export default router;