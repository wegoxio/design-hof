"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { HeroSlide } from "../../types/hero";
import { useHeroSlider } from "./hooks/use-hero-slider";

const reveal = "translate-y-0 opacity-100 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-[18px] starting:opacity-0 motion-reduce:transition-none";

type HeroSectionProps = {
  slides: HeroSlide[];
};

export function HeroSection({ slides }: HeroSectionProps) {
  const { activeIndex, goTo, setIsPaused, interactionProps } = useHeroSlider(slides.length);

  return (
    <section
      className="relative isolate min-h-[calc(100svh-100px)] w-full touch-pan-y overflow-hidden bg-[#3b3733] text-white opacity-100 outline-none transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-[18px] starting:opacity-0 max-[930px]:h-[calc(100svh-76px)] max-[930px]:min-h-[680px] max-[930px]:max-h-[860px] motion-reduce:transition-none"
      aria-labelledby="hero-title"
      aria-roledescription="carrusel"
      aria-label="Colección destacada"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      {...interactionProps}
    >
      <div
        className="absolute inset-0 -z-30 flex h-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.77,0,0.18,1)] motion-reduce:transition-none"
        style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
      >
        {slides.map((slide, index) => (
          <div className="relative h-full min-w-full overflow-hidden" key={slide.id} aria-hidden={activeIndex !== index}>
            <Image
              className={`object-cover object-[var(--hero-position)] transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[930px]:object-[var(--hero-mobile-position)] motion-reduce:transition-none ${activeIndex === index ? "scale-100 blur-none" : "scale-[1.035] blur-[1px]"}`}
              src={slide.imageUrl}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{
                "--hero-position": slide.imagePosition,
                "--hero-mobile-position": slide.mobileImagePosition,
              } as CSSProperties}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(27,25,22,0.35)_0%,rgba(35,32,29,0.16)_54%,rgba(20,18,16,0.4)_100%),linear-gradient(180deg,rgba(39,36,32,0.42)_0%,rgba(30,28,25,0.2)_42%,rgba(9,9,8,0.93)_100%)] max-[480px]:bg-[linear-gradient(90deg,rgba(27,25,22,0.34),rgba(20,18,16,0.28)),linear-gradient(180deg,rgba(39,36,32,0.3)_0%,rgba(18,17,15,0.2)_30%,rgba(7,7,7,0.96)_100%)]" aria-hidden="true" />

      <div className="absolute bottom-[clamp(105px,16.8%,130px)] left-[clamp(38px,3.1vw,48px)] w-[min(720px,calc(100%-76px))] max-[930px]:right-6 max-[930px]:bottom-[92px] max-[930px]:left-6 max-[930px]:w-auto max-[480px]:right-5 max-[480px]:left-5">
        <p className={`${reveal} mb-[30px] text-[13px] leading-[1.5] font-medium tracking-[6px] text-white/72 uppercase delay-[280ms] max-[930px]:mb-[18px] max-[930px]:text-[9px] max-[930px]:tracking-[2.8px] max-[480px]:text-[8px] max-[480px]:tracking-[2.2px]`}>Las Mercedes · Caracas — 2025</p>
        <h1 id="hero-title" className={`${reveal} mb-5 text-[clamp(38px,4vw,54px)] leading-[1.06] font-medium tracking-[-1.8px] delay-[390ms] max-[930px]:mb-4 max-[930px]:text-[clamp(32px,7.5vw,42px)] max-[930px]:leading-[1.08] max-[930px]:tracking-[-1.2px] max-[480px]:text-[clamp(30px,8.5vw,36px)]`}>Somos DESIGN HOF</h1>
        <p className={`${reveal} m-0 max-w-[690px] text-[15px] leading-[1.95] font-medium text-white/68 delay-[500ms] max-[930px]:line-clamp-4 max-[930px]:text-[12px] max-[930px]:leading-[1.7] max-[480px]:text-[11px]`}>
          Una tienda de diseño que ofrece una propuesta integral de mobiliario, cocinas, baños y clósets de estilo atemporal. Nuestra propuesta se caracteriza por el uso de líneas puras, propias del norte de Europa, para crear espacios que trasciendan y brinden un verdadero placer.
        </p>
        <Link className={`${reveal} group relative mt-[46px] inline-flex items-center gap-[18px] pb-[11px] text-xs leading-[1.5] font-medium tracking-[4px] text-white uppercase no-underline delay-[610ms] before:absolute before:right-0 before:bottom-0 before:left-0 before:h-px before:bg-white/35 before:content-[''] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-white after:content-[''] after:transition-transform after:duration-[550ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 max-[930px]:mt-7 max-[930px]:gap-4 max-[930px]:text-[9px] max-[930px]:tracking-[2.6px]`} href="/mobiliario">
          <span>Explorar colección</span>
          <span className="text-lg tracking-normal transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[6px]" aria-hidden="true">→</span>
        </Link>
      </div>

      <div className={`${reveal} absolute bottom-[63px] left-[clamp(38px,3.1vw,48px)] flex gap-2 delay-[720ms] max-[930px]:bottom-9 max-[930px]:left-6 max-[480px]:left-5`} aria-label={`Diapositiva ${activeIndex + 1} de ${slides.length}`}>
        {slides.map((slide, index) => (
          <button
            className={`h-5 w-[27px] cursor-pointer border-0 bg-transparent p-0 before:block before:h-px before:w-full before:transition-[background-color,transform] before:duration-500 before:content-[''] hover:before:bg-white ${activeIndex === index ? "before:scale-x-100 before:bg-white/80" : "before:scale-x-75 before:bg-white/30"}`}
            type="button"
            key={slide.id}
            onClick={() => goTo(index)}
            aria-label={`Mostrar imagen ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
