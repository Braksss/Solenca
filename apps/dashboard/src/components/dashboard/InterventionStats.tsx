import React from 'react';
import '../../styles/components/dashboard/intervention-stats.scss';
import { Home, TreePalm, Waves, AlertTriangle, CheckCircle } from 'lucide-react';

const InterventionStats = () => {
  return (
    <div className="card intervention-card">
      <div className="intervention-card__tag">État général</div>

      <div className="intervention-card__header">
        <h4 className="intervention-card__title">DERNIER PASSAGE</h4>
        <p className="intervention-card__subtitle">Le 20 juin à 11h34</p>
      </div>

      <div className="intervention-card__status row">
        <div className="status-icon ok">
          <Home size={16} />
        </div>
        <div className="status-icon ok">
          <TreePalm size={16} />
        </div>
        <div className="status-icon alert">
          <Waves size={16} />
        </div>
      </div>

      <div className="intervention-card__footer">
        <button className="intervention-card__cta">
          <CheckCircle size={18} style={{ marginRight: '6px' }} />
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default InterventionStats;
