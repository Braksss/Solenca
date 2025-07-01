// apps/frontend/src/pages/AboutPage.tsx
import React from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/aboutpage.scss';

import heroImg from '../assets/about/solenca-hero.png';
import avatar1 from '../assets/avatars/avatar1.png';
import logo1 from '../assets/partners/stripe.svg';
import logo2 from '../assets/partners/segway.svg';
import logo3 from '../assets/partners/qonto.svg';
import logo4 from '../assets/partners/airbnb.svg';
import logo5 from '../assets/partners/booking.svg';

import kpiHome from '../assets/icons/home.png';
import kpiInvest from '../assets/icons/euro.png';
import kpiSmile from '../assets/icons/smile.png';
import kpiClock from '../assets/icons/clock.png';

import iconSecure from '../assets/icons/securite.png';
import iconAlert from '../assets/icons/securite.png';
import iconReport from '../assets/icons/securite.png';
import iconWeather from '../assets/icons/securite.png';
import iconSmart from '../assets/icons/securite.png';

const partnerLogos = [logo1, logo2, logo3, logo4, logo5];

const kpis = [
  { icon: kpiHome, number: '75+', label: 'Maisons sous veille' },
  { icon: kpiInvest, number: '1.2M€', label: 'Patrimoines protégés' },
  { icon: kpiSmile, number: '98%', label: 'Clients sereins' },
  { icon: kpiClock, number: '24/7', label: 'Présence réactive' }
];


const testimonials = [
  {
    content: 'Solenca m\'a permis de garder un œil sur ma maison depuis la France. Je reçois des comptes-rendus réguliers et visuels, c\'est top !',
    author: 'Ralph Edwards',
    email: 'ralph.e@client.com',
    avatar: avatar1
  }
];

const ecosystemIcons = [
  { icon: iconSecure, label: 'Sécurité' },
  { icon: iconAlert, label: 'Alertes' },
  { icon: iconReport, label: 'Rapports' },
  { icon: iconWeather, label: 'Météo' },
  { icon: iconSmart, label: 'Suivi digital' }
];

const AboutPage: React.FC = () => (
  <>
    <Navbar />

    {/* SECTION 1 — Hero principal */}
    <section className="about-hero">
      <div className="hero-content">
<h1>
  Votre résidence secondaire, sous haute vigilance
</h1>
<p>
  Solenca vous permet de suivre votre maison à distance, où que vous soyez. Alertes, rapports visuels, suivi régulier : votre tranquillité ne prend plus de pause.
</p>

        <div className="cta-row">
          <button className="primary-btn">Découvrir l'offre</button>
          <span className="rating">
            <i className="star">★</i> 4.9
          </span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image">
          <img src={heroImg} alt="Vue d'une villa méditerranéenne" />
        </div>
        <div className="user-badge">
          <div className="avatar-stack">
            <img src={avatar1} alt="user" style={{ left: '0px' }} />
          </div>
          <span>Déjà utilisé par des propriétaires exigeants</span>
        </div>
      </div>
    </section>

    {/* SECTION 2 — Logos partenaires */}
    <section className="about-logos">
      {partnerLogos.map((logo, idx) => (
        <img key={idx} src={logo} alt="partner logo" />
      ))}
    </section>

    {/* SECTION 3 — Indicateurs clés */}
    <section className="about-kpis">
      {kpis.map(({ icon, number, label }) => (
        <div key={label} className="kpi">
          <img src={icon} alt="kpi icon" />
          <span className="number">{number}</span>
          <span className="label">{label}</span>
        </div>
      ))}
    </section>

    

    {/* SECTION 4 — Témoignage global */}
    <section className="about-quote">
      <p>
      <p>
  <span className="highlight">Solenca</span> est plus qu’un service de surveillance. C’est une solution complète, pensée pour les propriétaires de résidences secondaires en Espagne — d’abord en Costa Brava, bientôt au-delà. Inspections, rapports visuels, alertes intelligentes : tout est centralisé, pour que vous gardiez la maîtrise à distance, sans stress ni surprise.
</p>

      </p>
    </section>

    {/* SECTION 5 — Bloc CTA unifié */}
    <section className="about-cta about-team ecosystem-platform">
      <div className="cta-inner ecosystem-center">
<h2>
  Gardez la main sur votre bien, <span className="fade">même à des centaines de kilomètres</span>
</h2>
<p>
  Solenca vous envoie automatiquement les informations essentielles : passages effectués, anomalies détectées, météo locale, historique complet. Depuis Platja d’Aro, notre équipe veille pour vous, en toute discrétion. L’interface digitale centralise tout ce qui compte. 
</p>

        <div className="cta-buttons">
          <button className="primary-btn">Essayer Solenca</button>
          <button className="secondary-btn">En savoir plus</button>
        </div>
      </div>
      <div className="ecosystem-preview">
        <div className="card-preview left-top">Rapport mensuel</div>
        <div className="card-preview right-top">Alerte détection</div>
        <div className="card-preview left-bottom">Checklist entretien</div>
        <div className="card-preview right-bottom">Historique visites</div>
<div className="card-preview top-float">Dernier passage</div>

      </div>
    </section>


    <Footer />
  </>
);

export default AboutPage;
