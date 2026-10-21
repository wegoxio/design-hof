import { notFound } from "next/navigation";

const sections: Record<string, string> = {
  contacto: "Contacto",
  "smart-modull": "Smart Modull",
  cuenta: "Mi cuenta",
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: PageProps<"/[section]">) {
  const { section } = await params;
  const sectionName = sections[section];

  if (!sectionName) notFound();

  return (
    <section className="grid min-h-[calc(100svh-100px)] place-items-center px-6 py-12 text-center text-[clamp(24px,4vw,48px)] tracking-[-0.04em] max-[930px]:min-h-[calc(100svh-76px)]">
      Hola desde {sectionName}
    </section>
  );
}
