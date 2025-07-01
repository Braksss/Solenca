import React from 'react';
import '../../styles/components/dashboard/planning-card.scss';

const ClientPlanningCard = () => {
  const upcomingVisit = {
    date: 'Jeudi 4 juillet',
    heure: '09h00',
    technicien: 'Marta',
    type: 'Surveillance + Piscine'
  };

  const nextDates = [
    { date: 'Lun. 8 juillet', type: 'Entretien jardin', tech: 'Julien' },
    { date: 'Ven. 12 juillet', type: 'Piscine', tech: 'Marta' },
    { date: 'Mar. 16 juillet', type: 'Check maison', tech: 'Marta' }
  ];

  return (
    <div className="planning-card">
      <div className="planning-card__header">
        <h3>🛠️ Prochains passages</h3>
        <span className="planning-card__badge">Maison surveillée</span>
      </div>

      <div className="planning-card__next">
        <div className="planning-card__next-date">
          <span className="planning-card__label">⏰ Prochain :</span>
          <span className="planning-card__date">{upcomingVisit.date}</span>
          <span className="planning-card__time">{upcomingVisit.heure}</span>
          <span className="planning-card__type">{upcomingVisit.type}</span>
          <span className="planning-card__tech">👷 {upcomingVisit.technicien}</span>
        </div>
      </div>

      <div className="planning-card__grid">
        {nextDates.map((visit, index) => (
          <div className="planning-card__item" key={index}>
            <span className="planning-card__item-date">{visit.date}</span>
            <span className="planning-card__item-type">{visit.type}</span>
            <span className="planning-card__item-tech">👷 {visit.tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPlanningCard;
