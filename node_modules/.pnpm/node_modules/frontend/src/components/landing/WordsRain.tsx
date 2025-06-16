'use client';

import { useEffect, useRef } from 'react';
import type { Engine, World, Bodies, Body } from 'matter-js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/landing/words-rain.scss';

const words = [
  'Fiscalité',
  'NIE',
  'Notaire',
  'Partenaire',
  'Gestion',
  'Espagne',
  'Solenca',
  'Achat',
  'Vente',
  'Clés en main',
  'Sécurité',
  'Digital',
];

type BodyWithEl = Body & { el?: HTMLDivElement };

export default function WordsRain() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current || !titleRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top 60%',
        end: 'bottom -60%',
        scrub: true,
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: -100, opacity: 1, ease: 'power2.out', duration: 0.5 }
    );

    import('matter-js').then(({ Engine, World, Bodies, Events, Body }) => {
      const width = wrapperRef.current!.clientWidth;
      const height = wrapperRef.current!.clientHeight;

      const engine: Engine = Engine.create();
      const world: World = engine.world;
      engine.gravity.y = 0.3;

      const thickness = 100;
      const walls: Body[] = [
        Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
          isStatic: true,
          restitution: 0.5,
        }),
        Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
      ];
      World.add(world, walls);

      const activeWords: BodyWithEl[] = [];

      const spawnWord = () => {
        if (activeWords.length >= 15) return; // Limitation à 15 bulles simultanées

        const x0 = Math.random() * (width - 80) + 40;
        const body = Bodies.circle(x0, -40, 40, {
          restitution: 0.6,
          friction: 0.2,
          frictionAir: 0.02,
          mass: 1,
          inertia: Infinity,
        }) as BodyWithEl;

        const el = document.createElement('div');
        el.className = 'words-rain__word';
        el.textContent = words[Math.floor(Math.random() * words.length)];
        el.style.backgroundColor = 'rgba(255, 130, 0, 0.8)';
        containerRef.current!.appendChild(el);

        body.el = el;
        activeWords.push(body);
        World.add(world, body);

        Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.01,
          y: 0,
        });
      };

      function render() {
        Engine.update(engine, 1000 / 60);

        activeWords.forEach((b, i) => {
          const el = b.el;
          if (!el) return;
          el.style.transform = `translate(${b.position.x - 40}px, ${b.position.y - 40}px)`;
          if (b.position.y > height + 100) {
            // Retirer le mot qui sort de l'écran
            containerRef.current!.removeChild(el);
            World.remove(world, b);
            activeWords.splice(i, 1);
          }
        });

        requestAnimationFrame(render);
      }
      render();

      const interval = setInterval(spawnWord, 800);

      return () => {
        clearInterval(interval);
        tl.kill();
        World.clear(world, false);
        Engine.clear(engine);
      };
    });
  }, []);

  return (
    <section className="words-rain" ref={wrapperRef}>
      <div className="words-rain__content">
        <h1 className="words-rain__title" ref={titleRef}>
          Solenca simplifie tout.
        </h1>
        <div className="words-rain__container" ref={containerRef}></div>
      </div>
    </section>
  );
}
