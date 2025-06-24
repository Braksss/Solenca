import React from 'react';
import '../../styles/components/dashboard/poids-maison-card.scss';

const PoidsMaisonCard = () => {
  return (
    <div className="poids-card">
      <div className="poids-card__avatars">
        <img src="/avatar1.png" alt="User1" />
        <img src="/avatar2.png" alt="User2" />
        <img src="/avatar3.png" alt="User3" />
      </div>

      <h3 className="poids-card__title">Score de votre bien</h3>

      <div className="poids-card__badge">🏡 Très bon état</div>

      <hr className="poids-card__separator" />

      <p className="poids-card__desc">
        L'état général de votre maison est excellent. Aucun défaut détecté lors des dernières inspections. Continuez ainsi pour préserver sa valeur.
      </p>

      <div className="poids-card__footer">
        <span className="poids-card__note"><strong>82</strong>/100</span>
        <div className="poids-card__pagination">
          <button>{'<'}</button>
          <button>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default PoidsMaisonCard;