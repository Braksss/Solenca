// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import '../styles/dashboard.scss';

const TacheDuJourCard = ({ task, onClick }: { task: Mission; onClick: () => void }) => (
  <div className="task-card" onClick={onClick}>
    <h3>{task.maison}</h3>
    <p className="adresse">{task.adresse}</p>
    <p className="detail"><strong>Date :</strong> {task.date}</p>
    <p className="detail"><strong>Statut :</strong> {task.statut === 'faite' ? '✅ Faite' : '🕒 À faire'}</p>
  </div>
);

export type Mission = {
  _id?: string;
  maison: string;
  adresse: string;
  date: string;
  checklist: string[];
  photos: string[];
  commentaire: string;
  statut: 'faite' | 'à faire';
};

const Dashboard = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    // MOCK TEMPORAIRE - À remplacer par l'API réelle
    const mockMissions: Mission[] = [
      {
        _id: '1',
        maison: 'Villa Serena',
        adresse: 'Carrer del Mar, Platja d\'Aro',
        date: '2025-07-08',
        checklist: ['Vérifier la piscine', 'Contrôler les volets'],
        photos: [],
        commentaire: '',
        statut: 'à faire',
      },
    ];
    setMissions(mockMissions);
  }, []);

  return (
    <div className="technicien-dashboard">
      <h1>🛠️ Tournée du jour</h1>
      {selectedMission ? (
        <div className="mission-form">
          <h2>Détails de la mission</h2>
          <p className="form-group"><strong>Maison :</strong> {selectedMission?.maison}</p>
          <p className="form-group"><strong>Adresse :</strong> {selectedMission?.adresse}</p>
          <form onSubmit={(e) => { e.preventDefault(); /* logique à venir */ }}>
            <div className="form-group">
              <label>Checklist :</label>
              <ul>
                {selectedMission?.checklist.map((item, index) => (
                  <li key={index}>
                    <label>
                      <input type="checkbox" defaultChecked /> {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-group">
              <label>Commentaire :</label>
              <textarea placeholder="Notes sur l'intervention..." rows={4} />
            </div>
            <div className="form-group">
              <label>Photos :</label>
              <input type="file" accept="image/*" multiple />
            </div>
            <div className="form-group">
              <label>Statut :</label>
              <select
                defaultValue={
                  selectedMission?.statut === 'faite' || selectedMission?.statut === 'à faire'
                    ? selectedMission.statut
                    : 'à faire'
                }
              >
                <option value="à faire">À faire</option>
                <option value="faite">Faite</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" onClick={() => setSelectedMission(null)} className="btn btn-secondary">Retour</button>
          </form>
        </div>
      ) : (
        <div className="task-list">
          {missions.map((mission) => (
            <TacheDuJourCard key={mission._id} task={mission} onClick={() => setSelectedMission(mission)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;