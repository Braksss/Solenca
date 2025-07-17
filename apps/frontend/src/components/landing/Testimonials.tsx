import React from 'react';
import '../../styles/landing/testimonials.scss';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Émilie Garnier',
      message: t('testimonials.test1'),
      avatar: 'https://i.pravatar.cc/150?img=47', // femme adulte, rassurante
    },
    {
      name: 'Thierry M.',
      message: t('testimonials.test2'),
      avatar: 'https://i.pravatar.cc/150?img=12', // homme 50+ années, sobre
    },
    {
      name: 'Sophie & Lucas',
      message: t('testimonials.test3'),
      avatar: 'https://i.pravatar.cc/150?img=64', // image mixte plausible
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="hero__crew">
        <div className="hero__crew-left">
          <h3 className="hero__crew-title">{t('testimonials.title')}</h3>
          <p className="hero__crew-subtext">{t('testimonials.subtitle')}</p>
        </div>
        <div className="hero__crew-right">
          <div className="hero__crew-avatars">
            <img src="https://i.pravatar.cc/150?img=8" alt="Client 1" />
            <img src="https://i.pravatar.cc/150?img=9" alt="Client 2" />
            <img src="https://i.pravatar.cc/150?img=10" alt="Client 3" />
            <img src="https://i.pravatar.cc/150?img=11" alt="Client 4" />
          </div>
          <div className="hero__crew-badge">
            <span>{t('testimonials.badge')}</span>
          </div>
        </div>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p className="message">“{testimonial.message}”</p>
            <div className="user">
              <img src={testimonial.avatar} alt={testimonial.name} />
              <span>{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;