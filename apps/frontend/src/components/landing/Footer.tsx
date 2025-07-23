import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Ajout pour internal nav
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
            <li><Link to="/about">{t('footer.private.why')}</Link></li>
            <li><Link to="/services">{t('footer.private.services')}</Link></li>
            <li><Link to="/fonctionnement">{t('footer.private.how')}</Link></li>
            <li><Link to="/avis">{t('footer.private.reviews')}</Link></li>
            <li><Link to="/precommande">{t('footer.private.cta')}</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>{t('footer.proTitle')}</h4>
          <ul>
            <li><Link to="/pro">{t('footer.pro.access')}</Link></li>
            <li><Link to="/b2b">{t('footer.pro.offer')}</Link></li>
            <li><Link to="/presse">{t('footer.pro.press')}</Link></li>
            <li><Link to="/contact">{t('footer.pro.contact')}</Link></li>
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
          <li><Link to="/mentions-legales">{t('footer.legal')}</Link></li>
          <li><Link to="/cgv">{t('footer.terms')}</Link></li>
          <li><Link to="/confidentialite">{t('footer.privacy')}</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;