import React from 'react';
import '../../styles/landing/testimonials.scss';

const testimonials = [
  {
    name: 'Émilie Garnier',
    message: "J’étais inquiète de laisser notre maison vide plusieurs mois. Solenca nous envoie des photos et alertes dès qu’il y a un souci. Très rassurant.",
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Thierry M.',
    message: "Service impeccable à Platja d’Aro. L’équipe est sérieuse, discrète, et leur interface est claire. On sent qu’ils ont pensé à tout.",
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Sophie & Lucas',
    message: "On a pu faire intervenir un artisan pendant notre absence grâce à Solenca. C’est un vrai soulagement de savoir qu’on peut compter sur eux.",
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
];


const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">Ils nous font confiance</h2>
        <div className="testimonials-meta">
          <div className="avatars">
            <img src="https://i.pravatar.cc/150?img=1" alt="Client 1" />
            <img src="https://i.pravatar.cc/150?img=2" alt="Client 2" />
            <img src="https://i.pravatar.cc/150?img=3" alt="Client 3" />
          </div>
          <span className="clients-count">+300 propriétaires accompagnés</span>
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
