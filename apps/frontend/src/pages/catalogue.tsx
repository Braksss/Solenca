
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import cover1 from '../assets/hero.png';
import '../styles/pages/catalogue.scss';

const services = [
  {
    title: 'Nettoyage des vitres',
    description: 'Jusqu’à 10 fenêtres standard ou 1h d’intervention maximum.',
    price: '89 €',
    extra: 'Au-delà : 49 €/h ou devis express.'
  },
  {
    title: 'Tonte de pelouse',
    description: 'Terrain jusqu’à 300 m², coupe et finitions incluses.',
    price: '89 €',
    extra: 'Au-delà : 49 €/h ou devis express.'
  },
  {
    title: 'Entretien terrasse',
    description: 'Balayage, nettoyage à haute pression si besoin (jusqu’à 30m²).',
    price: '109 €',
    extra: 'Au-delà : 49 €/h ou devis express.'
  },
  {
    title: 'Nettoyage après intempéries',
    description: 'Inspection + nettoyage rapide des feuilles/débris extérieurs.',
    price: '119 €',
    extra: 'Au-delà : 49 €/h ou devis express.'
  },
  {
    title: 'Vérification habitation',
    description: 'Contrôle visuel complet intérieur/extérieur + photos.',
    price: '69 €',
    extra: 'Durée maximale : 30 min.'
  },
  {
    title: 'Arrosage jardin',
    description: 'Intervention manuelle ou mise en route d’arrosage automatique.',
    price: '49 €',
    extra: 'Max 30 minutes sur place.'
  },
  {
    title: 'Réception de colis/commandes',
    description: 'Présence sur place pour réception planifiée (1h max).',
    price: '59 €',
    extra: 'Au-delà : 49 €/h.'
  },
  {
    title: 'Ouverture ponctuelle pour artisan',
    description: 'Accueil et supervision rapide d’un prestataire local.',
    price: '59 €',
    extra: 'Jusqu’à 30 minutes.'
  },
];

const CataloguePage = () => {
  return (
    <>
      <Navbar />
      <div className="catalogue-page">
        <span className="catalogue-badge-top">Nos services</span>
        <h1 className="catalogue-title">Services ponctuels Solenca</h1>
        <p className="catalogue-subtitle">Notre équipe intervient rapidement, avec sérieux et discrétion. Tous nos prix sont clairs et premium.</p>
        <section className="catalogue-grid">
          {services.map((service, index) => (
            <article key={index} className="catalogue-card">
              <img src={cover1} alt={service.title} className="catalogue-cover" />
              <div className="catalogue-content">
                <h3 className="catalogue-heading">{service.title}</h3>
                <p className="catalogue-excerpt">{service.description}</p>
                <p className="catalogue-price">{service.price}</p>
                <p className="catalogue-meta">{service.extra}</p>
                <button
                  className="catalogue-button"
                  onClick={() => window.location.href = `/paiement?service=${encodeURIComponent(service.title)}`}
                >
                  Acheter
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CataloguePage;
