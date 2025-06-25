import React from 'react';
import '../styles/layout/header.scss';
import { Search, Bell, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__intro">
        <h1 className="dashboard-header__title">Bienvenue, Benjamin</h1>
        <p className="dashboard-header__subtitle">
          Voici le résumé de votre propriété aujourd’hui.
        </p>
      </div>
      <div className="dashboard-header__actions">
        <div className="dashboard-header__search-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Rechercher une donnée"
            className="dashboard-header__search"
          />
        </div>
        <button className="dashboard-header__btn dashboard-header__btn--home">
          <Home size={16} />
          <span>Mes maisons</span>
        </button>
        <button className="dashboard-header__btn dashboard-header__btn--alert">
          <Bell size={16} />
          <span>Alertes</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
