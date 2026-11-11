"use client";

import { FormEvent, useRef, useState } from "react";

function displayAmount(value: string) {
  const normalized = value.replace(",", ".");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount) : "USD 0.00";
}

export function PaymentForm({ cancelled }: { cancelled: boolean }) {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [feedback, setFeedback] = useState(cancelled ? "El pago fue cancelado. No se realizó ningún cargo." : "");
  const requestId = useRef<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    requestId.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, requestId: requestId.current }),
      });
      const result = await response.json().catch(() => null) as { url?: string; error?: string } | null;
      if (!response.ok || !result?.url) throw new Error(result?.error || "No pudimos iniciar el pago.");
      window.location.assign(result.url);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "No pudimos iniciar el pago. Inténtalo nuevamente.");
    }
  }

  return (
    <form className="mt-9" onSubmit={submit} noValidate>
      <label className="block" htmlFor="payment-amount">
        <span className="mb-3 block text-[10px] font-semibold tracking-[2.2px] uppercase">Importe a pagar</span>
        <div className="flex h-[72px] items-center border border-black/15 bg-white px-5 transition-colors focus-within:border-black">
          <span className="mr-3 text-sm font-semibold text-black/45">USD</span>
          <input
            id="payment-amount"
            className="min-w-0 flex-1 bg-transparent text-[clamp(25px,4vw,34px)] font-medium tracking-[-1px] outline-none placeholder:text-black/18"
            inputMode="decimal"
            autoComplete="off"
            name="amount"
            value={amount}
            onChange={(event) => { setAmount(event.target.value.replace(/[^0-9.,]/g, "")); requestId.current = null; }}
            placeholder="0.00"
            aria-describedby="amount-help"
            required
          />
        </div>
      </label>
      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-black/45" id="amount-help">
        <span>Mínimo USD 0,50</span>
        <span>{displayAmount(amount)}</span>
      </div>

      <button className="mt-8 flex h-[54px] w-full items-center justify-center bg-[#0d0d0b] px-5 text-[11px] font-bold tracking-[2.5px] text-white uppercase transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-55 disabled:hover:translate-y-0" disabled={status === "loading"} type="submit">
        {status === "loading" ? "Abriendo pago seguro…" : "Realizar pago"}
      </button>
      {feedback && <p className={`mt-5 text-sm leading-6 ${status === "error" ? "text-red-700" : "text-black/55"}`} role={status === "error" ? "alert" : "status"}>{feedback}</p>}

      <div className="mt-8 border-t border-black/10 pt-6">
        <p className="text-[10px] font-semibold tracking-[1.8px] text-black/40 uppercase">Pago procesado de forma segura por Stripe</p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Tarjetas aceptadas">
          {["VISA", "Mastercard", "AMEX"].map((brand) => <span className="border border-black/10 bg-white px-3 py-2 text-[10px] font-bold tracking-wide" key={brand}>{brand}</span>)}
        </div>
      </div>
    </form>
  );
}
