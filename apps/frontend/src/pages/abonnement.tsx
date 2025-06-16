// src/pages/abonnement.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/abonnement/abonnement.scss';

type Option = {
  id: string;
  label: string;
  price: number;
};

type Abonnement = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  options: Option[];
};

const AbonnementPage = () => {
  const [abonnements, setAbonnements] = useState<Abonnement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchAbonnements() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const API_TOKEN = import.meta.env.VITE_API_TOKEN;

        const res = await fetch(`${API_URL}/api/abonnements?populate=options`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();

        const abonnementsData: Abonnement[] = data.data.map((item: any) => ({
          id: item.id,
          name: item.attributes.name,
          basePrice: item.attributes.basePrice,
          description: item.attributes.description,
          options: item.attributes.options.data.map((opt: any) => ({
            id: opt.id,
            label: opt.attributes.label,
            price: opt.attributes.price,
          })),
        }));

        setAbonnements(abonnementsData);
        if (abonnementsData.length) setSelectedId(abonnementsData[0].id);
      } catch (error) {
        console.error('Erreur fetch abonnements Strapi:', error);
      }
    }

    fetchAbonnements();
  }, []);

  const abonnement = abonnements.find(a => a.id === selectedId) ?? null;

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const totalPrice = abonnement
    ? abonnement.basePrice +
      abonnement.options.reduce((acc, option) => acc + (selectedOptions[option.id] ? option.price : 0), 0)
    : 0;

  if (!abonnement) return <div>Chargement...</div>;

  return (
    <>
      <Navbar />
      <main className="abonnement-page">
        <h1>Nos abonnements</h1>
        <div className="abonnement-cards">
          {abonnements.map(({ id, name, basePrice, description }) => (
            <div
              key={id}
              className={`card ${id === selectedId ? 'selected' : ''}`}
              onClick={() => {
                setSelectedId(id);
                setSelectedOptions({});
              }}
            >
              <div className="card-header">{name}</div>
              <div className="card-price">{basePrice} €</div>
              <div className="card-desc">{description}</div>
            </div>
          ))}
        </div>

        <div className="abonnement-details">
          <h2>{abonnement.name}</h2>
          <p>{abonnement.description}</p>
          <div className="options-list">
            {abonnement.options.map(opt => (
              <label key={opt.id} className="option-item">
                <input
                  type="checkbox"
                  checked={!!selectedOptions[opt.id]}
                  onChange={() => toggleOption(opt.id)}
                />
                {opt.label} + {opt.price} €
              </label>
            ))}
          </div>
          <div className="total-price">Total : {totalPrice.toFixed(2)} €</div>
          <button className="subscribe-btn">Souscrire à {totalPrice.toFixed(2)} €</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AbonnementPage;
