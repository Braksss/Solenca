import React from 'react';
import '../../styles/components/dashboard/planning-card.scss';

const PlanningCard = () => {
  return (
    <div className="glass-card">
      <div className="glass-card__header">
        <button className="glass-card__toggle glass-card__toggle--active">Weekly</button>
        <button className="glass-card__toggle">Monthly</button>
        <div className="glass-card__settings">
          <span>⚙️</span>
        </div>
      </div>

      <div className="glass-card__date">
        <span className="glass-card__month">August</span>
        <span className="glass-card__day">23</span>
      </div>

      <div className="glass-card__week">
        {['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'].map((day, i) => (
          <div key={day} className={`glass-card__weekday ${i === 3 ? 'active' : ''}`}>
            <span>{day}</span>
            <span>{20 + i}</span>
          </div>
        ))}
      </div>

      <div className="glass-card__footer">
        <input type="text" placeholder="✏️ Add a note..." className="glass-card__note" />
        <button className="glass-card__event">+ New Event</button>
      </div>
    </div>
  );
};

export default PlanningCard;