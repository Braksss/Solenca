import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import RapportCard from '../components/dashboard/RapportCard';
import HydrometrieCard from '../components/dashboard/HydrometrieCard';
import PlanningCard from '../components/dashboard/PlanningCard';
import InterventionStats from '../components/dashboard/InterventionStats';
import PoidsMaisonCard from '../components/dashboard/PoidsMaisonCard';

import '../styles/dashboard.scss';

const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard__main">
        <Header />
        <div className="dashboard__grid">
          <div className="dashboard__row dashboard__row--2">
            <RapportCard />
            <HydrometrieCard />
          </div>
          <div className="dashboard__row dashboard__row--3">
            <PlanningCard />
            <InterventionStats />
            <PoidsMaisonCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
