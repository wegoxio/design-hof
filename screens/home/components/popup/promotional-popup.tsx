"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { PromotionalPopupContent } from "../../types/popup";

const OPEN_DELAY = 900;
const IMAGE_INTERVAL = 4500;
const EXIT_DURATION = 650;

type PromotionalPopupProps = {
  content: PromotionalPopupContent;
};

export function PromotionalPopup({ content }: PromotionalPopupProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    }, OPEN_DELAY);
    return () => {
      window.clearTimeout(timer);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 500);

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closePopup();
    }

    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isVisible || content.images.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % content.images.length);
    }, IMAGE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [content.images.length, isVisible]);

  function closePopup(afterClose?: () => void) {
    setIsVisible(false);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      setIsMounted(false);
      afterClose?.();
    }, EXIT_DURATION);
  }

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/65 p-5 backdrop-blur-[3px] transition-[opacity,backdrop-filter] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[640px]:p-3 motion-reduce:transition-none ${isVisible ? "opacity-100 backdrop-blur-[3px]" : "opacity-0 backdrop-blur-none"}`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <section
        className={`relative grid w-full max-w-[930px] grid-cols-2 overflow-hidden bg-[#f8f8f6] shadow-[0_30px_90px_rgba(0,0,0,0.32)] transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[740px]:my-auto max-[740px]:max-w-[520px] max-[740px]:grid-cols-1 motion-reduce:transition-none ${isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-7 scale-[0.975] opacity-0"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="h1-popup-title"
        aria-describedby="h1-popup-description"
      >
        <button
          ref={closeButtonRef}
          className="absolute top-4 right-4 z-20 grid size-9 cursor-pointer place-items-center border-0 bg-transparent text-[#8f8f8a] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-h1"
          type="button"
          onClick={() => closePopup()}
          aria-label="Cerrar promoción"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>

        <div className="relative min-h-[454px] overflow-hidden bg-[#d8d2ca] max-[740px]:min-h-0 max-[740px]:aspect-[16/10]">
          {content.images.map((image, index) => (
            <Image
              className={`object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${activeImage === index ? "scale-100 opacity-100" : "pointer-events-none scale-[1.025] opacity-0"}`}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 740px) 100vw, 465px"
              priority={index === 0}
              key={image.src}
            />
          ))}

          <div className="absolute right-0 bottom-4 left-0 z-10 flex justify-center gap-2" aria-label={`Imagen ${activeImage + 1} de ${content.images.length}`}>
            {content.images.map((image, index) => (
              <button
                className={`h-5 w-6 cursor-pointer border-0 bg-transparent p-0 before:block before:h-[2px] before:w-full before:rounded-full before:transition-all before:duration-500 before:content-[''] ${activeImage === index ? "before:scale-x-100 before:bg-white" : "before:scale-x-50 before:bg-white/55"}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Mostrar imagen ${index + 1}`}
                aria-current={activeImage === index ? "true" : undefined}
                key={image.src}
              />
            ))}
          </div>
        </div>

        <div className="flex min-h-[454px] flex-col items-center justify-center px-[52px] py-12 text-center max-[740px]:min-h-0 max-[740px]:px-6 max-[740px]:py-9">
          <div className="mb-8 flex items-center gap-6 max-[740px]:mb-5 max-[740px]:gap-4">
            <Image className="size-14 max-[740px]:size-11" src="/shared/brand/designhof-logo.svg" alt="Design HOF" width={56} height={56} />
            <span className="h-9 w-px bg-[#deded9] max-[740px]:h-7" aria-hidden="true" />
            <Image className="size-28 max-[740px]:size-24" src="/shared/brand/LOGO_H1.png" alt="H1 brand logo" width={112} height={112} priority />
          </div>

          <h2 id="h1-popup-title" className="max-w-[330px] text-[29px] leading-[1.18] font-medium tracking-[-1px] max-[740px]:text-[25px]">
            {content.title}
          </h2>
          <p id="h1-popup-description" className="mt-5 max-w-[300px] text-[15px] leading-[1.65] font-medium text-[#92928d] max-[740px]:mt-3 max-[740px]:text-[13px]">
            {content.description}
          </p>

          <Link
            className="group relative mt-10 flex h-[60px] w-full items-center justify-center gap-3 overflow-hidden bg-h1 px-6 text-[12px] font-medium tracking-[4px] text-black uppercase no-underline shadow-[0_0_0_rgba(226,240,37,0)] transition-[transform,box-shadow,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:inset-y-0 before:left-[-35%] before:w-[30%] before:-skew-x-12 before:bg-white/35 before:blur-md before:content-[''] before:transition-transform before:duration-700 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_32px_rgba(226,240,37,0.24)] hover:brightness-[0.985] hover:before:translate-x-[450%] active:translate-y-0 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black max-[740px]:mt-7 max-[740px]:h-[54px] motion-reduce:transition-none motion-reduce:before:transition-none"
            href={content.ctaHref}
            onClick={(event) => {
              event.preventDefault();
              closePopup(() => router.push(content.ctaHref));
            }}
          >
            <svg className="relative z-10 size-[19px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-rotate-3" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="1.5" /><path d="M9 8.5c.4 2.5 2 4.1 4.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <span className="relative z-10">{content.ctaLabel}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

