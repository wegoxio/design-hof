import Link from "next/link";
import { companyLinks, furnitureLinks, legalLinks, type FooterLink } from "./footer-data";
import { NewsletterForm } from "./newsletter-form";

function FooterLinks({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="mb-8 text-[11px] font-bold tracking-[1.2px] text-white/25 uppercase max-[767px]:mb-5">{title}</h2>
      <ul className="space-y-[18px]">
        {links.map((link) => <li key={link.href}><Link className="text-[13px] font-normal text-white/36 no-underline transition-[color,transform] duration-400 hover:translate-x-1 hover:text-white/85" href={link.href}>{link.label}</Link></li>)}
      </ul>
    </div>
  );
}

function SocialIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return <a className="grid size-5 place-items-center text-white/24 transition-[color,transform] duration-400 hover:-translate-y-0.5 hover:text-white" href={href} aria-label={label} target="_blank" rel="noreferrer">{children}</a>;
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#090909] px-[clamp(28px,4vw,58px)] pt-[88px] pb-10 text-white max-[767px]:pt-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-[1.1fr_1fr_1fr_0.95fr] gap-x-16 gap-y-14 max-[1050px]:grid-cols-2 max-[600px]:grid-cols-1">
          <div>
            <p className="mb-8 text-[15px] font-bold tracking-[5px] uppercase">Design HOF</p>
            <address className="space-y-2 text-[13px] leading-[1.5] font-normal text-white/32 not-italic"><p>Las Mercedes, Avenida<br />Orinoco<br />Caracas 1060, Venezuela</p><p className="pt-1"><a className="transition-colors duration-400 hover:text-white/80" href="tel:+5802129935722">+58 0212 9935722</a></p><p><a className="transition-colors duration-400 hover:text-white/80" href="mailto:info@design-hof.com">info@design-hof.com</a></p></address>
            <div className="mt-8 flex gap-4">
              <SocialIcon href="https://www.instagram.com/design_hof/" label="Instagram"><svg viewBox="0 0 24 24" fill="none" className="size-[17px]"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" /><circle cx="12" cy="12" r="3.5" stroke="currentColor" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg></SocialIcon>
              <SocialIcon href="https://facebook.com" label="Facebook"><span className="text-[16px]">f</span></SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn"><span className="text-[12px]">in</span></SocialIcon>
            </div>
          </div>
          <FooterLinks title="Mobiliario" links={furnitureLinks} />
          <FooterLinks title="Empresa" links={companyLinks} />
          <div><h2 className="mb-8 text-[11px] font-bold tracking-[1.2px] text-white/25 uppercase">Área privada</h2><Link className="flex h-[47px] w-full max-w-[260px] items-center justify-center border border-white/12 px-4 text-[11px] font-medium tracking-[1.5px] text-white/36 uppercase transition duration-500 hover:border-white/50 hover:text-white" href="/allianz">Allianz — Iniciar sesión</Link><h2 className="mt-10 mb-5 text-[11px] font-bold tracking-[1.2px] text-white/25 uppercase">Newsletter</h2><NewsletterForm /></div>
        </div>

        <div className="mt-[88px] flex items-center justify-between gap-8 border-t border-white/8 pt-9 text-[11px] font-normal text-white/18 max-[767px]:mt-14 max-[767px]:flex-col max-[767px]:items-start">
          <p>© 2026 Design HOF. Todos los derechos reservados.</p>
          <nav className="flex flex-wrap gap-x-10 gap-y-3" aria-label="Enlaces legales">{legalLinks.map((link) => <Link className="transition-colors duration-400 hover:text-white/70" href={link.href} key={link.href}>{link.label}</Link>)}</nav>
        </div>
      </div>
    </footer>
  );
}

