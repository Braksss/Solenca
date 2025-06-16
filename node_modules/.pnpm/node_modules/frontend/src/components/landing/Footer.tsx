import React from 'react';
import '../../styles/landing/footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <h3>Solenca</h3>
          <p>Un copilote digital pour votre maison secondaire en Espagne.</p>
        </div>

        <div className="footer__links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#about">À propos</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#cta">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer__newsletter">
          <h4>Ne manquez rien</h4>
          <p>Recevez les nouveautés et conseils utiles pour mieux gérer votre bien.</p>
          <form>
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
      </div>
    </footer>
  );
};

export default Footer;
