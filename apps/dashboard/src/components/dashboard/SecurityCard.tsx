

import React from 'react';
import '../../styles/components/dashboard/SecurityCard.scss';
import { ShieldCheck, Lock, DoorClosed } from 'lucide-react';

const SecurityCard = () => {
  return (
    <div className="card security-card">
      <div className="security-card__header">
        <h2>Sécurité</h2>
        <div className="security-card__icons">
          <ShieldCheck size={18} />
          <Lock size={18} />
          <DoorClosed size={18} />
        </div>
      </div>
      <div className="security-card__infos">
        <p>Dernier contrôle : 05/07/2025</p>
        <p>Alarme : Activée</p>
        <p>Maison fermée : Oui</p>
      </div>
    </div>
  );
};

export default SecurityCard;