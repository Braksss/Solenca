import React, { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/servicespage.scss';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import heroImg from '../assets/hero.png';
import {
  Calendar,
  Camera,
  AlertTriangle,
  Users
} from 'react-feather';

const faqData = [
  {
    question: "Puis-je souscrire depuis l’étranger ?",
    answer: "Absolument ! Solenca est conçu pour une gestion 100 % à distance via web et mobile – parfait pour proprios en France ou ailleurs, pré-lancement novembre 2025.",
  },
  {
    question: "Sous quel délai intervenez-vous ?",
    answer: "Nous intervenons sous 24 h (4 h en cas d’urgence). Dès lancement novembre, sérénité garantie en Costa Brava.",
  },
  {
    question: "Comment suis-je informé après une visite ?",
    answer: "Vous recevez un rapport photo horodaté dans votre espace – clair et simple pour proprios ou agences loc.",
  },
  {
    question: "Que se passe-t-il en cas d’anomalie détectée ?",
    answer: "Alerte instantanée, puis solution adaptée ou pro local. Pré-réservez pour early accès novembre.",
  },
  {
    question: "Puis-je personnaliser le contenu de mes visites ?",
    answer: "Oui, options à la carte (jardin, piscine...) – personnalisé pour votre bien en Costa Brava.",
  },
  {
    question: "Travaillez-vous avec les agences immobilières ?",
    answer: "Oui, offre dédiée en marque blanche pour agences loc – gestion hors-saison sans effort, lancement novembre.",
  },
  {
    question: "Mon logement est-il éligible à Solenca ?",
    answer: "Nous couvrons résidences secondaires en Costa Brava – validation individuelle, pré-lancement ouvert.",
  },
  {
    question: "Puis-je arrêter ou suspendre mon abonnement ?",
    answer: "Oui, sans engagement long – flexible pour proprios ou agences, dès novembre 2025.",
  }
];

const ServicesFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="services-faq">
      <h2>Questions fréquentes</h2>
      <p className="faq-intro">
        Vous hésitez ? Voici les réponses aux questions les plus courantes – pré-lancement novembre 2025, réservez early pour 20% off !
      </p>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggle(index)}>
              <span className="faq-number">{index + 1}</span>
              <span className="faq-text">{faq.question}</span>
              <span className={`faq-toggle ${activeIndex === index ? 'open' : ''}`}>
                {activeIndex === index ? '−' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'visible' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Solenca : Services - Gestion Biens Secondaires Costa Brava</title>
        <meta name="description" content="Découvrez nos services Solenca : visites régulières, alertes, rapports photo pour sérénité totale en Costa Brava. Pré-lancement novembre 2025, réservez early pour 20% off !" />
        {/* Ajoute keywords, OG */}
      </Helmet>
      <Navbar />

      <main className="services-page">
        {/* HERO */}
        <section className="services-hero">
          <div className="hero-content">
            <h1>{t('services.hero.title')}</h1>
            <p>
              {t('services.hero.description')}
            </p>
            <div className="cta-row">
              <button className="primary-btn">{t('services.hero.cta')}</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <img src={heroImg} alt="Aperçu application Solenca" />
            </div>
          </div>
        </section>

        <section className="mobile-swap">
          {/* BLOC PARTICULIERS */}
          <section className="about-section features-block">
            <div className="about-top">
              <div className="about-top__left">
                <h2>{t('services.private.title')}</h2>
              </div>
              <div className="about-top__right">
                <p>
                  {t('services.private.description')}
                </p>
                <button className="about-btn">{t('services.private.cta')}</button>
              </div>
            </div>
            <div className="about-cards">
              <div className="about-card">
                <Calendar size={40} color="#ff8700" />
                <h3>{t('services.private.card1.title')}</h3>
                <p>{t('services.private.card1.text')}</p>
              </div>
              <div className="about-card">
                <AlertTriangle size={40} color="#ff8700" />
                <h3>{t('services.private.card2.title')}</h3>
                <p>{t('services.private.card2.text')}</p>
              </div>
              <div className="about-card">
                <Users size={40} color="#ff8700" />
                <h3>{t('services.private.card3.title')}</h3>
                <p>{t('services.private.card3.text')}</p>
              </div>
              <div className="about-card">
                <Camera size={40} color="#ff8700" />
                <h3>{t('services.private.card4.title')}</h3>
                <p>{t('services.private.card4.text')}</p>
              </div>
            </div>
          </section>

          {/* QUOTE */}
          <section className="about-quote">
            <p>
              “{t('services.quote')}”<br />
              <span className="highlight">— {t('services.quoteAuthor')}</span>
            </p>
          </section>

          {/* BLOC PRO */}
          <section className="about-section features-block">
            <div className="pro-badge">PRO</div>
            <div className="about-top">
              <div className="about-top__left">
                <h2>{t('services.pro.title')}</h2>
              </div>
              <div className="about-top__right">
                <p>
                  {t('services.pro.description')}
                </p>
                <button className="about-btn">{t('services.pro.cta')}</button>
              </div>
            </div>

            <div className="about-cards">
              <div className="about-card">
                <Calendar size={40} color="#ff8700" />
                <h3>{t('services.pro.card1.title')}</h3>
                <p>{t('services.pro.card1.text')}</p>
              </div>
              <div className="about-card">
                <Camera size={40} color="#ff8700" />
                <h3>{t('services.pro.card2.title')}</h3>
                <p>{t('services.pro.card2.text')}</p>
              </div>
              <div className="about-card">
                <AlertTriangle size={40} color="#ff8700" />
                <h3>{t('services.pro.card3.title')}</h3>
                <p>{t('services.pro.card3.text')}</p>
              </div>
              <div className="about-card">
                <Users size={40} color="#ff8700" />
                <h3>{t('services.pro.card4.title')}</h3>
                <p>{t('services.pro.card4.text')}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <ServicesFAQ />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;