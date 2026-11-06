import { DESIGN_HOF_WHATSAPP_URL } from "@/services/whatsapp";

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
      <path fill="currentColor" d="M16 2.7A13.1 13.1 0 0 0 4.65 22.35L3 29.3l7.1-1.58A13.15 13.15 0 1 0 16 2.7Zm0 23.9c-2.02 0-4-.57-5.7-1.64l-.4-.24-4.2.94.98-4.08-.27-.42A10.76 10.76 0 1 1 16 26.6Z" />
      <path fill="currentColor" d="M22.2 18.67c-.34-.17-2.02-1-2.33-1.11-.31-.12-.54-.17-.77.17-.23.34-.88 1.11-1.08 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.7a10.2 10.2 0 0 1-1.9-2.37c-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.08-.17-.77-1.85-1.05-2.54-.28-.66-.56-.57-.77-.58h-.65c-.23 0-.6.08-.91.43-.31.34-1.2 1.17-1.2 2.85s1.23 3.31 1.4 3.54c.17.23 2.4 3.67 5.82 5.15.81.35 1.45.56 1.94.72.82.26 1.56.22 2.15.14.65-.1 2.02-.83 2.3-1.63.29-.8.29-1.48.2-1.63-.08-.14-.31-.23-.65-.4Z" />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  const href = `${DESIGN_HOF_WHATSAPP_URL}?text=${encodeURIComponent("Hola, quisiera recibir más información.")}`;
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Contactar a Design HOF por WhatsApp" title="Escríbenos por WhatsApp" className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_36px_rgba(18,140,74,.38)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_16px_42px_rgba(18,140,74,.48)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366] max-[600px]:right-4 max-[600px]:bottom-4">
      <WhatsAppLogo />
    </a>
  );
}
