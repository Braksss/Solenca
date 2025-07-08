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
import logo6 from '../assets/partners/sabadell.svg';

import kpiHome from '../assets/icons/home.png';
import kpiInvest from '../assets/icons/euro.png';
import kpiSmile from '../assets/icons/smile.png';
import kpiClock from '../assets/icons/clock.png';

import iconSecure from '../assets/icons/securite.png';
import iconAlert from '../assets/icons/securite.png';
import iconReport from '../assets/icons/securite.png';
import iconWeather from '../assets/icons/securite.png';
import iconSmart from '../assets/icons/securite.png';

const partnerLogos = [logo1, logo2, logo3, logo4, logo5, logo6];

const kpis = [
  { icon: kpiHome, number: '75+', label: 'Maisons sous veille' },
  { icon: kpiInvest, number: '1.2M€', label: 'Patrimoines protégés' },
  { icon: kpiSmile, number: '98%', label: 'Clients sereins' },
  { icon: kpiClock, number: '24/7', label: 'Présence réactive' }
];

const testimonials = [
  {
    content: 'Une fois, ils ont détecté une fuite extérieure avant que ça dégénère. J’ai eu le rapport et les photos dans la journée. Service très sérieux.',
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

const avatars = [
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=31',
  'https://i.pravatar.cc/150?img=47',
  'https://i.pravatar.cc/150?img=64',
  'https://i.pravatar.cc/150?img=56',
];

const AboutPage: React.FC = () => (
  <>
    <Navbar />

    {/* SECTION 1 — Hero principal */}
    <section className="about-hero">
      <div className="hero-content">
        <h1>Votre maison sous contrôle</h1>
        <p>
          Recevez des alertes, rapports photo et infos clés, automatiquement. Depuis la France ou ailleurs, gardez l’œil sur ce qui compte, sans stress ni surprise.
        </p>

        <div className="cta-row">
          <button className="primary-btn">Recevoir mon devis gratuit</button>
        
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image">
          <img src={heroImg} alt="Vue d'une villa méditerranéenne" />
        </div>
        <div className="user-badge">
          <div className="avatar-stack">
            {avatars.map((src, i) => (
              <img key={i} src={src} alt={`user ${i + 1}`} style={{ left: `${i * 20}px`, zIndex: 10 - i }} />
            ))}
          </div>
          <span className="user-badge-text">Déjà utilisé par des propriétaires exigeants</span>
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
        <span className="highlight">Solenca</span> c’est bien plus qu’une veille. C’est une présence fiable, réactive, et connectée. Depuis Platja d’Aro, notre équipe surveille votre bien et vous envoie ce qu’il faut : anomalies, météo, historique, passages. Vous avez tout. Et surtout, la tranquillité.
      </p>
    </section>

    {/* SECTION 5 — Bloc CTA unifié */}
    <section className="about-cta about-team ecosystem-platform">
      <div className="cta-inner ecosystem-center">
        <h2>
          La vigilance continue, même quand vous êtes loin
        </h2>
        <p>
          Chaque semaine, nos techniciens vérifient votre maison. Vous recevez un rapport visuel, les alertes en cas d’anomalie, et un historique clair. En un mot : vous restez maître de votre bien, même à distance.
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