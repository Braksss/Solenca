import React, { useEffect, useState } from "react";
import "../styles/pages/abonnement.scss";
import { useTranslation } from "react-i18next";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

// --- Icônes ---
const CheckIcon = () => <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
const PlusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

// --- Type pour le client ---
type ClientType = "particulier" | "pro";

// --- ID Formspree ---
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

const AbonnementPageFinal: React.FC = () => {
    const { t } = useTranslation();
    
    // --- State de la page ---
    const [clientType, setClientType] = useState<ClientType>("particulier");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    // --- State complet du formulaire ---
    const [form, setForm] = useState({
        nom: "", email: "", phone: "", cp: "",
        services: { piscine: false, jardin: false, nettoyage: false, gestionLocative: false, conciergerie: false, autre: false },
        message: "",
        societe: "", siret: "",
        consent: false,
        utm_source: "", utm_medium: "", utm_campaign: "", gotcha: ""
    });

    // --- Récupération des listes depuis i18n ---
    const baseOfferIncludes = t('abo_page.base_offer_includes', { returnObjects: true }) as string[] || [];
    const addonsList = t('abo_page.addons_list', { returnObjects: true }) as { name: string, price: string }[] || [];
    const proServices = t('abo_page.pro_services', { returnObjects: true }) as string[] || [];
    const formServices = t('abo_page.form_services', { returnObjects: true }) as { key: keyof typeof form.services, label: string }[] || [];

    useEffect(() => {
        document.title = t('abo_page.seo_title');
        const p = new URLSearchParams(window.location.search);
        setForm(f => ({ ...f, utm_source: p.get("utm_source") || "", utm_medium: p.get("utm_medium") || "", utm_campaign: p.get("utm_campaign") || "" }));
    }, [t]);
    
    const handleClientTypeChange = (type: ClientType) => {
        setClientType(type);
        setAnimationKey(prev => prev + 1);
    };

    const onField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        if (name.startsWith("services.")) {
            const key = name.split(".")[1] as keyof typeof form.services;
            setForm(f => ({ ...f, services: { ...f.services, [key]: checked } }));
        } else {
            setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting || form.gotcha) return;
        setSubmitting(true);
        const payload = { ...form, clientType };

        if (FORMSPREE_ID) {
            try {
                const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setSubmitted(true);
                window.scrollTo({ top: document.getElementById('form-section')?.offsetTop, behavior: 'smooth' });
            } catch (err) {
                console.error("Formspree failed:", err); alert("Une erreur est survenue.");
            } finally {
                setSubmitting(false);
            }
        } else {
            console.error("FORMSPREE_ID is not configured."); alert("Le service de formulaire n'est pas configuré."); setSubmitting(false);
        }
    };

    return (
        <div className="abo-page-final">
            <Navbar />
            <main>
                <header className="abo-hero">
                    <div className="shell">
                        <span className="kicker">{t('abo_page.hero_kicker')}</span>
                        <h1>{t('abo_page.hero_title')}</h1>
                        <p>{t('abo_page.hero_subtitle')}</p>
                    </div>
                </header>

                <section className="shell offers-section">
                    <div className="client-type-toggle">
                        <button onClick={() => handleClientTypeChange('particulier')} className={clientType === 'particulier' ? 'active' : ''}>{t('abo_page.toggle_particulier')}</button>
                        <button onClick={() => handleClientTypeChange('pro')} className={clientType === 'pro' ? 'active' : ''}>{t('abo_page.toggle_pro')}</button>
                    </div>

                    <div className="offers-content" key={animationKey}>
                        {clientType === 'particulier' ? (
                            <div className="particulier-view">
                                <div className="pricing-flow">
                                    <div className="card base-offer">
                                        <h3>{t('abo_page.base_offer_title')}</h3>
                                        <div className="price">{t('abo_page.base_offer_price')}<span className="period">/{t('abo_page.base_offer_period')}</span></div>
                                        <p className="card-desc">{t('abo_page.base_offer_desc')}</p>
                                        <ul className="features-list">
                                            {baseOfferIncludes.map((item, i) => <li key={i}><CheckIcon /> {item}</li>)}
                                        </ul>
                                    </div>
                                    <div className="plus-separator"><PlusIcon /></div>
                                    <div className="card addons-offer">
                                        <h3>{t('abo_page.addons_offer_title')}</h3>
                                        <p className="card-desc">{t('abo_page.addons_offer_desc')}</p>
                                        <ul className="features-list modules">
                                            {addonsList.map((item, i) => <li key={i}><span className="module-name">{item.name}</span><span className="module-price">{item.price}</span></li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="pro-view">
                                <h3>{t('abo_page.pro_title')}</h3>
                                <p className="pro-subtitle">{t('abo_page.pro_subtitle')}</p>
                                <div className="pro-features-grid">
                                    {proServices.map((item, i) => <div key={i} className="pro-feature-item"><CheckIcon /> {item}</div>)}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section id="form-section" className="form-section-wrapper">
                    <div className="shell">
                        {submitted ? (
                            <div className="thank-you-card">
                                <h3>{t('abo_page.thank_you_title')}</h3>
                                <p>{t('abo_page.thank_you_desc')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="devis-form">
                                <fieldset>
                                    <legend>{clientType === 'particulier' ? t('abo_page.form_title_particulier') : t('abo_page.form_title_pro')}</legend>
                                    <div className="form-grid">
                                        <input name="nom" required value={form.nom} onChange={onField} placeholder={t('abo_page.form_placeholder_name')} />
                                        <input name="email" type="email" required value={form.email} onChange={onField} placeholder={t('abo_page.form_placeholder_email')} />
                                        <input name="phone" type="tel" required value={form.phone} onChange={onField} placeholder={t('abo_page.form_placeholder_phone')} />
                                        <input name="cp" required value={form.cp} onChange={onField} placeholder={clientType === 'particulier' ? t('abo_page.form_placeholder_cp_particulier') : t('abo_page.form_placeholder_cp_pro')} />
                                        {clientType === 'pro' && (
                                            <>
                                                <input name="societe" value={form.societe} onChange={onField} placeholder={t('abo_page.form_placeholder_company')} />
                                                <input name="siret" value={form.siret} onChange={onField} placeholder={t('abo_page.form_placeholder_siret')} />
                                            </>
                                        )}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>{t('abo_page.form_subtitle_needs')}</legend>
                                    <div className="checks">
                                        {formServices.map(service => (
                                            <label key={service.key}>
                                                <input type="checkbox" name={`services.${service.key}`} checked={form.services[service.key]} onChange={onField} />
                                                <span>{service.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <textarea name="message" rows={4} value={form.message} onChange={onField} placeholder={t('abo_page.form_placeholder_message')} />
                                </fieldset>

                                <div className="form-footer">
                                    <button type="submit" className="primary-btn" disabled={submitting}>
                                        {submitting ? t('abo_page.form_submitting_button') : t('abo_page.form_submit_button')}
                                    </button>
                                    <label className="check-consent">
                                        <input type="checkbox" name="consent" checked={form.consent} onChange={onField} required />
                                        <span>{t('abo_page.form_consent_label')}</span>
                                    </label>
                                </div>
                            </form>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AbonnementPageFinal;