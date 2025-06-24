import React from 'react';
import '../../styles/components/dashboard/planning-card.scss';

const PlanningCard = () => {
  return (
    <div className="planning-card">
      <div className="planning-card__header">
        <div>
          <h4>Prochaine visite</h4>
          <p className="small">Planifiée automatiquement</p>
        </div>
        <div className="planning-card__slot">26 juin à 10h30</div>
      </div>

      <div className="planning-card__progress">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`bar ${i < 13 ? 'filled' : ''}`}
          />
        ))}
      </div>

      <div className="planning-card__footer">
        <div>
          <p><strong>Technicien :</strong> Marta</p>
        </div>
        <button>Voir le planning</button>
      </div>
    </div>
  );
};

export default PlanningCard;