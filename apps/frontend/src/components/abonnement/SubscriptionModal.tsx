// apps/frontend/src/components/abonnement/SubscriptionModal.tsx

import React from 'react';
import solencaLogo from '../../assets/solenca-logo.png';
import illustration from '../../assets/modal-illustration.jpg';
import '../../styles/abonnement/subscriptionmodal.scss';

interface Props {
  onClose: () => void;
}

const SubscriptionModal: React.FC<Props> = ({ onClose }) => {
  const today = new Date().toLocaleDateString('fr-FR');

  const handleStripePayment = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPro: false,
          email: 'particulier@example.com',
        }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Erreur paiement particulier :', error);
    }
  };

  return (
    <div className="subscription-modal-overlay">
      <div className="subscription-modal">
        <div className="modal-illustration">
          <img src={illustration} alt="Illustration abonnement" />
        </div>

        <div className="modal-content">
          <div className="modal-top">
            <img src={solencaLogo} alt="Solenca" className="modal-logo" />
            <div className="quote-header">
              <p><strong>Date :</strong> {today}</p>
              <p><strong>Réf. :</strong> SOL365-{today.replaceAll('/', '')}</p>
            </div>
          </div>

          <h2 className="main-title">Devis numérique – Formule Tranquilidad 365</h2>

          <div className="quote-body">
            <h3>Inclus dans votre tranquillité :</h3>
            <ul>
              <li>Visites préventives</li>
              <li>Entretien de la piscine</li>
              <li>Entretien du jardin (hors élagage et travaux lourds)</li>
              <li>Rapport photo après chaque passage</li>
              <li>Dépôt sécurisé des clefs</li>
              <li>Assistance d’urgence 365 jours/an</li>
              <li>Espace client digital</li>
            </ul>

            <div className="pricing-zone">
              <div className="tarif-standard">
                <span className="label">Tarif mensuel TTC :</span>
                <span className="price">299 €</span>
              </div>

              <div className="promo-line">
                <span className="label">Offre de lancement (–20%)</span>
                <span className="price promo">239 € / mois</span>
              </div>
            </div>

            <p className="note">
              Ce devis est valable 15 jours. Aucun engagement requis pour bénéficier de l’offre de lancement.
            </p>
          </div>

          <div className="modal-footer">
            <button className="button-main" onClick={handleStripePayment}>
              Confirmer ma précommande
            </button>
            <button className="button-outline" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;