import React from 'react';
import '../../styles/landing/footer.scss';
import logo from '../../assets/solenca-logo.png'; // ← ton logo réel

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__col footer__brand">
          <img src={logo} alt="Solenca logo" className="footer__logo-img" />
          <p className="footer__baseline">Tranquilidad 365 pour votre maison en Espagne.</p>
        </div>

        <div className="footer__col">
          <h4>Pour les particuliers</h4>
          <ul>
            <li><a href="#about">Pourquoi Solenca</a></li>
            <li><a href="#services">Nos services</a></li>
            <li><a href="#how">Fonctionnement</a></li>
            <li><a href="#avis">Avis clients</a></li>
            <li><a href="/precommande">Je précommande</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Pour les pros</h4>
          <ul>
            <li><a href="/pro">Accès agences & partenaires</a></li>
            <li><a href="/b2b">Offre B2B</a></li>
            <li><a href="/presse">Presse & médias</a></li>
            <li><a href="/contact">Contact pro</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Restez connectés</h4>
          <form className="footer__newsletter">
            <input type="email" placeholder="Votre email" />
            <button type="submit">→</button>
          </form>
          <div className="footer__socials">
            <a href="#"><i className="fab fa-x-twitter" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Solenca. Tous droits réservés.</p>
        <ul>
          <li><a href="/mentions-legales">Mentions légales</a></li>
          <li><a href="/cgv">CGV</a></li>
          <li><a href="/confidentialite">Confidentialité</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
