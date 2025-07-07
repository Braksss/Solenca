// apps/frontend/src/pages/abonnement.tsx

import React, { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import SubscriptionModal from '../components/abonnement/SubscriptionModal';
import SubscriptionModalPro from '../components/abonnement/SubscriptionModalPro';
import '../styles/abonnement/abonnement.scss';

import heroImg from '../assets/villa-solenca.jpg';

const AbonnementPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const handleClick = (pro: boolean) => {
    setIsPro(pro);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />

      <section className="abonnement-hero">
        <div className="hero-content">
          <h1>Votre tranquillité annuelle, en toute simplicité</h1>
          <p>Solenca 365 est l'abonnement unique pour gérer, surveiller et entretenir votre résidence secondaire, sans compromis.</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => handleClick(false)}>
              Accéder à mon devis digital
            </button>
            <button className="secondary-btn" onClick={() => handleClick(true)}>
              Espace Professionnel
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Villa méditerranéenne" />
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