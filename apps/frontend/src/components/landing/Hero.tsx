'use client';

import React, { useRef, useEffect } from 'react';
import '../../styles/landing/hero.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catCard from '../../assets/hero-illustration.jpg'; // remplace par ton image

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { y: 40, rotate: -5 },
      {
        y: -40,
        rotate: 5,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__left" ref={contentRef}>
<h1 className="hero__headline">
  La tranquillité, toute l’année.
</h1>
<p>
  Solenca veille sur votre résidence secondaire sur la Costa Brava, à Platja d’Aro et alentours. Visites régulières, alertes, rapports photo et services sur-mesure pour une gestion sans stress.
</p>
<a href="#cta" className="hero__button">Réservez votre tranquillité →</a>

        </div>
        <div className="hero__right">
          <img ref={imageRef} src={catCard} alt="Carte Solenca flottante" className="hero__image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
