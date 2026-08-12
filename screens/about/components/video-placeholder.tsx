"use client";

import { useState } from "react";

export function VideoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  const [active, setActive] = useState(false);
  return <button className={`group relative grid min-h-[330px] w-full cursor-pointer place-items-center overflow-hidden border-0 bg-[radial-gradient(circle_at_center,#181818,#080808_70%)] p-8 text-white transition-[filter,transform] duration-700 hover:brightness-125 ${className}`} type="button" onClick={() => setActive(true)} aria-label={`Reproducir: ${label}`}><span className="flex flex-col items-center gap-6"><span className="grid size-16 place-items-center rounded-full border border-white/25 transition-[border,transform] duration-500 group-hover:scale-110 group-hover:border-white/70"><span className="ml-1 text-xl">▶</span></span><span className="text-[9px] font-medium tracking-[5px] text-white/35 uppercase">{active ? "Video próximamente" : label}</span></span></button>;
}
