"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";

const fieldClass = "h-12 w-full border-0 border-b border-black/10 bg-transparent py-1 text-sm text-[#0d0d0b] outline-none transition-colors placeholder:text-[#888885] focus:border-black/55";
const labelClass = "text-xs leading-[18px] font-medium tracking-[1.2px] uppercase";

function Field({ label, name, type = "text", placeholder, autoComplete }: { label: string; name: string; type?: string; placeholder: string; autoComplete: string }) {
  return <label className="block"><span className={labelClass}>{label} <span aria-hidden="true">*</span></span><input className={fieldClass} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required /></label>;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const submissionId = useRef<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);
    submissionId.current ??= crypto.randomUUID();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: submissionId.current,
          name: form.get("name"),
          lastName: form.get("lastName"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error || "No pudimos enviar tu mensaje.");
      element.reset();
      submissionId.current = null;
      setStatus("success");
      setFeedback("Tu mensaje fue enviado correctamente. Revisa tu correo: te enviamos una confirmación.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "No pudimos enviar tu mensaje. Inténtalo nuevamente.");
    }
  }

  return (
    <form className="pt-8" onSubmit={submit}>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-7 max-[680px]:grid-cols-1">
        <Field label="Nombre" name="name" placeholder="Tu nombre" autoComplete="given-name" />
        <Field label="Apellido" name="lastName" placeholder="Tu apellido" autoComplete="family-name" />
        <Field label="Correo electrónico" name="email" type="email" placeholder="Tu correo electrónico" autoComplete="email" />
        <Field label="Teléfono" name="phone" type="tel" placeholder="Número de contacto" autoComplete="tel" />
        <label className="col-span-2 max-[680px]:col-span-1"><span className={labelClass}>Mensaje</span><textarea className="mt-3 min-h-36 w-full resize-y border-0 border-b border-black/10 bg-transparent py-3 text-sm leading-5 text-[#0d0d0b] outline-none transition-colors placeholder:text-[#888885] focus:border-black/55" name="message" placeholder="¿En qué podemos ayudarte?" /></label>
      </div>
      <div className="pt-9">
        <button className="group inline-flex h-12 items-center justify-center gap-2 bg-[#0d0d0b] px-4 text-[11px] leading-[16.5px] font-bold tracking-[2.75px] text-[#f7f7f5] uppercase transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-55 disabled:hover:translate-y-0" type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar mensaje"}<Image className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" src="/contact/icons/arrow-up-right.svg" alt="" width={16} height={16} /></button>
        {feedback && <p className={`mt-5 max-w-xl text-sm leading-6 ${status === "success" ? "text-emerald-700" : "text-red-700"}`} role={status === "error" ? "alert" : "status"}>{feedback}</p>}
      </div>
    </form>
  );
}
