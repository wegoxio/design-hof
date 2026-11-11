import type { Metadata } from "next";

import { GranScaleScreen } from "@/screens/projects/gran-scale/gran-scale-screen";

export const metadata: Metadata = {
  title: "Viviendas particulares | Design HOF",
  description: "Proyectos de interiorismo y mobiliario para viviendas particulares desarrollados por Design HOF.",
};

export default function GranScalePage() {
  return <GranScaleScreen />;
}
