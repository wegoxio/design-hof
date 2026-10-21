import type { Metadata } from "next";
import { AllianzScreen } from "@/screens/allianz/allianz-screen";

export const metadata: Metadata = {
  title: "Allianz | Design HOF",
  description: "Programa de alianzas para profesionales del diseño de interiores de Design HOF.",
};

export default function AllianzPage() {
  return <AllianzScreen />;
}
