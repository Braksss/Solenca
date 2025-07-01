import React from 'react';
import '../../styles/components/dashboard/hydrometrie-card.scss';

const HydrometrieCard = () => {
  return (
    <div className="hydro-modern-card">
      <div className="hydro-modern-card__top">
        <div className="hydro-modern-card__title">Piscine</div>
        <div className="hydro-modern-card__status">👍 Parfait</div>
      </div>

      <div className="hydro-modern-card__main-value">
        1.5 mg/L
        <span>Chlore</span>
      </div>

      <div className="hydro-modern-card__subtext">
        Dernière mesure le 20 juin à 15h
      </div>

      <div className="hydro-modern-card__grid">
        <div className="hydro-modern-card__cell">
          <div className="hydro-modern-card__cell-value">7.3</div>
          <div className="hydro-modern-card__cell-label">pH</div>
        </div>
        <div className="hydro-modern-card__cell">
          <div className="hydro-modern-card__cell-value">22°C</div>
          <div className="hydro-modern-card__cell-label">Température</div>
        </div>
        <div className="hydro-modern-card__cell">
          <div className="hydro-modern-card__cell-value">80%</div>
          <div className="hydro-modern-card__cell-label">Remplissage</div>
        </div>
        <div className="hydro-modern-card__cell">
          <div className="hydro-modern-card__cell-value">✔️</div>
          <div className="hydro-modern-card__cell-label">Filtration</div>
        </div>
      </div>
    </div>
  );
};

export default HydrometrieCard;
