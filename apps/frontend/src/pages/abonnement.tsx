import { useEffect, useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import SubscriptionConfigurator from '../components/abonnement/SubscriptionConfigurator';
import '../styles/abonnement/abonnement.scss';
import heroImg from '../assets/hero-abonnement.jpg';
import avatar1 from '../assets/avatars/avatar1.png';

type Feature = {
  id: string;
  label: string;
  included: boolean;
  price?: number;
};

type Abonnement = {
  id: string;
  name: string;
  basePrice: number;
  tagline: string;
  features: Feature[];
};

const AbonnementPage = () => {
  const [abonnements, setAbonnements] = useState<Abonnement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [showConfigurator, setShowConfigurator] = useState(false);

  useEffect(() => {
    async function fetchAbonnements() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        if (!API_URL) throw new Error('VITE_API_URL non défini');

        const res = await fetch(`${API_URL}/api/abonnements?populate[feature]=*`);
        const data = await res.json();

        const abonnementsData: Abonnement[] = data.data.map((item: any) => ({
          id: String(item.id),
          name: item.title ?? 'Sans titre',
          basePrice: item.price ?? 0,
          tagline: item.description ?? '',
          features:
            item.feature?.map((opt: any) => ({
              id: String(opt.id),
              label: opt.label,
              included: opt.included,
              price: opt.included ? undefined : opt.price ?? 0,
            })) ?? [],
        }));

        setAbonnements(abonnementsData);
      } catch (error) {
        console.error('Erreur lors du chargement des abonnements :', error);
      }
    }

    fetchAbonnements();
  }, []);

  const abonnement = abonnements.find((a) => a.id === selectedId) ?? null;

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalPrice = abonnement
    ? abonnement.basePrice +
      abonnement.features.reduce(
        (acc, opt) => acc + (!opt.included && selectedOptions[opt.id] ? opt.price ?? 0 : 0),
        0
      )
    : 0;

  return (
    <>
      <Navbar />
      <main className="abonnement-page">
        {/* SECTION HERO INTRO */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>
              Des formules conçues pour votre&nbsp;
              <span className="gradient">tranquillité</span>
            </h1>
            <p>
              Choisissez un abonnement adapté à vos besoins, avec un suivi digitalisé, des alertes automatiques et des prestations claires.
            </p>
            <div className="cta-row">
              <button className="primary-btn">Comparer les offres</button>
              <span className="rating">
                <i className="star">★</i> 4.9
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <img src={heroImg} alt="Vue d'une villa méditerranéenne" />
            </div>
            <div className="user-badge">
              <div className="avatar-stack">
                <img src={avatar1} alt="user" style={{ left: '0px' }} />
              </div>
              <span>Déjà adopté par des propriétaires exigeants</span>
            </div>
          </div>
        </section>

        {/* SECTION OFFRES ABONNEMENT */}
        <section className="about-cta about-team ecosystem-platform">
          <div className="cta-inner ecosystem-center">
            <h2>
              Gardez le contrôle sur votre maison, <span className="fade">simplifiez votre quotidien</span>
            </h2>
            <p>
              Solenca suit pour vous ce qui se passe sur place. Vous recevez des rapports, des alertes, et des conseils personnalisés. Moins de stress, plus de maîtrise. L’interface Solenca centralise les éléments-clés de votre maison. Rien ne vous échappe, même à distance.
            </p>
          </div>

          <div className="abonnement-cards">
            {abonnements.map(({ id, name, basePrice, tagline }) => (
              <div
                key={id}
                className={`card ${id === selectedId ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedId(id);
                  setSelectedOptions({});
                  setShowConfigurator(true);
                }}
              >
                <div className="card-header">{name}</div>
                <div className="card-price">{basePrice} €</div>
                <div className="card-desc">{tagline}</div>
              </div>
            ))}
          </div>

<div className="cta-buttons">
  <button className="vip-btn">Faire une demande VIP</button>
</div>


        </section>


        {showConfigurator && abonnement && (
          <SubscriptionConfigurator
            abonnement={abonnement}
            selectedOptions={selectedOptions}
            toggleOption={toggleOption}
            totalPrice={totalPrice}
            onClose={() => {
              setShowConfigurator(false);
              setSelectedId(null);
            }}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default AbonnementPage;
