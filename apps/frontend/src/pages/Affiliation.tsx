import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';

function AffiliationPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('affiliate.metaTitle')}</title>
        <meta name="description" content={t('affiliate.metaDescription') || ''} />
      </Helmet>

      <Navbar />
      <main className="page page--affiliate container" style={{ padding: '2rem 0' }}>
        <h1>{t('affiliate.title')}</h1>
        <p className="muted">{t('affiliate.subtitle')}</p>

        <section style={{ marginTop: '1.5rem' }}>
          <h2>{t('affiliate.howTitle')}</h2>
          <ol className="timeline" style={{ maxWidth: 720 }}>
            <li><span>1</span>{t('affiliate.step1')}</li>
            <li><span>2</span>{t('affiliate.step2')}</li>
            <li><span>3</span>{t('affiliate.step3')}</li>
          </ol>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>{t('affiliate.rulesTitle')}</h2>
          <ul className="bullets">
            <li>{t('affiliate.rule1')}</li>
            <li>{t('affiliate.rule2')}</li>
            <li>{t('affiliate.rule3')}</li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>{t('affiliate.applyTitle')}</h2>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '.75rem', maxWidth: 520 }}>
            <input type="text" placeholder={t('affiliate.form.name') || 'Nom'} required />
            <input type="email" placeholder={t('affiliate.form.email') || 'Email'} required />
            <input type="text" placeholder={t('affiliate.form.channel') || 'Votre audience / réseau'} />
            <textarea placeholder={t('affiliate.form.message') || 'Message'} rows={4} />
            <button className="primary-btn" type="submit">{t('affiliate.form.cta')}</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AffiliationPage;
