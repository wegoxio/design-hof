import type { Metadata } from "next";
import { ServicesScreen } from "@/screens/services/services-screen";

export const metadata: Metadata = {
  title: "Nuestros Servicios | Design HOF",
  description: "Diseño e instalación de cocinas, baños, clósets, mobiliario y revestimientos.",
};

export default function ServicesPage() {
  return <ServicesScreen />;
}
