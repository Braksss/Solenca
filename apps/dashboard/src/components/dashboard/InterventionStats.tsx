import React from 'react';
import '../../styles/components/dashboard/intervention-stats.scss';
import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const InterventionStats = () => {
  return (
    <div className="intervention-card">
      <div className="intervention-card__header">
        <h4>Suivi des interventions</h4>
        <p className="sub">Dernière visite : 20 juin</p>
      </div>

      <div className="intervention-card__info">
        <div className="intervention-item">
          <CheckCircle size={18} />
          <span>5 interventions ce mois-ci</span>
        </div>
        <div className="intervention-item alert">
          <AlertTriangle size={18} />
          <span>1 anomalie détectée</span>
        </div>
        <div className="intervention-item">
          <FileText size={18} />
          <button className="intervention-card__cta">Voir le rapport</button>
        </div>
      </div>

      <div className="intervention-card__footer">
        <span className="status-tag">Maison en bon état</span>
      </div>
    </div>
  );
};

export default InterventionStats;
