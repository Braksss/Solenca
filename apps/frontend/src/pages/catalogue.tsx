import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useContent } from '../hooks/useContent';
import '../styles/pages/catalogue.scss';

import vitresPremium from '../assets/services/vitres-premium.jpg';
import pelousePremium from '../assets/services/pelouse-premium.jpg';
import terrassePremium from '../assets/services/terrasse-premium.jpg';
import intemperiesPremium from '../assets/services/intemperies-premium.jpg';
import verificationPremium from '../assets/services/verification-premium.jpg';
import arrosagePremium from '../assets/services/arrosage-premium.jpg';
import colisPremium from '../assets/services/colis-premium.jpg';
import artisanPremium from '../assets/services/artisan-premium.jpg';
import anomaliePremium from '../assets/services/anomalie-premium.jpg';
import compteurPremium from '../assets/services/compteur-premium.jpg';
import livraisonPremium from '../assets/services/livraison-premium.jpg';
import piscineNormalPremium from '../assets/services/piscine-normal-premium.jpg';
import piscineDeepPremium from '../assets/services/piscine-deep-premium.jpg';
import gazonSynthPremium from '../assets/services/gazon-synth-premium.jpg';
import menagePremium from '../assets/services/menage-premium.jpg';

const imageMap = {
  'Nettoyage des vitres': vitresPremium,
  'Tonte de pelouse': pelousePremium,
  'Entretien terrasse': terrassePremium,
  'Nettoyage après intempéries': intemperiesPremium,
  'Vérification habitation': verificationPremium,
  'Arrosage jardin': arrosagePremium,
  'Réception de colis/commandes': colisPremium,
  'Ouverture ponctuelle pour artisan': artisanPremium,
  'Remontée d’anomalie': anomaliePremium,
  'Relève de compteur': compteurPremium,
  'Livraison urgente': livraisonPremium,
  'Entretien piscine normal': piscineNormalPremium,
  'Nettoyage piscine en profondeur': piscineDeepPremium,
  'Nettoyage gazon synthétique': gazonSynthPremium,
  'Nettoyage ménage intérieur': menagePremium,
};

const coreZones = ['platja d\'aro', 's\'agaró', 'castell d\'aro'];

const mockAvailability = {
  getSlots: (date: Date) => {
    const day = date.getDay();
    const slots = Math.floor(Math.random() * 5) + 1;
    const priceMultiplier = day === 0 || day === 6 ? 1.2 : day === 2 ? 0.9 : 1.0;
    return { slots, priceMultiplier };
  },
};

const isUrgent = (date: Date) => new Date().getTime() + 3 * 24 * 60 * 60 * 1000 > date.getTime();

