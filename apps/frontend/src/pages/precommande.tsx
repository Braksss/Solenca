import React, { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/abonnement/precommande.scss';

const BASE_PRICE = 99;

const OPTIONS = [
  { id: 'piscine', label: 'Piscine', price: 89 },
  { id: 'jardin', label: 'Jardin', price: 89 },
  { id: 'hiver', label: 'Hiver+', price: 29 },
  { id: 'surveillance', label: 'Surveillance+', price: 19 },
];

const PrecommandePage = () => {
  const [form, setForm] = useState({ name: '', email: '', isPro: false, message: '' });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelectedOptions(prev =>
      prev.includes(id) ? prev.filter(opt => opt !== id) : [...prev, id]
    );
  };

  const fullPrice = BASE_PRICE + selectedOptions.reduce((sum, id) => {
    const option = OPTIONS.find(opt => opt.id === id);
    return sum + (option ? option.price : 0);
  }, 0);

  const discount = 0.3;
  const finalPrice = (fullPrice * (1 - discount)).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Précommande envoyée avec succès !');
  };

  return (
    <>
      <Navbar />
      <main className="precommande-container">
        <div className="precommande-card">
          <h1>Précommandez Solenca One</h1>
          <p className="intro">
            Bénéficiez de <strong>-30 %</strong> la première année. Offre limitée aux précommandes.
          </p>

          <section className="section-box">
            <h2 className="section-title">Inclus avec Solenca One</h2>
            <ul className="included-list">
              <li>✅ 2 visites par mois</li>
              <li>✅ Rapport photo après chaque passage</li>
              <li>✅ Vérification des accès, volets, humidité</li>
              <li>✅ Alerte immédiate en cas d’anomalie</li>
            </ul>
            <div className="price-row">
              <span className="old-price">99 €/mois</span>
              <span className="new-price">69,30 €/mois</span>
            </div>
          </section>

          <section className="section-box">
            <h2 className="section-title">Modules supplémentaires</h2>
            <div className="options-grid">
              {OPTIONS.map(opt => (
                <div
                  key={opt.id}
                  className={`option-card ${selectedOptions.includes(opt.id) ? 'selected' : ''}`}
                  onClick={() => toggleOption(opt.id)}
                >
                  <h3>{opt.label}</h3>
                  <p>{opt.price} €/mois</p>
                </div>
              ))}
            </div>
            {selectedOptions.length >= 2 && (
              <p className="reduction-msg">💡 Réduction automatique appliquée</p>
            )}
          </section>

          <section className="section-box">
            <h2 className="section-title">Vos informations</h2>
            <form onSubmit={handleSubmit} className="form-grid">
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message (optionnel)"
                value={form.message}
                onChange={handleChange}
              />
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="isPro"
                  checked={form.isPro}
                  onChange={handleChange}
                />
                Je suis un professionnel
              </label>
              <button type="submit" className="cta-button">
                Valider ma précommande
              </button>
            </form>
          </section>

          <div className="recap-box">
            <p>Total estimé :</p>
            <p>
              <span className="old-price">{fullPrice.toFixed(2)} €</span>{' '}
              <span className="final-price">{finalPrice} € / mois</span>
            </p>
            <small>Sans engagement immédiat. Paiement à l’activation.</small>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrecommandePage;
