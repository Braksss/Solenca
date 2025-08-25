import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/club.scss';

type Teaser = {
  id: string;
  city: string;
  title: string;
  tags: string[];
  priceBand: string;
  image: string;
  image2x?: string;
};

const TEASERS: Teaser[] = [
  {
    id: 't1',
    city: 'S’Agaró',
    title: 'Villa vue mer — rafraîchissement',
    tags: ['Off-market', 'Rénovation douce'],
    priceBand: '1.2–1.5 M€',
    image: '/assets/club/biens/sagaro-vue-mer.jpg',
    image2x: '/assets/club/biens/sagaro-vue-mer@2x.jpg'
  },
  {
    id: 't2',
    city: 'Platja d’Aro',
    title: 'Penthouse clé-en-main',
    tags: ['Clé-en-main', 'Dernier étage'],
    priceBand: '650–750 k€',
    image: '/assets/club/biens/platja-penthouse.jpg',
    image2x: '/assets/club/biens/platja-penthouse@2x.jpg'
  },
  {
    id: 't3',
    city: 'Begur',
    title: 'Projet terrain + MOE',
    tags: ['Terrain', 'Projet coordonné'],
    priceBand: 'Sur étude',
    image: '/assets/club/biens/begur-terrain-moe.jpg',
    image2x: '/assets/club/biens/begur-terrain-moe@2x.jpg'
  }
];

function ClubPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const openCrisp = () => {
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:open']);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('club.metaTitle')}</title>
        <meta name="description" content={t('club.metaDescription')} />
      </Helmet>

      <Navbar />

      <main className="club-page">
        {/* HERO — image de fond + wordmark fine (CLUB en orange) */}
        <section className="club-hero">
          <div className="club-hero__overlay" aria-hidden />
          <div className="club-hero__inner">
            <p className="wordmark" aria-hidden>
              <span className="wordmark__solenca">SOLENCA</span>
              <span className="wordmark__club">CLUB</span>
            </p>
            <h1 className="title">{t('club.hero.title')}</h1>
            <p className="subtitle">{t('club.hero.subtitle')}</p>

            <div className="hero-ctas">
              <button className="primary-btn" onClick={() => setOpen(true)}>
                {t('club.hero.cta')}
              </button>
              <button className="secondary-btn" onClick={openCrisp}>
                {t('club.hero.ctaFounder')}
              </button>
            </div>
          </div>
        </section>

        {/* SÉLECTION — section principale avec cartes images */}
        <section className="club-selection">
          <div className="club-selection__bg" aria-hidden />
          <div className="container">
            <header className="header">
              <h2>{t('club.selection.title')}</h2>
              <p className="muted">{t('club.selection.subtitle')}</p>
            </header>

            <div className="teasers-grid">
              {TEASERS.map((tz) => (
                <article key={tz.id} className="teaser" onClick={() => setOpen(true)}>
                  <div className="teaser__media">
                    <img
                      loading="lazy"
                      src={tz.image}
                      srcSet={tz.image2x ? `${tz.image} 1x, ${tz.image2x} 2x` : undefined}
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      alt={`${tz.city} — ${tz.title}`}
                    />
                  </div>

                  <div className="teaser__body">
                    <div className="teaser__meta">
                      <span className="city">{tz.city}</span>
                      <span className="price">{tz.priceBand}</span>
                    </div>
                    <h3 className="teaser__title">{tz.title}</h3>
                    <div className="tags">
                      {tz.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <button className="link-btn" onClick={(e) => { e.stopPropagation(); setOpen(true); }}>
                      {t('club.selection.askDossier')} →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="legal">{t('club.selection.disclaimer')}</p>
          </div>
        </section>
      </main>

      {/* Modal d’accès */}
      {open && (
        <div className="club-modal-overlay" onClick={() => setOpen(false)}>
          <div className="club-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="club-modal__close" onClick={() => setOpen(false)} aria-label="Fermer">×</button>
            <h2 className="club-modal__title">{t('club.modal.title')}</h2>
            <form className="club-modal__form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder={t('club.modal.fn')} required />
              <input type="email" placeholder={t('club.modal.email')} required />
              <select defaultValue="">
                <option value="" disabled>{t('club.modal.role')}</option>
                <option value="owner">{t('club.modal.roleOwner')}</option>
                <option value="pro">{t('club.modal.rolePro')}</option>
              </select>
              <input type="text" placeholder={t('club.modal.budget')} />
              <select defaultValue="">
                <option value="" disabled>{t('club.modal.projectType')}</option>
                <option value="secondHome">{t('club.modal.pt1')}</option>
                <option value="rental">{t('club.modal.pt2')}</option>
                <option value="other">{t('club.modal.pt3')}</option>
              </select>
              <label className="accept">
                <input type="checkbox" required /> {t('club.modal.accept')}
              </label>
              <div className="modal-actions">
                <button type="submit" className="club-modal__submit">{t('club.modal.submit')}</button>
                <button type="button" className="link-btn" onClick={openCrisp}>{t('club.modal.chat')}</button>
              </div>
              <p className="mini-legal">{t('club.modal.legal')}</p>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ClubPage;
