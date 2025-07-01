import React from 'react';
import '../../styles/components/dashboard/planning-card.scss';

const ClientPlanningCard = () => {
  const upcomingVisit = {
    date: 'Jeudi 27 juin',
    heure: '14h30',
    technicien: 'Marta',
    type: 'Surveillance + Piscine'
  };

  const pastVisits = [
    { date: 'Lun. 17 juin', type: 'Entretien jardin', statut: 'fait' },
    { date: 'Jeu. 13 juin', type: 'Piscine', statut: 'fait' },
    { date: 'Mar. 11 juin', type: 'Check maison', statut: 'fait' }
  ];

  return (
    <div className="client-planning-card">
      <div className="grid-header">
        <div className="big-block">
          <h4>📅 Prochaine visite</h4>
          <div className="upcoming">
            <span className="date">{upcomingVisit.date}</span>
            <span className="time">{upcomingVisit.heure}</span>
            <span className="type">{upcomingVisit.type}</span>
            <span className="tech">👷‍♀️ {upcomingVisit.technicien}</span>
          </div>
        </div>

        <div className="small-blocks">
          {pastVisits.map((visit, index) => (
            <div key={index} className="past">
              <span className="label">{visit.date}</span>
              <span className="desc">{visit.type}</span>
              <span className="status done">✔️ {visit.statut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientPlanningCard;