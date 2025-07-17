import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import SubscriptionModal from '../components/abonnement/SubscriptionModal';
import SubscriptionModalPro from '../components/abonnement/SubscriptionModalPro';
import '../styles/abonnement/abonnement.scss';
import { Helmet } from 'react-helmet';

import heroImg from '../assets/villa-solenca.jpg';

const AbonnementPage = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const handleClick = (pro: boolean) => {
    setIsPro(pro);
    setShowModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Solenca : Abonnements - Gestion Biens Secondaires Costa Brava</title>
        <meta name="description" content="Abonnez-vous à Solenca pour sérénité totale sur votre villa en Costa Brava. Visites, entretien, rapports – pré-lancement novembre 2025, 20% off early !" />
        {/* Ajoute keywords, OG */}
      </Helmet>
      <Navbar />

      <section className="abonnement-hero">
        <div className="hero-content">
          <h1>{t('subscription.hero.title')}</h1>
          <p>{t('subscription.hero.description')}</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => handleClick(false)}>
              {t('subscription.hero.cta')}
            </button>
            <button className="secondary-btn" onClick={() => handleClick(true)}>
              {t('subscription.hero.pro')}
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Villa méditerranéenne en Costa Brava" />
        </div>
      </section>

      {showModal && (
        isPro ? (
          <SubscriptionModalPro onClose={() => setShowModal(false)} />
        ) : (
          <SubscriptionModal onClose={() => setShowModal(false)} />
        )
      )}

      <Footer />
    </>
  );
};

export default AbonnementPage;