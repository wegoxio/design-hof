import Image from "next/image";
import { ContactForm } from "./components/contact-form";
import { contactDetails } from "./content/contact-data";

const directItems = [
  { label: "Llámanos", icon: "/contact/icons/phone.svg", links: contactDetails.phones },
  { label: "Correo electrónico", icon: "/contact/icons/mail.svg", links: [contactDetails.email] },
  { label: "WhatsApp", icon: "/contact/icons/whatsapp.svg", links: [contactDetails.whatsapp] },
  { label: "Instagram", icon: "/contact/icons/instagram.svg", links: [contactDetails.instagram] },
];

export function ContactScreen() {
  return (
    <div className="bg-[#f7f7f5] text-[#0d0d0b]">
      <section className="mx-auto max-w-[1440px] border-b border-black/10 px-8 pt-32 pb-20 max-[720px]:px-5 max-[720px]:pt-20 max-[720px]:pb-14">
        <p className="text-xs font-medium tracking-[5.4px] text-[#888885] uppercase">Contacto</p>
        <h1 className="pt-7 text-[clamp(58px,7.2vw,104px)] leading-[.92] font-bold tracking-[-2.6px]">Contacto</h1>
        <p className="max-w-2xl pt-8 text-lg leading-[29.25px] text-[#888885] max-[720px]:text-base">Cuéntanos en qué podemos ayudarte. Completa el formulario o comunícate directamente con nuestro equipo.</p>
      </section>

      <section className="mx-auto max-w-[1440px] px-8 py-24 max-[900px]:py-16 max-[720px]:px-5">
        <div className="grid grid-cols-[minmax(0,864px)_416px] gap-24 max-[1100px]:grid-cols-[minmax(0,1fr)_340px] max-[900px]:grid-cols-1 max-[900px]:gap-16">
          <div>
            <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-6">
              <h2 className="text-[28.8px] leading-[43.2px] font-bold tracking-[-.72px] max-[600px]:text-2xl">Envíanos un mensaje</h2>
              <p className="pb-1 text-[11px] leading-[16.5px] tracking-[2.75px] text-[#888885] uppercase max-[600px]:hidden">* Campos requeridos</p>
            </div>
            <ContactForm />
          </div>

          <aside className="border-l border-black/10 pl-12 max-[1100px]:pl-8 max-[900px]:border-l-0 max-[900px]:pl-0">
            <p className="text-[11px] leading-[16.5px] tracking-[3.85px] text-[#888885] uppercase">Contacto directo</p>
            <div className="mt-8 border-y border-black/10">
              {directItems.map((item) => <div className="flex gap-5 border-b border-black/10 py-7 last:border-b-0" key={item.label}><Image className="mt-0.5 size-[18px] shrink-0" src={item.icon} alt="" width={18} height={18} /><div><p className="text-[10px] leading-[15px] tracking-[2.5px] text-[#888885] uppercase">{item.label}</p><div className="flex flex-col gap-1.5 pt-2">{item.links.map((link) => <a className="text-sm leading-[21px] underline underline-offset-2 transition-opacity hover:opacity-55" href={link.href} key={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label}</a>)}</div></div></div>)}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid min-h-[573px] grid-cols-2 border-t border-black/10 max-[760px]:grid-cols-1">
        <div className="flex flex-col justify-between bg-[#0d0d0b] px-[clamp(32px,3.65vw,54px)] py-20 text-white max-[760px]:min-h-[500px] max-[760px]:py-14">
          <div><p className="text-[11px] leading-[16.5px] tracking-[3.85px] text-white/35 uppercase">Visítanos</p><h2 className="max-w-lg pt-6 text-5xl leading-[60px] font-bold tracking-[-1.2px] max-[560px]:text-4xl max-[560px]:leading-[1.18]">Design HOF<br />Las Mercedes, Caracas</h2></div>
          <div><div className="flex max-w-md gap-4 pb-8"><Image className="mt-1 size-[19px] shrink-0" src="/contact/icons/location.svg" alt="" width={19} height={19} /><p className="text-[15px] leading-[24.375px] text-white/65">{contactDetails.address}</p></div><a className="group inline-flex h-12 items-center justify-center gap-2 border border-white/25 px-3 text-[11px] font-medium tracking-[2.75px] uppercase transition-colors hover:border-white hover:bg-white hover:text-black" href={contactDetails.directions} target="_blank" rel="noreferrer">Cómo llegar<Image className="size-4 group-hover:invert" src="/contact/icons/arrow-up-right-white.svg" alt="" width={16} height={16} /></a></div>
        </div>
        <div className="min-h-[448px] bg-[#ebebea]"><iframe className="h-full min-h-[448px] w-full border-0 grayscale-[.15]" src={contactDetails.map} title="Ubicación de Design HOF en Las Mercedes" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>
    </div>
  );
}
