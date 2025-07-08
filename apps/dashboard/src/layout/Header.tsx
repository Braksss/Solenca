import React from 'react';
import '../styles/layout/header.scss';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="dashboard-header minimalist">
      <div className="dashboard-header__container">
        <h2 className="dashboard-header__greeting">Bonjour Benjamin</h2>
        <button className="dashboard-header__icon-button">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
