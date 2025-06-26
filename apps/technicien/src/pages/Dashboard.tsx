// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import TacheDuJourCard from '../components/TacheDuJourCard';
import MissionDetail from '../components/MissionDetail';
import '../styles/technicien.scss';

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
    const fetchMissions = async () => {
      const res = await fetch('http://localhost:3000/api/missions');
      const data = await res.json();
      setMissions(data);
    };

    fetchMissions();
  }, []);

  return (
    <div className="technicien-dashboard">
      <h1>🛠️ Tournée du jour</h1>
      {selectedMission ? (
        <MissionDetail mission={selectedMission} onBack={() => setSelectedMission(null)} />
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