import React from 'react';
import '../../styles/components/dashboard/poids-maison-card.scss';

const PoidsMaisonCard = () => {
  const note = 72;
  const color = '#fdcb6e'; // Jaune (note entre 60 et 79)

  return (
    <div className="solenca-note-card" style={{ borderColor: color }}>
      <div className="solenca-note-card__note" style={{ color }}>
        {note}/100
      </div>
      <span className="solenca-note-card__tag">Indice Tranquillité</span>
    </div>
  );
};
export default PoidsMaisonCard;