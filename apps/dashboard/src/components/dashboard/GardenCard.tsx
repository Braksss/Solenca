import React from 'react';
import '../../styles/components/dashboard/GardenCard.scss';
import { CalendarDays, Leaf, Droplet } from 'lucide-react';

const GardenCard = () => {
  return (
    <div className="card garden-card">
      <div className="garden-card__header">
        <h2>Jardin</h2>
        <div className="garden-card__icons">
          <Leaf size={18} />
          <Droplet size={18} />
          <CalendarDays size={18} />
        </div>
      </div>
      <div className="garden-card__infos">
        <p>Dernier passage : 02/07/2025</p>
        <p>Prochaine tonte prévue : 10/07/2025</p>
        <p>Arrosage automatique : Activé</p>
      </div>
    </div>
  );
};

export default GardenCard;
