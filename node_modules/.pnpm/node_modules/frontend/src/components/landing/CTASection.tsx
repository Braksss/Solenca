// src/components/landing/CTASection.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/landing/cta.scss';
import catIllustration from '../../assets/solencea-cat.png';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !imageRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-section__content" ref={contentRef}>
        <h2 className="cta-section__title">
          Gagnez du temps,<br />profitez pleinement de votre bien en Espagne
        </h2>
        <p className="cta-section__text">
          Solenca s’occupe de tout pour votre maison secondaire : gestion, surveillance, vente ou location.
        </p>
        <button className="cta-section__btn">Je passe à l’action</button>
      </div>
      <div className="cta-section__image" ref={imageRef}>
        <img src={catIllustration} alt="Illustration Solenca" />
      </div>
    </section>
  );
};

export default CTASection;
