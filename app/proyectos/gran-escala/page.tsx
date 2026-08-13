import type { Metadata } from "next";

import { GranScaleScreen } from "@/screens/projects/gran-scale/gran-scale-screen";

export const metadata: Metadata = {
  title: "Proyectos de Gran Escala | Design HOF",
  description: "Proyectos arquitectónicos de alta complejidad desarrollados por Design HOF.",
};

export default function GranScalePage() {
  return <GranScaleScreen />;
}
