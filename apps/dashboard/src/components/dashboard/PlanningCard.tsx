import React from 'react';
import '../../styles/components/dashboard/planning-card.scss';
import { Calendar, Clock, UserRound } from 'lucide-react';

const PlanningCard = () => {
  return (
    <div className="planning-card-modern">
      <div className="planning-card-modern__section">
        <Calendar size={18} />
        <div className="text-block">
          <span className="label">Date prévue</span>
          <span className="value">Mercredi 26 juin</span>
        </div>
      </div>

      <div className="planning-card-modern__section">
        <Clock size={18} />
        <div className="text-block">
          <span className="label">Heure</span>
          <span className="value">10h30</span>
        </div>
      </div>

      <div className="planning-card-modern__section">
        <UserRound size={18} />
        <div className="text-block">
          <span className="label">Technicien</span>
          <span className="value">Marta (Solenca)</span>
        </div>
      </div>

      <button className="planning-card-modern__cta">Voir le planning complet</button>
    </div>
  );
};

export default PlanningCard;
