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
import LandingConversionPage from './landing-conversion';

// Nouvelles pages pour le blog
import BlogIndexPage from './pages/BlogIndexPage';
import ArticleDetailPage from './pages/ArticleDetailPage';

// Autres nouvelles pages
import PressePage from './pages/Presse';
import AffiliationPage from './pages/Affiliation';

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
            <Route path="/devis-solenca" element={<LandingConversionPage />} />

            {/* Nouvelles routes marketing */}
            <Route path="/presse" element={<PressePage />} />
            <Route path="/affiliation" element={<AffiliationPage />} />

            {/* Nouvelles routes pour le blog */}
            <Route path="/articles" element={<BlogIndexPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />

          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}
