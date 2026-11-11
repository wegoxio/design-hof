import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { maxPaymentCents, MIN_PAYMENT_CENTS, parseUsdAmount } from "@/services/payments/amount";
import { createCheckoutSession } from "@/services/payments/stripe";

export const runtime = "nodejs";

const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1_000;
const MAX_ATTEMPTS = 12;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  return Boolean(host && origin === `${protocol}://${host}`);
}

function siteUrl(request: NextRequest) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  return host ? `${protocol}://${host}` : request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Solicitud no permitida." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "Formato no permitido." }, { status: 415 });
  if (Number(request.headers.get("content-length") ?? 0) > 2_000) return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ error: "Demasiados intentos. Espera unos minutos e inténtalo nuevamente." }, { status: 429 });

  const body = await request.json().catch(() => null) as { amount?: unknown; requestId?: unknown } | null;
  const amountCents = parseUsdAmount(body?.amount);
  if (amountCents === null || amountCents < MIN_PAYMENT_CENTS) {
    return NextResponse.json({ error: "El importe mínimo es de USD 0,50." }, { status: 400 });
  }
  if (amountCents > maxPaymentCents()) {
    return NextResponse.json({ error: "El importe supera el máximo permitido. Contacta a Design HOF para completar el pago." }, { status: 400 });
  }

  const suppliedId = typeof body?.requestId === "string" && /^[a-f0-9-]{36}$/i.test(body.requestId) ? body.requestId : randomUUID();
  try {
    const session = await createCheckoutSession(amountCents, siteUrl(request), `online-payment/${suppliedId}`);
    if (!session.url) throw new Error("Stripe did not return a Checkout URL");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Could not create Stripe Checkout session", { message: error instanceof Error ? error.message : "Unknown error" });
    return NextResponse.json({ error: "No pudimos iniciar el pago. Inténtalo nuevamente en unos minutos." }, { status: 502 });
  }
}
