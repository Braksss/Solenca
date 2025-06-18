import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AbonnementPage from './pages/abonnement'; // <- gardé
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import MagazinePage from './pages/MagazinePage';
import LoginPage from './pages/LoginPage';

import './styles/landing/landing.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/abonnement" element={<AbonnementPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/magazine" element={<MagazinePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
