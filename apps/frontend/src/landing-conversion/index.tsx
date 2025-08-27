import React, { useState, useEffect } from 'react';
import './styles.scss';
import logo from '../../src/assets/solenca-logo.png'; // Assurez-vous que le chemin est correct
import heroImage from '../../src/assets/solenca-club-bg.jpg'; // Nouvelle image pour le panneau de gauche

// Récupère l'ID Formspree depuis vos variables d'environnement
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

// --- Icônes ---
const KeyIcon = () => <svg viewBox="0 0 24 24"><path d="M19.5,9.5a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z" /><path d="M17,12.44V15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V11A1,1,0,0,1,5,10h5.13" /><path d="M8,16v3m0-9v3" /></svg>;
const ShieldIcon = () => <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const SmileIcon = () => <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>;

const LandingPageWithImageAndFormspree = () => {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false); // État pour le chargement
    const [form, setForm] = useState({
        nom: "", email: "", phone: "", cp: "",
        services: { piscine: false, jardin: false, nettoyage: false, conciergerie: false },
        consent: false,
        utm_source: "", utm_medium: "", utm_campaign: "", gotcha: ""
    });

    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        setForm(f => ({ ...f, utm_source: p.get("utm_source") || "", utm_medium: p.get("utm_medium") || "", utm_campaign: p.get("utm_campaign") || "" }));
    }, []);

    const onField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("services.")) {
            const key = name.split(".")[1] as keyof typeof form.services;
            setForm(f => ({ ...f, services: { ...f.services, [key]: !!checked } }));
        } else {
            setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting || form.gotcha) return;

        setSubmitting(true);

        if (FORMSPREE_ID) {
            try {
                const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(form)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setSubmitted(true);
            } catch (err) {
                console.error("Formspree failed:", err);
                alert("Une erreur est survenue. Veuillez réessayer.");
            } finally {
                setSubmitting(false);
            }
        } else {
            console.error("FORMSPREE_ID is not configured.");
            alert("Le service de formulaire n'est pas configuré.");
            setSubmitting(false);
        }
    };

    return (
        <div className="solenca-split-page">
            <div className="split-pane-left" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="overlay-content">
                    <img src={logo} alt="Solenca Logo" className="logo" />
                    <h1>Votre résidence secondaire, l'esprit léger.</h1>
                    <p>Gestion complète et sur-mesure de votre propriété. Profitez de votre temps, on s'occupe de tout.</p>
                    <div className="key-benefits">
                        <div className="benefit-item"><ShieldIcon /><span>Contrôle & Sécurité</span></div>
                        <div className="benefit-item"><KeyIcon /><span>Intendance & Services</span></div>
                        <div className="benefit-item"><SmileIcon /><span>Sérénité Garantie</span></div>
                    </div>
                </div>
                <div className="footer-link"><a href="/">Retour au site principal</a></div>
            </div>
            <div className="split-pane-right">
                {submitted ? (
                    <div className="thank-you-card">
                        <h3>Merci !</h3>
                        <p>Nous avons bien reçu votre demande. Un conseiller vous contactera personnellement sous 24h.</p>
                    </div>
                ) : (
                    <div className="form-wrapper">
                        <h2>Demandez votre devis</h2>
                        <p>Réponse rapide et personnalisée.</p>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="gotcha" value={form.gotcha} onChange={onField} style={{ display: 'none' }} />
                            <input name="nom" required value={form.nom} onChange={onField} placeholder="Nom complet *" />
                            <input name="email" type="email" required value={form.email} onChange={onField} placeholder="Adresse e-mail *" />
                            <input name="phone" type="tel" required value={form.phone} onChange={onField} placeholder="Téléphone *" />
                            <input name="cp" required value={form.cp} onChange={onField} placeholder="Code postal du bien *" />
                            <div className="form-services">
                                <span className="services-title">Intéressé(e) par :</span>
                                <div className="service-options">
                                    <label><input type="checkbox" name="services.piscine" checked={form.services.piscine} onChange={onField} /><span>Piscine</span></label>
                                    <label><input type="checkbox" name="services.jardin" checked={form.services.jardin} onChange={onField} /><span>Jardin</span></label>
                                    <label><input type="checkbox" name="services.nettoyage" checked={form.services.nettoyage} onChange={onField} /><span>Ménage</span></label>
                                    <label><input type="checkbox" name="services.conciergerie" checked={form.services.conciergerie} onChange={onField} /><span>Conciergerie</span></label>
                                </div>
                            </div>
                            <button type="submit" className="primary-btn" disabled={submitting}>
                                {submitting ? 'Envoi en cours...' : 'Être recontacté'}
                            </button>
                            <label className="check-consent">
                                <input type="checkbox" name="consent" checked={form.consent} onChange={onField} required />
                                <span>J'accepte d'être recontacté(e) pour ma demande.</span>
                            </label>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPageWithImageAndFormspree;