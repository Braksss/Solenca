import React, { useState, useEffect } from 'react';
import solencaLogo from '../../assets/solenca-logo.png';
import illustration from '../../assets/modal-illustration.jpg';
import '../../styles/abonnement/subscriptionmodal.scss';

interface Props {
  onClose: () => void;
}

const SubscriptionModal: React.FC<Props> = ({ onClose }) => {
  const today = new Date().toLocaleDateString('fr-FR');

  const [step, setStep] = useState(1);
  const [addOns, setAddOns] = useState({
    piscine: false,
    jardin: false,
    vitres: false,
    alarme: false,
  });

  const [infos, setInfos] = useState({
    nom: '',
    email: '',
    adresse: '',
    surfaceMaison: 100,
    surfaceJardin: 50,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!infos.nom.trim() || infos.nom.length < 3) newErrors.nom = 'Nom requis (min 3 caractères)';
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!infos.email || !emailRegex.test(infos.email)) newErrors.email = 'Email invalide';
    if (!infos.adresse.trim() || infos.adresse.length < 10) newErrors.adresse = 'Adresse invalide (min 10 caractères)';
    if (infos.surfaceMaison <= 0) newErrors.surfaceMaison = 'Surface maison invalide';
    if (infos.surfaceJardin < 0) newErrors.surfaceJardin = 'Surface jardin invalide';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDynamicPrice = () => {
    let base = 99;
    let addonsSum = 0;
    if (addOns.piscine) addonsSum += infos.surfaceMaison > 120 ? 89 : 69;
    if (addOns.jardin) addonsSum += infos.surfaceJardin > 100 ? 89 : 69;
    if (addOns.vitres) addonsSum += 49;
    if (addOns.alarme) addonsSum += 39;
    let surcharge = 0;
    if (infos.adresse.toLowerCase().includes('calonge')) surcharge = 49;
    addonsSum += surcharge;

    const activeAddons = Object.values(addOns).filter(Boolean).length;
    let discountRate = 0;
    if (activeAddons === 2) discountRate = 0.10;
    else if (activeAddons === 3) discountRate = 0.15;
    else if (activeAddons === 4) discountRate = 0.20;
    const discountAmount = addonsSum * discountRate;
    addonsSum -= discountAmount;

    let subtotal = base + addonsSum;
    const tva = subtotal * 0.21;
    return Math.round(subtotal + tva);
  };

  const handleStripePayment = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPro: false,
          email: infos.email || 'particulier@example.com',
        }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Erreur paiement particulier :', error);
    }
  };

  const priceData = calculateDynamicPrice();

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setStep(5), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const renderProgressBar = () => (
    <div className="progress-bar">
      {[1, 2, 3, 4, 5].map((s) => (
        <React.Fragment key={s}>
          <div className={`dot ${step >= s ? 'active' : ''}`} />
          {s < 5 && <div className="line" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="subscription-modal-overlay">
      <div className="subscription-modal">
        <div className="modal-illustration">
          <img src={illustration} alt="Illustration abonnement" />
        </div>

        <div className="modal-content">
          {renderProgressBar()}

          {step === 1 && (
            <section className="intro-step">
              <h2 className="main-title">Tranquilidad 365 – Ce qui est inclus</h2>
              <ul>
                <li>2 visites mensuelles préventives</li>
                <li>Rapport photo envoyé à chaque passage</li>
                <li>Dépôt de clés sécurisé</li>
                <li>Intervention d’urgence en cas de problème</li>
                <li>Coordination petits prestataires (nettoyage, alarme...)</li>
                <li>Espace client digital personnel</li>
              </ul>

              <div className="modal-footer">
                <button className="button-outline" onClick={onClose}>Annuler</button>
                <button className="button-main" onClick={() => setStep(2)}>Suivant</button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="addons-step">
              <h3>Modules supplémentaires</h3>

              <div className="addons-form">
                {Object.entries(addOns).map(([key, value]) => (
                  <div key={key} className="addon-option">
                    <label htmlFor={key}>
                      {key === 'piscine' && 'Entretien piscine'}
                      {key === 'jardin' && 'Entretien jardin'}
                      {key === 'vitres' && 'Nettoyage vitres'}
                      {key === 'alarme' && 'Gestion alarme'}
                    </label>
                    <input
                      id={key}
                      type="checkbox"
                      checked={value}
                      onChange={() => setAddOns({ ...addOns, [key]: !value })}
                    />
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button className="button-outline" onClick={() => setStep(1)}>Retour</button>
                <button className="button-main" onClick={() => setStep(3)}>Suivant</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="quote-form">
              <h3>Vos informations</h3>

              <label>Nom</label>
              <input
                type="text"
                value={infos.nom}
                onChange={(e) => setInfos({ ...infos, nom: e.target.value })}
                className={errors.nom ? 'error' : ''}
              />
              {errors.nom && <span className="error-message">{errors.nom}</span>}

              <label>Email</label>
              <input
                type="email"
                value={infos.email}
                onChange={(e) => setInfos({ ...infos, email: e.target.value })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}

              <label>Adresse du bien</label>
              <input
                type="text"
                value={infos.adresse}
                onChange={(e) => setInfos({ ...infos, adresse: e.target.value })}
                className={errors.adresse ? 'error' : ''}
              />
              {errors.adresse && <span className="error-message">{errors.adresse}</span>}

              <label>Surface maison (m²)</label>
              <input
                type="number"
                value={infos.surfaceMaison}
                onChange={(e) => setInfos({ ...infos, surfaceMaison: Number(e.target.value) })}
                className={errors.surfaceMaison ? 'error' : ''}
              />
              {errors.surfaceMaison && <span className="error-message">{errors.surfaceMaison}</span>}

              <label>Surface jardin (m²)</label>
              <input
                type="number"
                value={infos.surfaceJardin}
                onChange={(e) => setInfos({ ...infos, surfaceJardin: Number(e.target.value) })}
                className={errors.surfaceJardin ? 'error' : ''}
              />
              {errors.surfaceJardin && <span className="error-message">{errors.surfaceJardin}</span>}

              <div className="modal-footer">
                <button className="button-outline" onClick={() => setStep(2)}>Retour</button>
                <button
                  className="button-main"
                  onClick={() => {
                    if (validateForm()) setStep(4);
                  }}
                >
                  Créer mon devis
                </button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="generating-step">
              <h3>Nous créons votre devis personnalisé…</h3>
              <p>Analyse de votre bien, de vos besoins, des modules sélectionnés…</p>
              <div className="loading-spinner" />
              <div className="modal-footer">
                <button className="button-outline" onClick={() => setStep(3)}>Retour</button>
              </div>
            </section>
          )}

          {step === 5 && (
            <section className="summary-step">
              <div className="invoice-header">
                <img src={solencaLogo} alt="logo" className="logo" />
                <div className="devis-info">
                  <h2>Devis N° SO-{Date.now().toString().slice(-6)}</h2>
                  <p>Date : {today}</p>
                </div>
              </div>

              <div className="invoice-client">
                <h3>Client</h3>
                <p><strong>Nom :</strong> {infos.nom}</p>
                <p><strong>Email :</strong> {infos.email}</p>
                <p><strong>Adresse :</strong> {infos.adresse}</p>
              </div>

              <div className="invoice-grid">
                <div className="item-desc">Tranquilidad 365</div>
                <div className="item-price">{priceData.base}</div>
                {priceData.addons.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="item-desc">{item.name}</div>
                    <div className="item-price">{item.price}</div>
                  </React.Fragment>
                ))}
                {priceData.discountAmount > 0 && (
                  <>
                    <div className="item-desc">Réduction addons</div>
                    <div className="item-price">-{priceData.discountAmount}</div>
                  </>
                )}
                <div className="subtotal item-desc">Subtotal HT</div>
                <div className="subtotal item-price">{priceData.subtotal}</div>
                <div className="tva item-desc">TVA 21%</div>
                <div className="tva item-price">{priceData.tva}</div>
                <div className="total item-desc">Total TTC</div>
                <div className="total item-price">{priceData.total}</div>
              </div>

              <div className="invoice-terms">
                <p>Validité du devis : 30 jours.</p>
                <p>Paiement : Mensuel par prélèvement.</p>
                <p>Solenca SARL, Platja d'Aro, Espagne.</p>
              </div>

              <div className="summary-actions">
                <button className="button-outline" onClick={() => setStep(4)}>Retour</button>
                <button className="button-main" onClick={handleStripePayment}>Confirmer et payer</button>
                <a className="button-outline" href="/path/to/devis.pdf" download>Télécharger PDF</a>
              </div>
              <a href="/faq" target="_blank" rel="noopener noreferrer">FAQ Solenca</a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;