import Image from "next/image";

export function AboutHero({ content }: { content: { eyebrow: string; title: string; imageUrl: string } }) {
  return <section className="relative isolate min-h-[620px] overflow-hidden bg-[#222] text-white max-[767px]:min-h-[460px]"><Image className="-z-20 scale-100 object-cover object-center transition-transform duration-[1500ms] starting:scale-[1.045]" src={content.imageUrl} alt="Interior Design Hof" fill priority sizes="100vw" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.7),rgba(8,8,8,.2)),linear-gradient(180deg,transparent_50%,rgba(5,5,5,.58))]" /><div className="absolute right-[clamp(28px,5vw,72px)] bottom-[72px] left-[clamp(28px,5vw,72px)]"><p className="mb-5 text-[10px] font-medium tracking-[6px] text-white/55 uppercase">{content.eyebrow}</p><h1 className="text-[72px] leading-none font-bold tracking-[-3px] max-[900px]:text-[56px] max-[600px]:text-[42px]">{content.title}</h1></div></section>;
}
