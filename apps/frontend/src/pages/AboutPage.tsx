import React from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/aboutpage.scss';
import Banniere from '../components/shared/Banniere';

import team1 from '../assets/about/team1.png';
import team2 from '../assets/about/team2.png';
import team3 from '../assets/about/team3.png';
import houseImage from '../assets/about/house.png';
import brandsImage from '../assets/about/brands.png';
import reviewsImage from '../assets/about/reviews.png';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Banniere title="À propos de Solenca" subtitle="Tranquillité. Confiance. Simplicité." />

      <main className="aboutpage">
        {/* Hero */}
        <section className="aboutpage__hero">
          <div className="aboutpage__text">
            <h1>Confiez votre bien en toute confiance</h1>
            <p>
              Grâce à une technologie propriétaire et un suivi humain,
              Solenca protège, entretient et optimise les résidences secondaires.
            </p>
            <button className="cta-button">Je précommande</button>
            <p className="note">⭐️ 4.9 / 5 par nos clients</p>
          </div>
          <div className="aboutpage__image">
            <img src={houseImage} alt="Villa gérée par Solenca" />
          </div>
        </section>

        {/* Marques clients */}
        <section className="aboutpage__brands">
          <img src={brandsImage} alt="Clients et partenaires" />
        </section>

        {/* Stats */}
        <section className="aboutpage__stats">
          <div className="stat">
            <h2>1K+</h2>
            <p>Maisons gérées</p>
          </div>
          <div className="stat">
            <h2>98%</h2>
            <p>de satisfaction</p>
          </div>
          <div className="stat">
            <h2>50+</h2>
            <p>Zones couvertes</p>
          </div>
          <div className="stat">
            <h2>365j</h2>
            <p>de tranquillité</p>
          </div>
        </section>

        {/* Équipe */}
        <section className="aboutpage__team">
          <h2>Votre interlocuteur local, pas un robot</h2>
          <div className="team-cards">
            <div className="team-card">
              <img src={team1} alt="Responsable local 1" />
              <h4>Benjamin Brassart</h4>
              <p>Fondateur & Référent local</p>
            </div>
            <div className="team-card">
              <img src={team2} alt="Responsable local 2" />
              <h4>Responsable partenaire</h4>
              <p>Gestion quotidienne</p>
            </div>
            <div className="team-card">
              <img src={team3} alt="Expert technique" />
              <h4>Expert technique</h4>
              <p>Maintenance & suivi qualité</p>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="aboutpage__testimonials">
          <img src={reviewsImage} alt="Avis clients Solenca" />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
