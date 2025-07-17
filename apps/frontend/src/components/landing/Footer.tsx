import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/landing/footer.scss';
import logo from '../../assets/solenca-logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__col footer__brand">
          <img src={logo} alt="Solenca logo" className="footer__logo-img" />
          <p className="footer__baseline">{t('footer.baseline')}</p>
        </div>

        <div className="footer__col">
          <h4>{t('footer.privateTitle')}</h4>
          <ul>
            <li><a href="/about">{t('footer.private.why')}</a></li>
            <li><a href="/services">{t('footer.private.services')}</a></li>
            <li><a href="/fonctionnement">{t('footer.private.how')}</a></li>
            <li><a href="/avis">{t('footer.private.reviews')}</a></li>
            <li><a href="/precommande">{t('footer.private.cta')}</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>{t('footer.proTitle')}</h4>
          <ul>
            <li><a href="/pro">{t('footer.pro.access')}</a></li>
            <li><a href="/b2b">{t('footer.pro.offer')}</a></li>
            <li><a href="/presse">{t('footer.pro.press')}</a></li>
            <li><a href="/contact">{t('footer.pro.contact')}</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>{t('footer.connectTitle')}</h4>
          <form className="footer__newsletter">
            <input type="email" placeholder={t('footer.emailPlaceholder')} />
            <button type="submit">→</button>
          </form>
          <div className="footer__socials">
            <a href="https://x.com/Braksss" target="_blank" rel="noopener noreferrer"><i className="fab fa-x-twitter" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Solenca. {t('footer.rights')}</p>
        <ul>
          <li><a href="/mentions-legales">{t('footer.legal')}</a></li>
          <li><a href="/cgv">{t('footer.terms')}</a></li>
          <li><a href="/confidentialite">{t('footer.privacy')}</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;