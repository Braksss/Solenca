import React from 'react';
import '../../styles/components/dashboard/PoolCard.scss';
import { Thermometer, Waves, Filter } from 'lucide-react';

const PoolCard = () => {
  return (
    <div className="card pool-card">
      <div className="pool-card__header">
        <h2>Piscine</h2>
        <div className="pool-card__icons">
          <Thermometer size={18} />
          <Waves size={18} />
          <Filter size={18} />
        </div>
      </div>
      <div className="pool-card__infos">
        <p>Température actuelle : 27°C</p>
        <p>Dernier nettoyage : 03/07/2025</p>
        <p>Filtration : Active</p>
      </div>
    </div>
  );
};

export default PoolCard;
