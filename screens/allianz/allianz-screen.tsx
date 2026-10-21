import Image from "next/image";
import { allianzBenefits, allianzPrinciples, allianzResources } from "./content/allianz-content";
import { AllianzRegisterForm } from "./components/allianz-register-form";

export function AllianzScreen() {
  return (
    <div className="bg-[#f7f7f5] text-[#0d0d0b]">
      <section className="bg-[#0d0d0b] px-8 pb-28 pt-44 text-white max-[800px]:px-6 max-[800px]:pb-16 max-[800px]:pt-24" aria-labelledby="allianz-title">
        <div className="mx-auto grid max-w-[1376px] grid-cols-2 items-end gap-20 max-[800px]:grid-cols-1 max-[800px]:gap-12">
          <div>
            <p className="text-[12px] font-medium tracking-[5.4px] text-white/30 uppercase">Programa de Alianzas</p>
            <h1 id="allianz-title" className="sr-only">Allianz Design HOF</h1>
            <Image className="mt-8 h-auto w-[302px] brightness-0 invert" src="/allianz/allianz-design-hof.png" alt="Allianz Design HOF" width={1079} height={422} priority />
          </div>
          <blockquote className="max-w-[548px] text-[20px] leading-8 font-normal text-white/65 max-[800px]:text-[17px] max-[800px]:leading-7">“Para nosotros es un placer trabajar y crear alianzas con profesionales del mundo del Diseño de Interiores.”</blockquote>
        </div>
      </section>

      <section className="border-b border-black/9" aria-label="Nuestros principios">
        <div className="mx-auto max-w-[1440px]">
          {allianzPrinciples.map((principle) => (
            <article className="grid grid-cols-[120px_320px_1fr] gap-12 border-b border-black/9 px-8 py-16 last:border-b-0 max-[900px]:grid-cols-[64px_1fr] max-[900px]:gap-x-6 max-[600px]:px-6 max-[600px]:py-11" key={principle.number}>
              <span className="text-[12px] leading-[18px] text-[#888885]">{principle.number}</span>
              <h2 className="text-[26px] leading-[1.5] font-bold tracking-[-.64px] max-[600px]:text-[22px]">{principle.title}</h2>
              <p className="max-w-[640px] text-[16px] leading-[26px] text-[#888885] max-[900px]:col-start-2 max-[600px]:text-[14px] max-[600px]:leading-6">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0d0d0b] px-8 py-[72px] text-white max-[800px]:px-6 max-[800px]:py-12" aria-label="Beneficios Allianz">
        <div className="mx-auto grid max-w-[1376px] grid-cols-3 max-[800px]:grid-cols-1">
          {allianzBenefits.map((benefit, index) => (
            <article className={`min-h-20 px-10 first:pl-0 last:pr-0 max-[800px]:border-r-0 max-[800px]:border-b max-[800px]:border-white/10 max-[800px]:px-0 max-[800px]:py-7 max-[800px]:first:pt-0 max-[800px]:last:border-b-0 max-[800px]:last:pb-0 ${index < allianzBenefits.length - 1 ? "border-r border-white/10" : ""}`} key={benefit.title}>
              <h2 className="text-[16px] leading-[22px] font-bold">{benefit.title}</h2>
              <p className="mt-3 text-[14px] leading-[23px] text-white/45">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-8 py-24 max-[700px]:px-6 max-[700px]:py-16" aria-labelledby="allianz-register-title">
        <div className="mx-auto grid max-w-[1376px] grid-cols-2 gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-14">
          <div>
            <p className="text-[12px] font-medium tracking-[5.4px] text-[#888885] uppercase">Únete</p>
            <h2 id="allianz-register-title" className="mt-6 text-[48px] leading-[1.05] font-bold tracking-[-1.2px] max-[600px]:text-[38px]">Regístrate</h2>
            <p className="mt-6 max-w-[540px] text-[16px] leading-[26px] text-[#888885]">Accede al área privada exclusiva para profesionales del diseño de interiores. Encuentra contratos, marcas, modelos 3D/2D y mucho más.</p>
            <ul className="mt-8 flex max-w-[540px] flex-wrap gap-2" aria-label="Recursos incluidos">
              {allianzResources.map((resource) => <li className="border border-black/9 px-3 py-1.5 text-[10px] font-medium tracking-[2.5px] text-[#888885] uppercase" key={resource}>{resource}</li>)}
            </ul>
          </div>
          <AllianzRegisterForm />
        </div>
      </section>
    </div>
  );
}
