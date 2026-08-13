import type { Metadata } from "next";

import { ResidentialScreen } from "@/screens/projects/residential/residential-screen";

export const metadata: Metadata = {
  title: "Proyectos Residenciales | Design HOF",
  description: "Proyectos residenciales únicos, funcionales y atemporales desarrollados por Design HOF.",
};

export default function ResidentialPage() {
  return <ResidentialScreen />;
}
