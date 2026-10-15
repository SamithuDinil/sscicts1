"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ringEl = ring.current;
    const dotEl = dot.current;
    if (!ringEl || !dotEl) return;

    const rx = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(dotEl, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(dotEl, "y", { duration: 0.08, ease: "none" });

    const move = (event: PointerEvent) => {
      rx(event.clientX);
      ry(event.clientY);
      dx(event.clientX);
      dy(event.clientY);
    };
    const over = (event: PointerEvent) => {
      const hit = (event.target as HTMLElement).closest("a, button, input, textarea, select, [data-cursor]");
      ringEl.classList.toggle("is-hover", Boolean(hit));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
