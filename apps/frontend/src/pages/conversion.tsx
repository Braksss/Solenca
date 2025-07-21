import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/NavBar';
import solencaLogo from '../assets/solenca-logo.png';
import '../styles/pages/conversion.scss';

const ConversionPage = () => {
  const { t } = useTranslation();
  const today = new Date().toLocaleDateString('fr-FR');
  const [step, setStep] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // monthly, semiannual, once
  const [infos, setInfos] = useState({
    prenom: '',
    nom: '',
    email: '',
    adresseStreet: '',
    codePostal: '',
    ville: '',
    surfaceMaison: 0,
    surfaceJardin: 0,
    piscine: false,
    taillePiscine: 0,
  });
  const [addOns, setAddOns] = useState({
    jardin: false,
    piscine: false,
    gestionMaison: false,
    gestionLocative: false,
    preparationArrivee: false,
    integrationAlarme: false,
  });
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

  useEffect(() => {
    if (step === 3) {
      const villeLower = infos.ville.toLowerCase();
      const simulatedKm = villeLower.includes('pals') || villeLower.includes('lloret') ? 20 : 0;
      const surcharge = simulatedKm > 10 ? (simulatedKm - 10) * 0.5 : 0;
      const timer = setTimeout(() => setStep(4), 3000);
      return () => clearTimeout(timer);
    }
  }, [step, infos.ville]);

  const validateInfos = () => {
    const newErrors = {};
    if (!infos.prenom.trim() || infos.prenom.length < 2) newErrors.prenom = 'Prénom requis (min 2)';
    if (!infos.nom.trim() || infos.nom.length < 3) newErrors.nom = 'Nom requis (min 3)';
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!infos.email || !emailRegex.test(infos.email)) newErrors.email = 'Email invalide';
    if (!infos.adresseStreet.trim() || infos.adresseStreet.length < 5) newErrors.adresseStreet = 'Adresse rue invalide (min 5)';
    if (!infos.codePostal.trim() || infos.codePostal.length < 5) newErrors.codePostal = 'Code postal invalide (min 5)';
    if (!infos.ville.trim() || infos.ville.length < 3) newErrors.ville = 'Ville invalide (min 3)';
    if (infos.surfaceMaison <= 0) newErrors.surfaceMaison = 'Surface maison invalide';
    if (infos.surfaceJardin < 0) newErrors.surfaceJardin = 'Surface jardin invalide';
    if (infos.piscine && infos.taillePiscine <= 0) newErrors.taillePiscine = 'Taille piscine invalide';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDynamicPrice = useMemo(() => {
    let base = 99;
    let addonsSum = 0;
    const addons = [];
    if (addOns.jardin) addons.push({ name: 'Entretien jardin', price: Math.min(Math.max(infos.surfaceJardin * 0.04, 50), 500) });
    if (addOns.piscine && infos.piscine) addons.push({ name: 'Entretien piscine', price: Math.max(infos.taillePiscine * 1.2, 60) });
    if (addOns.gestionMaison) addons.push({ name: 'Gestion maison', price: infos.surfaceMaison * 0.3 });
    if (addOns.gestionLocative) addons.push({ name: 'Gestion locative', price: 199 });
    if (addOns.preparationArrivee) addons.push({ name: 'Préparation arrivée', price: 29 });
    if (addOns.integrationAlarme) addons.push({ name: 'Intégration alarme', price: 29 });
    addonsSum = addons.reduce((sum, item) => sum + item.price, 0);
    const activeAddons = addons.length;
    let discountRate = activeAddons >= 3 ? (activeAddons === 3 ? 0.10 : activeAddons === 4 ? 0.15 : 0.20) : 0;
    const discountAmount = addonsSum * discountRate;
    addonsSum -= discountAmount;
    let subtotal = base + addonsSum;
    const tva = subtotal * 0.21;
    let finalPrice = subtotal + tva;

    if (billingPeriod === 'once') {
      finalPrice *= 0.8; // 20% de réduction pour annuel
    } else if (billingPeriod === 'semiannual') {
      finalPrice *= 0.9; // 10% de réduction supplémentaire pour semestriel
    }

    return {
      base,
      addons,
      discountAmount: Math.round(discountAmount),
      discountRate,
      subtotal: Math.round(subtotal),
      tva: Math.round(tva),
      total: Math.round(finalPrice),
      annualSavings: billingPeriod === 'once' ? Math.round((subtotal + tva) * 0.2) : 0,
      semiannualSavings: billingPeriod === 'semiannual' ? Math.round((subtotal + tva) * 0.1) : 0,
    };
  }, [addOns, infos, billingPeriod]);

  const handleStripePayment = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPro: false,
          email: infos.email || 'particulier@example.com',
          total: calculateDynamicPrice.total,
          billingPeriod,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Erreur : URL de session Stripe manquante');
      }
    } catch (error) {
      console.error('Erreur paiement :', error);
    }
  };

  const renderProgressBar = () => (
    <motion.div
      className="progress-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {['Infos', 'Modules', 'Devis', 'Confirmation'].map((label, index) => (
        <div key={index} className={`progress-step ${step > index + 1 ? 'completed' : step === index + 1 ? 'active' : ''}`}>
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Solenca - Souscription</title>
        <meta name="description" content="Gérez votre résidence secondaire sur la Costa Brava avec sérénité. Abonnement personnalisé, 20% de réduction la première année." />
      </Helmet>
      <Navbar />
      <motion.div
        className="conversion-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="intro-wrapper">
          <h1>Votre sérénité, notre mission</h1>
          <p>Configurez votre abonnement Solenca en 4 étapes simples et profitez de votre résidence secondaire sans soucis.</p>
          <span className="highlight">20% de réduction la première année ! {timeLeft}</span>
        </div>
      </motion.div>
      {renderProgressBar()}
      <div className="conversion-content">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="step1"
              className="quote-form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Informations de votre bien</h3>
              <div className="form-grid">
                <div>
                  <label>Prénom</label>
                  <input
                    type="text"
                    value={infos.prenom}
                    onChange={(e) => setInfos({ ...infos, prenom: e.target.value })}
                    className={errors.prenom ? 'error' : ''}
                  />
                  {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                </div>
                <div>
                  <label>Nom</label>
                  <input
                    type="text"
                    value={infos.nom}
                    onChange={(e) => setInfos({ ...infos, nom: e.target.value })}
                    className={errors.nom ? 'error' : ''}
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>
              </div>
              <label>Email</label>
              <input
                type="email"
                value={infos.email}
                onChange={(e) => setInfos({ ...infos, email: e.target.value })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
              <label>Adresse</label>
              <input
                type="text"
                value={infos.adresseStreet}
                onChange={(e) => setInfos({ ...infos, adresseStreet: e.target.value })}
                className={errors.adresseStreet ? 'error' : ''}
              />
              {errors.adresseStreet && <span className="error-message">{errors.adresseStreet}</span>}
              <div className="form-grid">
                <div>
                  <label>Code postal</label>
                  <input
                    type="text"
                    value={infos.codePostal}
                    onChange={(e) => setInfos({ ...infos, codePostal: e.target.value })}
                    className={errors.codePostal ? 'error' : ''}
                  />
                  {errors.codePostal && <span className="error-message">{errors.codePostal}</span>}
                </div>
                <div>
                  <label>Ville</label>
                  <input
                    type="text"
                    value={infos.ville}
                    onChange={(e) => setInfos({ ...infos, ville: e.target.value })}
                    className={errors.ville ? 'error' : ''}
                  />
                  {errors.ville && <span className="error-message">{errors.ville}</span>}
                </div>
              </div>
              <div className="form-grid">
                <div>
                  <label>Surface maison (m²)</label>
                  <input
                    type="number"
                    value={infos.surfaceMaison}
                    onChange={(e) => setInfos({ ...infos, surfaceMaison: Number(e.target.value) })}
                    className={errors.surfaceMaison ? 'error' : ''}
                  />
                  {errors.surfaceMaison && <span className="error-message">{errors.surfaceMaison}</span>}
                </div>
                <div>
                  <label>Surface jardin (m²)</label>
                  <input
                    type="number"
                    value={infos.surfaceJardin}
                    onChange={(e) => setInfos({ ...infos, surfaceJardin: Number(e.target.value) })}
                    className={errors.surfaceJardin ? 'error' : ''}
                  />
                  {errors.surfaceJardin && <span className="error-message">{errors.surfaceJardin}</span>}
                </div>
              </div>
              <label>Piscine</label>
              <input
                type="checkbox"
                checked={infos.piscine}
                onChange={(e) => setInfos({ ...infos, piscine: e.target.checked })}
              />
              {infos.piscine && (
                <>
                  <label>Taille piscine (m²)</label>
                  <input
                    type="number"
                    value={infos.taillePiscine}
                    onChange={(e) => setInfos({ ...infos, taillePiscine: Number(e.target.value) })}
                    className={errors.taillePiscine ? 'error' : ''}
                  />
                  {errors.taillePiscine && <span className="error-message">{errors.taillePiscine}</span>}
                </>
              )}
              <div className="step-footer">
                <motion.button
                  className="button-main"
                  onClick={() => { if (validateInfos()) setStep(2); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suivant
                </motion.button>
              </div>
            </motion.section>
          )}
          {step === 2 && (
            <motion.section
              key="step2"
              className="addons-step"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Choisissez vos modules</h3>
              <div className="addons-grid">
                {[
                  { id: 'jardin', label: 'Entretien jardin', tooltip: 'Tonte, arrosage, taille – adapté à la surface.' },
                  ...(infos.piscine ? [{ id: 'piscine', label: 'Entretien piscine', tooltip: 'Nettoyage, équilibre eau – adapté à la taille.' }] : []),
                  { id: 'gestionMaison', label: 'Gestion maison', tooltip: 'Nettoyage, maintenance – maison prête à tout moment.' },
                  { id: 'gestionLocative', label: 'Gestion locative', tooltip: 'Coordination locations, check-in/out.' },
                  { id: 'preparationArrivee', label: 'Préparation arrivée', tooltip: 'Lits faits, courses – 2/mois inclus.' },
                  { id: 'integrationAlarme', label: 'Intégration alarme', tooltip: 'Connexion alarme/app, notifications en temps réel.' },
                ].map((addon) => (
                  <motion.div
                    key={addon.id}
                    className={`addon-card ${addOns[addon.id] ? 'selected' : ''}`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="addon-header">
                      <label htmlFor={addon.id}>{addon.label}</label>
                      <div className="info-icon" data-tooltip={addon.tooltip}>?</div>
                    </div>
                    <input
                      id={addon.id}
                      type="checkbox"
                      checked={addOns[addon.id]}
                      onChange={() => setAddOns({ ...addOns, [addon.id]: !addOns[addon.id] })}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="step-footer">
                <motion.button
                  className="button-outline"
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour
                </motion.button>
                <motion.button
                  className="button-main"
                  onClick={() => setStep(3)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir le devis
                </motion.button>
              </div>
            </motion.section>
          )}
          {step === 3 && (
            <motion.section
              key="step3"
              className="generating-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Génération de votre devis...</h3>
              <p>Nous analysons vos informations et modules sélectionnés.</p>
              <div className="loading-spinner" />
              <div className="step-footer">
                <motion.button
                  className="button-outline"
                  onClick={() => setStep(2)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour
                </motion.button>
              </div>
            </motion.section>
          )}
          {step === 4 && (
            <motion.section
              key="step4"
              className="summary-step"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="invoice-header">
                <img src={solencaLogo} alt="Solenca" className="logo" />
                <div className="devis-info">
                  <h2>Devis N° SO-{Date.now().toString().slice(-6)}</h2>
                  <p>Date: {today}</p>
                </div>
              </div>
              <div className="invoice-client">
                <p>{infos.prenom} {infos.nom}</p>
                <p>{infos.adresseStreet}, {infos.codePostal} {infos.ville}</p>
                <p>contact@solenca.com</p>
              </div>
              <div className="billing-options">
                <h3>Choisissez votre période de paiement</h3>
                <div className="billing-grid">
                  <label className={`billing-option ${billingPeriod === 'monthly' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="billingPeriod"
                      value="monthly"
                      checked={billingPeriod === 'monthly'}
                      onChange={() => setBillingPeriod('monthly')}
                    />
                    Mensuel ({calculateDynamicPrice.total} €/mois)
                  </label>
                  <label className={`billing-option ${billingPeriod === 'semiannual' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="billingPeriod"
                      value="semiannual"
                      checked={billingPeriod === 'semiannual'}
                      onChange={() => setBillingPeriod('semiannual')}
                    />
                    Semestriel ({Math.round(calculateDynamicPrice.total * 6)} €/6 mois, économisez {calculateDynamicPrice.semiannualSavings} €)
                  </label>
                  <label className={`billing-option ${billingPeriod === 'once' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="billingPeriod"
                      value="once"
                      checked={billingPeriod === 'once'}
                      onChange={() => setBillingPeriod('once')}
                    />
                    Annuel ({Math.round(calculateDynamicPrice.total * 12)} €/an, économisez {calculateDynamicPrice.annualSavings} €)
                  </label>
                </div>
              </div>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Prix HT</th>
                    <th>Quantité</th>
                    <th>Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tranquilidad 365</td>
                    <td>{calculateDynamicPrice.base} €</td>
                    <td>1</td>
                    <td>{calculateDynamicPrice.base} €</td>
                  </tr>
                  {calculateDynamicPrice.addons && calculateDynamicPrice.addons.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.price} €</td>
                      <td>1</td>
                      <td>{item.price} €</td>
                    </tr>
                  ))}
                  {calculateDynamicPrice.discountAmount > 0 && (
                    <tr>
                      <td>Réduction modules ({calculateDynamicPrice.discountRate * 100}%)</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-{calculateDynamicPrice.discountAmount} €</td>
                    </tr>
                  )}
                  {billingPeriod !== 'monthly' && (
                    <tr>
                      <td>Réduction {billingPeriod === 'once' ? 'annuelle (20%)' : 'semestrielle (10%)'}</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-{billingPeriod === 'once' ? calculateDynamicPrice.annualSavings : calculateDynamicPrice.semiannualSavings} €</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">Subtotal HT</td>
                    <td>{calculateDynamicPrice.subtotal} €</td>
                  </tr>
                  <tr>
                    <td colSpan="3">TVA (21%)</td>
                    <td>{calculateDynamicPrice.tva} €</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="3">Total TTC</td>
                    <td>{calculateDynamicPrice.total} € {billingPeriod === 'monthly' ? '/mois' : billingPeriod === 'semiannual' ? '/6 mois' : '/an'}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="invoice-terms">
                <p><strong>Paiement :</strong> Virement bancaire ou carte</p>
                <p><strong>Compte :</strong> ES12 3456 7890 1234 5678 9012</p>
                <p><strong>Valable :</strong> 30 jours à compter de {today}</p>
              </div>
              <div className="summary-actions">
                <motion.button
                  className="button-outline"
                  onClick={() => setStep(3)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour
                </motion.button>
                <motion.button
                  className="button-main"
                  onClick={handleStripePayment}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Confirmer et payer
                </motion.button>
                <motion.a
                  className="button-outline"
                  href="/devis.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Télécharger PDF
                </motion.a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default ConversionPage;