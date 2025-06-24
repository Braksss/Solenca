import React from 'react';
import '../styles/layout/header.scss';
import { Search, Crown } from 'lucide-react';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__intro">
        <h1 className="dashboard-header__title">Hi, Benjamin!</h1>
        <p className="dashboard-header__subtitle">Let’s look at your daily activity overview.</p>
      </div>
      <div className="dashboard-header__actions">
        <div className="dashboard-header__search-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search for healthy metrics"
            className="dashboard-header__search"
          />
        </div>
        <button className="dashboard-header__upgrade">
          <Crown size={16} />
          <span>Upgrade</span>
        </button>
      </div>
    </header>
  );
};

export default Header;