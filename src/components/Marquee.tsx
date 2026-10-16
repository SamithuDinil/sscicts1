"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { arenas } from "@/lib/data";

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const skew = gsap.quickTo(track.current, "skewX", { duration: 0.5, ease: "power3" });
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => skew(gsap.utils.clamp(-10, 10, self.getVelocity() / -280)),
    });
    return () => trigger.kill();
  }, []);

  const items = [...arenas, ...arenas];

  return (
    <div className="relative overflow-hidden border-y border-line/80 bg-deep/90 py-5 backdrop-blur-sm" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-transparent to-void z-10" />
      <div ref={track} className="flex w-max">
        <div className="flex animate-[marquee_42s_linear_infinite] items-center">
          {[...items, ...items].map((arena, index) => (
            <div key={index} className="flex items-center">
              <span className="px-8 font-display text-2xl font-semibold whitespace-nowrap text-bone/85 sm:text-4xl tracking-tight">
                {arena.category === "inter" ? "INTER" : "INTRA"} · {arena.short}
              </span>
              <span
                className="h-2.5 w-2.5 rotate-45 shadow-[0_0_10px_currentColor]"
                style={{ background: arena.color, color: arena.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
