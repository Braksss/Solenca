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
    setIsOpen((open) => {
      const next = !open;
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('no-scroll', next);
      }
      return next;
    });
  };

  // ferme auto le menu quand on change de page
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      document.body.classList.remove('no-scroll');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__left">
          <Link to="/" className="navbar__logo" aria-label="Solenca - Accueil">
            <img src={logo} alt="Solenca logo" className="navbar__logo-img" />
          </Link>
        </div>

        {/* Liens centraux (burger en mobile) */}
        <div className={`navbar__center ${isOpen ? 'open' : ''}`} id="primary-menu">
          <ul className="navbar__links" role="menu" aria-label="Navigation principale">
            <li role="none">
              <Link role="menuitem" to="/about" onClick={() => setIsOpen(false)}>
                {t('navbar.about')}
              </Link>
            </li>
            <li role="none">
              <Link role="menuitem" to="/services" onClick={() => setIsOpen(false)}>
                {t('navbar.services')}
              </Link>
            </li>
            <li role="none">
              <Link role="menuitem" to="/abonnement" onClick={() => setIsOpen(false)}>
                {t('navbar.abonnements')}
              </Link>
            </li>
            {/* Optionnel : /catalogue si tu veux le garder plus tard */}
            {/* <li role="none"><Link role="menuitem" to="/catalogue" onClick={() => setIsOpen(false)}>{t('navbar.catalogue')}</Link></li> */}

            {/* Club (masqué tant que le flag n'est pas activé) */}
            {SHOW_CLUB && (
              <li role="none">
                <Link role="menuitem" to="/club" onClick={() => setIsOpen(false)}>
                  {t('navbar.club')}
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Droite : sélecteur de langue + burger (PAS de login) */}
        <div className="navbar__right">
          <label className="sr-only" htmlFor="lang-select">Langue</label>
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
