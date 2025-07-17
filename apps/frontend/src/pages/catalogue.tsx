import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/pages/catalogue.scss';

// Images premium personnalisées
import vitreImg from '../assets/services/vitres-premium.jpg';
import pelouseImg from '../assets/services/pelouse-premium.jpg';
import terrasseImg from '../assets/services/terrasse-premium.jpg';
import intemperiesImg from '../assets/services/intemperies-premium.jpg';
import verificationImg from '../assets/services/verification-premium.jpg';
import arrosageImg from '../assets/services/arrosage-premium.jpg';
import colisImg from '../assets/services/colis-premium.jpg';
import artisanImg from '../assets/services/artisan-premium.jpg';
import anomalieImg from '../assets/services/anomalie-premium.jpg';
import compteurImg from '../assets/services/compteur-premium.jpg';
import livraisonImg from '../assets/services/livraison-premium.jpg';
import piscineNormalImg from '../assets/services/piscine-normal-premium.jpg';
import piscineDeepImg from '../assets/services/piscine-deep-premium.jpg';
import gazonSynthImg from '../assets/services/gazon-synth-premium.jpg';
import menageImg from '../assets/services/menage-premium.jpg';

// Zones core pour 0€ supplement
const coreZones = ['platja d\'aro', 's\'agaró', 'castell d\'aro'];

// Mock availability (scale to backend API fetch)
const mockAvailability = {
  getSlots: (date: Date) => Math.floor(Math.random() * 5) + 1, // 1-6 slots/day
};

const isUrgent = (date: Date) => (new Date().getTime() + 3 * 24 * 60 * 60 * 1000 > date.getTime());

