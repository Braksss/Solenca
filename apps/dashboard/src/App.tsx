import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/stats" element={<div>Stats</div>} />
        <Route path="/messages" element={<div>Messages</div>} />
        <Route path="/calendar" element={<div>Calendrier</div>} />
        <Route path="/alerts" element={<div>Alertes</div>} />
        <Route path="/settings" element={<div>Paramètres</div>} />
        <Route path="/about" element={<div>À propos</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
