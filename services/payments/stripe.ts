import "server-only";

const STRIPE_API_URL = "https://api.stripe.com/v1";

export type CheckoutSession = {
  id: string;
  url: string | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  status: "open" | "complete" | "expired" | null;
  amount_total: number | null;
  currency: string | null;
  customer_details?: { email?: string | null } | null;
};

function secretKey() {
  const value = process.env.STRIPE_SECRET_KEY;
  if (!value) throw new Error("STRIPE_SECRET_KEY is not configured");
  return value;
}

async function stripeRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${STRIPE_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: { message?: string; type?: string } } | null;
    console.error("Stripe request failed", { status: response.status, type: payload?.error?.type });
    throw new Error(payload?.error?.message || "Stripe request failed");
  }

  return response.json() as Promise<T>;
}

export async function createCheckoutSession(amountCents: number, siteUrl: string, idempotencyKey: string) {
  const form = new URLSearchParams({
    mode: "payment",
    success_url: `${siteUrl}/pago-online/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pago-online?cancelado=1`,
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(amountCents),
    "line_items[0][price_data][product_data][name]": "Pago online - Design HOF",
    "line_items[0][price_data][product_data][description]": "Pago recibido mediante el portal seguro de Design HOF",
    "line_items[0][quantity]": "1",
    billing_address_collection: "auto",
    customer_creation: "always",
    "metadata[source]": "design-hof-online-payment",
  });

  return stripeRequest<CheckoutSession>("/checkout/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": idempotencyKey,
    },
    body: form,
  });
}

export function retrieveCheckoutSession(id: string) {
  return stripeRequest<CheckoutSession>(`/checkout/sessions/${encodeURIComponent(id)}`);
}

export function formatUsd(cents: number | null) {
  return new Intl.NumberFormat("es-VE", { style: "currency", currency: "USD" }).format((cents ?? 0) / 100);
}
