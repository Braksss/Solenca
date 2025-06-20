// apps/frontend/src/pages/abonnement/index.tsx

import { useEffect, useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import SubscriptionConfigurator from '../components/abonnement/SubscriptionConfigurator';
import '../styles/abonnement/abonnement.scss';

type Option = {
  id: string;
  label: string;
  price: number;
};

type Feature = {
  id: number;
  label: string;
};

type Abonnement = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: Feature[];
  options: Option[];
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
          description: item.description?.[0]?.children?.[0]?.text ?? '',
          features: [], // à remplir si tu ajoutes des features séparées
          options:
            item.feature?.map((opt: any) => ({
              id: String(opt.id),
              label: opt.label,
              price: opt.price,
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
      abonnement.options.reduce((acc, opt) => acc + (selectedOptions[opt.id] ? opt.price : 0), 0)
    : 0;

  return (
    <>
      <Navbar />
      <main className="abonnement-page">
        <h2>Nos formules</h2>
        <div className="abonnement-cards">
          {abonnements.map(({ id, name, basePrice, description }) => (
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
              <div className="card-desc">{description}</div>
            </div>
          ))}
        </div>

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
