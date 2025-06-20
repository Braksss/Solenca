import React from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/servicespage.scss';

import heroImg     from '../assets/hero.png';
import iconPlan    from '../assets/icons/home.png';
import iconReport  from '../assets/icons/home.png';
import iconSecure  from '../assets/icons/home.png';
import iconExpert  from '../assets/icons/home.png';

const ServicesPage: React.FC = () => (
  <>
    <Navbar />

    <main className="services-page">
      {/* HERO */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>
            Gérez votre résidence<br />
            secondaire sans stress
          </h1>
          <p>
            Interventions programmées, rapports visuels et alertes : Solenca orchestre tout
            sur place pendant que vous pilotez à distance.
          </p>
          <div className="cta-row">
            <button className="primary-btn">Découvrir nos packs</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image">
            <img src={heroImg} alt="Aperçu application Solenca" />
          </div>
        </div>
      </section>

      {/* SWAP – FAQ remonte sur mobile */}
      <section className="mobile-swap">
        {/* FEATURES 1 */}
        <section className="about-section features-block">
          <div className="about-top">
            <div className="about-top__left">
              <h2>
                Une couverture totale<br />
                de votre maison secondaire
              </h2>
            </div>
            <div className="about-top__right">
              <p>
                Solenca prend en charge la vigilance, l’entretien et les urgences de votre
                maison secondaire. Notre plateforme digitale vous offre une visibilité totale,
                notre réseau local exécute dans les meilleurs délais.
              </p>
              <button className="about-btn">Demander un devis →</button>
            </div>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <h3>Interventions planifiées</h3>
              <p>Ouvertures, contrôles, arrosage : vous choisissez, nous exécutons.</p>
              <img src={iconPlan} alt="Interventions planifiées" />
            </div>

            <div className="about-card">
              <h3>Rapports visuels</h3>
              <p>Photos et checklist détaillée envoyées après chaque passage.</p>
              <img src={iconReport} alt="Rapports visuels" />
            </div>

            <div className="about-card">
              <h3>Alerte &amp; sécurité</h3>
              <p>Fuite, intrusion ? Notification instantanée et action proposée.</p>
              <img src={iconSecure} alt="Alerte et sécurité" />
            </div>

            <div className="about-card">
              <h3>Réseau local</h3>
              <p>Jardinier, pisciniste, homme de confiance : pros sélectionnés.</p>
              <img src={iconExpert} alt="Réseau local" />
            </div>
          </div>
        </section>

        <section className="about-quote">
  <p>
    “Solenca a transformé notre façon de gérer les maisons secondaires. Aujourd’hui, même les agences s’appuient sur notre savoir-faire.”<br />
    <span className="highlight">— Le fondateur de Solenca</span>
  </p>
</section>


<section className="about-section features-block">
   <div className="pro-badge">PRO</div> 
  <div className="about-top">
    <div className="about-top__left">
      <h2>
        Un service fiable<br />
        pour les pros exigeants
      </h2>
    </div>
    <div className="about-top__right">
      <p>
        Vous êtes une agence, un syndic ou un gestionnaire de biens ?
        Solenca vous propose une solution marque blanche pour gérer les biens de vos clients
        avec réactivité, transparence et rigueur.
      </p>
      <button className="about-btn">Accéder à l’offre pro →</button>
    </div>
  </div>

  <div className="about-cards">
    <div className="about-card">
      <h3>Gestion externalisée</h3>
      <p>Solenca prend en charge le suivi des logements confiés, de A à Z.</p>
      <img src={iconPlan} alt="Gestion externalisée" />
    </div>

    <div className="about-card">
      <h3>Interface partagée</h3>
      <p>Suivi client + back-office dédié aux pros pour tout piloter simplement.</p>
      <img src={iconReport} alt="Interface partagée" />
    </div>

    <div className="about-card">
      <h3>Marque blanche</h3>
      <p>Proposez nos services sous votre nom avec vos propres tarifs.</p>
      <img src={iconSecure} alt="Marque blanche" />
    </div>

    <div className="about-card">
      <h3>Équipe locale dédiée</h3>
      <p>Des pros de confiance pour intervenir en votre nom sur le terrain.</p>
      <img src={iconExpert} alt="Équipe locale dédiée" />
    </div>
  </div>
</section>

        {/* FAQ */}
        <section className="services-faq">
          <h2>Questions fréquentes</h2>
          <p className="faq-intro">
            Vous hésitez ? Voici les réponses aux questions les plus courantes.
          </p>

          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                <span className="faq-number">1</span>
                <span className="faq-text">Puis-je souscrire depuis l’étranger ?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                Absolument ! Solenca est conçu pour une gestion 100 % à distance via web et mobile.
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span className="faq-number">2</span>
                <span className="faq-text">Sous quel délai intervenez-vous ?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                Nous intervenons sous 24 h (4 h en cas d’urgence signalée).
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <span className="faq-number">3</span>
                <span className="faq-text">Comment suis-je informé après une visite ?</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                Vous recevez un rapport photo horodaté, disponible dans votre espace client.
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>

    <Footer />
  </>
);

export default ServicesPage;