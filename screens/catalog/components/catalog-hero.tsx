import Image from "next/image";
import type { CatalogCopy } from "../types/catalog";

export function CatalogHero({ copy }: { copy: CatalogCopy }) {
  return (
    <section className="relative isolate min-h-[390px] overflow-hidden bg-[#282522] text-white max-[767px]:min-h-[330px]">
      <Image className="-z-20 scale-100 object-cover object-center transition-transform duration-[1400ms] starting:scale-[1.04]" src={copy.heroImage} alt="Colección de mobiliario Design HOF" fill priority sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,9,0.76)_0%,rgba(18,17,15,0.43)_55%,rgba(12,11,10,0.57)_100%),linear-gradient(180deg,transparent_45%,rgba(5,5,5,0.48)_100%)]" />
      <div className="absolute right-[clamp(28px,5vw,76px)] bottom-[58px] left-[clamp(28px,5vw,76px)] translate-y-0 opacity-100 transition-[opacity,transform] delay-200 duration-[900ms] starting:translate-y-5 starting:opacity-0">
        <p className="mb-4 text-[9px] font-medium tracking-[5px] text-white/48 uppercase">{copy.eyebrow}</p>
        <h1 className="text-[52px] leading-none font-bold tracking-[-2px] max-[767px]:text-[40px]">{copy.title}</h1>
        <p className="mt-5 max-w-[500px] text-[13px] leading-[1.7] font-normal text-white/55">{copy.description}</p>
        <div className="mt-7 flex gap-2" aria-hidden="true"><span className="h-px w-7 bg-white" /><span className="h-px w-7 bg-white/30" /><span className="h-px w-3 bg-white/30" /></div>
      </div>
    </section>
  );
}

