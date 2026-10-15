"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = ["Booting Rinzler systems", "Syncing arenas", "Opening registration", "Cypher ’27 ready"];
    const counter = { v: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(counter, {
        v: 100,
        duration: reduced ? 0.2 : 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          const value = Math.round(counter.v);
          if (count.current) count.current.textContent = String(value).padStart(3, "0");
          if (bar.current) bar.current.style.transform = `scaleX(${value / 100})`;
          if (status.current) status.current.textContent = steps[Math.min(3, Math.floor(value / 26))];
        },
      });
      tl.to("[data-pre-content]", { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" }, "+=0.15");
      tl.add(() => onDone(), "-=0.05");
      tl.to(root.current, { yPercent: -100, duration: reduced ? 0.01 : 0.9, ease: "power4.inOut" }, "<");
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      id="preloader"
      ref={root}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void"
      aria-hidden="true"
    >
      <div data-pre-content className="flex w-[min(320px,80vw)] flex-col items-center gap-6">
        <Image src="/logo.png" alt="" width={96} height={96} priority className="animate-[float_2.4s_ease-in-out_infinite]" />
        <div className="flex w-full items-baseline justify-between font-display">
          <p ref={status} className="text-sm text-mute">Loading armor systems</p>
          <span ref={count} className="text-3xl font-semibold tabular-nums text-visor">000</span>
        </div>
        <div className="h-[2px] w-full bg-line">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-visor" />
        </div>
      </div>
    </div>
  );
}
