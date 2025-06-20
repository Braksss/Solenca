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
            Solenca simplifie la gestion des résidences secondaires en Espagne, à distance,
            en toute confiance. Une plateforme digitale et humaine qui vous libère des
            contraintes, pour que vous puissiez enfin profiter.
          </p>
          <button className="about-btn">En savoir plus →</button>
        </div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <h3>Réactivité garantie</h3>
          <p>Notre équipe locale intervient dès que nécessaire</p>
          <img src={Icon1} alt="Réactivité garantie" />
        </div>
        <div className="about-card">
          <h3>Suivi digitalisé</h3>
          <p>Une interface claire pour tout suivre depuis la France</p>
          <img src={Icon2} alt="Suivi digitalisé" />
        </div>
        <div className="about-card">
          <h3>Contrôle & sécurité</h3>
          <p>Rapports, photos et alertes en temps réel</p>
          <img src={Icon3} alt="Contrôle & sécurité" />
        </div>
        <div className="about-card">
          <h3>Experts locaux</h3>
          <p>Des professionnels de confiance sur place</p>
          <img src={Icon4} alt="Experts locaux" />
        </div>
      </div>
    </section>
  );
};

export default About;
