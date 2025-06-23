import React, { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/abonnement/precommande.scss';

const PRICES = {
  tranquilo: { monthly: 129, annual: 99 },
  confianza: { monthly: 229, annual: 189 },
  serenidad: { monthly: 349, annual: 299 },
};

const Precommande = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [selectedPlan, setSelectedPlan] = useState<'tranquilo' | 'confianza' | 'serenidad'>('confianza');
  const [duration, setDuration] = useState<'monthly' | 'annual'>('annual');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value as 'tranquilo' | 'confianza' | 'serenidad');
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value as 'monthly' | 'annual');
  };

  const totalPrice = PRICES[selectedPlan][duration];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert('Précommande validée, merci !');
      setForm({ name: '', email: '' });
      setSelectedPlan('confianza');
      setDuration('annual');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="precommande-grid">
        <section className="precommande-form">
          <h1>Je précommande Solenca</h1>
          <p className="subtitle">Bénéficiez des meilleures conditions en précommandant maintenant.</p>

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

          <div className="footer-buttons">
            <button type="button" className="cancel">Annuler</button>
            <button type="submit" className="subscribe" disabled={submitting} onClick={handleSubmit}>
              {submitting ? 'Validation en cours…' : 'Valider et précommander'}
            </button>
          </div>

          <p className="disclaimer">
            Aucun paiement immédiat. Vous serez recontacté(e) avant le lancement officiel.
          </p>
        </section>

        <aside className="precommande-summary">
          <h2>Choisissez votre abonnement</h2>
          <div className="plan-options">
            <label className={selectedPlan === 'tranquilo' ? 'active' : ''}>
              <input
                type="radio"
                name="plan"
                value="tranquilo"
                checked={selectedPlan === 'tranquilo'}
                onChange={handlePlanChange}
              />
              Tranquilo — {PRICES.tranquilo[duration]}€/mois
            </label>

            <label className={selectedPlan === 'confianza' ? 'active' : ''}>
              <input
                type="radio"
                name="plan"
                value="confianza"
                checked={selectedPlan === 'confianza'}
                onChange={handlePlanChange}
              />
              Confianza — {PRICES.confianza[duration]}€/mois
            </label>

            <label className={selectedPlan === 'serenidad' ? 'active' : ''}>
              <input
                type="radio"
                name="plan"
                value="serenidad"
                checked={selectedPlan === 'serenidad'}
                onChange={handlePlanChange}
              />
              Serenidad — {PRICES.serenidad[duration]}€/mois
            </label>
          </div>

          <div className="duration-options">
            <label className={duration === 'monthly' ? 'active' : ''}>
              <input
                type="radio"
                name="duration"
                value="monthly"
                checked={duration === 'monthly'}
                onChange={handleDurationChange}
              />
              Paiement mensuel
            </label>

            <label className={duration === 'annual' ? 'active' : ''}>
              <input
                type="radio"
                name="duration"
                value="annual"
                checked={duration === 'annual'}
                onChange={handleDurationChange}
              />
              Engagement 1 an (réduction spéciale)
            </label>
          </div>

          <div className="total-section">
            <p>Total</p>
            <h3>{totalPrice.toFixed(2)} € / mois</h3>
            <p className="secure">🔒 Sans engagement immédiat – paiement à l'ouverture</p>
          </div>

          <div className="summary-visual">
            <img src="/assets/illus-cube.png" alt="Illustration Solenca" />
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default Precommande;