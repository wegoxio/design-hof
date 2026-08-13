"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ProductCategory, RoomCategory } from "../../types/category";
import { CategoryCard } from "./category-card";

type CategoriesSectionProps = {
  rooms: RoomCategory[];
  categories: ProductCategory[];
};

export function CategoriesSection({ rooms, categories }: CategoriesSectionProps) {
  const [activeRoom, setActiveRoom] = useState(rooms[0]?.id ?? "");
  const [displayedRoom, setDisplayedRoom] = useState(rooms[0]?.id ?? "");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleCategories = useMemo(() => {
    if (displayedRoom === "todas") return categories;
    return categories.filter((category) => category.roomIds.includes(displayedRoom));
  }, [displayedRoom, categories]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollLeft = 0;
    const firstFrame = requestAnimationFrame(() => {
      carousel.scrollLeft = 0;
      requestAnimationFrame(() => setIsTransitioning(false));
    });

    return () => cancelAnimationFrame(firstFrame);
  }, [displayedRoom]);

  function selectRoom(roomId: string) {
    if (roomId === activeRoom) {
      carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    setActiveRoom(roomId);
    setIsTransitioning(true);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setDisplayedRoom(roomId);
    }, 180);
  }

  function moveCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * carousel.clientWidth * 0.72, behavior: "smooth" });
  }

  return (
    <section className="w-full bg-[#f8f8f7] text-[#151515]" aria-labelledby="categories-title">
      <nav className="overflow-x-auto border-b border-[#dfdfdc] px-[clamp(28px,5vw,76px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Ambientes">
        <div className="mx-auto flex w-full max-w-[1600px] min-w-max items-center gap-[clamp(32px,4.2vw,66px)]">
          {rooms.map((room) => {
            const isActive = activeRoom === room.id;
            return (
              <button
                className={`relative h-[84px] cursor-pointer border-0 bg-transparent px-0 text-[12px] leading-none font-medium tracking-[1.8px] uppercase transition-colors duration-300 after:absolute after:bottom-[22px] after:left-0 after:h-px after:w-full after:origin-left after:bg-[#151515] after:content-[''] after:transition-transform after:duration-300 hover:text-[#151515] max-[767px]:h-[70px] max-[767px]:text-[10px] max-[767px]:tracking-[1.4px] max-[767px]:after:bottom-[17px] ${isActive ? "text-[#151515] after:scale-x-100" : "text-[#8c8c88] after:scale-x-0"}`}
                type="button"
                key={room.id}
                onClick={() => selectRoom(room.id)}
                aria-pressed={isActive}
              >
                {room.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto w-[calc(100%-40px)] max-w-[1600px] border-b border-[#dfdfdc] pt-[72px] pb-[88px] max-[767px]:pt-11 max-[767px]:pb-14">
        <div className="mb-[46px] flex items-center justify-between max-[767px]:mb-8">
          <h2 id="categories-title" className="text-[24px] leading-[1.2] font-medium tracking-[-0.8px] max-[767px]:text-[20px]">
            Explorar por categoría
          </h2>

          <div className="flex gap-2.5 max-[767px]:hidden" aria-label="Controles del carrusel">
            <button className="grid size-10 cursor-pointer place-items-center border border-[#dededb] bg-transparent text-[#858581] transition duration-300 hover:border-[#151515] hover:bg-[#151515] hover:text-white" type="button" onClick={() => moveCarousel(-1)} aria-label="Ver categorías anteriores">
              <span className="text-xl leading-none" aria-hidden="true">‹</span>
            </button>
            <button className="grid size-10 cursor-pointer place-items-center border border-[#dededb] bg-transparent text-[#858581] transition duration-300 hover:border-[#151515] hover:bg-[#151515] hover:text-white" type="button" onClick={() => moveCarousel(1)} aria-label="Ver categorías siguientes">
              <span className="text-xl leading-none" aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div
          key={displayedRoom}
          ref={carouselRef}
          className={`flex snap-x snap-mandatory gap-[15px] overflow-x-auto scroll-smooth pb-1 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [scrollbar-width:none] [&>*]:snap-start [&::-webkit-scrollbar]:hidden ${isTransitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          {visibleCategories.map((category) => <CategoryCard category={category} key={category.id} />)}
        </div>
      </div>
    </section>
  );
}
