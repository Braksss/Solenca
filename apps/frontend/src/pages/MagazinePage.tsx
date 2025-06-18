import React from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import Banniere from '../components/shared/Banniere';
import '../styles/pages/magazine.scss';

const MagazinePage = () => {
  return (
    <>
      <Navbar />
      <Banniere
        title="Le Magazine Solenca"
        subtitle="Conseils, inspirations et expertise pour mieux gérer votre résidence secondaire."
      />
      <main className="magazine-page">
        <div className="intro">
          <p>
            Explorez nos articles sur la gestion immobilière, la fiscalité, l’entretien à distance et bien plus encore.
          </p>
        </div>

        <div className="articles-grid">
          <div className="article-card">
            <h3>Comment déléguer sans perdre le contrôle ?</h3>
            <p>Nos conseils pour une gestion sereine à distance.</p>
          </div>
          <div className="article-card">
            <h3>Fiscalité en Espagne : ce qu’il faut savoir</h3>
            <p>Un guide 2025 à jour pour propriétaires étrangers.</p>
          </div>
          <div className="article-card">
            <h3>Les erreurs à éviter quand on possède une maison secondaire</h3>
            <p>Anticipez les imprévus avec nos retours d’expérience.</p>
          </div>
          <div className="article-card">
            <h3>Checklist entretien annuel</h3>
            <p>Les indispensables à contrôler avant chaque saison.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MagazinePage;
