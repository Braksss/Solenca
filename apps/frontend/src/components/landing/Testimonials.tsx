import React from 'react';
import '../../styles/landing/testimonials.scss';

const testimonials = [
  {
    name: 'Jean Dupont',
    message: "Grâce à Solenca, ma maison à Cadaqués est entre de bonnes mains. Je reçois des rapports clairs et tout est géré sans stress.",
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Claire Bernard',
    message: "Je ne pensais pas pouvoir gérer une location saisonnière à distance, mais l'équipe Solenca est ultra réactive et professionnelle.",
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Marc Leclerc',
    message: "Service impeccable. Le cockpit digital est super intuitif, et j’ai pu planifier des travaux à distance facilement.",
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
