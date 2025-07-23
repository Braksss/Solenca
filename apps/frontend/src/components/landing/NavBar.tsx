import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/landing/navbar.scss';
import logo from '../../assets/solenca-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__left">
          <Link to="/" className="navbar__logo">
            <img src={logo} alt="Solenca logo" className="navbar__logo-img" />
          </Link>
        </div>

        {/* Liens centraux */}
        <div className={`navbar__center ${isOpen ? 'open' : ''}`}>
          <ul className="navbar__links">
            <li><Link to="/about" onClick={() => setIsOpen(false)}>{t('navbar.about')}</Link></li>
            <li><Link to="/services" onClick={() => setIsOpen(false)}>{t('navbar.services')}</Link></li>
            <li><Link to="/abonnement" onClick={() => setIsOpen(false)}>{t('navbar.abonnements')}</Link></li>
            <li><Link to="/catalogue" onClick={() => setIsOpen(false)}>{t('navbar.catalogue')}</Link></li>
          </ul>
        </div>

        {/* CTA + Connexion */}
        <div className="navbar__right">
          <Link to="/login" className="navbar__login">{t('navbar.login')}</Link>
          <Link to="/club" className="navbar__cta">{t('navbar.club')}</Link>
          <select
            className="navbar__lang-select"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="de">DE</option>
            <option value="ca">CA</option>
            <option value="ru">RU</option>
          </select>
        </div>

        {/* Burger menu */}
        <div className="navbar__burger" onClick={() => setIsOpen(!isOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;