import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BarChart,
  MessageSquareText,
  Settings,
  Menu,
  X
} from 'lucide-react';

import '../styles/layout/sidebar.scss';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      <div className="sidebar__header">
        <div className="sidebar__logo-wrapper">
          <img
            src="/logo-solenca.png"
            alt="Solenca"
            className="sidebar__logo"
          />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="sidebar__toggle">
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <nav className="sidebar__nav">
        <NavLink to="/" className="sidebar__link">
          <Home size={20} />
          {isOpen && <span>Accueil</span>}
        </NavLink>
        <NavLink to="/stats" className="sidebar__link">
          <BarChart size={20} />
          {isOpen && <span>Statistiques</span>}
        </NavLink>
        <NavLink to="/messages" className="sidebar__link">
          <MessageSquareText size={20} />
          {isOpen && <span>Messages</span>}
        </NavLink>
        <NavLink to="/settings" className="sidebar__link">
          <Settings size={20} />
          {isOpen && <span>Paramètres</span>}
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <img
          src="/avatar1.png"
          alt="Utilisateur"
          className="sidebar__avatar"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
