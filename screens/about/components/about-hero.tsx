import Image from "next/image";

export function AboutHero({ content }: { content: { eyebrow: string; title: string; imageUrl: string } }) {
  return (
    <section className="w-full">
      <div className="relative isolate aspect-[2.55/1] w-full overflow-hidden bg-[#222] text-white max-[700px]:aspect-auto max-[700px]:min-h-[390px]">
        <Image
          className="-z-20 object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] starting:scale-[1.045]"
          src={content.imageUrl}
          alt="Interior Design HOF"
          fill
          priority
          quality={95}
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.62),rgba(8,8,8,.18)),linear-gradient(180deg,rgba(5,5,5,.06)_38%,rgba(5,5,5,.58))]" />
        <div className="absolute right-8 bottom-[clamp(34px,4vw,58px)] left-8 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-7 starting:opacity-0 max-[600px]:right-5 max-[600px]:left-5">
          <p className="mb-5 text-[9px] font-medium tracking-[5px] text-white/55 uppercase">{content.eyebrow}</p>
          <h1 className="text-[clamp(42px,5.1vw,72px)] leading-[.96] font-bold tracking-[-3px] max-[600px]:tracking-[-1.8px]">
            {content.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
