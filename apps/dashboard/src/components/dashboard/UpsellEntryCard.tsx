import React from 'react';
import '../../styles/components/dashboard/upsell-entry-card.scss';

const UpsellEntryCard = () => {
  return (
    <div className="upsell-entry-card">
      <div className="upsell-entry-card__overlay">
        <div className="upsell-entry-card__tag">Notre catalogue</div>
        <h2 className="upsell-entry-card__title">Services complémentaires Solenca</h2>
        <p className="upsell-entry-card__subtitle">Personnalisez votre abonnement en un clic.</p>
        <button className="upsell-entry-card__cta">Découvrir les prestations</button>
      </div>
    </div>
  );
};

export default UpsellEntryCard;