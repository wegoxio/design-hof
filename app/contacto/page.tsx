import type { Metadata } from "next";
import { ContactScreen } from "@/screens/contact/contact-screen";

export const metadata: Metadata = {
  title: "Contacto | Design HOF",
  description: "Contacta a Design HOF o visita nuestro showroom en Las Mercedes, Caracas.",
};

export default function ContactPage() {
  return <ContactScreen />;
}
