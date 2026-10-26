import type { ContactSubmission } from "./contact-schema";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function layout(content: string, preview: string, siteUrl: string) {
  const logoUrl = `${siteUrl.replace(/\/$/, "")}/shared/brand/designhof-logo.svg`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(preview)}</title></head><body style="margin:0;background:#efefec;color:#0d0d0b;font-family:Arial,Helvetica,sans-serif"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#efefec"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#f7f7f5"><tr><td style="padding:30px 36px;border-bottom:1px solid #deded9"><img src="${logoUrl}" width="52" height="64" alt="Design HOF" style="display:block;width:52px;height:64px;object-fit:contain"></td></tr>${content}<tr><td style="padding:28px 36px;background:#0d0d0b;color:#a3a3a0;font-size:12px;line-height:20px"><strong style="display:block;margin-bottom:8px;color:#f7f7f5;font-size:13px;letter-spacing:2px;text-transform:uppercase">Design HOF</strong>Avenida Orinoco, Las Mercedes, Caracas<br><a href="https://www.design-hof.com" style="color:#f7f7f5">www.design-hof.com</a></td></tr></table></td></tr></table></body></html>`;
}

function detail(label: string, value: string) {
  return `<tr><td style="padding:0 0 7px;color:#888885;font-size:10px;line-height:15px;letter-spacing:2px;text-transform:uppercase">${escapeHtml(label)}</td></tr><tr><td style="padding:0 0 22px;color:#0d0d0b;font-size:15px;line-height:23px;border-bottom:1px solid #e3e3de">${escapeHtml(value)}</td></tr><tr><td style="height:20px"></td></tr>`;
}

export function teamEmail(submission: ContactSubmission, siteUrl: string) {
  const fullName = `${submission.name} ${submission.lastName}`;
  const content = `<tr><td style="padding:48px 36px 18px;color:#888885;font-size:11px;letter-spacing:4px;text-transform:uppercase">Nuevo contacto web</td></tr><tr><td style="padding:0 36px 36px"><h1 style="margin:0;font-size:34px;line-height:42px;letter-spacing:-1px">${escapeHtml(fullName)} quiere contactarles.</h1></td></tr><tr><td style="padding:0 36px 42px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${detail("Nombre", fullName)}${detail("Correo electrónico", submission.email)}${detail("Teléfono", submission.phone)}<tr><td style="padding:0 0 7px;color:#888885;font-size:10px;line-height:15px;letter-spacing:2px;text-transform:uppercase">Mensaje</td></tr><tr><td style="padding:14px 16px;background:#eeeeea;color:#0d0d0b;font-size:15px;line-height:24px;white-space:pre-wrap">${escapeHtml(submission.message || "Sin mensaje adicional")}</td></tr></table><p style="margin:28px 0 0;color:#888885;font-size:12px;line-height:20px">Puedes responder directamente a este correo para contactar a ${escapeHtml(submission.name)}.</p></td></tr>`;
  return {
    subject: `Nuevo contacto web — ${fullName}`,
    html: layout(content, `${fullName} ha enviado el formulario de contacto.`, siteUrl),
    text: `Nuevo contacto web\n\nNombre: ${fullName}\nCorreo: ${submission.email}\nTeléfono: ${submission.phone}\n\nMensaje:\n${submission.message || "Sin mensaje adicional"}`,
  };
}

export function customerEmail(submission: ContactSubmission, siteUrl: string) {
  const content = `<tr><td style="padding:48px 36px 18px;color:#888885;font-size:11px;letter-spacing:4px;text-transform:uppercase">Mensaje recibido</td></tr><tr><td style="padding:0 36px"><h1 style="margin:0;font-size:38px;line-height:46px;letter-spacing:-1.2px">Gracias, ${escapeHtml(submission.name)}.</h1><p style="margin:24px 0 0;color:#666662;font-size:16px;line-height:27px">Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y se pondrá en contacto contigo a la mayor brevedad posible.</p></td></tr><tr><td style="padding:36px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eeeeea"><tr><td style="padding:24px"><p style="margin:0 0 9px;color:#888885;font-size:10px;letter-spacing:2px;text-transform:uppercase">Tu consulta</p><p style="margin:0;color:#0d0d0b;font-size:14px;line-height:23px;white-space:pre-wrap">${escapeHtml(submission.message || "Solicitud de contacto")}</p></td></tr></table><p style="margin:28px 0 0;color:#888885;font-size:12px;line-height:20px">Si necesitas añadir información, responde directamente a este correo.</p></td></tr>`;
  return {
    subject: "Hemos recibido tu mensaje | Design HOF",
    html: layout(content, "Hemos recibido tu mensaje y pronto nos pondremos en contacto contigo.", siteUrl),
    text: `Hola ${submission.name},\n\nHemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y se pondrá en contacto contigo a la mayor brevedad posible.\n\nTu consulta:\n${submission.message || "Solicitud de contacto"}\n\nDesign HOF`,
  };
}
