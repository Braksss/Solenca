import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/aboutpage.scss';

import heroImg from '../assets/about-hero.png';
import founderImg from '../assets/benjamin-brassart.jpg';

// Icônes
import { Shield, Award, MapPin, Smile } from 'react-feather';

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
  'https://i.pravatar.cc/150?img=12', 'https://i.pravatar.cc/150?img=31',
  'https://i.pravatar.cc/150?img=47', 'https://i.pravatar.cc/150?img=64',
  'https://i.pravatar.cc/150?img=56',
];

// Map d'icônes pour la section Valeurs
const iconMap: { [key: string]: React.ReactNode } = {
    Shield: <Shield />, Award: <Award />, MapPin: <MapPin />, Smile: <Smile />
};

function AboutPage() {
  const { t } = useTranslation();

  const kpis = [
    { icon: kpiHome, number: '23', label: t('aboutPage.kpi.0') },
    { icon: kpiInvest, number: '100%', label: t('aboutPage.kpi.1') },
    { icon: kpiSmile, number: '14', label: t('aboutPage.kpi.2') },
    { icon: kpiClock, number: '1/11', label: t('aboutPage.kpi.3') },
  ];

  const values = t('aboutPage.our_values.values', { returnObjects: true }) as { icon: string, title: string, text: string }[];

  return (
    <>
      <Helmet>
        <title>{t('aboutPage.metaTitle')}</title>
      </Helmet>
      <Navbar />
      <main className="about-page-container">
        {/* === 1. Hero === */}
        <section className="about-hero">
            <div className="shell">
                <div className="hero-content">
                <h1>{t('aboutPage.hero.title')}</h1>
                <p>{t('aboutPage.hero.description')}</p>
                <div className="cta-row">
                    <Link className="primary-btn" to="/abonnement">{t('aboutPage.hero.cta')}</Link>
                </div>
                </div>
                <div className="hero-visual">
                <div className="hero-image">
                    <img src={heroImg} alt={t('aboutPage.hero.alt')} />
                </div>
                <div className="user-badge">
                    <div className="avatar-stack">
                    {avatars.map((src, i) => (
                        <img key={i} src={src} alt={`user ${i + 1}`} style={{ left: `${i * 20}px`, zIndex: 10 - i }} />
                    ))}
                    </div>
                    <span>{t('aboutPage.hero.badge')}</span>
                </div>
                </div>
            </div>
        </section>

        {/* === 2. Logos partenaires === */}
        <section className="about-logos">
            <div className="shell">
                {partnerLogos.map((logo, idx) => (
                <img key={idx} src={logo} alt="partner logo" />
                ))}
            </div>
        </section>

        {/* === 3. KPIs === */}
        <section className="about-kpis">
            <div className="shell">
                {kpis.map(({ icon, number, label }, index) => (
                <div key={index} className="kpi">
                    <img src={icon} alt="kpi icon" />
                    <span className="number">{number}</span>
                    <span className="label">{label}</span>
                </div>
                ))}
            </div>
        </section>

        {/* === 4. Histoire du fondateur === */}
        <section className="founder-story">
            <div className="shell">
                <div className="founder-image">
                    <img src={founderImg} alt={t('aboutPage.founder_story.name')} />
                </div>
                <div className="founder-text">
                    <h2>{t('aboutPage.founder_story.title')}</h2>
                    <p>{t('aboutPage.founder_story.p1')}</p>
                    <p>{t('aboutPage.founder_story.p2')}</p>
                    <span className="founder-name">— {t('aboutPage.founder_story.name')}</span>
                </div>
            </div>
        </section>

        {/* === 5. NOUVELLE SECTION : Nos Valeurs === */}
        <section className="our-values">
            <div className="shell">
                <h2>{t('aboutPage.our_values.title')}</h2>
                <div className="values-grid">
                    {Array.isArray(values) && values.map((value, index) => (
                        <div className="value-card" key={index}>
                            <div className="value-icon">{iconMap[value.icon]}</div>
                            <h3>{value.title}</h3>
                            <p>{value.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* === 6. Citation === */}
        <section className="about-quote">
            <div className="shell">
                <p>
                <span className="highlight">Solenca</span> {t('aboutPage.quote')}
                </p>
            </div>
        </section>

        {/* === 7. Bloc CTA === */}
        <section className="about-cta">
            <div className="shell">
                <div className="cta-inner">
                <h2>{t('aboutPage.cta.title')}</h2>
                <p>{t('aboutPage.cta.description')}</p>
                <div className="cta-buttons">
                    <Link className="primary-btn" to="/abonnement">{t('aboutPage.cta.primary')}</Link>
                    <Link className="secondary-btn" to="/abonnement">{t('aboutPage.cta.secondary')}</Link>
                </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;