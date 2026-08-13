import type { Metadata } from "next";

import { CorporateScreen } from "@/screens/projects/corporate/corporate-screen";

export const metadata: Metadata = {
  title: "Proyectos Corporativos | Design HOF",
  description: "Entornos corporativos que elevan la cultura y el rendimiento, desarrollados por Design HOF.",
};

export default function CorporatePage() {
  return <CorporateScreen />;
}
