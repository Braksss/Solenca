import React from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/login.scss';

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <main className="login-page">
        <h1>Connexion</h1>
        <form className="login-form">
          <input type="email" placeholder="Adresse e-mail" />
          <input type="password" placeholder="Mot de passe" />
          <button type="submit">Se connecter</button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
