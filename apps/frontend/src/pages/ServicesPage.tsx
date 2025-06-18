import React from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/services.scss';

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <main className="services-page">
        <h1>Nos services</h1>
        <section className="services-list">
          <div className="service-card">
            <h2>Solenca Care</h2>
            <p>Gestion complète de votre résidence secondaire à distance, dès 129€/mois.</p>
          </div>
          <div className="service-card">
            <h2>Solenca VIP</h2>
            <p>Offre sur-mesure pour résidences haut de gamme, accompagnement ultra-personnalisé.</p>
          </div>
          <div className="service-card">
            <h2>Solenca B2B</h2>
            <p>Services externalisés pour agences et pros : reporting, contrôle, maintenance.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
