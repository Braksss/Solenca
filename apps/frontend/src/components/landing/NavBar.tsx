import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/landing/navbar.scss';
import logo from '../../assets/solenca-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <li><a href="/about">À propos</a></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/abonnement">Abonnements</Link></li>
            <li><Link to="/magazine">Magazine</Link></li>
            <li><Link to="/catalogue">Catalogue</Link></li>
          </ul>
        </div>

        {/* CTA + Connexion */}
        <div className="navbar__right">
          <Link to="/login" className="navbar__login">Se connecter</Link>
          <Link to="/precommande" className="navbar__cta">Je précommande</Link>
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