const services = [
  {
    title: 'Nettoyage des vitres',
    description: 'Jusqu’à 10 fenêtres standard ou 1h d’intervention. Vitres impeccables pour une vue Costa Brava cristalline, par notre équipe experte.',
    price: '89 €',
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: vitreImg,
    category: 'Exterieur',
    formFields: [
      { name: 'fenetres', label: 'Nombre de fenêtres', type: 'number', default: 10 },
      { name: 'hauteur', label: 'Hauteur max (étages)', type: 'number', default: 1 },
    ],
    priceCalculator: (values: { fenetres: number; hauteur: number; selectedDate?: Date; ville?: string }) => {
      let base = 89;
      if (values.fenetres > 10) base += (values.fenetres - 10) * 8;
      if (values.hauteur > 1) base += 20 * (values.hauteur - 1);
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Tonte de pelouse',
    description: 'Terrain jusqu’à 300 m², coupe et finitions incluses. Un jardin prêt pour vos retours impromptus.',
    price: '89 €',
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: pelouseImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface terrain (m²)', type: 'number', default: 300 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 89;
      if (values.surface > 300) base += (values.surface - 300) * 0.2;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Entretien terrasse',
    description: 'Balayage, nettoyage à haute pression si besoin (jusqu’à 30m²). Votre espace extérieur, comme neuf.',
    price: '109 €',
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: terrasseImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface terrasse (m²)', type: 'number', default: 30 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 109;
      if (values.surface > 30) base += (values.surface - 30) * 3;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Nettoyage après intempéries',
    description: 'Inspection + nettoyage rapide des feuilles/débris extérieurs. Protection premium contre les caprices méditerranéens.',
    price: '119 €',
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: intemperiesImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface extérieure impactée (m²)', type: 'number', default: 200 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 119;
      if (values.surface > 200) base += (values.surface - 200) * 0.5;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Vérification habitation',
    description: 'Contrôle visuel complet intérieur/extérieur + photos. La sérénité, capturée en un clic.',
    price: '69 €',
    extra: 'Durée maximale : 30 min.',
    image: verificationImg,
    category: 'Interieur',
    formFields: [
      { name: 'surface', label: 'Surface habitation (m²)', type: 'number', default: 150 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 69;
      if (values.surface > 150) base += (values.surface - 150) * 0.3;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 20;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Arrosage jardin',
    description: 'Intervention manuelle ou mise en route d’arrosage automatique. Votre oasis verdoyante, maintenue sans effort.',
    price: '49 €',
    extra: 'Max 30 minutes sur place.',
    image: arrosageImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface jardin (m²)', type: 'number', default: 200 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 49;
      if (values.surface > 200) base += (values.surface - 200) * 0.1;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 15;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Réception de colis/commandes',
    description: 'Présence sur place pour réception planifiée (1h max). Livraisons sécurisées, comme si vous y étiez.',
    price: '59 €',
    extra: 'Au-delà : 49 €/h.',
    image: colisImg,
    category: 'Administratif',
    formFields: [
      { name: 'nombreColis', label: 'Nombre de colis', type: 'number', default: 1 },
    ],
    priceCalculator: (values: { nombreColis: number; selectedDate?: Date; ville?: string }) => {
      let base = 59;
      if (values.nombreColis > 1) base += (values.nombreColis - 1) * 10;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 20;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Ouverture ponctuelle pour artisan',
    description: 'Accueil et supervision rapide d’un prestataire local. Interventions fluides, sans tracas.',
    price: '59 €',
    extra: 'Jusqu’à 30 minutes.',
    image: artisanImg,
    category: 'Administratif',
    formFields: [
      { name: 'duree', label: 'Durée estimée (min)', type: 'number', default: 30 },
    ],
    priceCalculator: (values: { duree: number; selectedDate?: Date; ville?: string }) => {
      let base = 59;
      if (values.duree > 30) base += ((values.duree - 30) / 60) * 49;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 20;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Remontée d’anomalie',
    description: 'Déplacement et constat photo suite à suspicion ou alerte. Détection proactive pour une propriété impeccable.',
    price: '69 €',
    extra: 'Inclus rapport photo et synthèse.',
    image: anomalieImg,
    category: 'Administratif',
    formFields: [
      { name: 'surface', label: 'Surface concernée (m²)', type: 'number', default: 50 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 69;
      if (values.surface > 50) base += (values.surface - 50) * 0.5;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Relève de compteur',
    description: 'Relevé photo (eau, gaz, électricité) et transmission. Précision absolue, zéro oubli.',
    price: '39 €',
    extra: 'Pour tous types de compteurs accessibles.',
    image: compteurImg,
    category: 'Administratif',
    formFields: [
      { name: 'types', label: 'Types de compteurs', type: 'select', options: ['Eau', 'Gaz', 'Électricité', 'Tous (+10€)'], default: 'Tous (+10€)' },
    ],
    priceCalculator: (values: { types: string; selectedDate?: Date; ville?: string }) => {
      let base = 39;
      if (values.types === 'Tous (+10€)') base += 10;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 10;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Livraison urgente',
    description: 'Acheminement rapide depuis commerce local (selon disponibilité). Urgences gérées avec élégance.',
    price: '79 €',
    extra: 'Inclut 1 aller-retour local.',
    image: livraisonImg,
    category: 'Administratif',
    formFields: [
      { name: 'distance', label: 'Distance commerce (km)', type: 'number', default: 5 },
    ],
    priceCalculator: (values: { distance: number; selectedDate?: Date; ville?: string }) => {
      let base = 79;
      if (values.distance > 5) base += (values.distance - 5) * 5;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Entretien piscine normal',
    description: 'Nettoyage standard, traitement eau, jusqu’à 50m². Pour piscines actives.',
    price: '99 €',
    extra: 'Au-delà : 59 €/h.',
    image: piscineNormalImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface piscine (m²)', type: 'number', default: 50 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 99;
      if (values.surface > 50) base += (values.surface - 50) * 2;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Nettoyage piscine en profondeur',
    description: 'Vidange, nettoyage intensif pour piscines éteintes depuis mois (débris, algues). Jusqu’à 50m².',
    price: '199 €',
    extra: 'Au-delà : 69 €/h, inclus rapport photo.',
    image: piscineDeepImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface piscine (m²)', type: 'number', default: 50 },
      { name: 'moisEteinte', label: 'Mois éteinte', type: 'number', default: 3 },
    ],
    priceCalculator: (values: { surface: number; moisEteinte: number; selectedDate?: Date; ville?: string }) => {
      let base = 199;
      if (values.surface > 50) base += (values.surface - 50) * 3;
      if (values.moisEteinte > 3) base += (values.moisEteinte - 3) * 20;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 50;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Nettoyage gazon synthétique',
    description: 'Élimination débris (épines pin, feuilles), brossage jusqu’à 200m².',
    price: '79 €',
    extra: 'Au-delà : 49 €/h.',
    image: gazonSynthImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface gazon (m²)', type: 'number', default: 200 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 79;
      if (values.surface > 200) base += (values.surface - 200) * 0.3;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 25;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
  {
    title: 'Nettoyage ménage intérieur',
    description: 'Ménage complet sols/surfaces/sanitaires jusqu’à 150m². Idéal post-absence.',
    price: '149 €',
    extra: 'Au-delà : 59 €/h, produits éco inclus.',
    image: menageImg,
    category: 'Interieur',
    formFields: [
      { name: 'surface', label: 'Surface habitation (m²)', type: 'number', default: 150 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }) => {
      let base = 149;
      if (values.surface > 150) base += (values.surface - 150) * 1;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if (values.ville && !coreZones.some(z => values.ville.toLowerCase().includes(z))) base += 15;
      return Math.round(base);
    },
  },
];

const CataloguePage: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [adjustedPrice, setAdjustedPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slotsLeft, setSlotsLeft] = useState(0);

  const categories = ['Tous', 'Exterieur', 'Interieur', 'Administratif'];

  const filteredServices = selectedCategory === 'Tous' ? services : services.filter(s => s.category === selectedCategory);
  const searchedServices = filteredServices.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const openModal = (service: typeof services[0]) => {
    const initialValues = {
      ...service.formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.default }), {}),
      nom: '',
      email: '',
      telephone: '',
      adresse: '22 Carrer Palmeres, Platja d\'Aro',
      ville: 'Platja d\'Aro',
    };
    setFormValues(initialValues);
    setSelectedService(service);
    setSelectedDate(null);
    setSlotsLeft(0);
    updatePrice(initialValues, service);
    setModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!selectedService) return;
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    const newValues = { ...formValues, [name]: parsedValue };
    setFormValues(newValues);
    updatePrice(newValues, selectedService);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const left = mockAvailability.getSlots(date);
    setSlotsLeft(left);
    const newValues = { ...formValues, selectedDate: date };
    setFormValues(newValues);
    updatePrice(newValues, selectedService!);
  };

  const updatePrice = (values: Record<string, any>, service: typeof services[0]) => {
    let price = service.priceCalculator(values);
    if (slotsLeft < 2 && slotsLeft > 0) price *= 1.1;
    setAdjustedPrice(Math.round(price));
  };

  const handleSubmit = () => {
    if (!selectedService || !formValues.nom || !formValues.email || !formValues.adresse || !formValues.ville || !selectedDate) {
      alert('Veuillez remplir les champs essentiels et choisir une date.');
      return;
    }
    window.location.href = `/paiement?service=${encodeURIComponent(selectedService.title)}&price=${adjustedPrice}&specs=${encodeURIComponent(JSON.stringify(formValues))}`;
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="catalogue-page">
        <div className="catalogue-hero">
          <img src="/assets/solencea-cat.jpg" alt="Costa Brava Villa" className="hero-image" />
          <div className="hero-overlay">
            <h1 className="catalogue-title">{t('catalogue.hero.title')}</h1>
            <p className="catalogue-subtitle">
              {t('catalogue.hero.description')}
            </p>
            <input
              type="text"
              placeholder={t('catalogue.hero.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
          </div>
        </div>
        <div className="catalogue-filters">
          <label>{t('catalogue.filters.label')}</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <section className="catalogue-grid">
          {searchedServices.map((service, index) => (
            <article key={index} className="catalogue-card">
              <div className="catalogue-image-wrapper">
                <img src={service.image} alt={service.title} className="catalogue-image" loading="lazy" />
              </div>
              <div className="catalogue-content">
                <h3 className="catalogue-heading">{service.title}</h3>
                <p className="catalogue-description">{service.description}</p>
                <div className="catalogue-pricing">
                  <span className="catalogue-price">{t('catalogue.price', { price: service.price })}</span>
                  <span className="catalogue-extra">{service.extra}</span>
                </div>
                <button className="catalogue-button" onClick={() => openModal(service)}>
                  {t('catalogue.book')}
                </button>
                <a href="/abonnement" className="catalogue-upsell">{t('catalogue.upsell')}</a>
              </div>
            </article>
          ))}
        </section>
        <div className="catalogue-cta">
          <h2>{t('catalogue.cta.title')}</h2>
          <p>{t('catalogue.cta.description')}</p>
          <button className="catalogue-button cta-button" onClick={() => window.location.href = "/contact"}>
            {t('catalogue.cta.button')}
          </button>
        </div>
      </div>
      {modalOpen && selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            <h2>{selectedService.title}</h2>
            <form>
              <h3>{t('catalogue.modal.date')}</h3>
              <div className="form-field full-width">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={t('catalogue.modal.datePlaceholder')}
                  className="datepicker-custom"
                  wrapperClassName="datepicker-wrapper"
                />
              </div>
              <h3>{t('catalogue.modal.specs')}</h3>
              {selectedService.formFields.map((field) => (
                <div key={field.name} className="form-field">
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                    <select name={field.name} value={formValues[field.name]} onChange={handleInputChange}>
                      {(field.options || []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
              <div className="form-field">
                <label>{t('catalogue.modal.city')}</label>
                <input type="text" name="ville" value={formValues.ville} onChange={handleInputChange} placeholder="Ex: Platja d'Aro" />
              </div>
              <h3>{t('catalogue.modal.details')}</h3>
              <div className="form-field">
                <label>{t('catalogue.modal.name')}</label>
                <input type="text" name="nom" value={formValues.nom} onChange={handleInputChange} placeholder="Votre nom complet" />
              </div>
              <div className="form-field">
                <label>{t('catalogue.modal.email')}</label>
                <input type="email" name="email" value={formValues.email} onChange={handleInputChange} placeholder="votre@email.com" />
              </div>
              <div className="form-field">
                <label>{t('catalogue.modal.phone')}</label>
                <input type="tel" name="telephone" value={formValues.telephone} onChange={handleInputChange} placeholder="+33..." />
              </div>
              <div className="form-field full-width">
                <label>{t('catalogue.modal.address')}</label>
                <textarea name="adresse" value={formValues.adresse} onChange={handleInputChange} placeholder="Ex: 22 Carrer Palmeres, Platja d'Aro" />
              </div>
            </form>
            <p>{t('catalogue.modal.adjustedPrice', { price: adjustedPrice })}</p>
            <div className="modal-actions">
              <button onClick={handleSubmit}>{t('catalogue.modal.pay')}</button>
              <button onClick={() => setModalOpen(false)}>{t('catalogue.modal.cancel')}</button>
            </div>
            <a href="/abonnement" className="modal-upsell">{t('catalogue.modal.switchToSub')}</a>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CataloguePage;