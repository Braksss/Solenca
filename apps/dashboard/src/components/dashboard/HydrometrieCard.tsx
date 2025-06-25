import React from 'react';
import '../../styles/components/dashboard/hydrometrie-card.scss';

const HydrometrieCard = () => {
  return (
    <div className="hydro-card">
      <div className="hydro-card__left">
        <h4 className="hydro-card__title">État de la piscine</h4>
        <p className="hydro-card__text">
          Dernière analyse le <strong>20 juin</strong> — tout est parfait.
        </p>
        <div className="hydro-card__badge">👍 Parfait</div>

        <div className="hydro-card__metrics">
          <span>Chlore</span>
          <div className="hydro-card__progress">
            <div className="hydro-card__bar" style={{ width: '75%' }}></div>
          </div>
          <span className="hydro-card__value">1.5 mg/L</span>
        </div>
      </div>

      <div className="hydro-card__right">
        <div className="hydro-card__cups">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`cup ${i < 7 ? 'full' : ''}`} />
          ))}
        </div>
        <div className="hydro-card__litres">
          2.15L <span>d’eau traitée</span>
        </div>
      </div>
    </div>
  );
};

export default HydrometrieCard;
