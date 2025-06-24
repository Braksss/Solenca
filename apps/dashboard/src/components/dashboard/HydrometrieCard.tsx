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
        <div className="hydro-card__summary">
          Chlore : <span className="hydro-card__value">1.5 mg/L</span>
        </div>
      </div>
      <div className="hydro-card__right">
        <div className="hydro-card__tubes">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`tube ${i < 14 ? 'full' : ''}`} />
          ))}
        </div>
        <div className="hydro-card__litres">Volume :<br /><strong>2.15L</strong></div>
      </div>
    </div>
  );
};

export default HydrometrieCard;