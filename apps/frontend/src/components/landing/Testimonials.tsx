import React from 'react';
import '../../styles/landing/testimonials.scss';

const testimonials = [
  {
    name: 'Émilie Garnier',
    message: "J’étais inquiète de laisser notre maison vide plusieurs mois. Solenca nous envoie des photos et alertes dès qu’il y a un souci. Très rassurant.",
    avatar: 'https://i.pravatar.cc/150?img=47', // femme adulte, rassurante
  },
  {
    name: 'Thierry M.',
    message: "Service impeccable à Platja d’Aro. L’équipe est sérieuse, discrète, et leur interface est claire. On sent qu’ils ont pensé à tout.",
    avatar: 'https://i.pravatar.cc/150?img=12', // homme 50+ années, sobre
  },
  {
    name: 'Sophie & Lucas',
    message: "On a pu faire intervenir un artisan pendant notre absence grâce à Solenca. C’est un vrai soulagement de savoir qu’on peut compter sur eux.",
    avatar: 'https://i.pravatar.cc/150?img=64', // image mixte plausible
  },
];


const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section">
<div className="hero__crew">
  <div className="hero__crew-left">
    <h3 className="hero__crew-title">Ils ont rejoint Solenca</h3>
    <p className="hero__crew-subtext">
      +100 propriétaires sur la Costa Brava profitent déjà de la tranquillité 365.
    </p>
  </div>
  <div className="hero__crew-right">
    <div className="hero__crew-avatars">
      <img src="https://i.pravatar.cc/150?img=8" alt="Client 1" />
      <img src="https://i.pravatar.cc/150?img=9" alt="Client 2" />
      <img src="https://i.pravatar.cc/150?img=10" alt="Client 3" />
      <img src="https://i.pravatar.cc/150?img=11" alt="Client 4" />
    </div>
    <div className="hero__crew-badge">
      <span>Tranquilidad 365 🧡</span>
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
