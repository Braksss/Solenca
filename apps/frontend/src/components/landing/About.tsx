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
            Votre maison est loin ? <br />
            Nous, on est là.
          </h2>
        </div>
        <div className="about-top__right">
          <p>
            Une présence humaine, des preuves concrètes, un suivi digital. La tranquillité, 365 jours par an.
          </p>
          <button className="about-btn">Découvrir la tranquillité 365 →</button>
        </div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <h3>Interventions immédiates</h3>
          <p>Sur place, sans délai. On agit comme si c’était chez nous.</p>
          <img src={Icon1} alt="Réactivité garantie" />
        </div>
        <div className="about-card">
          <h3>Suivi digital en temps réel</h3>
          <p>Rapports, photos, alertes. Tout est là, en un clic.</p>
          <img src={Icon2} alt="Suivi digitalisé" />
        </div>
        <div className="about-card">
          <h3>Des preuves, pas des promesses</h3>
          <p>Vous voyez tout, à chaque passage.</p>
          <img src={Icon3} alt="Contrôle & sécurité" />
        </div>
        <div className="about-card">
          <h3>Présence locale engagée</h3>
          <p>On vit ici. Pas de sous-traitance.</p>
          <img src={Icon4} alt="Experts locaux" />
        </div>
      </div>
    </section>
  );
}

export default About;
