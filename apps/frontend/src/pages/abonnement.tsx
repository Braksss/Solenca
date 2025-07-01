import { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/abonnement/abonnement.scss';
import heroImg from '../assets/hero-abonnement.jpg';
import avatar1 from '../assets/avatars/avatar1.png';

const SubscriptionModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [additionalVisits, setAdditionalVisits] = useState(0);

  const modules = [
    { id: 'piscine', label: 'Surveillance piscine', price: 89 },
    { id: 'jardin', label: 'Entretien jardin', price: 89 },
    { id: 'courrier', label: 'Gestion du courrier', price: 49 },
    { id: 'nettoyage', label: 'Ménage ponctuel', price: 69 },
    { id: 'aeration', label: 'Aération mensuelle', price: 39 },
  ];

  const basePrice = 89;
  const modulePrice = selectedModules.reduce((acc, id) => {
    const m = modules.find(mod => mod.id === id);
    return acc + (m ? m.price : 0);
  }, 0);
  const reduction = selectedModules.length >= 2 ? 0.2 : 0;
  const visitsPrice = additionalVisits * 30;
  const total = Math.round((basePrice + modulePrice * (1 - reduction) + visitsPrice) * 100) / 100;

  const toggleModule = (id: string) => {
    setSelectedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {step > 1 && (
          <button className="back-button" onClick={() => setStep(s => s - 1)}>
            ← Retour
          </button>
        )}
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        {step === 1 && (
          <div className="step">
            <h2>Solenca One</h2>
            <p>Deux visites de surveillance par mois</p>
            <ul className="module-list">
              <li>✔ Rapport photo envoyé par email</li>
              <li>✔ Intervention d’urgence incluse</li>
              <li>✔ Gestion des clefs et accès</li>
            </ul>
            <p className="price">89 € / mois</p>
            <button onClick={() => setStep(2)} className="next-button">Suivant</button>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h2>Modules supplémentaires</h2>
            <ul className="module-list">
              {modules.map(mod => (
                <li key={mod.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(mod.id)}
                      onChange={() => toggleModule(mod.id)}
                    />
                    {mod.label}
                    <span className="price">+{mod.price} €</span>
                  </label>
                </li>
              ))}
            </ul>
            {reduction > 0 && <p className="reduction">20 % de réduction appliquée</p>}
            <button onClick={() => setStep(3)} className="next-button">Suivant</button>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h2>Visites supplémentaires</h2>
            <label>
              Fréquence : {additionalVisits} {additionalVisits === 1 ? 'passage' : 'passages'} / mois
              <input
                type="range"
                min={0}
                max={6}
                value={additionalVisits}
                onChange={e => setAdditionalVisits(parseInt(e.target.value))}
              />
            </label>
            <button onClick={() => setStep(4)} className="next-button">Voir mon devis</button>
          </div>
        )}

        {step === 4 && (
          <div className="step">
            <h2>Votre devis personnalisé</h2>
            <p><strong>Base Solenca One</strong> : 89 €</p>
            <p><strong>Modules choisis</strong> :</p>
            <ul className="module-list">
              {selectedModules.length === 0 && <li>Aucun</li>}
              {selectedModules.map(id => {
                const mod = modules.find(m => m.id === id);
                return (
                  <li key={id}>
                    {mod?.label} — <span className="price">{Math.round(mod.price * (1 - reduction))} €</span>
                  </li>
                );
              })}
            </ul>
            <p><strong>Passages supplémentaires</strong> : {visitsPrice} €</p>
            <hr />
            <p className="total">Total mensuel : {total} €</p>
            <button className="pay-button">Souscrire maintenant</button>
            <br />
            <button className="pay-button" style={{ backgroundColor: '#444', marginTop: '1rem' }}>
              Je suis un professionnel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AbonnementPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />
      <main className="abonnement-page">
        <section className="about-hero">
          <div className="hero-content">
            <h1>Découvrez Solenca One</h1>
            <p>
              Une formule simple, efficace et abordable pour protéger votre résidence secondaire à distance.
            </p>
            <div className="cta-row">
              <button className="primary-btn" onClick={() => setShowModal(true)}>
                Créer mon devis en 1 minute
              </button>
              <span className="rating"><i className="star">★</i> 4.9/5</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <img src={heroImg} alt="Maison Solenca" />
            </div>
            <div className="user-badge">
              <div className="avatar-stack">
                <img src={avatar1} alt="client" />
              </div>
              <span>+100 propriétaires déjà convaincus</span>
            </div>
          </div>
        </section>
        {showModal && <SubscriptionModal onClose={() => setShowModal(false)} />}
      </main>
      <Footer />
    </>
  );
};

export default AbonnementPage;
