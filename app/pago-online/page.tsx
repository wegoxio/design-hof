import Image from "next/image";
import { PaymentForm } from "./payment-form";

export const metadata = {
  title: "Pago online | Design HOF",
  description: "Realiza un pago seguro a Design HOF mediante Stripe.",
};

export default async function OnlinePaymentPage({ searchParams }: { searchParams: Promise<{ cancelado?: string }> }) {
  const params = await searchParams;
  return (
    <main className="bg-[#f5f5f3] px-[clamp(22px,6vw,96px)] py-[clamp(72px,9vw,132px)]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_0.92fr] overflow-hidden border border-black/8 bg-white max-[850px]:grid-cols-1">
        <section className="relative flex min-h-[610px] flex-col justify-between overflow-hidden bg-[#0d0d0b] p-[clamp(32px,5vw,72px)] text-white max-[850px]:min-h-[390px]">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_75%_20%,#fff_0,transparent_35%)]" />
          <Image className="relative h-auto w-[92px]" src="/shared/brand/designhof-logo.svg" alt="Design HOF" width={92} height={92} priority />
          <div className="relative max-w-lg">
            <p className="mb-5 text-[10px] font-semibold tracking-[4px] text-white/45 uppercase">Portal de pagos</p>
            <h1 className="text-[clamp(42px,6vw,76px)] leading-[0.97] font-semibold tracking-[-3px]">Pago online</h1>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/55">Ingresa el importe acordado con nuestro equipo. Serás redirigido a Stripe para completar el pago de manera cifrada y segura.</p>
          </div>
        </section>
        <section className="flex items-center p-[clamp(32px,5vw,72px)]">
          <div className="w-full">
            <p className="text-[10px] font-semibold tracking-[3px] text-black/35 uppercase">Design HOF</p>
            <h2 className="mt-4 text-[clamp(28px,4vw,42px)] leading-tight font-semibold tracking-[-1.5px]">Introduce el importe</h2>
            <p className="mt-4 text-sm leading-6 text-black/50">Verifica el monto antes de continuar. Design HOF no almacena los datos de tu tarjeta.</p>
            <PaymentForm cancelled={params.cancelado === "1"} />
          </div>
        </section>
      </div>
    </main>
  );
}
