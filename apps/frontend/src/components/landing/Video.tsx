// apps/frontend/src/components/landing/Video.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoFile from '../../assets/intro-solenca.mp4'; // Importation de la vidéo
import '../../styles/landing/video.scss';

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = videoWrapperRef.current;
    const section = sectionRef.current;
    const border = borderRef.current;

    if (!wrapper || !section || !border) return;

    // Effet de parallax inverse : la vidéo monte plus vite pour rattraper Hero
    gsap.fromTo(
      wrapper,
      { y: '20%' }, // Départ plus bas
      {
        y: '-50%', // Monte rapidement pour rattraper (ajuste ce pourcentage)
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom', // Commence quand le haut de Video atteint le bas de Hero
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Agrandissement de la bordure orange pour remplir la page
    gsap.fromTo(
      border,
      { width: '300px', height: '300px', borderWidth: '10px' },
      {
        width: '100vw',
        height: '100vh',
        borderWidth: '50px', // Épaisseur finale de la bordure
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom -50%', // Continue après la fin de la section
          scrub: true,
        },
      }
    );

    // Transition de fond (optionnel, peut être supprimé si non désiré)
    gsap.fromTo(
      section,
      { backgroundColor: '#f9f9f9' },
      {
        backgroundColor: '#ff8200',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="video-section" ref={sectionRef} style={{ zIndex: 10 }}>
      <div className="video-border" ref={borderRef}>
        <div className="video-wrapper" ref={videoWrapperRef}>
          <video
            className="video-element"
            src={videoFile}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default Video;