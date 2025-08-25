import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';

function PressePage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('press.metaTitle')}</title>
        <meta name="description" content={t('press.metaDescription') || ''} />
      </Helmet>

      <Navbar />
      <main className="page page--presse container" style={{ padding: '2rem 0' }}>
        <h1>{t('press.title')}</h1>
        <p className="muted">{t('press.subtitle')}</p>

        <section style={{ marginTop: '1.5rem' }}>
          <h2>{t('press.kitTitle')}</h2>
          <p>{t('press.kitText')}</p>
          <a className="primary-btn" href="/assets/press/solenca-media-kit.pdf" target="_blank" rel="noopener noreferrer">
            {t('press.kitCta')}
          </a>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>{t('press.contactTitle')}</h2>
          <p>{t('press.contactText')} <a href="mailto:press@solenca.com">press@solenca.com</a></p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>{t('press.storyTitle')}</h2>
          <ul className="bullets">
            <li>{t('press.story1')}</li>
            <li>{t('press.story2')}</li>
            <li>{t('press.story3')}</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PressePage;
