import React from 'react';
import solencaLogo from '../../assets/solenca-logo.png';
import illustration from '../../assets/modal-illustration.jpg';
import '../../styles/abonnement/subscriptionmodalpro.scss';

interface Props {
  onClose: () => void;
}

const SubscriptionModalPro = ({ onClose }) => {
  const today = new Date().toLocaleDateString('fr-FR');

  const handleStripePaymentPro = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPro: true,
          email: 'pro@example.com',
        }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Erreur paiement pro :', error);
    }
  };

  return (
    <div className="subscription-modal-overlay">
      <div className="subscription-modal pro">
        <div className="modal-illustration">
          <img src={illustration} alt="Illustration pro Costa Brava" />
        </div>

        <div className="modal-content">
          <img src={solencaLogo} alt="Solenca" className="modal-logo" />

          <div className="quote-header">
            <p><strong>Date :</strong> {today}</p>
            <p><strong>Réf. :</strong> PRO-SOL-{today.replaceAll('/', '')}</p>
          </div>

          <h2 className="main-title">Offre Pro – Gestion externalisée de vos biens en Costa Brava</h2>

          <div className="quote-body">
            <h3>Services inclus :</h3>
            <ul>
              <li>Visites préventives planifiées hebdo</li>
              <li>Entretien piscine & jardin (hors gros travaux)</li>
              <li>Rapports photo & historiques sur dashboard</li>
              <li>Coordination prestataires (ménage, travaux…)</li>
              <li>Accès multi-biens & multi-utilisateurs</li>
              <li>Support prioritaire + hotline dédiée</li>
              <li>Facturation mensuelle simplifiée</li>
            </ul>

            <div className="pricing-zone">
              <div className="tarif-standard">
                <span className="label">À partir de</span>
                <span className="price">249 € / mois / bien</span>
              </div>
              <p className="note">Tarification dégressive dès 3 biens. Offre lancement –20% early, pré-réservez pour novembre 2025 !</p>
            </div>

            <div className="cta-zone">
              <button className="button-main" onClick={handleStripePaymentPro}>
                Demander un devis personnalisé
              </button>
              <button className="button-outline">
                Télécharger la plaquette PDF
              </button>
            </div>

            <p className="note-bottom">
              Vous êtes une agence loc ou gestionnaire en Costa Brava ? Bénéficiez d'un accès dédié et d'une prise en main rapide – partenariat win-win.
            </p>
          </div>

          <div className="modal-footer">
            <button className="button-outline" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModalPro;