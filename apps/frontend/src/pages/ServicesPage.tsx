import React, { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/servicespage.scss';

import heroImg from '../assets/hero.png';
import iconPlan from '../assets/icons/home.png';
import iconReport from '../assets/icons/home.png';
import iconSecure from '../assets/icons/home.png';
import iconExpert from '../assets/icons/home.png';

const faqData = [
  {
    question: "Puis-je souscrire depuis l’étranger ?",
    answer: "Absolument ! Solenca est conçu pour une gestion 100 % à distance via web et mobile.",
  },
  {
    question: "Sous quel délai intervenez-vous ?",
    answer: "Nous intervenons sous 24 h (4 h en cas d’urgence signalée).",
  },
  {
    question: "Comment suis-je informé après une visite ?",
    answer: "Vous recevez un rapport photo horodaté, disponible dans votre espace client sécurisé.",
  },
  {
    question: "Que se passe-t-il en cas d’anomalie détectée ?",
    answer: "Vous recevez une alerte instantanée. Nous vous proposons ensuite une solution adaptée ou une mise en relation avec un professionnel local.",
  },
  {
    question: "Puis-je personnaliser le contenu de mes visites ?",
    answer: "Oui, chaque client peut définir ses besoins spécifiques, ou activer des options à la carte.",
  },
  {
    question: "Travaillez-vous avec les agences immobilières ?",
    answer: "Oui. Nous proposons une offre professionnelle dédiée en marque blanche pour les agences, syndics et conciergeries.",
  },
  {
    question: "Mon logement est-il éligible à Solenca ?",
    answer: "Nous couvrons les résidences secondaires sur la Costa Brava (Platja d’Aro, S’Agaró...). Chaque bien est validé individuellement.",
  },
  {
    question: "Puis-je arrêter ou suspendre mon abonnement ?",
    answer: "Oui, nos offres sont sans engagement long terme. Vous êtes libre de modifier ou suspendre selon vos besoins.",
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
        Vous hésitez ? Voici les réponses aux questions les plus courantes.
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

const ServicesPage: React.FC = () => (
  <>
    <Navbar />

    <main className="services-page">
      {/* HERO */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Votre maison, toujours sous contrôle</h1>
          <p>
            Solenca prend en charge votre résidence secondaire depuis la Costa Brava,
            avec rigueur, transparence et efficacité. Vous gérez à distance, nous agissons sur place.
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

      <section className="mobile-swap">
        {/* BLOC PARTICULIERS */}
        <section className="about-section features-block">
          <div className="about-top">
            <div className="about-top__left">
              <h2>Une prise en charge complète<br />de votre résidence secondaire</h2>
            </div>
            <div className="about-top__right">
              <p>
                Inspections régulières, remontée d’alertes, suivi des interventions :
                Solenca vous offre un pilotage sans friction. Tout est tracé, organisé, centralisé, pour votre tranquillité.
              </p>
              <button className="about-btn">Demander un devis →</button>
            </div>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <h3>Visites sur-mesure</h3>
              <p>Ouvertures, contrôles, arrosage : vous choisissez, nous exécutons.</p>
              <img src={iconPlan} alt="Interventions planifiées" />
            </div>
            <div className="about-card">
              <h3>Comptes-rendus visuels</h3>
              <p>Photos et checklist détaillée envoyées après chaque passage.</p>
              <img src={iconReport} alt="Rapports visuels" />
            </div>
            <div className="about-card">
              <h3>Alertes instantanées</h3>
              <p>Fuite, intrusion ? Notification instantanée et action proposée.</p>
              <img src={iconSecure} alt="Alerte et sécurité" />
            </div>
            <div className="about-card">
              <h3>Artisans de confiance</h3>
              <p>Jardinier, pisciniste, homme de confiance : pros sélectionnés.</p>
              <img src={iconExpert} alt="Réseau local" />
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="about-quote">
          <p>
            “Nous avons conçu Solenca pour créer un nouveau standard dans la gestion de résidences secondaires.
            C’est aujourd’hui un outil structurant pour particuliers comme professionnels.”<br />
            <span className="highlight">— Le fondateur de Solenca</span>
          </p>
        </section>

        {/* BLOC PRO */}
        <section className="about-section features-block">
          <div className="pro-badge">PRO</div>
          <div className="about-top">
            <div className="about-top__left">
              <h2>Un partenaire opérationnel<br />pour les professionnels</h2>
            </div>
            <div className="about-top__right">
              <p>
                Vous gérez des biens à distance ou pour le compte de clients ?
                Solenca vous apporte une solution prête à l’emploi, en marque blanche,
                avec suivi, réactivité et interface dédiée.
              </p>
              <button className="about-btn">Accéder à l’offre pro →</button>
            </div>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <h3>Suivi complet délégué</h3>
              <p>Solenca prend en charge le suivi des logements confiés, de A à Z.</p>
              <img src={iconPlan} alt="Gestion externalisée" />
            </div>
            <div className="about-card">
              <h3>Outils pros intégrés</h3>
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
        <ServicesFAQ />
      </section>
    </main>

    <Footer />
  </>
);

export default ServicesPage;
