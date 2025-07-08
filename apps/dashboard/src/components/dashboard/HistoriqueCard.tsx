

import React from 'react';
import '../../styles/components/dashboard/historique-card.scss';
import { FaTools } from 'react-icons/fa';

const HistoriqueCard = () => {
  const interventions = [
    { label: 'Contrôle extérieur', date: '05/07/2025' },
    { label: 'Nettoyage piscine', date: '02/07/2025' },
    { label: 'Vérification alarme', date: '29/06/2025' },
  ];

  return (
    <div className="historique-card">
      <div className="historique-card__header">
        <FaTools className="historique-card__icon" />
        <h3 className="historique-card__title">Historique récent</h3>
      </div>
      <ul className="historique-card__list">
        {interventions.map((item, index) => (
          <li key={index} className="historique-card__item">
            <span className="historique-card__label">{item.label}</span>
            <span className="historique-card__date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoriqueCard;