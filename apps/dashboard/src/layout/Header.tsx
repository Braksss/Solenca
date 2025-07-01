import React from 'react';
import '../styles/layout/header.scss';
import { Search, Bell, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__left">
        <h1 className="dashboard-header__welcome">Bonjour Benjamin</h1>
        <p className="dashboard-header__summary">Résumé de votre propriété</p>
      </div>

      <div className="dashboard-header__right">
        <div className="dashboard-header__search">
          <Search size={16} />
          <input type="text" placeholder="Rechercher..." />
        </div>
        <button className="dashboard-header__icon-button orange">
          <Home size={16} />
        </button>
        <button className="dashboard-header__icon-button dark">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;
