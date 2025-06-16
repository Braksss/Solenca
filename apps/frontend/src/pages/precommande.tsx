import React, { useState } from 'react';
import '../styles/abonnement/precommande.scss';

const PRICES = {
  monthly: 540, // exemple prix initial mensuel avant réduction
  annual: 432,  // prix annuel mensuel équivalent après 20% de réduction
};

const Precommande = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlan(e.target.value as 'monthly' | 'annual');
  };

  const totalPrice = plan === 'monthly' ? PRICES.monthly : PRICES.annual;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Ici tu envoies les données au backend / CMS
    // Exemple : fetch('/api/precommande', { method: 'POST', body: JSON.stringify(form + plan) })

    setTimeout(() => {
      setSubmitting(false);
      alert('Précommande validée, merci !');
      setForm({ name: '', email: '' });
      setPlan('annual');
    }, 1500);
  };

  return (
    <main className="precommande-page">
      <form className="precommande-form" onSubmit={handleSubmit}>
        <h1>Je précommande - Offre spéciale lancement</h1>

        <label htmlFor="name">Nom complet</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ton nom complet"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Ton email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <fieldset className="plans">
          <legend>Choisissez votre plan</legend>

          <label>
            <input
              type="radio"
              name="plan"
              value="monthly"
              checked={plan === 'monthly'}
              onChange={handlePlanChange}
            />
            Paiement mensuel - 20% de réduction pendant 6 mois
          </label>

          <label>
            <input
              type="radio"
              name="plan"
              value="annual"
              checked={plan === 'annual'}
              onChange={handlePlanChange}
            />
            Paiement annuel - 20% de réduction
          </label>
        </fieldset>

        <p className="total">
          Total : <strong>{totalPrice.toFixed(2)} € / mois</strong>
        </p>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Validation en cours...' : 'Valider et précommander'}
        </button>
      </form>
    </main>
  );
};

export default Precommande;
