// apps/frontend/src/pages/AboutPage.tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/aboutpage.scss';

import heroImg from '../assets/hero-about.jpg';
import avatar1 from '../assets/avatars/avatar1.png';

// Logos partenaires
import logo1 from '../assets/partners/stripe.svg';
import logo2 from '../assets/partners/segway.svg';
import logo3 from '../assets/partners/qonto.svg';
import logo4 from '../assets/partners/airbnb.svg';
import logo5 from '../assets/partners/booking.svg';
import logo6 from '../assets/partners/sabadell.svg';

// Icônes KPI
import kpiHome from '../assets/icons/home.png';
import kpiInvest from '../assets/icons/euro.png';
import kpiSmile from '../assets/icons/smile.png';
import kpiClock from '../assets/icons/clock.png';

const partnerLogos = [logo1, logo2, logo3, logo4, logo5, logo6];

const avatars = [
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=31',
  'https://i.pravatar.cc/150?img=47',
  'https://i.pravatar.cc/150?img=64',
  'https://i.pravatar.cc/150?img=56',
];

function AboutPage() {
  const { t } = useTranslation();

  const kpis = [
    { icon: kpiHome, number: '23', label: t('aboutPage.kpi.0') },
    { icon: kpiInvest, number: '100%', label: t('aboutPage.kpi.1') },
    { icon: kpiSmile, number: '14', label: t('aboutPage.kpi.2') },
    { icon: kpiClock, number: '1/11', label: t('aboutPage.kpi.3') },
  ];

  return (
    <>
      <Helmet>
        <title>{t('aboutPage.metaTitle', 'On se présente ? — Solenca')}</title>
      </Helmet>
      <Navbar />

      {/* === 1. Hero ===================== */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>{t('aboutPage.hero.title')}</h1>
          <p>{t('aboutPage.hero.description')}</p>

          <div className="cta-row">
            <Link className="primary-btn" to="/abonnement">
              {t('aboutPage.hero.cta')}
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image">
            <img src={heroImg} alt={t('aboutPage.hero.alt', 'Vue d’une villa en Costa Brava')} />
          </div>

          <div className="user-badge">
            <div className="avatar-stack">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`user ${i + 1}`}
                  style={{ left: `${i * 20}px`, zIndex: 10 - i }}
                />
              ))}
            </div>
            <span>{t('aboutPage.hero.badge', 'Déjà choisi par des proprios exigeants')}</span>
          </div>
        </div>
      </section>

      {/* === 2. Logos partenaires ===================== */}
      <section className="about-logos">
        {partnerLogos.map((logo, idx) => (
          <img key={idx} src={logo} alt="partner logo" />
        ))}
      </section>

      {/* === 3. KPIs ===================== */}
      <section className="about-kpis">
        {kpis.map(({ icon, number, label }, index) => (
          <div key={index} className="kpi">
            <img src={icon} alt="kpi icon" />
            <span className="number">{number}</span>
            <span className="label">{label}</span>
          </div>
        ))}
      </section>

      {/* === 4. Citation ===================== */}
      <section className="about-quote">
        <p>
          <span className="highlight">Solenca</span> {t('aboutPage.quote')}
        </p>
      </section>

      {/* === 5. Bloc CTA ===================== */}
      <section className="about-cta about-team ecosystem-platform">
        <div className="cta-inner ecosystem-center">
          <h2>{t('aboutPage.cta.title')}</h2>
          <p>{t('aboutPage.cta.description')}</p>

          <div className="cta-buttons">
            <Link className="primary-btn" to="/abonnement">
              {t('aboutPage.cta.primary')}
            </Link>
            <Link className="secondary-btn" to="/abonnement">
              {t('aboutPage.cta.secondary')}
            </Link>
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
}

export default AboutPage;
