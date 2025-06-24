// /apps/dashboard/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardLayout from './layout/DashboardLayout';
import './styles/global.scss';
import './styles/dashboard.scss';


const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DashboardLayout />
    </React.StrictMode>
  );
}