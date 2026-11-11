import Link from "next/link";
import { formatUsd, retrieveCheckoutSession } from "@/services/payments/stripe";

export const metadata = { title: "Pago recibido | Design HOF" };

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;
  let session = null;
  if (sessionId && /^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    try { session = await retrieveCheckoutSession(sessionId); } catch { session = null; }
  }
  const paid = session?.payment_status === "paid" || session?.payment_status === "no_payment_required";

  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#f5f5f3] px-6 py-24">
      <section className="w-full max-w-2xl border border-black/8 bg-white p-[clamp(32px,7vw,80px)] text-center">
        <div className={`mx-auto grid size-16 place-items-center rounded-full text-2xl ${paid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{paid ? "✓" : "…"}</div>
        <p className="mt-8 text-[10px] font-semibold tracking-[3px] text-black/35 uppercase">Design HOF</p>
        <h1 className="mt-4 text-[clamp(32px,5vw,52px)] font-semibold tracking-[-2px]">{paid ? "Pago recibido" : "Pago en verificación"}</h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-black/55">{paid ? `Stripe confirmó correctamente tu pago por ${formatUsd(session?.amount_total ?? null)}.` : "Todavía no pudimos confirmar el estado del pago. Si completaste la operación, nuestro equipo recibirá la confirmación de Stripe."}</p>
        {session?.customer_details?.email && <p className="mt-3 text-xs text-black/40">Comprobante asociado a {session.customer_details.email}</p>}
        <Link className="mt-9 inline-flex h-12 items-center justify-center bg-[#0d0d0b] px-7 text-[11px] font-bold tracking-[2px] text-white uppercase" href="/">Volver al inicio</Link>
      </section>
    </main>
  );
}
