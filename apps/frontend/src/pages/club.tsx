import React, { useState } from 'react';

import clubBg from '../assets/solenca-club-bg.jpg';
import '../styles/pages/club.scss';

const ClubPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="club-page">
      <header className="club-hero" style={{ backgroundImage: `url(${clubBg})` }}>
        <div className="club-hero__overlay">
          <div className="club-hero__content">
            <h1 className="club-hero__title full-width">
              <span className="light">SOLENCA</span><span className="bold">CLUB</span>
            </h1>
            <div className="club-hero__row">
              <h2 className="club-hero__subtitle">L’élégance d’un cercle de confiance</h2>
              <p className="club-hero__text">
                Rejoignez un espace confidentiel réservé aux propriétaires exigeants.
                Solenca Club vous offre des opportunités hors-marché, des services
                exclusifs et l’accès à un réseau sélectionné.
              </p>
            </div>
            <div className="club-hero__button-wrapper">
              <button className="club-hero__button" onClick={() => setShowModal(true)}>
                DEMANDER L'ACCÈS →
              </button>
            </div>
          </div>
        </div>
      </header>
      {showModal && (
        <div className="club-modal-overlay">
          <div className="club-modal">
            <button className="club-modal__close" onClick={() => setShowModal(false)}>×</button>
            <h2 className="club-modal__title">Demande d’accès au Club Solenca</h2>
            <form className="club-modal__form">
              <input type="text" placeholder="Prénom" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Budget estimé (€)" />
              <select required>
                <option value="">Type de projet</option>
                <option value="residence">Résidence secondaire</option>
                <option value="investissement">Investissement locatif</option>
                <option value="autre">Autre</option>
              </select>
              <textarea placeholder="Décrivez votre projet en quelques lignes..." rows={4} />
              <button type="submit" className="club-modal__submit">Envoyer ma demande</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubPage;
