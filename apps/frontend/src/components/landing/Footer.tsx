import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../styles/landing/footer.scss';
import logo from '../../assets/solenca-logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer--simple">
      <div className="footer__row">
        <div className="footer__brand">
          <Link to="/" aria-label="Solenca - Accueil">
            <img src={logo} alt="Solenca logo" className="footer__logo-img" />
          </Link>
        </div>

        <nav className="footer__links" aria-label="Liens">
          <Link to="/about">{t('navbar.about')}</Link>
          <Link to="/services">{t('navbar.services')}</Link>
          <Link to="/abonnement">{t('navbar.abonnements')}</Link>
        </nav>

        <div className="footer__socials" aria-label="Réseaux sociaux">
          <a href="https://x.com/solenca" target="_blank" rel="noopener noreferrer" aria-label="X">
            <i className="fab fa-x-twitter" />
          </a>
          <a href="https://instagram.com/solenca" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://facebook.com/solenca" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f" />
          </a>
        </div>
      </div>

      <div className="footer__row footer__row--bottom">
        <p>© {new Date().getFullYear()} Solenca. {t('footer.rights')}</p>
        <div className="footer__legal">
          <Link to="/mentions-legales">{t('footer.legal')}</Link>
          <Link to="/cgv">{t('footer.terms')}</Link>
          <Link to="/confidentialite">{t('footer.privacy')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
