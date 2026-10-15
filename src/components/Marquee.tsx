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
      onUpdate: (self) => skew(gsap.utils.clamp(-12, 12, self.getVelocity() / -260)),
    });
    return () => trigger.kill();
  }, []);

  const items = [...arenas, ...arenas];

  return (
    <div className="relative overflow-hidden border-y border-line bg-deep py-6" aria-hidden="true">
      <div ref={track} className="flex w-max">
        <div className="flex animate-[marquee_38s_linear_infinite] items-center">
          {[...items, ...items].map((arena, index) => (
            <div key={index} className="flex items-center">
              <span className="px-8 font-display text-3xl font-semibold whitespace-nowrap text-bone/90 sm:text-5xl">
                {arena.name}
              </span>
              <span className="h-3 w-3 rotate-45" style={{ background: arena.color }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
