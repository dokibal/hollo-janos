import type { Quotation } from "../../app/quotation";
import {
  companyName,
  email,
  facebook,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
  siteLink,
} from "../../app/constants";

export type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function formatHtml(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

function wrapHtml(content: string): string {
  return `<!doctype html>
<html lang="hu">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:24px;background-color:#ffffff;color:#222222;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;">
<div style="max-width:600px;margin:0 auto;">${content}</div>
</body>
</html>`;
}

function htmlField(label: string, value: string): string {
  return `<p style="margin:0 0 16px;"><strong>${label}:</strong><br />${formatHtml(value)}</p>`;
}

function htmlEmailField(address: string): string {
  return `<p style="margin:0 0 16px;"><strong>E-mail:</strong><br /><a href="mailto:${escapeHtml(address)}">${escapeHtml(address)}</a></p>`;
}

export function createFeedbackEmail(quotation: Quotation): EmailContent {
  const phone = quotation.phoneNumber || "Nincs megadva";
  const introduction = "Köszönjük, hogy felvette velünk a kapcsolatot és árajánlatot kért villanyszerelési munkára.";
  const nextSteps = "Kollégánk hamarosan felveszi Önnel a kapcsolatot a megadott elérhetőségek egyikén, hogy egyeztessük a részleteket és pontos árajánlatot adhassunk.";
  const changes = "Ha időközben módosítaná a kérését, kérjük, jelezze válaszüzenetben.";

  return {
    subject: `Árajánlatkérés visszaigazolása - ${companyName}`,
    html: wrapHtml(`
<p>Kedves ${escapeHtml(quotation.name)}!</p>
<p>${introduction}</p>
<p>Az Ön által megadott adatok:</p>
${htmlField("Helyszín", quotation.location)}
${htmlField("Telefonszám", phone)}
${htmlEmailField(quotation.email)}
${htmlField("Leírás", quotation.message)}
<p>${nextSteps}<br />${changes}</p>
<p>Üdvözlettel,<br /><br />
<strong>Holló János</strong><br />
${escapeHtml(companyName)}<br />
<a href="${escapeHtml(siteLink)}">${escapeHtml(siteLink.replace("https://", ""))}</a><br />
<a href="${escapeHtml(phoneNumberLink)}">${escapeHtml(phoneNumber)}</a><br />
<a href="${escapeHtml(facebookLink)}">${escapeHtml(facebook)}</a></p>`),
    text: `Kedves ${quotation.name}!

${introduction}

Az Ön által megadott adatok:

Helyszín:
${quotation.location}

Telefonszám:
${phone}

E-mail:
${quotation.email}

Leírás:
${quotation.message}

${nextSteps}
${changes}

Üdvözlettel,

Holló János
${companyName}
${siteLink.replace("https://", "")}
${phoneNumber}
${facebook}: ${facebookLink}`,
  };
}

export function createNotificationEmail(
  quotation: Quotation,
  now = new Date(),
): EmailContent {
  const phone = quotation.phoneNumber || "Nincs megadva";
  const date = now.toLocaleString("hu-HU", { timeZone: "Europe/Budapest" });
  const instruction = "Kérjük, vegye fel a kapcsolatot az ügyféllel a lehető leghamarabb.";

  return {
    subject: `Árajánlatkérés - ${quotation.name}`,
    html: wrapHtml(`
<p><strong>Új árajánlatkérés érkezett a weboldalról!</strong></p>
<p>Az ügyfél adatai:</p>
${htmlField("Név", quotation.name)}
${htmlEmailField(quotation.email)}
${htmlField("Telefonszám", phone)}
${htmlField("Helyszín", quotation.location)}
${htmlField("Leírás", quotation.message)}
${htmlField("Dátum", date)}
<p>${instruction}</p>`),
    text: `Új árajánlatkérés érkezett a weboldalról!

Az ügyfél adatai:

Név:
${quotation.name}

E-mail:
${quotation.email}

Telefonszám:
${phone}

Helyszín:
${quotation.location}

Leírás:
${quotation.message}

Dátum:
${date}

${instruction}`,
  };
}

export const quotationSender = email;
