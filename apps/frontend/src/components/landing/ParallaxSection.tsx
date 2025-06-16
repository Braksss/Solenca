import React from 'react';
import '../../styles/landing/parallax.scss';

const ParallaxSection = () => {
  return (
    <section className="parallax">
      <div className="parallax__left">
        <h2>Une solution pensée pour les Français en Espagne</h2>
        <p>
          Solenca s'adresse à tous ceux qui possèdent une résidence secondaire sur la Costa Brava.
          Suivi à distance, sérénité assurée, vous restez maître à bord où que vous soyez.
        </p>
        <button className="cta">Je découvre les offres</button>
      </div>
      <div className="parallax__right">
        <img src="/assets/map-spain.svg" alt="Carte Espagne" />
      </div>
    </section>
  );
};

export default ParallaxSection;
