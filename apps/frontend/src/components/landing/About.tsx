import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/landing/about.scss';
import Icon1 from '../../assets/icons/reactivite.png';
import Icon2 from '../../assets/icons/suivi.png';
import Icon3 from '../../assets/icons/securite.png';
import Icon4 from '../../assets/icons/experts.png';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about-section">
      <div className="about-top">
        <div className="about-top__left">
          <h2>{t('about.title')}</h2>
        </div>
        <div className="about-top__right">
          <p>{t('about.description')}</p>
          <button className="about-btn">{t('about.cta')}</button>
        </div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <h3>{t('about.card1.title')}</h3>
          <p>{t('about.card1.text')}</p>
          <img src={Icon1} alt="Réactivité garantie" />
        </div>
        <div className="about-card">
          <h3>{t('about.card2.title')}</h3>
          <p>{t('about.card2.text')}</p>
          <img src={Icon2} alt="Suivi digitalisé" />
        </div>
        <div className="about-card">
          <h3>{t('about.card3.title')}</h3>
          <p>{t('about.card3.text')}</p>
          <img src={Icon3} alt="Contrôle & sécurité" />
        </div>
        <div className="about-card">
          <h3>{t('about.card4.title')}</h3>
          <p>{t('about.card4.text')}</p>
          <img src={Icon4} alt="Experts locaux" />
        </div>
      </div>
    </section>
  );
}

export default About;