const CataloguePage: React.FC = () => {
  const { t } = useTranslation();
  const content = useContent();
  const cat = content.catalogue;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [adjustedPrice, setAdjustedPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(cat.categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slotsLeft, setSlotsLeft] = useState(0);
  const [errors, setErrors] = useState({});
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

  const filteredServices = useMemo(() => {
    const servicesList = cat.services;
    const filtered = selectedCategory === cat.categories[0] ? servicesList : servicesList.filter(s => s.category === selectedCategory);
    return filtered.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [selectedCategory, searchQuery, cat]);

  const openModal = (service) => {
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
    setModalStep(1);
    updatePrice(initialValues, service);
    setModalOpen(true);
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    if (stepNumber === 1) {
      // Validation specs if needed, assume optional for MVP
    }
    if (stepNumber === 2) {
      if (!formValues.nom || formValues.nom.length < 3) newErrors.nom = 'Nom requis (min 3)';
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!formValues.email || !emailRegex.test(formValues.email)) newErrors.email = 'Email invalide';
      if (!formValues.telephone || formValues.telephone.length < 10) newErrors.telephone = 'Téléphone requis (min 10)';
      if (!formValues.adresse || formValues.adresse.length < 5) newErrors.adresse = 'Adresse invalide (min 5)';
      if (!formValues.ville || formValues.ville.length < 3) newErrors.ville = 'Ville invalide (min 3)';
    }
    if (stepNumber === 3 && !selectedDate) newErrors.date = 'Date requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(modalStep)) setModalStep(modalStep + 1);
  };

  const handlePrevStep = () => setModalStep(modalStep - 1);

  const handleInputChange = (e) => {
    if (!selectedService) return;
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    const newValues = { ...formValues, [name]: parsedValue };
    setFormValues(newValues);
    updatePrice(newValues, selectedService);
  };

  const handleDateChange = (date) => {
    if (!date) return;
    setSelectedDate(date);
    const { slots, priceMultiplier } = mockAvailability.getSlots(date);
    setSlotsLeft(slots);
    updatePrice({ ...formValues }, selectedService, priceMultiplier, date);
  };

  const updatePrice = (values, service, priceMultiplier = 1.0, selectedDateOverride) => {
    let base = service.price;
    const fullValues = { ...values, selectedDate: selectedDateOverride || selectedDate };
    const isHorsZone = !coreZones.some(z => (fullValues.ville || '').toLowerCase().includes(z));
    const urgent = isUrgent(fullValues.selectedDate);

    switch (service.title) {
      case 'Nettoyage des vitres':
        if (fullValues.fenetres > 10) base += (fullValues.fenetres - 10) * 8;
        if (fullValues.hauteur > 1) base += 20 * (fullValues.hauteur - 1);
        if (urgent) base += 30;
        if (isHorsZone) base += 15;
        break;
      case 'Tonte de pelouse':
        if (fullValues.surface > 300) base += (fullValues.surface - 300) * 0.2;
        if (urgent) base += 30;
        if (isHorsZone) base += 15;
        break;
      case 'Entretien terrasse':
        if (fullValues.surface > 30) base += (fullValues.surface - 30) * 3;
        if (urgent) base += 30;
        if (isHorsZone) base += 15;
        break;
      case 'Nettoyage après intempéries':
        if (fullValues.surface > 200) base += (fullValues.surface - 200) * 0.5;
        if (urgent) base += 40;
        if (isHorsZone) base += 15;
        break;
      case 'Vérification habitation':
        if (fullValues.surface > 150) base += (fullValues.surface - 150) * 0.3;
        if (urgent) base += 20;
        if (isHorsZone) base += 15;
        break;
      case 'Arrosage jardin':
        if (fullValues.surface > 200) base += (fullValues.surface - 200) * 0.1;
        if (urgent) base += 15;
        if (isHorsZone) base += 15;
        break;
      case 'Réception de colis/commandes':
        if (fullValues.nombreColis > 1) base += (fullValues.nombreColis - 1) * 10;
        if (urgent) base += 20;
        if (isHorsZone) base += 15;
        break;
      case 'Ouverture ponctuelle pour artisan':
        if (fullValues.duree > 30) base += ((fullValues.duree - 30) / 60) * 49;
        if (urgent) base += 20;
        if (isHorsZone) base += 15;
        break;
      case 'Remontée d’anomalie':
        if (fullValues.surface > 50) base += (fullValues.surface - 50) * 0.5;
        if (urgent) base += 30;
        if (isHorsZone) base += 15;
        break;
      case 'Relève de compteur':
        if (fullValues.types === 'Tous (+10€)') base += 10;
        if (urgent) base += 10;
        if (isHorsZone) base += 15;
        break;
      case 'Livraison urgente':
        if (fullValues.distance > 5) base += (fullValues.distance - 5) * 5;
        if (urgent) base += 40;
        if (isHorsZone) base += 15;
        break;
      case 'Entretien piscine normal':
        if (fullValues.surface > 50) base += (fullValues.surface - 50) * 2;
        if (urgent) base += 40;
        if (isHorsZone) base += 15;
        break;
      case 'Nettoyage piscine en profondeur':
        if (fullValues.surface > 50) base += (fullValues.surface - 50) * 3;
        if (fullValues.moisEteinte > 3) base += (fullValues.moisEteinte - 3) * 20;
        if (urgent) base += 50;
        if (isHorsZone) base += 15;
        break;
      case 'Nettoyage gazon synthétique':
        if (fullValues.surface > 200) base += (fullValues.surface - 200) * 0.3;
        if (urgent) base += 25;
        if (isHorsZone) base += 15;
        break;
      case 'Nettoyage ménage intérieur':
        if (fullValues.surface > 150) base += (fullValues.surface - 150) * 1;
        if (urgent) base += 40;
        if (isHorsZone) base += 15;
        break;
      default:
        break;
    }
    base *= priceMultiplier;
    if (slotsLeft < 2 && slotsLeft > 0) base *= 1.1;
    setAdjustedPrice(Math.round(base));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      window.location.href = `/paiement?service=${encodeURIComponent(selectedService.title)}&price=${adjustedPrice}&specs=${encodeURIComponent(JSON.stringify(formValues))}`;
      setModalOpen(false);
    }
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
          <h1>{cat.hero.title}</h1>
          <p>{cat.hero.description}</p>
          <span className="highlight">20% de réduction la première année ! {timeLeft}</span>
        </div>
      </motion.div>
      {renderProgressBar()}
      <div className="catalogue-content">
        <div className="catalogue-filters">
          <label>{cat.filters.label}</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {cat.categories.map(catItem => <option key={catItem} value={catItem}>{catItem}</option>)}
          </select>
          <input
            type="text"
            placeholder={cat.hero.searchPlaceholder}
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
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" }}
              aria-label={service.title}
            >
              <div className="catalogue-image-wrapper">
                <img src={imageMap[service.title]} alt={service.title} className="catalogue-image" loading="lazy" />
                <span className="category-badge">{service.category}</span>
              </div>
              <div className="catalogue-content">
                <h3 className="catalogue-heading">{service.title}</h3>
                <p className="catalogue-description truncate">
                  {service.description}
                </p>
                <motion.div
                  className="catalogue-extra-details"
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="catalogue-extra">{service.extra}</span>
                  <a href="/abonnement" className="catalogue-upsell bold">Économisez 20% avec l'abo !</a>
                </motion.div>
                <div className="catalogue-pricing">
                  <span className="catalogue-price">{t('catalogue.price', { price: service.price })} €</span>
                </div>
                <motion.button
                  className="catalogue-button"
                  onClick={() => openModal(service)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Réserver ${service.title}`}
                >
                  {cat.book} <span className="button-icon">📅</span>
                </motion.button>
              </div>
            </motion.article>
          ))}
        </section>
        <div className="catalogue-cta">
          <h2>{cat.cta.title}</h2>
          <p>{cat.cta.description}</p>
          <motion.button
            className="catalogue-button cta-button"
            onClick={() => window.location.href = "/contact"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.cta.button}
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
            <div className="modal-stepper">
              {['Specs', 'Coord', 'Date/Price'].map((label, index) => (
                <div key={index} className={`step ${modalStep > index + 1 ? 'completed' : modalStep === index + 1 ? 'active' : ''}`}>
                  {index + 1}. {label}
                </div>
              ))}
            </div>
            <form>
              {modalStep === 1 && (
                <div className="step-content">
                  <h3>{cat.modal.specs}</h3>
                  {selectedService.formFields.map((field) => (
                    <div key={field.name} className="form-field">
                      <label>{field.label}</label>
                      {field.type === 'select' ? (
                        <select name={field.name} value={formValues[field.name] || ''} onChange={handleInputChange}>
                          {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} name={field.name} value={formValues[field.name] || ''} onChange={handleInputChange} />
                      )}
                    </div>
                  ))}
                  <div className="form-field">
                    <label>{cat.modal.city}</label>
                    <input type="text" name="ville" value={formValues.ville || ''} onChange={handleInputChange} placeholder="Ex: Platja d'Aro" className={errors.ville ? 'error' : ''} />
                    {errors.ville && <span className="error-message">{errors.ville}</span>}
                  </div>
                  <p>Prix estimé : {adjustedPrice} €</p>
                </div>
              )}
              {modalStep === 2 && (
                <div className="step-content">
                  <h3>{cat.modal.details}</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>{cat.modal.name}</label>
                      <input type="text" name="nom" value={formValues.nom || ''} onChange={handleInputChange} placeholder="Votre nom complet" className={errors.nom ? 'error' : ''} />
                      {errors.nom && <span className="error-message">{errors.nom}</span>}
                    </div>
                    <div className="form-field">
                      <label>{cat.modal.email}</label>
                      <input type="email" name="email" value={formValues.email || ''} onChange={handleInputChange} placeholder="votre@email.com" className={errors.email ? 'error' : ''} />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-field">
                      <label>{cat.modal.phone}</label>
                      <input type="tel" name="telephone" value={formValues.telephone || ''} onChange={handleInputChange} placeholder="+33..." className={errors.telephone ? 'error' : ''} />
                      {errors.telephone && <span className="error-message">{errors.telephone}</span>}
                    </div>
                    <div className="form-field full-width">
                      <label>{cat.modal.address}</label>
                      <textarea name="adresse" value={formValues.adresse || ''} onChange={handleInputChange} placeholder="Ex: 22 Carrer Palmeres, Platja d'Aro" className={errors.adresse ? 'error' : ''} />
                      {errors.adresse && <span className="error-message">{errors.adresse}</span>}
                    </div>
                  </div>
                </div>
              )}
              {modalStep === 3 && (
                <div className="step-content">
                  <h3>{cat.modal.date}</h3>
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
                  <p>Prix final : {adjustedPrice} €</p>
                </div>
              )}
            </form>
            <div className="modal-actions">
              {modalStep > 1 && (
                <motion.button
                  className="button-outline"
                  onClick={handlePrevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour
                </motion.button>
              )}
              {modalStep < 3 && (
                <motion.button
                  className="button-main"
                  onClick={handleNextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suivant
                </motion.button>
              )}
              {modalStep === 3 && (
                <motion.button
                  className="button-main"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.modal.pay}
                </motion.button>
              )}
              <motion.button
                className="button-outline"
                onClick={() => setModalOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.modal.cancel}
              </motion.button>
            </div>
            <a href="/abonnement" className="modal-upsell">{cat.modal.switchToSub}</a>
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </>
  );
};

export default CataloguePage;