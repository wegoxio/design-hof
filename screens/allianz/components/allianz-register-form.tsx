"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

function PasswordField({ name, label }: { name: string; label: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input className="h-12 w-full border-0 border-b border-black/10 bg-transparent pr-10 text-[15px] outline-none transition-colors placeholder:text-[#888885]/50 focus:border-black" name={name} type={visible ? "text" : "password"} placeholder={label} aria-label={label} autoComplete={name === "password" ? "new-password" : "new-password"} required />
      <button className="absolute right-0 top-0 grid size-12 place-items-center opacity-45 transition-opacity hover:opacity-100" type="button" onClick={() => setVisible((current) => !current)} aria-label={`${visible ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`} aria-pressed={visible}>
        <Image src="/allianz/eye.svg" alt="" width={16} height={16} />
      </button>
    </div>
  );
}

export function AllianzRegisterForm() {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Recibimos tus datos. La activación del área privada estará disponible próximamente.");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <div className="grid grid-cols-2 gap-6 max-[560px]:grid-cols-1">
        <input className="h-12 border-0 border-b border-black/10 bg-transparent text-[15px] outline-none transition-colors placeholder:text-[#888885]/50 focus:border-black" name="firstName" placeholder="Nombre" aria-label="Nombre" autoComplete="given-name" required />
        <input className="h-12 border-0 border-b border-black/10 bg-transparent text-[15px] outline-none transition-colors placeholder:text-[#888885]/50 focus:border-black" name="lastName" placeholder="Apellido" aria-label="Apellido" autoComplete="family-name" required />
      </div>
      <input className="h-12 border-0 border-b border-black/10 bg-transparent text-[15px] outline-none transition-colors placeholder:text-[#888885]/50 focus:border-black" name="email" type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" autoComplete="email" required />
      <input className="h-12 border-0 border-b border-black/10 bg-transparent text-[15px] outline-none transition-colors placeholder:text-[#888885]/50 focus:border-black" name="phone" type="tel" placeholder="Teléfono" aria-label="Teléfono" autoComplete="tel" required />
      <PasswordField name="password" label="Contraseña" />
      <PasswordField name="passwordConfirmation" label="Confirmar contraseña" />
      <button className="mt-2 min-h-13 bg-[#0d0d0b] px-6 text-[11px] font-bold tracking-[4px] text-[#f7f7f5] uppercase transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#242422]" type="submit">Registrarse</button>
      <p className="text-center text-[12px] text-[#888885]">¿Posees una cuenta? <button className="border-0 bg-transparent p-0 text-[#0d0d0b] underline underline-offset-2" type="button">Inicia sesión aquí</button></p>
      <p className="min-h-5 text-center text-[12px] leading-5 text-[#5e5e5a]" role="status" aria-live="polite">{message}</p>
    </form>
  );
}
