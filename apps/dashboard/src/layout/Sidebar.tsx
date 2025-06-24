import React from 'react';
import {
  Home,
  BarChart,
  MessageSquareText,
  CalendarDays,
  Bell,
  Settings,
  LogOut,
  Info
} from 'lucide-react';

import '../styles/layout/sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <img src="/logo-fitbit.png" alt="Solenca" className="sidebar__logo" />
        <div className="sidebar__icon sidebar__icon--active"><Home size={20} /></div>
        <div className="sidebar__icon"><BarChart size={20} /></div>
        <div className="sidebar__icon"><MessageSquareText size={20} /></div>
        <div className="sidebar__icon"><CalendarDays size={20} /></div>
        <hr className="sidebar__separator" />
        <div className="sidebar__icon"><Bell size={20} /></div>
        <div className="sidebar__icon"><Settings size={20} /></div>
      </div>

      <div className="sidebar__bottom">
        <div className="sidebar__icon"><LogOut size={20} /></div>
        <hr className="sidebar__separator" />
        <div className="sidebar__icon"><Info size={20} /></div>
        <img src="/avatar1.png" alt="User avatar" className="sidebar__avatar" />
      </div>
    </aside>
  );
};

export default Sidebar;