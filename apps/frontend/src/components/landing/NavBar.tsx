import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/landing/navbar.scss';
import logo from '../../assets/solenca-logo.png';

const SHOW_CLUB = import.meta.env.VITE_SHOW_CLUB === 'true'; // 🔒 flag

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(prevIsOpen => {
      const nextIsOpen = !prevIsOpen;
      if (nextIsOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      return nextIsOpen;
    });
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      document.body.classList.remove('no-scroll');
    }
  };

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__left">
          <Link to="/" className="navbar__logo" aria-label="Solenca - Accueil" onClick={closeMenu}>
            <img src={logo} alt="Solenca logo" className="navbar__logo-img" />
          </Link>
        </div>

        {/* Liens centraux (menu déroulant en mobile) */}
        <div className={`navbar__center ${isOpen ? 'open' : ''}`} id="primary-menu">
          <ul className="navbar__links" role="menu" aria-label="Navigation principale">
            <li role="none"><Link role="menuitem" to="/about" onClick={closeMenu}>{t('navbar.about')}</Link></li>
            <li role="none"><Link role="menuitem" to="/services" onClick={closeMenu}>{t('navbar.services')}</Link></li>
            <li role="none"><Link role="menuitem" to="/abonnement" onClick={closeMenu}>{t('navbar.abonnements')}</Link></li>
            {/* --- Lien vers le blog ajouté ici --- */}
            <li role="none"><Link role="menuitem" to="/articles" onClick={closeMenu}>{t('navbar.blog')}</Link></li>
            {SHOW_CLUB && (
              <li role="none"><Link role="menuitem" to="/club" onClick={closeMenu}>{t('navbar.club')}</Link></li>
            )}
          </ul>
        </div>

        {/* Droite : Sélecteur de langue + Burger */}
        <div className="navbar__right">
          <select
            id="lang-select"
            className="navbar__lang-select"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            aria-label="Choisir la langue"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="de">DE</option>
            <option value="ca">CA</option>
            <option value="ru">RU</option>
          </select>

          <button
            className="navbar__burger"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="primary-menu"
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;