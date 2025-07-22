import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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

// Zones core pour 0€ supplément
const coreZones = ['platja d\'aro', 's\'agaró', 'castell d\'aro'];

// Mock availability avec tarification dynamique
const mockAvailability = {
  getSlots: (date: Date) => {
    const day = date.getDay();
    const slots = Math.floor(Math.random() * 5) + 1; // 1-6 slots/day
    // Coefficient basé sur le jour (ex. : week-end plus cher, mardi moins cher)
    const priceMultiplier = day === 0 || day === 6 ? 1.2 : day === 2 ? 0.9 : 1.0; // +20% week-end, -10% mardi
    return { slots, priceMultiplier };
  },
};

const isUrgent = (date: Date) => new Date().getTime() + 3 * 24 * 60 * 60 * 1000 > date.getTime();

const services = [
  {
    title: 'Nettoyage des vitres',
    description: 'Jusqu’à 10 fenêtres standard ou 1h d’intervention. Vitres impeccables pour une vue Costa Brava cristalline.',
    price: 89,
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: vitreImg,
    category: 'Exterieur',
    formFields: [
      { name: 'fenetres', label: 'Nombre de fenêtres', type: 'number', default: 10 },
      { name: 'hauteur', label: 'Hauteur max (étages)', type: 'number', default: 1 },
    ],
    priceCalculator: (values: { fenetres: number; hauteur: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 89;
      if (values.fenetres > 10) base += (values.fenetres - 10) * 8;
      if (values.hauteur > 1) base += 20 * (values.hauteur - 1);
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Tonte de pelouse',
    description: 'Terrain jusqu’à 300 m², coupe et finitions incluses. Un jardin prêt pour vos retours.',
    price: 89,
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: pelouseImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface terrain (m²)', type: 'number', default: 300 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 89;
      if (values.surface > 300) base += (values.surface - 300) * 0.2;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Entretien terrasse',
    description: 'Balayage, nettoyage à haute pression si besoin (jusqu’à 30m²). Votre espace extérieur, comme neuf.',
    price: 109,
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: terrasseImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface terrasse (m²)', type: 'number', default: 30 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 109;
      if (values.surface > 30) base += (values.surface - 30) * 3;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Nettoyage après intempéries',
    description: 'Inspection + nettoyage rapide des feuilles/débris extérieurs. Protection contre les caprices méditerranéens.',
    price: 119,
    extra: 'Au-delà : 49 €/h ou devis express.',
    image: intemperiesImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface extérieure impactée (m²)', type: 'number', default: 200 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 119;
      if (values.surface > 200) base += (values.surface - 200) * 0.5;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Vérification habitation',
    description: 'Contrôle visuel complet intérieur/extérieur + photos. La sérénité, capturée en un clic.',
    price: 69,
    extra: 'Durée maximale : 30 min.',
    image: verificationImg,
    category: 'Interieur',
    formFields: [
      { name: 'surface', label: 'Surface habitation (m²)', type: 'number', default: 150 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 69;
      if (values.surface > 150) base += (values.surface - 150) * 0.3;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 20;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Arrosage jardin',
    description: 'Intervention manuelle ou mise en route d’arrosage automatique. Votre oasis verdoyante, maintenue sans effort.',
    price: 49,
    extra: 'Max 30 minutes sur place.',
    image: arrosageImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface jardin (m²)', type: 'number', default: 200 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 49;
      if (values.surface > 200) base += (values.surface - 200) * 0.1;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 15;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Réception de colis/commandes',
    description: 'Présence sur place pour réception planifiée (1h max). Livraisons sécurisées, comme si vous y étiez.',
    price: 59,
    extra: 'Au-delà : 49 €/h.',
    image: colisImg,
    category: 'Administratif',
    formFields: [
      { name: 'nombreColis', label: 'Nombre de colis', type: 'number', default: 1 },
    ],
    priceCalculator: (values: { nombreColis: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 59;
      if (values.nombreColis > 1) base += (values.nombreColis - 1) * 10;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 20;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Ouverture ponctuelle pour artisan',
    description: 'Accueil et supervision rapide d’un prestataire local. Interventions fluides, sans tracas.',
    price: 59,
    extra: 'Jusqu’à 30 minutes.',
    image: artisanImg,
    category: 'Administratif',
    formFields: [
      { name: 'duree', label: 'Durée estimée (min)', type: 'number', default: 30 },
    ],
    priceCalculator: (values: { duree: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 59;
      if (values.duree > 30) base += ((values.duree - 30) / 60) * 49;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 20;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Remontée d’anomalie',
    description: 'Déplacement et constat photo suite à suspicion ou alerte. Détection proactive pour une propriété impeccable.',
    price: 69,
    extra: 'Inclus rapport photo et synthèse.',
    image: anomalieImg,
    category: 'Administratif',
    formFields: [
      { name: 'surface', label: 'Surface concernée (m²)', type: 'number', default: 50 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 69;
      if (values.surface > 50) base += (values.surface - 50) * 0.5;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 30;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Relève de compteur',
    description: 'Relevé photo (eau, gaz, électricité) et transmission. Précision absolue, zéro oubli.',
    price: 39,
    extra: 'Pour tous types de compteurs accessibles.',
    image: compteurImg,
    category: 'Administratif',
    formFields: [
      { name: 'types', label: 'Types de compteurs', type: 'select', options: ['Eau', 'Gaz', 'Électricité', 'Tous (+10€)'], default: 'Tous (+10€)' },
    ],
    priceCalculator: (values: { types: string; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 39;
      if (values.types === 'Tous (+10€)') base += 10;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 10;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Livraison urgente',
    description: 'Acheminement rapide depuis commerce local (selon disponibilité). Urgences gérées avec élégance.',
    price: 79,
    extra: 'Inclut 1 aller-retour local.',
    image: livraisonImg,
    category: 'Administratif',
    formFields: [
      { name: 'distance', label: 'Distance commerce (km)', type: 'number', default: 5 },
    ],
    priceCalculator: (values: { distance: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 79;
      if (values.distance > 5) base += (values.distance - 5) * 5;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Entretien piscine normal',
    description: 'Nettoyage standard, traitement eau, jusqu’à 50m². Pour piscines actives.',
    price: 99,
    extra: 'Au-delà : 59 €/h.',
    image: piscineNormalImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface piscine (m²)', type: 'number', default: 50 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 99;
      if (values.surface > 50) base += (values.surface - 50) * 2;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Nettoyage piscine en profondeur',
    description: 'Vidange, nettoyage intensif pour piscines éteintes depuis mois (débris, algues). Jusqu’à 50m².',
    price: 199,
    extra: 'Au-delà : 69 €/h, inclus rapport photo.',
    image: piscineDeepImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface piscine (m²)', type: 'number', default: 50 },
      { name: 'moisEteinte', label: 'Mois éteinte', type: 'number', default: 3 },
    ],
    priceCalculator: (values: { surface: number; moisEteinte: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 199;
      if (values.surface > 50) base += (values.surface - 50) * 3;
      if (values.moisEteinte > 3) base += (values.moisEteinte - 3) * 20;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 50;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Nettoyage gazon synthétique',
    description: 'Élimination débris (épines pin, feuilles), brossage jusqu’à 200m².',
    price: 79,
    extra: 'Au-delà : 49 €/h.',
    image: gazonSynthImg,
    category: 'Exterieur',
    formFields: [
      { name: 'surface', label: 'Surface gazon (m²)', type: 'number', default: 200 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 79;
      if (values.surface > 200) base += (values.surface - 200) * 0.3;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 25;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
  {
    title: 'Nettoyage ménage intérieur',
    description: 'Ménage complet sols/surfaces/sanitaires jusqu’à 150m². Idéal post-absence.',
    price: 149,
    extra: 'Au-delà : 59 €/h, produits éco inclus.',
    image: menageImg,
    category: 'Interieur',
    formFields: [
      { name: 'surface', label: 'Surface habitation (m²)', type: 'number', default: 150 },
    ],
    priceCalculator: (values: { surface: number; selectedDate?: Date; ville?: string }, priceMultiplier: number) => {
      let base = 149;
      if (values.surface > 150) base += (values.surface - 150) * 1;
      if (values.selectedDate && isUrgent(values.selectedDate)) base += 40;
      if ((values.ville ?? '') && !coreZones.some(z => (values.ville ?? '').toLowerCase().includes(z))) base += 15;
      return Math.round(base * priceMultiplier);
    },
  },
];

const CataloguePage: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  type FormValues = Record<string, string | number | undefined>;
  const [formValues, setFormValues] = useState<FormValues>({});
  const [adjustedPrice, setAdjustedPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slotsLeft, setSlotsLeft] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const endDate = new Date('2025-08-31T23:59:59');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft(`${days}j ${hours}h restantes pour 20% off`);
      } else {
        setTimeLeft('Offre expirée');
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = ['Tous', 'Exterieur', 'Interieur', 'Administratif'];

  const filteredServices = useMemo(() => {
    const filtered = selectedCategory === 'Tous' ? services : services.filter(s => s.category === selectedCategory);
    return filtered.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [selectedCategory, searchQuery]);

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
    setErrors({});
    updatePrice(initialValues, service);
    setModalOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (typeof formValues.nom !== 'string' || formValues.nom.length < 3) newErrors.nom = 'Nom requis (min 3)';
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (typeof formValues.email !== 'string' || !emailRegex.test(formValues.email)) newErrors.email = 'Email invalide';
    if (typeof formValues.telephone !== 'string' || formValues.telephone.length < 10) newErrors.telephone = 'Téléphone requis (min 10)';
    if (typeof formValues.adresse !== 'string' || formValues.adresse.length < 5) newErrors.adresse = 'Adresse invalide (min 5)';
    if (typeof formValues.ville !== 'string' || formValues.ville.length < 3) newErrors.ville = 'Ville invalide (min 3)';
    if (!selectedDate) newErrors.date = 'Date requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!selectedService) return;
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    const newValues = { ...formValues, [name]: parsedValue };
    setFormValues(newValues);
    updatePrice(newValues, selectedService);
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    const { slots, priceMultiplier } = mockAvailability.getSlots(date);
    setSlotsLeft(slots);
    const newValues = { ...formValues };
    setFormValues(newValues);
    updatePrice(newValues, selectedService!, priceMultiplier, date);
  };

  const updatePrice = (
    values: FormValues,
    service: typeof services[0],
    priceMultiplier = 1.0,
    selectedDateOverride?: Date
  ) => {
    const fullValues = { ...values, selectedDate: selectedDateOverride ?? selectedDate ?? undefined };
    let price = service.priceCalculator(fullValues, priceMultiplier);
    if (slotsLeft < 2 && slotsLeft > 0) price *= 1.1; // Surcharge pour créneaux limités
    setAdjustedPrice(Math.round(price));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    window.location.href = `/paiement?service=${encodeURIComponent(selectedService!.title)}&price=${adjustedPrice}&specs=${encodeURIComponent(JSON.stringify(formValues))}`;
    setModalOpen(false);
  };

  const renderProgressBar = () => (
    <motion.div
      className="progress-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {['Sélection', 'Configuration', 'Paiement'].map((label, index) => (
        <div key={index} className={`progress-step ${modalOpen ? (index === 1 ? 'active' : index < 1 ? 'completed' : '') : (index === 0 ? 'active' : '')}`}>
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Solenca - Catalogue de Services</title>
        <meta name="description" content="Découvrez nos services premium pour votre résidence secondaire sur la Costa Brava. Réservez en quelques clics, 20% de réduction la première année." />
      </Helmet>
      <Navbar />
      <motion.div
        className="catalogue-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="intro-wrapper">
          <h1>Services Premium pour votre Résidence</h1>
          <p>Choisissez parmi nos services sur mesure pour entretenir votre propriété avec sérénité.</p>
          <span className="highlight">20% de réduction la première année ! {timeLeft}</span>
        </div>
      </motion.div>
      {renderProgressBar()}
      <div className="catalogue-content">
        <div className="catalogue-filters">
          <label>{t('catalogue.filters.label')}</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="text"
            placeholder={t('catalogue.hero.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
        <section className="catalogue-grid">
          {filteredServices.map((service, index) => (
            <motion.article
              key={index}
              className="catalogue-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="catalogue-image-wrapper">
                <img src={service.image} alt={service.title} className="catalogue-image" loading="lazy" />
              </div>
              <div className="catalogue-content">
                <h3 className="catalogue-heading">{service.title}</h3>
                <p className="catalogue-description">{service.description}</p>
                <div className="catalogue-pricing">
                  <span className="catalogue-price">{t('catalogue.price', { price: service.price })} €</span>
                  <span className="catalogue-extra">{service.extra}</span>
                </div>
                <motion.button
                  className="catalogue-button"
                  onClick={() => openModal(service)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('catalogue.book')}
                </motion.button>
                <a href="/abonnement" className="catalogue-upsell">{t('catalogue.upsell')}</a>
              </div>
            </motion.article>
          ))}
        </section>
        <div className="catalogue-cta">
          <h2>{t('catalogue.cta.title')}</h2>
          <p>{t('catalogue.cta.description')}</p>
          <motion.button
            className="catalogue-button cta-button"
            onClick={() => window.location.href = "/contact"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('catalogue.cta.button')}
          </motion.button>
        </div>
      </div>
      {modalOpen && selectedService && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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
                {errors.date && <span className="error-message">{errors.date}</span>}
                {selectedDate && <p className="slots-info">{slotsLeft} créneaux restants pour cette date</p>}
              </div>
              <h3>{t('catalogue.modal.specs')}</h3>
              {selectedService.formFields.map((field) => (
                <div key={field.name} className="form-field">
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={typeof formValues[field.name] === 'string' || typeof formValues[field.name] === 'number'
                        ? formValues[field.name]
                        : ''}
                      onChange={handleInputChange}
                    >
                      {'options' in field && (field.options as string[]).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={
                        typeof formValues[field.name] === 'string' || typeof formValues[field.name] === 'number'
                          ? formValues[field.name]
                          : ''
                      }
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
              <div className="form-field">
                <label>{t('catalogue.modal.city')}</label>
                <input
                  type="text"
                  name="ville"
                  value={
                    typeof formValues.ville === 'string' || typeof formValues.ville === 'number'
                      ? formValues.ville
                      : ''
                  }
                  onChange={handleInputChange}
                  placeholder="Ex: Platja d'Aro"
                  className={errors.ville ? 'error' : ''}
                />
                {errors.ville && <span className="error-message">{errors.ville}</span>}
              </div>
              <h3>{t('catalogue.modal.details')}</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label>{t('catalogue.modal.name')}</label>
                  <input
                    type="text"
                    name="nom"
                    value={
                      typeof formValues.nom === 'string' || typeof formValues.nom === 'number'
                        ? formValues.nom
                        : ''
                    }
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    className={errors.nom ? 'error' : ''}
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>
                <div className="form-field">
                  <label>{t('catalogue.modal.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={
                      typeof formValues.email === 'string' || typeof formValues.email === 'number'
                        ? formValues.email
                        : ''
                    }
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label>{t('catalogue.modal.phone')}</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={
                      typeof formValues.telephone === 'string' || typeof formValues.telephone === 'number'
                        ? formValues.telephone
                        : ''
                    }
                    onChange={handleInputChange}
                    placeholder="+33..."
                    className={errors.telephone ? 'error' : ''}
                  />
                  {errors.telephone && <span className="error-message">{errors.telephone}</span>}
                </div>
                <div className="form-field full-width">
                  <label>{t('catalogue.modal.address')}</label>
                  <textarea
                    name="adresse"
                    value={
                      typeof formValues.adresse === 'string' || typeof formValues.adresse === 'number'
                        ? formValues.adresse
                        : ''
                    }
                    onChange={handleInputChange}
                    placeholder="Ex: 22 Carrer Palmeres, Platja d'Aro"
                    className={errors.adresse ? 'error' : ''}
                  />
                  {errors.adresse && <span className="error-message">{errors.adresse}</span>}
                </div>
              </div>
            </form>
            <p>{t('catalogue.modal.adjustedPrice', { price: adjustedPrice })} €</p>
            <div className="modal-actions">
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('catalogue.modal.pay')}
              </motion.button>
              <motion.button
                onClick={() => setModalOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-outline"
              >
                {t('catalogue.modal.cancel')}
              </motion.button>
            </div>
            <a href="/abonnement" className="modal-upsell">{t('catalogue.modal.switchToSub')}</a>
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </>
  );
};

export default CataloguePage;