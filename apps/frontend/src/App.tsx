import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './pages/LandingPage';
import AbonnementPage from './pages/abonnement';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import MagazinePage from './pages/MagazinePage';
import LoginPage from './pages/LoginPage';
import CataloguePage from './pages/catalogue';
import ClubPage from './pages/club';
import ConversionPage from './pages/conversion';

// ✅ nouvelles pages
import PressePage from './pages/Presse';
import AffiliationPage from './pages/Affiliation';
import BlogPage from './pages/Blog';

import './i18n';
import './styles/landing/landing.scss';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#1d1d1f' }}>
          <h2>Une erreur est survenue</h2>
          <p>Veuillez réessayer ou contacter le support à contact@solenca.com.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// 🔒 feature flag pour /club (masqué tant que false)
const SHOW_CLUB = import.meta.env.VITE_SHOW_CLUB === 'true';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/abonnement" element={<AbonnementPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/magazine" element={<MagazinePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            {SHOW_CLUB && <Route path="/club" element={<ClubPage />} />}
            <Route path="/conversion" element={<ConversionPage />} />

            {/* ✅ nouvelles routes marketing */}
            <Route path="/presse" element={<PressePage />} />
            <Route path="/affiliation" element={<AffiliationPage />} />
            <Route path="/blog" element={<BlogPage />} />

            {/* (optionnel) 404 simple
            <Route path="*" element={<div style={{padding:'2rem'}}>Page introuvable</div>} /> */}
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}
