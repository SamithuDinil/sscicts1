"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STEPS = [
  "INITIALIZING GRID",
  "DECRYPTING IDENTITY DISC",
  "SYNCING RINZLER PROTOCOLS",
  "MAPPING ARENAS",
  "OPENING PORTAL",
  "CYPHER '27 ONLINE",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = { v: 0 };

    const ctx = gsap.context(() => {
      if (reduced) {
        const tl = gsap.timeline();
        tl.to(counter, {
          v: 100,
          duration: 0.12,
          onUpdate: () => {
            if (count.current) count.current.textContent = "100";
          },
        });
        tl.add(() => onDone());
        tl.set(root.current, { display: "none" });
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-particle]").forEach((el, i) => {
        gsap.to(el, {
          y: gsap.utils.random(-36, 36),
          x: gsap.utils.random(-28, 28),
          opacity: gsap.utils.random(0.25, 0.95),
          duration: gsap.utils.random(2.2, 4.2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.07,
        });
      });

      gsap.to("[data-core-pulse]", {
        scale: 1.2,
        opacity: 1,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-pre-logo]", { scale: 0.35, opacity: 0, duration: 1.1, ease: "back.out(1.7)" }, 0);
      tl.from("[data-pre-rings]", { scale: 0.5, opacity: 0, duration: 1.3, ease: "power4.out" }, 0.1);
      tl.from("[data-pre-title]", { y: 36, opacity: 0, duration: 0.85 }, 0.45);
      tl.from("[data-pre-sub]", { opacity: 0, duration: 0.5 }, 0.65);
      tl.from("[data-pre-status]", { opacity: 0, duration: 0.45 }, 0.75);
      tl.from("[data-pre-count]", { opacity: 0, y: 14, duration: 0.5 }, 0.8);
      tl.from("[data-pre-bar-track]", { scaleX: 0, duration: 0.55 }, 0.9);

      tl.to(
        counter,
        {
          v: 100,
          duration: 3.6,
          ease: "power1.inOut",
          onUpdate: () => {
            const value = Math.round(counter.v);
            if (count.current) count.current.textContent = String(value).padStart(3, "0");
            const step = Math.min(STEPS.length - 1, Math.floor(value / (100 / STEPS.length)));
            if (status.current) status.current.textContent = STEPS[step];
            if (value > 86 && title.current) title.current.classList.add("pre-glitch");
          },
        },
        1.05,
      );

      tl.fromTo(
        "[data-pre-bar]",
        { scaleX: 0 },
        { scaleX: 1, duration: 3.6, ease: "power1.inOut" },
        1.05,
      );

      // Energy surge
      tl.to("[data-pre-flash]", { opacity: 0.85, duration: 0.1, ease: "none" }, "+=0.2");
      tl.to("[data-pre-flash]", { opacity: 0, duration: 0.35 }, "+=0.04");

      tl.to(
        "[data-pre-content]",
        {
          scale: 1.12,
          opacity: 0,
          filter: "blur(16px)",
          duration: 0.6,
          ease: "power2.in",
        },
        "-=0.15",
      );

      tl.to(
        root.current,
        {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1.15,
          ease: "power4.inOut",
        },
        "-=0.3",
      );

      tl.add(() => onDone(), "-=0.4");
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  const dots = Array.from({ length: 32 }, (_, i) => {
    const angle = (i / 32) * Math.PI * 2;
    const r = 36 + (i % 6) * 7;
    return {
      left: `${50 + Math.cos(angle) * r * 0.4}%`,
      top: `${50 + Math.sin(angle) * r * 0.4}%`,
      size: 2 + (i % 3),
    };
  });

  return (
    <div
      id="preloader"
      ref={root}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-void"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-visor/[0.08] blur-[110px]" />
      <div className="pointer-events-none absolute top-[25%] right-[12%] h-[42vmin] w-[42vmin] rounded-full bg-cyber/[0.07] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-[18%] left-[8%] h-[38vmin] w-[38vmin] rounded-full bg-magenta/[0.06] blur-[80px]" />

      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

      <div className="pointer-events-none absolute inset-0">
        {dots.map((d, i) => (
          <span
            key={i}
            data-particle
            className="absolute rounded-full bg-visor"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              opacity: 0.4,
              boxShadow: "0 0 10px rgba(255,159,28,0.7)",
            }}
          />
        ))}
      </div>

      <div data-pre-flash className="pointer-events-none absolute inset-0 bg-bone opacity-0" />

      <div data-pre-content className="relative z-10 flex w-[min(400px,90vw)] flex-col items-center">
        {/* Disc */}
        <div data-pre-logo className="relative mb-10 h-[min(240px,52vw)] w-[min(240px,52vw)]">
          <div data-pre-rings className="absolute inset-0">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="rgba(34,211,238,0.3)"
                strokeWidth="1"
                strokeDasharray="3 10"
                className="origin-center animate-[spin-slow_22s_linear_infinite]"
                style={{ transformOrigin: "100px 100px" }}
              />
              <circle
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="rgba(255,159,28,0.75)"
                strokeWidth="1.6"
                strokeDasharray="2 7"
                className="origin-center animate-[spin-slow_14s_linear_infinite]"
                style={{ transformOrigin: "100px 100px", animationDirection: "reverse" }}
              />
              <circle
                cx="100"
                cy="100"
                r="58"
                fill="none"
                stroke="rgba(56,189,248,0.45)"
                strokeWidth="1"
                strokeDasharray="48 14"
                className="origin-center animate-[spin-slow_9s_linear_infinite]"
                style={{ transformOrigin: "100px 100px" }}
              />
              <circle
                data-core-pulse
                cx="100"
                cy="100"
                r="24"
                fill="rgba(255,159,28,0.12)"
                stroke="#ff9f1c"
                strokeWidth="2"
                style={{ transformOrigin: "100px 100px" }}
              />
              <circle cx="100" cy="100" r="7" fill="#ff9f1c" />
              <path d="M100 10 v12 M100 178 v12 M10 100 h12 M178 100 h12" stroke="#ff9f1c" strokeWidth="2.2" />
            </svg>
          </div>
          <span className="pre-orbit-node" aria-hidden />
        </div>

        <h2
          ref={title}
          data-pre-title
          className="font-display text-3xl font-bold tracking-[0.22em] text-bone sm:text-5xl"
        >
          CYPHER&nbsp;&rsquo;27
        </h2>
        <p data-pre-sub className="mt-2 font-display text-[11px] tracking-[0.4em] text-mute uppercase">
          SSCICTS · GRID ACCESS
        </p>

        <div className="mt-12 flex w-full items-end justify-between gap-4">
          <p
            ref={status}
            data-pre-status
            className="max-w-[55%] font-display text-[11px] leading-snug tracking-widest text-visor sm:text-sm"
          >
            {STEPS[0]}
          </p>
          <span
            ref={count}
            data-pre-count
            className="font-display text-5xl font-bold tabular-nums tracking-tighter text-bone sm:text-6xl"
          >
            000
          </span>
        </div>

        <div
          data-pre-bar-track
          className="mt-5 h-[3px] w-full origin-left overflow-hidden rounded-full bg-line/70"
        >
          <div
            data-pre-bar
            className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-visor via-cyber to-visor shadow-[0_0_14px_rgba(255,159,28,0.65)]"
          />
        </div>

        <p className="mt-7 font-display text-[10px] tracking-[0.35em] text-mute/60 uppercase">
          Stand by for portal entry
        </p>
      </div>
    </div>
  );
}
