import type { Metadata } from "next";

import { BrandsScreen } from "@/screens/brands/brands-screen";

export const metadata: Metadata = {
  title: "Nuestras marcas | Design HOF",
  description: "Descubre las marcas europeas representadas por Design HOF.",
};

export default function OurBrandsPage() {
  return <BrandsScreen />;
}
