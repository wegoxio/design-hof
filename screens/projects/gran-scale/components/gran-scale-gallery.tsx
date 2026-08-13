"use client";

import Image from "next/image";

import { useInView } from "@/screens/home/hooks/use-in-view";

import type { ProjectDetailContent } from "../types/gran-scale";

export function ProjectDetailGallery({ content }: { content: ProjectDetailContent["gallery"] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.08);
  const [featuredImage, ...gridImages] = content.images;

  return (
    <section ref={ref} className="border-t border-black/5 py-5">
      <div className="site-container max-w-[1500px] mx-auto">
        <p className="mb-[clamp(34px,4vw,54px)] text-[9px] tracking-[5px] text-black/35 uppercase">
          {content.eyebrow}
        </p>

        <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1 max-[700px]:gap-2.5">
          <figure
            className={`group relative col-span-2 aspect-[2.28] overflow-hidden bg-[#e9e9e7] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] max-[700px]:col-span-1 max-[700px]:aspect-[4/3] ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              sizes="(max-width: 700px) 100vw, 96vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
            />
          </figure>

          {gridImages.map((image, index) => (
            <figure
              key={image.src}
              className={`group relative aspect-[4/3] overflow-hidden bg-[#e9e9e7] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${120 + index * 90}ms` : "0ms" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 700px) 100vw, 48vw"
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
