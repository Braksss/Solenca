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
      <div className="planning-card__image-container">
        <img src="/assets/image-left.jpg" alt="Maison" />
        <button className="planning-card__like-btn">❤️</button>
      </div>

      <div className="planning-card__content">
        <div className="planning-card__header">
          <h3 className="planning-card__title">Dernier rapport</h3>
          <button className="planning-card__edit">Télécharger</button>
        </div>

        <p className="planning-card__location">📍Platja d'Aro, Espagne</p>

        <div className="planning-card__features">
          <div className="planning-card__feature">🌿</div>
          <div className="planning-card__feature">🏊</div>
          <div className="planning-card__feature">🏠</div>
          <div className="planning-card__feature">🔐</div>
        </div>
      </div>
    </div>
  );
};

export default ClientPlanningCard;
