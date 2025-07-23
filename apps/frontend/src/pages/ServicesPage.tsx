import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/servicespage.scss';
import {
  Calendar,
  Camera,
  AlertTriangle,
  Users
} from 'react-feather';

import heroImg from '../assets/hero-service.jpg';

const ServicesFAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = t('services.faq', { returnObjects: true }); // Array from JSON

  return (
    <section className="services-faq">
      <h2>Questions fréquentes</h2>
      <p className="faq-intro">
        Vous hésitez ? Voici les réponses aux questions les plus courantes – pré-lancement novembre 2025, réservez early pour 20% off !
      </p>

      <div className="faq-list">
        {faqData.map((faq: { question: string; answer: string }, index: number) => (
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