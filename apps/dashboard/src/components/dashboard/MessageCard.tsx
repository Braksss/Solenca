

import React from 'react';
import '../../styles/components/dashboard/message-card.scss';
import { FiMessageSquare } from 'react-icons/fi';

const MessageCard = () => {
  return (
    <div className="message-card">
      <div className="message-card__header">
        <FiMessageSquare className="message-card__icon" />
        <h3 className="message-card__title">Dernier message</h3>
      </div>
      <div className="message-card__content">
        <p className="message-card__text">“Merci pour le suivi, tout semble parfait cette semaine !”</p>
        <span className="message-card__meta">Margot - 06/07/2025</span>
      </div>
    </div>
  );
};

export default MessageCard;