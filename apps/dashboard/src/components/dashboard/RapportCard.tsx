import React from 'react';
import '../../styles/components/dashboard/rapport-card.scss';

const RapportCard = () => {
  return (
    <div className="rapport-card">
      <div>
        <h2 className="rapport-card__title">Votre maison a été visitée !</h2>
        <p className="rapport-card__subtitle">Le 20 juin par Jean (technicien Solenca)</p>
      </div>

      <div className="rapport-card__footer">
        <div className="rapport-card__avatars">
          <img src="/avatar1.png" alt="Client 1" />
          <img src="/avatar2.png" alt="Client 2" />
          <img src="/avatar3.png" alt="Client 3" />
          <span className="rapport-card__members">5.8k+ clients</span>
        </div>
        <button className="rapport-card__cta">Voir le rapport</button>
      </div>
    </div>
  );
};

export default RapportCard;