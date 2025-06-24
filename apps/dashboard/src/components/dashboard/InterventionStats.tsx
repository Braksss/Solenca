import React from 'react';
import '../../styles/components/dashboard/intervention-stats.scss';

const InterventionStats = () => {
  return (
    <div className="intervention-card">
      <div className="intervention-card__top">
        <div>
          <h4>Interventions</h4>
          <p className="info">30 derniers jours</p>
        </div>
        <div className="intervention-card__ref">12 total</div>
      </div>

      <div className="intervention-card__graph">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            d="M0,20 C20,10 40,30 60,15 C80,5 100,20 100,20"
            fill="none"
            stroke="#3db8ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="intervention-card__bottom">
        <div className="score">2 ponctuelles</div>
        <div className="sub">Réponses rapides</div>
      </div>
    </div>
  );
};

export default InterventionStats;