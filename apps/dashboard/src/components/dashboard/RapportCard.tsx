import React from 'react';
import '../../styles/components/dashboard/rapport-card.scss';
import imageLeft from '../../assets/image-left.jpg';
import { FaLeaf, FaSwimmingPool, FaHome, FaLock, FaMapMarkerAlt } from 'react-icons/fa';

const RapportCard = () => {
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
    <div className="rapport-card">
      <div className="rapport-card__image-container">
        <img src={imageLeft} alt="Maison" />
      </div>

      <div className="rapport-card__content">
        <div className="rapport-card__header">
          <h3 className="rapport-card__title">Dernier rapport</h3>
          <button className="rapport-card__edit">Télécharger</button>
        </div>

        <p className="rapport-card__location">
          <FaMapMarkerAlt style={{ marginRight: '6px' }} />
          Platja d'Aro, Espagne
        </p>

<div className="rapport-card__features">
  <div className="rapport-card__feature"><FaLeaf /></div>
  <div className="rapport-card__feature"><FaSwimmingPool /></div>
  <div className="rapport-card__feature"><FaHome /></div>
  <div className="rapport-card__feature"><FaLock /></div>
</div>
      </div>
    </div>
  );
};

export default RapportCard;
