import { NextRequest, NextResponse } from "next/server";
import { customerEmail, teamEmail } from "@/services/contact/contact-emails";
import { parseContactSubmission } from "@/services/contact/contact-schema";

export const runtime = "nodejs";

const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1_000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

function originIsAllowed(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const configured = (process.env.CONTACT_ALLOWED_ORIGINS ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const sameOrigin = host ? `${protocol}://${host}` : request.nextUrl.origin;
  return origin === sameOrigin || configured.includes(origin);
}

export async function POST(request: NextRequest) {
  if (!originIsAllowed(request)) return NextResponse.json({ error: "Solicitud no permitida." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "Formato no permitido." }, { status: 415 });
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ error: "Has enviado demasiadas solicitudes. Inténtalo de nuevo en unos minutos." }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Los datos enviados no son válidos." }, { status: 400 });
  }
  const submission = parseContactSubmission(body);
  if (!submission) return NextResponse.json({ error: "Revisa los campos obligatorios e inténtalo nuevamente." }, { status: 400 });
  if (submission.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form is missing RESEND_API_KEY");
    return NextResponse.json({ error: "El formulario no está disponible temporalmente." }, { status: 503 });
  }

  const from = process.env.RESEND_FROM_EMAIL || "Design HOF <contacto@design-hof.com>";
  const recipient = process.env.CONTACT_TO_EMAIL || "info@design-hof.com";
  const siteUrl = process.env.CONTACT_SITE_URL || "https://www.design-hof.com";
  const internal = teamEmail(submission, siteUrl);
  const confirmation = customerEmail(submission, siteUrl);

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${submission.submissionId}`,
      },
      body: JSON.stringify([
        { from, to: [recipient], reply_to: submission.email, ...internal },
        { from, to: [submission.email], reply_to: recipient, ...confirmation },
      ]),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    console.error("Resend contact batch could not be reached");
    return NextResponse.json({ error: "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos." }, { status: 502 });
  }

  if (!response.ok) {
    console.error("Resend contact batch failed", { status: response.status });
    return NextResponse.json({ error: "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
