// apps/frontend/src/components/landing/About.tsx
import React from 'react';
import '../../styles/landing/about.scss';
import Icon1 from '../../assets/icons/reactivite.png';
import Icon2 from '../../assets/icons/suivi.png';
import Icon3 from '../../assets/icons/securite.png';
import Icon4 from '../../assets/icons/experts.png';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-top">
        <div className="about-top__left">
          <h2>
            Une solution pensée
            pour les <br />propriétaires<br />
          </h2>
        </div>
        <div className="about-top__right">
<p>
  Solenca accompagne les propriétaires de résidences secondaires à Platja d’Aro et ses environs. Notre mission : vous offrir la tranquillité toute l’année grâce à une approche structurée, digitale et humaine à la fois.
</p>

          <button className="about-btn">En savoir plus →</button>
        </div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <h3>Interventions rapides</h3>
          <p>Un imprévu ? Notre présence locale permet d’agir sans délai.</p>
          <img src={Icon1} alt="Réactivité garantie" />
        </div>
        <div className="about-card">
          <h3>Suivi centralisé</h3>
          <p>Une interface claire et intuitive pour tout suivre à distance.</p>
          <img src={Icon2} alt="Suivi digitalisé" />
        </div>
        <div className="about-card">
          <h3>Preuves & alertes</h3>
          <p>Photos, rapports et notifications en temps réel sur l’état du bien.</p>
          <img src={Icon3} alt="Contrôle & sécurité" />
        </div>
        <div className="about-card">
          <h3>Fiabilité locale</h3>
          <p>Des professionnels présents sur place.</p>
          <img src={Icon4} alt="Experts locaux" />
        </div>
      </div>
    </section>
  );
};

export default About;
