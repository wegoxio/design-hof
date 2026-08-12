"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_DELAY = 6500;
const SWIPE_THRESHOLD = 45;

export function useHeroSlider(slideCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const lastWheelAt = useRef(0);

  const goTo = useCallback((index: number) => {
    if (slideCount === 0) return;
    setActiveIndex((index + slideCount) % slideCount);
  }, [slideCount]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => slideCount ? (current + 1) % slideCount : 0);
  }, [slideCount]);

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => slideCount ? (current - 1 + slideCount) % slideCount : 0);
  }, [slideCount]);

  useEffect(() => {
    if (isPaused || slideCount < 2) return;
    const timer = window.setInterval(goNext, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, slideCount]);

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    setIsPaused(true);
  }

  function onTouchEnd(event: React.TouchEvent) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    setIsPaused(false);
    if (startX == null || endX == null) return;
    const distance = endX - startX;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    if (distance < 0) goNext();
    else goPrevious();
  }

  function onWheel(event: React.WheelEvent) {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 20) return;
    event.preventDefault();
    const now = Date.now();
    if (now - lastWheelAt.current < 900) return;
    lastWheelAt.current = now;
    if (event.deltaX > 0) goNext();
    else goPrevious();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") goNext();
    if (event.key === "ArrowLeft") goPrevious();
  }

  return {
    activeIndex,
    goTo,
    setIsPaused,
    interactionProps: { onTouchStart, onTouchEnd, onWheel, onKeyDown },
  };
}
