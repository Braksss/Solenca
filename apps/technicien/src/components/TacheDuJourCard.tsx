// src/components/TacheDuJourCard.tsx
import React from 'react';
import { Mission } from '../pages/Dashboard';

type Props = {
  task: Mission;
  onClick: () => void;
};

const TacheDuJourCard = ({ task, onClick }: Props) => {
  return (
    <div className={`card-mission ${task.statut === 'faite' ? 'done' : ''}`} onClick={onClick}>
      <h2>{task.maison}</h2>
      <p>{task.adresse}</p>
      <p>🕒 {new Date(task.date).toLocaleTimeString()}</p>
      <p className="statut">{task.statut === 'faite' ? '✅ Fait' : '🟠 À faire'}</p>
    </div>
  );
};

export default TacheDuJourCard;
