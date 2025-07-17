import React from 'react';
import { useTranslation } from 'react-i18next';
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
  { icon: kpiHome, number: '24' },
  { icon: kpiInvest, number: '98%' },
  { icon: kpiSmile, number: '100%' },
  { icon: kpiClock, number: '-20%' }
];

const testimonials = [
  {
    content: 'Excité pour novembre – Solenca va gérer ma villa en Costa Brava avec sérieux total. Pré-réservé pour la paix d’esprit !',
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

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />

      {/* SECTION 1 — Hero principal */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>{t('aboutPage.hero.title')}</h1>
          <p>
            {t('aboutPage.hero.description')}
          </p>

          <div className="cta-row">
            <button className="primary-btn">{t('aboutPage.hero.cta')}</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image">
            <img src={heroImg} alt="Vue d'une villa méditerranéenne en Costa Brava" />
          </div>
          <div className="user-badge">
            <div className="avatar-stack">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt={`user ${i + 1}`} style={{ left: `${i * 20}px`, zIndex: 10 - i }} />
              ))}
            </div>
            <span className="user-badge-text">{t('aboutPage.hero.badge')}</span>
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
        {kpis.map(({ icon, number }, index) => (
          <div key={index} className="kpi">
            <img src={icon} alt="kpi icon" />
            <span className="number">{number}</span>
            <span className="label">{t(`aboutPage.kpi.${index}`)}</span>
          </div>
        ))}
      </section>

      {/* SECTION 4 — Témoignage global */}
      <section className="about-quote">
        <p>
          <span className="highlight">Solenca</span> {t('aboutPage.quote')}
        </p>
      </section>

      {/* SECTION 5 — Bloc CTA unifié */}
      <section className="about-cta about-team ecosystem-platform">
        <div className="cta-inner ecosystem-center">
          <h2>{t('aboutPage.cta.title')}</h2>
          <p>
            {t('aboutPage.cta.description')}
          </p>

          <div className="cta-buttons">
            <button className="primary-btn">{t('aboutPage.cta.primary')}</button>
            <button className="secondary-btn">{t('aboutPage.cta.secondary')}</button>
          </div>
        </div>
        <div className="ecosystem-preview">
          <div className="card-preview left-top">{t('aboutPage.cards.monthlyReport')}</div>
          <div className="card-preview right-top">{t('aboutPage.cards.alert')}</div>
          <div className="card-preview left-bottom">{t('aboutPage.cards.checklist')}</div>
          <div className="card-preview right-bottom">{t('aboutPage.cards.history')}</div>
          <div className="card-preview top-float">{t('aboutPage.cards.lastVisit')}</div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;