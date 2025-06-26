// src/components/MissionDetail.tsx
import React, { useState } from 'react';
import { Mission } from '../pages/Dashboard';
import ChecklistForm from './ChecklistForm';
import PhotoUploader from './PhotoUploader';

const MissionDetail = ({ mission, onBack }: { mission: Mission; onBack: () => void }) => {
  const [commentaire, setCommentaire] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<string[]>([]);

  const handleSubmit = async () => {
    const body = {
      ...mission,
      commentaire,
      photos,
      checklist,
      statut: 'faite',
      date: new Date().toISOString()
    };
    const res = await fetch('http://localhost:3000/api/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      alert('Mission validée avec succès');
      onBack();
    }
  };

  return (
    <div className="mission-detail">
      <button onClick={onBack}>← Retour</button>
      <h2>{mission.maison}</h2>
      <p>{mission.adresse}</p>
      <ChecklistForm checklist={checklist} setChecklist={setChecklist} />
      <PhotoUploader photos={photos} setPhotos={setPhotos} />
      <textarea
        placeholder="Commentaire..."
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
      />
      <button onClick={handleSubmit}>✅ Valider et envoyer</button>
    </div>
  );
};

export default MissionDetail;
