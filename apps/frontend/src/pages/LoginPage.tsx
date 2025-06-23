import React from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/login.scss';
import bgImage from '../assets/mediterranean-homes.jpg';

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <main className="login-page">
        <div className="login-container">
          {/* Colonne gauche */}
          <div className="login-card">
            <div className="login-logo">🏡</div>
            <h2 className="login-title">Connectez-vous à votre espace</h2>
            <p className="login-subtitle">Accédez à vos services Solenca en toute tranquillité.</p>

            <div className="login-socials">
              <button className="social-btn"></button>
              <button className="social-btn">G</button>
              <button className="social-btn">in</button>
            </div>

            <div className="login-separator">OU</div>

            <form className="login-form">
              <div className="input-wrapper">
                <input type="email" placeholder="votre.email@email.com" />
              </div>
              <div className="input-wrapper">
                <input type="password" placeholder="Mot de passe" />
              </div>

              <div className="login-options">
                <label>
                  <input type="checkbox" /> Rester connecté
                </label>
                <a href="#" className="forgot-link">Mot de passe oublié ?</a>
              </div>

              <button type="submit" className="login-btn">Se connecter</button>

              <p className="signup-link">
                Pas encore de compte ? <a href="#">Créer un compte</a>
              </p>
            </form>
          </div>

          {/* Colonne droite – Promo affiliation visuelle */}
          <div className="login-visual" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="affiliate-promo minimal">
              <div className="badge">+5% / mois</div>
              <h2>Transformez vos contacts en revenus</h2>

              <a href="/affiliation" className="promo-btn">Devenir affilié</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
