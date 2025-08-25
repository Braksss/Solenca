import React, { useEffect, useState } from "react";
import "../styles/pages/abonnement.scss";
import { useTranslation } from "react-i18next";

import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

type ClientType = "particulier" | "pro";

declare global {
  interface Window {
    $crisp?: any[];
    CRISP_WEBSITE_ID?: string;
  }
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

const AbonnementPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  /* ---------- Helpers i18n (mono-fichier fr.json) ---------- */
  const pickKey = (primary: string, fallback?: string) =>
    i18n.exists(primary) ? primary : (fallback || primary);

  const tText = (primary: string, fallback?: string) => t(pickKey(primary, fallback));

  function tList<T = string>(primary: string, fallback?: string): T[] {
    const key = pickKey(primary, fallback);
    const v = t(key, { returnObjects: true }) as unknown;
    if (Array.isArray(v)) return v as T[];
    if (v && typeof v === "object") return Object.values(v) as T[];
    if (typeof v === "string") {
      if (v.includes(".")) return [];
      return [v] as unknown as T[];
    }
    return [];
  }

  /* ---------- State ---------- */
  const [open, setOpen] = useState(false);
  const [clientType, setClientType] = useState<ClientType>("particulier");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    phone: "",
    preferContact: "phone", // phone | email | whatsapp
    adresse: "",
    ville: "",
    cp: "",
    typeBien: "house", // apartment | house | villa
    surface: "",
    services: { piscine: false, jardin: false, nettoyage: false, linge: false, autre: false },
    message: "",
    // PRO
    societe: "",
    siret: "",
    rolePro: "agency",
    // consent
    consent: false,
    // UTM
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    // anti-spam (honeypot)
    gotcha: ""
  });

  useEffect(() => {
    document.title = (t("abo.seoTitle") as string) || "Solenca Care";
    const p = new URLSearchParams(window.location.search);
    setForm((f) => ({
      ...f,
      utm_source: p.get("utm_source") || f.utm_source,
      utm_medium: p.get("utm_medium") || f.utm_medium,
      utm_campaign: p.get("utm_campaign") || f.utm_campaign
    }));
  }, [i18n.language, t]);

  /* ---------- Handlers ---------- */
  const onField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    if (name.startsWith("services.")) {
      const key = name.split(".")[1] as keyof typeof form.services;
      setForm((f) => ({ ...f, services: { ...f.services, [key]: !!checked } }));
      return;
    }
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const openDevis = (type: ClientType) => {
    setClientType(type);
    setOpen(true);
  };

  /** Construit un texte lisible pour email / stockage */
  const buildPrettyText = () => {
    const servicesList = Object.entries(form.services)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(", ") || "—";

    return [
      `Type client: ${clientType}`,
      `Nom: ${form.nom}`,
      `Email: ${form.email}`,
      `Téléphone: ${form.phone}`,
      `Préférence: ${form.preferContact}`,
      `Adresse: ${form.adresse}, ${form.cp} ${form.ville}`,
      `Type de bien: ${form.typeBien}, Surface: ${form.surface}`,
      `Services: ${servicesList}`,
      `Société: ${form.societe || "—"}`,
      `SIRET/CIF: ${form.siret || "—"}`,
      `Rôle pro: ${form.rolePro || "—"}`,
      `Message:\n${form.message || "—"}`,
      `UTM: ${form.utm_source || "—"} / ${form.utm_medium || "—"} / ${form.utm_campaign || "—"}`,
      `Consentement: ${form.consent ? "Oui" : "Non"}`
    ].join("\n");
  };

  /** Envoi Formspree si configuré, sinon fallback mailto */
  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // honeypot simple
    if (form.gotcha) return;

    const payload = {
      clientType,
      ...form,
      services: Object.keys(form.services).filter((k) => (form.services as any)[k]),
      createdAt: new Date().toISOString(),
      locale: i18n.language || "fr",
      pretty: buildPrettyText()
    };

    setSubmitting(true);

    // 1) Envoi vers Formspree si ID présent
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        alert(t("abo.toastOk"));
        setOpen(false);
        setSubmitting(false);
        return;
      } catch (err) {
        console.warn("Formspree failed, falling back to mailto:", err);
      }
    }

    // 2) Fallback mailto
    try {
      const subject = encodeURIComponent("Demande de devis — Solenca Care");
      const body = encodeURIComponent(buildPrettyText());
      window.location.href = `mailto:benjamin@solenca.es?subject=${subject}&body=${body}`;
      alert(t("abo.toastOk"));
    } finally {
      setOpen(false);
      setSubmitting(false);
    }
  };

  const openCrisp = () => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:open"]);
      window.$crisp.push(["do", "chat:show"]);
    } else {
      alert("Merci ! Un conseiller vous répondra très vite (24h).");
    }
  };

  /* ---------- Données i18n (tout sous `abo.*`) ---------- */
  const hero = {
    kicker: tText("abo.hero.kicker", "hero.headline"),
    title: tText("abo.hero.title"),
    subtitle: tText("abo.hero.subtitle", "hero.description"),
    cta: tText("abo.hero.cta", "hero.cta"),
    hint: tText("abo.hero.hint"),
    chips: tList<string>("abo.hero.chips")
  };

  const included = tList<string>("abo.included.items");
  const addons = tList<string>("abo.addons.items");
  const calloutList = tList<string>("abo.callout.items");
  const propertyTypes = tList<{ key: string; label: string }>("abo.form.propertyTypes");
  const preferContacts = tList<{ key: string; label: string }>("abo.form.preferContacts");
  const proItems = tList<string>("abo.pro.items");

  /* ---------- Render ---------- */
  return (
    <div className="care-page">
      <Navbar />

      {/* HERO */}
      <header className="care-hero care-hero--vivid">
        <div className="shell">
          <div className="kicker">{hero.kicker}</div>
          <h1>{hero.title}</h1>
          <p className="sub">{hero.subtitle}</p>
          <div className="cta-row">
            <button
              className="primary-btn"
              data-cta="hero-devis"
              onClick={() => openDevis("particulier")}
            >
              {hero.cta}
            </button>
            <button className="secondary-btn secondary-btn--ghost" onClick={openCrisp}>
              {t("abo.pro.cta")}
            </button>
            {hero.hint && <span className="hint">{hero.hint}</span>}
          </div>

          <div className="chips">
            {hero.chips.map((c, i) => (
              <span className="chip" key={i}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Abonnement Particuliers – groupé dans une carte */}
      <section className="shell abo-group">
        <div className="abo-card">
          <div className="care-grid">
            <section className="card card--glow">
              <h2 className="card-title">{t("abo.included.title")}</h2>
              <ul className="list list--check">
                {included.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            </section>

            <section className="card card--glow">
              <h2 className="card-title">{t("abo.addons.title")}</h2>
              <ul className="list list--check">
                {addons.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
              <div className="soft-note">{t("abo.addons.note")}</div>
            </section>

            <aside className="callout callout--accent">
              <div className="callout__left">
                <div className="callout-title">{t("abo.callout.title")}</div>
                <ul className="callout-list list--bullets">
                  {calloutList.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </div>
              <button className="primary-btn" onClick={() => openDevis("particulier")}>
                {t("abo.callout.cta")}
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* PRO */}
      <section className="pro-section">
        <div className="shell">
          <div className="pro-card pro-card--glow">
            <div className="pro-badge">B2B</div>
            <h3>{t("abo.pro.title")}</h3>
            <p className="pro-sub">{t("abo.pro.subtitle")}</p>
            <ul className="pro-list list--bullets">
              {proItems.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
            <button className="primary-btn" onClick={openCrisp}>
              {t("abo.pro.cta")}
            </button>
          </div>
        </div>
      </section>

      {/* MODAL devis */}
      {open && (
        <Modal onClose={() => setOpen(false)} title={t("abo.modal.title") as string}>
          <form className="form" onSubmit={submitQuote}>
            {/* honeypot anti-spam */}
            <input
              type="text"
              name="gotcha"
              value={form.gotcha}
              onChange={onField}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-5000px", height: 0, width: 0 }}
              aria-hidden="true"
            />

            <div className="form-tags">
              <span className={`tag ${clientType === "pro" ? "tag-dark" : ""}`}>
                {clientType === "pro" ? t("abo.modal.badgePro") : t("abo.modal.badgePart")}
              </span>
              <span className="tag">{t("abo.modal.badge24h")}</span>
            </div>

            <div className="grid">
              <div className="field">
                <label htmlFor="nom">{t("abo.form.labels.name")} *</label>
                <input id="nom" name="nom" required value={form.nom} onChange={onField} />
              </div>
              <div className="field">
                <label htmlFor="email">{t("abo.form.labels.email")} *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onField}
                />
              </div>
              <div className="field">
                <label htmlFor="phone">{t("abo.form.labels.phone")} *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={onField}
                />
              </div>
              <div className="field">
                <label htmlFor="preferContact">{t("abo.form.labels.preferContact")}</label>
                <select
                  id="preferContact"
                  name="preferContact"
                  value={form.preferContact}
                  onChange={onField}
                >
                  {preferContacts.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field field--full">
                <label htmlFor="adresse">{t("abo.form.labels.address")} *</label>
                <input
                  id="adresse"
                  name="adresse"
                  required
                  value={form.adresse}
                  onChange={onField}
                />
              </div>
              <div className="field">
                <label htmlFor="ville">{t("abo.form.labels.city")} *</label>
                <input id="ville" name="ville" required value={form.ville} onChange={onField} />
              </div>
              <div className="field">
                <label htmlFor="cp">{t("abo.form.labels.zip")} *</label>
                <input id="cp" name="cp" required value={form.cp} onChange={onField} />
              </div>

              <div className="field">
                <label htmlFor="typeBien">{t("abo.form.labels.propertyType")}</label>
                <select id="typeBien" name="typeBien" value={form.typeBien} onChange={onField}>
                  {propertyTypes.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="surface">{t("abo.form.labels.surface")}</label>
                <input id="surface" name="surface" value={form.surface} onChange={onField} />
              </div>

              <div className="field field--full">
                <div className="legend">{t("abo.form.labels.wantedServices")}</div>
                <div className="checks">
                  <label className="check">
                    <input
                      type="checkbox"
                      name="services.piscine"
                      checked={form.services.piscine}
                      onChange={onField}
                    />
                    <span>{t("abo.form.services.pool")}</span>
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      name="services.jardin"
                      checked={form.services.jardin}
                      onChange={onField}
                    />
                    <span>{t("abo.form.services.garden")}</span>
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      name="services.nettoyage"
                      checked={form.services.nettoyage}
                      onChange={onField}
                    />
                    <span>{t("abo.form.services.cleaning")}</span>
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      name="services.linge"
                      checked={form.services.linge}
                      onChange={onField}
                    />
                    <span>{t("abo.form.services.laundry")}</span>
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      name="services.autre"
                      checked={form.services.autre}
                      onChange={onField}
                    />
                    <span>{t("abo.form.services.other")}</span>
                  </label>
                </div>
              </div>

              {clientType === "pro" && (
                <>
                  <div className="field">
                    <label htmlFor="societe">{t("abo.form.labels.company")}</label>
                    <input
                      id="societe"
                      name="societe"
                      value={form.societe}
                      onChange={onField}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="siret">{t("abo.form.labels.siret")}</label>
                    <input id="siret" name="siret" value={form.siret} onChange={onField} />
                  </div>
                  <div className="field">
                    <label htmlFor="rolePro">{t("abo.form.labels.proRole")}</label>
                    <select id="rolePro" name="rolePro" value={form.rolePro} onChange={onField}>
                      {tList<{ key: string; label: string }>("abo.form.proRoles").map((o) => (
                        <option key={o.key} value={o.key}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* consent pleine largeur */}
              <label className="check check--block field field--full">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={onField}
                  required
                />
                <span>{t("abo.form.labels.consent")}</span>
              </label>

              <div className="field field--full">
                <label htmlFor="message">{t("abo.form.labels.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onField}
                  placeholder={(t("abo.form.placeholders.message") as string) || ""}
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="secondary-btn" type="button" onClick={() => setOpen(false)}>
                {t("abo.form.ctaCancel")}
              </button>
              <button className="primary-btn" type="submit" disabled={submitting}>
                {submitting ? "…" : t("abo.form.ctaSubmit")}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

/* Modal minimal */
const Modal: React.FC<{ onClose: () => void; title?: string; children: React.ReactNode }> = ({
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title || "Modal"}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card" role="document">
        <div className="modal__head">
          <h3 className="modal__title">{title}</h3>
          <button className="iconbtn" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default AbonnementPage;
