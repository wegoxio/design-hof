export const MIN_PAYMENT_CENTS = 50;
export const DEFAULT_MAX_PAYMENT_CENTS = 10_000_000;

export function maxPaymentCents() {
  const configured = Number(process.env.STRIPE_MAX_PAYMENT_CENTS);
  return Number.isSafeInteger(configured) && configured >= MIN_PAYMENT_CENTS
    ? configured
    : DEFAULT_MAX_PAYMENT_CENTS;
}

export function parseUsdAmount(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(",", ".");
  if (!/^\d{1,9}(?:\.\d{1,2})?$/.test(normalized)) return null;
  const [dollars, fraction = ""] = normalized.split(".");
  const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(cents) ? cents : null;
}
