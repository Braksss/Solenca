'use client';

import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../styles/landing/hero.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catCard from '../../assets/hero-illustration.jpg';
import qontoLogo from '../../assets/partners/qonto.svg';
import booking from '../../assets/partners/booking.svg';
import stripe from '../../assets/partners/stripe.svg';
import revolut from '../../assets/partners/Revolut.svg';
import sabadell from '../../assets/partners/sabadell.svg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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
          <h1 className="hero__headline">{t('hero.headline')}</h1>
          <p>{t('hero.description')}</p>
          <div className="hero__cta-buttons">
            <Link to="/devis-solenca" className="hero__button hero__button--main">
              {t('hero.cta')}
            </Link>
          </div>

          <div className="hero__proof hero__proof--logos">
            <div className="hero__logos">
              <img src={qontoLogo} alt="Qonto" />
              <img src={booking} alt="Trustpilot" />
              <img src={stripe} alt="Stripe" />
              <img src={revolut} alt="Revolut" />
              <img src={sabadell} alt="Sabadell" />
            </div>
          </div>
        </div>
        <div className="hero__right">
          <img ref={imageRef} src={catCard} alt="Carte Solenca flottante" className="hero__image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
