import React from 'react';
import '../../styles/components/dashboard/rapport-card.scss';
import maison from '../../assets/mock-maison.png'; // image fond de maison

const RapportCard = () => {
  return (
    <div className="rapport-card">
      <img src={maison} alt="Maison" className="rapport-card__image" />

      <div className="rapport-card__overlay">
        <div className="rapport-card__top">
          <div className="rapport-card__status">● Live</div>
          <div className="rapport-card__metrics">
            <span>🌡️ 24°C</span>
            <span>💧 50%</span>
            <span>⚡ 350W</span>
            <span>🔋 80%</span>
          </div>
        </div>

        <div className="rapport-card__bottom">
          <div className="rapport-card__date">Dernière visite : 25 juin</div>
          <div className="rapport-card__summary">
            Aucun problème détecté. Portail fermé, clim éteinte, alarme activée.
          </div>
          <div className="rapport-card__details">
            <span>🔎 14 points vérifiés</span>
            <span>📸 12 photos</span>
            <span>🕒 Durée : 42 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapportCard;
