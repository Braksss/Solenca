// apps/frontend/api/send-quote.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const toEmail = process.env.TO_EMAIL || "benjamin@solenca.es";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: (process.env.SMTP_SECURE || "").toLowerCase() === "true" || Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { clientType, form, createdAt } = req.body || {};
    if (!form?.email || !form?.nom || !form?.phone) {
      return res.status(400).json({ error: "Missing required fields (nom, email, phone)" });
    }

    const subject = "Demande de devis — Solenca Care";
    const services = form?.services
      ? Object.entries(form.services).filter(([, v]) => v).map(([k]) => k).join(", ")
      : "—";

    const text = [
      `Type client: ${clientType || "—"}`,
      `Nom: ${form.nom}`,
      `Email: ${form.email}`,
      `Téléphone: ${form.phone}`,
      `Préférence: ${form.preferContact || "—"}`,
      `Adresse: ${form.adresse || "—"}, ${form.cp || "—"} ${form.ville || ""}`,
      `Type de bien: ${form.typeBien || "—"}, Surface: ${form.surface || "—"}`,
      `Services: ${services || "—"}`,
      `Société: ${form.societe || "—"}`,
      `SIRET/CIF: ${form.siret || "—"}`,
      `Rôle pro: ${form.rolePro || "—"}`,
      `Message:\n${form.message || "—"}`,
      `UTM: ${form.utm_source || "—"} / ${form.utm_medium || "—"} / ${form.utm_campaign || "—"}`,
      `Consentement: ${form.consent ? "Oui" : "Non"}`,
      `Créé le: ${createdAt || new Date().toISOString()}`
    ].join("\n");

    const html = `
      <h2>Demande de devis — Solenca Care</h2>
      <ul>
        <li><b>Type client:</b> ${escapeHtml(clientType) || "—"}</li>
        <li><b>Nom:</b> ${escapeHtml(form.nom)}</li>
        <li><b>Email:</b> ${escapeHtml(form.email)}</li>
        <li><b>Téléphone:</b> ${escapeHtml(form.phone)}</li>
        <li><b>Préférence:</b> ${escapeHtml(form.preferContact) || "—"}</li>
        <li><b>Adresse:</b> ${escapeHtml(form.adresse || "—")}, ${escapeHtml(form.cp || "—")} ${escapeHtml(form.ville || "")}</li>
        <li><b>Type de bien:</b> ${escapeHtml(form.typeBien || "—")} — <b>Surface:</b> ${escapeHtml(form.surface || "—")}</li>
        <li><b>Services:</b> ${escapeHtml(services || "—")}</li>
        <li><b>Société:</b> ${escapeHtml(form.societe || "—")}</li>
        <li><b>SIRET/CIF:</b> ${escapeHtml(form.siret || "—")}</li>
        <li><b>Rôle pro:</b> ${escapeHtml(form.rolePro || "—")}</li>
        <li><b>Consentement:</b> ${form.consent ? "Oui" : "Non"}</li>
        <li><b>UTM:</b> ${escapeHtml(form.utm_source || "—")} / ${escapeHtml(form.utm_medium || "—")} / ${escapeHtml(form.utm_campaign || "—")}</li>
        <li><b>Créé le:</b> ${escapeHtml(createdAt || new Date().toISOString())}</li>
      </ul>
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">${escapeHtml(form.message || "—")}</pre>
    `;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: toEmail,
      replyTo: form.email,
      subject,
      text,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("send-quote error:", err);
    return res.status(500).json({ error: "Email send failed", detail: err?.message });
  }
}

function escapeHtml(str?: string) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
