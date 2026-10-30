import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { getHeaderMerchandisingLinks } from "@/services/cataloguer/catalog";
import { CataloguerRequestError } from "@/services/cataloguer/client";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.design-hof.com"),
  title: "Design HOF",
  description: "Mobiliario y diseño de interiores.",
  openGraph: {
    type: "website",
    url: "https://www.design-hof.com/",
    siteName: "Design HOF",
    locale: "es_VE",
    title: "Design HOF",
    description: "Mobiliario y diseño de interiores.",
    images: [
      {
        url: "/og-designhof.svg",
        width: 1200,
        height: 630,
        alt: "Design HOF — mobiliario y diseño de interiores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design HOF",
    description: "Mobiliario y diseño de interiores.",
    images: ["/og-designhof.svg"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let merchandisingLinks = [] as Awaited<ReturnType<typeof getHeaderMerchandisingLinks>>;
  try {
    merchandisingLinks = await getHeaderMerchandisingLinks();
  } catch (error) {
    if (!(error instanceof CataloguerRequestError)) throw error;
    console.error("Cataloguer unavailable while loading header categories", error);
  }
  return (
    <html
      lang="es"
      className={`${montserrat.className} h-full antialiased`}
    >
      <body className="m-0 flex min-h-full min-w-80 flex-col bg-[#f5f5f3] text-[#1d1d1b]">
        <SiteHeader merchandisingLinks={merchandisingLinks} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

