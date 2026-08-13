"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Mobiliario", href: "/mobiliario" },
  { label: "Mobiliario H1", href: "/mobiliario-h1" },
  { label: "Nuestros servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!aboutRef.current?.contains(event.target as Node)) setIsAboutOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsAboutOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const linkClass = (active: boolean) => `group relative flex min-h-13 items-center whitespace-nowrap text-[10.5px] leading-[15.75px] font-medium tracking-[1.05px] uppercase no-underline transition duration-200 after:absolute after:right-0 after:bottom-[19px] after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-300 hover:-translate-y-px hover:text-[#777772] hover:after:origin-left hover:after:scale-x-100 max-[1179px]:border-b max-[1179px]:border-[#eeeeeb] max-[1179px]:text-xs max-[1179px]:after:right-auto max-[1179px]:after:bottom-0 max-[1179px]:after:w-12 ${active ? "text-[#1d1d1b] after:scale-x-100" : "text-[#1d1d1b]"}`;

  const links = navigation.map(({ label, href }) => (
    <Link className={linkClass(pathname === href)} href={href} key={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setIsOpen(false)}>{label}</Link>
  ));

  const isAboutActive = pathname === "/nosotros" || pathname === "/nuestras-marcas";

  return (
    <header className="sticky top-0 z-50 h-[80px] w-full border-b border-black/8 bg-white/96 backdrop-blur-2xl max-[930px]:h-[76px]">
      <div className="site-container grid h-full grid-cols-[1fr_auto_1fr] items-center py-4 max-[1179px]:grid-cols-[auto_1fr_auto] max-[930px]:py-3">
        <Link className="grid shrink-0 justify-self-start rounded-xs transition duration-200 hover:-translate-y-0.5 hover:opacity-75" href="/" aria-label="Design HOF, inicio">
          <Image className="h-[52px] w-[42px] object-contain max-[930px]:h-11 max-[930px]:w-[35px]" src="/shared/brand/designhof-logo.svg" alt="Design HOF" width={42} height={52} priority />
        </Link>

        <nav className="hidden h-full items-stretch justify-center gap-[clamp(14px,2vw,32px)] min-[1180px]:flex" aria-label="Navegación principal">
          {links.slice(0, 4)}
          <div
            ref={aboutRef}
            className="relative flex h-full items-stretch"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              type="button"
              className={`${linkClass(isAboutActive)} border-0 bg-transparent p-0 font-[inherit] cursor-pointer`}
              aria-expanded={isAboutOpen}
              aria-haspopup="menu"
              aria-controls="about-dropdown"
              onClick={() => setIsAboutOpen((open) => !open)}
            >
              Nosotros
            </button>
            <div
              id="about-dropdown"
              role="menu"
              className={`absolute top-full left-1/2 w-[255px] -translate-x-1/2 border border-black/8 bg-white shadow-[0_18px_45px_rgba(0,0,0,.1)] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isAboutOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
            >
              <Link role="menuitem" href="/nosotros" onClick={() => setIsAboutOpen(false)} className="flex min-h-[61px] items-center border-b border-black/8 px-7 text-[12px] font-medium tracking-[1.3px] text-black uppercase transition-[background-color,padding] duration-500 hover:bg-black/[.025] hover:pl-8">Sobre nosotros</Link>
              <Link role="menuitem" href="/nuestras-marcas" onClick={() => setIsAboutOpen(false)} className="flex min-h-[61px] items-center px-7 text-[12px] font-medium tracking-[1.3px] text-black uppercase transition-[background-color,padding] duration-500 hover:bg-black/[.025] hover:pl-8">Nuestras marcas</Link>
            </div>
          </div>
          {links.slice(4)}
        </nav>

        <div className="flex items-center justify-end gap-[15px] justify-self-end">
          <HeaderActions />
          <button className={`${iconClass} hidden max-[1179px]:grid`} type="button" aria-label={isOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((open) => !open)}>
            {isOpen ? <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg> : <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" /></svg>}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav id="mobile-navigation" className="fixed inset-x-0 top-[80px] hidden max-h-[calc(100svh-80px)] flex-col overflow-y-auto border-b border-[#d8d8d4] bg-white px-5 py-[18px] opacity-100 transition-opacity duration-300 starting:opacity-0 max-[1179px]:flex max-[930px]:top-[76px] max-[930px]:max-h-[calc(100svh-76px)]" aria-label="Navegación móvil">
          {links.slice(0, 4)}
          <button type="button" className={`${linkClass(isAboutActive)} w-full border-0 bg-transparent p-0 text-left font-[inherit]`} aria-expanded={isAboutOpen} onClick={() => setIsAboutOpen((open) => !open)}>Nosotros</button>
          <div className={`grid overflow-hidden pl-5 transition-[grid-template-rows,opacity] duration-500 ${isAboutOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="min-h-0"><Link className="flex min-h-11 items-center border-b border-[#eeeeeb] text-[11px] tracking-[1.4px] uppercase" href="/nosotros" onClick={() => { setIsOpen(false); setIsAboutOpen(false); }}>Sobre nosotros</Link><Link className="flex min-h-11 items-center border-b border-[#eeeeeb] text-[11px] tracking-[1.4px] uppercase" href="/nuestras-marcas" onClick={() => { setIsOpen(false); setIsAboutOpen(false); }}>Nuestras marcas</Link></div></div>
          {links.slice(4)}
          <div className="flex gap-2.5 pt-5"><HeaderActions mobile /></div>
        </nav>
      )}
    </header>
  );
}

