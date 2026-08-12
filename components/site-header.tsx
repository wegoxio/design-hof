"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Mobiliario", href: "/mobiliario" },
  { label: "Mobiliario H1", href: "/mobiliario-h1" },
  { label: "Nuestros servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Allianz", href: "/allianz" },
  { label: "Smart Modull", href: "/smart-modull" },
];

const iconClass = "grid size-[34px] cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-[#1d1d1b] transition duration-200 hover:-translate-y-0.5 hover:bg-[#1d1d1b] hover:text-white [&_svg]:size-[18px]";

function SearchIcon() {
  return <svg className="block size-[18px] shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

function UserIcon() {
  return <svg className="block size-[18px] shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 20c.35-4 2.2-6 5.5-6s5.15 2 5.5 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function HeaderActions({ mobile = false }: { mobile?: boolean }) {
  const visibility = mobile ? "" : "max-[1179px]:hidden";
  return <><button className={`${iconClass} ${visibility}`} type="button" aria-label="Buscar"><SearchIcon /></button><Link className={`${iconClass} ${visibility}`} href="/cuenta" aria-label="Mi cuenta"><UserIcon /></Link></>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (active: boolean) => `group relative flex min-h-13 items-center whitespace-nowrap text-[10.5px] leading-[15.75px] font-medium tracking-[1.05px] uppercase no-underline transition duration-200 after:absolute after:right-0 after:bottom-[19px] after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-300 hover:-translate-y-px hover:text-[#777772] hover:after:origin-left hover:after:scale-x-100 max-[1179px]:border-b max-[1179px]:border-[#eeeeeb] max-[1179px]:text-xs max-[1179px]:after:right-auto max-[1179px]:after:bottom-0 max-[1179px]:after:w-12 ${active ? "text-[#1d1d1b] after:scale-x-100" : "text-[#1d1d1b]"}`;

  const links = navigation.map(({ label, href }) => (
    <Link className={linkClass(pathname === href)} href={href} key={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setIsOpen(false)}>{label}</Link>
  ));

  return (
    <header className="sticky top-0 z-50 h-[100px] w-full border-b border-black/8 bg-white/96 backdrop-blur-2xl max-[930px]:h-[76px]">
      <div className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-center px-8 py-4 max-[1179px]:grid-cols-[auto_1fr_auto] max-[1140px]:px-[22px] max-[930px]:px-5 max-[930px]:py-3">
        <Link className="grid shrink-0 place-items-center rounded-xs transition duration-200 hover:-translate-y-0.5 hover:opacity-75" href="/" aria-label="Design Hof, inicio">
          <Image className="h-[52px] w-[42px] object-contain max-[930px]:h-11 max-[930px]:w-[35px]" src="/designhof-logo.svg" alt="Design Hof" width={42} height={52} priority />
        </Link>

        <nav className="hidden h-full items-stretch justify-center gap-[clamp(14px,2vw,32px)] min-[1180px]:flex" aria-label="Navegación principal">{links}</nav>

        <div className="flex items-center justify-end gap-[15px] justify-self-end">
          <HeaderActions />
          <button className={`${iconClass} hidden max-[1179px]:grid`} type="button" aria-label={isOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((open) => !open)}>
            {isOpen ? <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg> : <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" /></svg>}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav id="mobile-navigation" className="fixed inset-x-0 top-[100px] hidden max-h-[calc(100svh-100px)] flex-col overflow-y-auto border-b border-[#d8d8d4] bg-white px-5 py-[18px] opacity-100 transition-opacity duration-300 starting:opacity-0 max-[1179px]:flex max-[930px]:top-[76px] max-[930px]:max-h-[calc(100svh-76px)]" aria-label="Navegación móvil">
          {links}
          <div className="flex gap-2.5 pt-5"><HeaderActions mobile /></div>
        </nav>
      )}
    </header>
  );
}
