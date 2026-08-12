"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="group relative flex h-[54px] w-full max-w-[285px] border border-white/12 transition-colors duration-500 focus-within:border-white/45" onSubmit={submit}>
      <label className="sr-only" htmlFor="footer-email">Correo electrónico</label>
      <input id="footer-email" className="min-w-0 flex-1 bg-transparent px-[18px] text-[13px] font-normal text-white/70 outline-none placeholder:text-white/24" type="email" placeholder={submitted ? "Gracias por suscribirte" : "Correo electrónico"} required disabled={submitted} />
      <button className="grid w-[48px] shrink-0 cursor-pointer place-items-center border-0 bg-white text-black transition-[background,color] duration-500 hover:bg-h1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-h1 disabled:cursor-default" type="submit" aria-label="Suscribirse" disabled={submitted}>
        <span className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${submitted ? "rotate-0" : "group-hover:translate-x-1"}`} aria-hidden="true">{submitted ? "✓" : "→"}</span>
      </button>
    </form>
  );
}
