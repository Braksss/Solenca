

import React from 'react';
import '../../styles/components/dashboard/urgence-card.scss';
import { FiAlertCircle } from 'react-icons/fi';

const UrgenceCard = () => {
  const urgence = {
    level: 'Aucune urgence',
    detail: 'Aucun incident signalé cette semaine',
    date: 'Mise à jour le 07/07/2025',
  };

  return (
    <div className="urgence-card">
      <div className="urgence-card__header">
        <FiAlertCircle className="urgence-card__icon" />
        <h3 className="urgence-card__title">Urgence</h3>
      </div>
      <div className="urgence-card__content">
        <p className="urgence-card__level">{urgence.level}</p>
        <p className="urgence-card__detail">{urgence.detail}</p>
        <span className="urgence-card__date">{urgence.date}</span>
      </div>
    </div>
  );
};

export default UrgenceCard;