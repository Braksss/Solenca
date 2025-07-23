import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/NavBar';
import solencaLogo from '../assets/solenca-logo.png';
import { useContent } from '../hooks/useContent'; // Import du hook
import '../styles/pages/conversion.scss';

interface InfosState {
  prenom: string;
  nom: string;
  email: string;
  adresseStreet: string;
  codePostal: string;
  ville: string;
  surfaceMaison: number;
  surfaceJardin: number;
  piscine: boolean;
  taillePiscine: number;
}

interface AddOnsState {
  jardin: boolean;
  piscine: boolean;
  gestionMaison: boolean;
  gestionLocative: boolean;
  preparationArrivee: boolean;
  integrationAlarme: boolean;
}

const ConversionPage = () => {
  const content = useContent(); // Load JSON content
  const conv = content.conversion; // Shortcut pour conversion section
  const today = new Date().toLocaleDateString('fr-FR');
  const [step, setStep] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [infos, setInfos] = useState<InfosState>({
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
  const [addOns, setAddOns] = useState<AddOnsState>({
    jardin: false,
    piscine: false,
    gestionMaison: false,
    gestionLocative: false,
    preparationArrivee: false,
    integrationAlarme: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InfosState, string>>>({});
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const endDate = new Date(conv.pricing.precommandeEndDate); // From JSON
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
  }, [conv.pricing.precommandeEndDate]);

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => setStep(4), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

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
    const isPrecommande = new Date() < new Date(conv.pricing.precommandeEndDate);
    const base = conv.pricing.base; // From JSON
    let addonsSum = 0;
    const addons = [];
    if (addOns.jardin) {
      const price = Math.min(Math.max(infos.surfaceJardin * 0.04, 50), 500); // Parse logic if dynamic, here hardcoded for MVP
      addons.push({ name: conv.addon.garden.label, price });
    }
    if (addOns.piscine && infos.piscine) {
      const price = Math.max(infos.taillePiscine * 1.2, 60);
      addons.push({ name: conv.addon.pool.label, price });
    }
    if (addOns.gestionMaison) {
      const price = infos.surfaceMaison * 0.3;
      addons.push({ name: conv.addon.house.label, price });
    }
    if (addOns.gestionLocative) {
      const price = 199;
      addons.push({ name: conv.addon.rental.label, price });
    }
    if (addOns.preparationArrivee) {
      const price = 29;
      addons.push({ name: conv.addon.arrival.label, price });
    }
    if (addOns.integrationAlarme) {
      const price = 29;
      addons.push({ name: conv.addon.alarm.label, price });
    }
    addonsSum = addons.reduce((sum, item) => sum + item.price, 0);
    const activeAddons = addons.length;
    let discountRate = 0;
    if (activeAddons >= 3) discountRate = conv.pricing.addonDiscountRates[activeAddons.toString()] || conv.pricing.addonDiscountRates['5plus'];
    const discountAmount = addonsSum * discountRate;
    addonsSum -= discountAmount;
    let subtotalMonthly = base + addonsSum;
    let tvaMonthly = subtotalMonthly * conv.pricing.vatRate;
    let totalMonthly = subtotalMonthly + tvaMonthly;

    if (isPrecommande) {
      subtotalMonthly *= (1 - conv.pricing.precommandeDiscount);
      tvaMonthly = subtotalMonthly * conv.pricing.vatRate;
      totalMonthly = subtotalMonthly + tvaMonthly;
    }

    let subtotal = subtotalMonthly;
    let tva = tvaMonthly;
    let total = totalMonthly;
    let savings = 0;
    let periodMultiplier = 1;
    let periodLabel = '/mois';
    let promoNote = isPrecommande ? ' (20% precommande inclus)' : '';

    const periodConfig = conv.pricing.billingPeriods[billingPeriod];
    if (periodConfig) {
      periodMultiplier = periodConfig.multiplier;
      subtotal *= periodMultiplier;
      tva *= periodMultiplier;
      total = (subtotal + tva) * (1 - periodConfig.discount);
      savings = (subtotal + tva) * periodConfig.discount;
      periodLabel = ` ${periodConfig.label.toLowerCase()}`;
    }

    return {
      base,
      addons,
      discountAmount: Math.round(discountAmount),
      discountRate,
      subtotalMonthly: Math.round(subtotalMonthly),
      tvaMonthly: Math.round(tvaMonthly),
      totalMonthly: Math.round(totalMonthly),
      subtotal: Math.round(subtotal),
      tva: Math.round(tva),
      total: Math.round(total),
      savings: Math.round(savings),
      periodMultiplier,
      periodLabel,
      promoNote,
      isPrecommande,
    };
  }, [addOns, infos, billingPeriod, conv.pricing, conv.addon]);

  const handleStripePayment = async () => {
    // ... (inchangé, focus sur paiement)
  };

  const generatePDF = () => {
    // ... (inchangé, mais utilise conv.step4 pour labels PDF)
    const doc = new jsPDF();
    doc.addImage(solencaLogo, 'PNG', 10, 10, 50, 20);
    doc.setFontSize(16);
    doc.text(conv.step4.quoteNumber.replace('{{number}}', Date.now().toString().slice(-6)), 70, 20); // Dynamic from JSON
    // ... reste inchangé, adapte labels comme "Total TTC" from conv.step4.total
  };

  const renderProgressBar = () => (
    <motion.div className="progress-bar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {['Infos', 'Modules', 'Devis', 'Confirmation'].map((label, index) => ( // Labels statiques pour MVP, sinon from JSON
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
        <title>Solenca - {conv.metaTitle.split(':')[0]}</title> {/* Dynamic meta */}
        <meta name="description" content={conv.metaDescription} />
      </Helmet>
      <Navbar />
      <motion.div className="conversion-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="intro-wrapper">
          <h1>{conv.headline}</h1>
          <p>{conv.description}</p>
          <span className="highlight">{conv.promo} {timeLeft}</span>
        </div>
      </motion.div>
      {renderProgressBar()}
      <div className="conversion-content">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section key="step1" className="quote-form" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
              <h3>{conv.step1.title}</h3>
              <div className="form-grid">
                <div>
                  <label>{conv.step1.firstname}</label>
                  <input type="text" value={infos.prenom} onChange={(e) => setInfos({ ...infos, prenom: e.target.value })} className={errors.prenom ? 'error' : ''} />
                  {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                </div>
                <div>
                  <label>{conv.step1.lastname}</label>
                  <input type="text" value={infos.nom} onChange={(e) => setInfos({ ...infos, nom: e.target.value })} className={errors.nom ? 'error' : ''} />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>
              </div>
              <label>{conv.step1.email}</label>
              <input type="email" value={infos.email} onChange={(e) => setInfos({ ...infos, email: e.target.value })} className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-message">{errors.email}</span>}
              <label>{conv.step1.street}</label>
              <input type="text" value={infos.adresseStreet} onChange={(e) => setInfos({ ...infos, adresseStreet: e.target.value })} className={errors.adresseStreet ? 'error' : ''} />
              {errors.adresseStreet && <span className="error-message">{errors.adresseStreet}</span>}
              <div className="form-grid">
                <div>
                  <label>{conv.step1.zip}</label>
                  <input type="text" value={infos.codePostal} onChange={(e) => setInfos({ ...infos, codePostal: e.target.value })} className={errors.codePostal ? 'error' : ''} />
                  {errors.codePostal && <span className="error-message">{errors.codePostal}</span>}
                </div>
                <div>
                  <label>{conv.step1.city}</label>
                  <input type="text" value={infos.ville} onChange={(e) => setInfos({ ...infos, ville: e.target.value })} className={errors.ville ? 'error' : ''} />
                  {errors.ville && <span className="error-message">{errors.ville}</span>}
                </div>
              </div>
              <div className="form-grid">
                <div>
                  <label>{conv.step1.houseSurface}</label>
                  <input type="number" value={infos.surfaceMaison} onChange={(e) => setInfos({ ...infos, surfaceMaison: Number(e.target.value) })} className={errors.surfaceMaison ? 'error' : ''} />
                  {errors.surfaceMaison && <span className="error-message">{errors.surfaceMaison}</span>}
                </div>
                <div>
                  <label>{conv.step1.gardenSurface}</label>
                  <input type="number" value={infos.surfaceJardin} onChange={(e) => setInfos({ ...infos, surfaceJardin: Number(e.target.value) })} className={errors.surfaceJardin ? 'error' : ''} />
                  {errors.surfaceJardin && <span className="error-message">{errors.surfaceJardin}</span>}
                </div>
              </div>
              <label>{conv.step1.hasPool}</label>
              <input type="checkbox" checked={infos.piscine} onChange={(e) => setInfos({ ...infos, piscine: e.target.checked })} />
              {infos.piscine && (
                <>
                  <label>{conv.step1.poolSize}</label>
                  <input type="number" value={infos.taillePiscine} onChange={(e) => setInfos({ ...infos, taillePiscine: Number(e.target.value) })} className={errors.taillePiscine ? 'error' : ''} />
                  {errors.taillePiscine && <span className="error-message">{errors.taillePiscine}</span>}
                </>
              )}
              <div className="step-footer">
                <motion.button className="button-main" onClick={() => { if (validateInfos()) setStep(2); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {conv.step1.next}
                </motion.button>
              </div>
            </motion.section>
          )}
          {step === 2 && (
            <motion.section key="step2" className="addons-step" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
              <h3>{conv.step2.title}</h3>
              <div className="addons-grid">
                {Object.entries(conv.addon).map(([id, addon]) => (
                  <motion.div key={id} className={`addon-card ${addOns[id] ? 'selected' : ''}`} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                    <div className="addon-header">
                      <label htmlFor={id}>{addon.label}</label>
                      <div className="info-icon" data-tooltip={addon.info}>?</div>
                    </div>
                    <input id={id} type="checkbox" checked={addOns[id]} onChange={() => setAddOns({ ...addOns, [id]: !addOns[id] })} />
                  </motion.div>
                ))}
              </div>
              <div className="step-footer">
                <motion.button className="button-outline" onClick={() => setStep(1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {conv.back}
                </motion.button>
                <motion.button className="button-main" onClick={() => setStep(3)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {conv.step2.quote}
                </motion.button>
              </div>
            </motion.section>
          )}
          {step === 3 && (
            <motion.section key="step3" className="generating-step" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <h3>{conv.step3.title}</h3>
              <p>{conv.step3.description}</p>
              <div className="loading-spinner" />
              <div className="step-footer">
                <motion.button className="button-outline" onClick={() => setStep(2)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {conv.back}
                </motion.button>
              </div>
            </motion.section>
          )}
          {step === 4 && (
            <motion.section key="step4" className="summary-step" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
              <div className="invoice-header">
                <img src={solencaLogo} alt="Solenca" className="logo" />
                <div className="devis-info">
                  <h2>{conv.step4.quoteNumber.replace('{{number}}', Date.now().toString().slice(-6))}</h2>
                  <p>{conv.step4.date}: {today}</p>
                </div>
              </div>
              <div className="invoice-client">
                <p>{infos.prenom} {infos.nom}</p>
                <p>{infos.adresseStreet}, {infos.codePostal} {infos.ville}</p>
                <p>{infos.email}</p>
              </div>
              <div className="billing-options">
                <h3>Choisissez votre période de paiement</h3>
                <div className="billing-grid">
                  {Object.entries(conv.pricing.billingPeriods).map(([period, config]) => (
                    <label key={period} className={`billing-option ${billingPeriod === period ? 'selected' : ''}`}>
                      <input type="radio" name="billingPeriod" value={period} checked={billingPeriod === period} onChange={() => setBillingPeriod(period)} />
                      {config.label} : {calculateDynamicPrice.totalMonthly} € /mois (total TTC {calculateDynamicPrice.total} €{calculateDynamicPrice.promoNote}, économisez {calculateDynamicPrice.savings} €, soit {config.discount * 100}%)
                    </label>
                  ))}
                </div>
              </div>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>{conv.step4.description}</th>
                    <th>{conv.step4.unitPrice}</th>
                    <th>{conv.step4.quantity}</th>
                    <th>{conv.step4.totalHT}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{conv.step4.base}</td>
                    <td>{calculateDynamicPrice.base} €</td>
                    <td>1</td>
                    <td>{calculateDynamicPrice.base} €</td>
                  </tr>
                  {calculateDynamicPrice.addons.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.price} €</td>
                      <td>1</td>
                      <td>{item.price} €</td>
                    </tr>
                  ))}
                  {calculateDynamicPrice.discountAmount > 0 && (
                    <tr>
                      <td>{conv.step4.addonDiscount} ({calculateDynamicPrice.discountRate * 100}%)</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-{calculateDynamicPrice.discountAmount} €</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>{conv.step4.subtotal} HT</td>
                    <td>{calculateDynamicPrice.subtotal} €</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>{conv.step4.vat}</td>
                    <td>{calculateDynamicPrice.tva} €</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan={3}>{conv.step4.total} à payer {calculateDynamicPrice.periodLabel}</td>
                    <td>{calculateDynamicPrice.total} € (économie {calculateDynamicPrice.savings} €{calculateDynamicPrice.promoNote})</td>
                  </tr>
                </tfoot>
              </table>
              <p>Paiement sécurisé via Stripe – immédiat et sans frais cachés.</p>
              <div className="summary-actions">
                <motion.button className="button-outline" onClick={() => setStep(3)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {conv.back}
                </motion.button>
                <motion.button className="button-main" onClick={handleStripePayment} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {conv.step4.pay}
                </motion.button>
                <motion.button className="button-outline" onClick={generatePDF} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {conv.step4.pdf}
                </motion.button>
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