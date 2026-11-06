export const DESIGN_HOF_WHATSAPP_URL = "https://wa.me/584120476700";

export function productWhatsAppUrl(productName: string, productPath: string) {
  const productUrl = new URL(productPath, "https://www.design-hof.com").toString();
  const message = `Hola, quisiera más información sobre ${productName}. ${productUrl}`;
  return `${DESIGN_HOF_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
