"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { arenas } from "@/lib/data";
import { useApp } from "./Providers";
import { ArenaIcon, Button, Heading, Magnetic, Tilt } from "./ui";

export default function Arenas() {
  const { openRegister, scrollTo } = useApp();
  const section = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const current = arenas[active];

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      let last = 0;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${arenas.length * 85}%`,
        pin: true,
        onUpdate: (self) => {
          const index = Math.min(arenas.length - 1, Math.floor(self.progress * arenas.length));
          if (index !== last) {
            last = index;
            setActive(index);
          }
          if (progress.current) progress.current.style.transform = `scaleY(${self.progress})`;
        },
      });
      trigger.current = st;
      gsap.to("[data-arena-avatar]", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: `+=${arenas.length * 85}%`, scrub: true },
      });
      return () => {
        st.kill();
        trigger.current = null;
      };
    });
    return () => mm.revert();
  }, []);

  const jump = (index: number) => {
    const st = trigger.current;
    if (!st) return;
    const span = st.end - st.start;
    scrollTo(st.start + ((index + 0.5) / arenas.length) * span);
  };

  const accent = { "--accent": current.color } as CSSProperties;

  return (
    <section id="arenas" ref={section} className="relative" style={accent}>
      <div className="hidden h-svh overflow-hidden lg:block motion-reduce:hidden">
        <div
          className="pointer-events-none absolute top-1/2 left-[22%] h-[60vw] max-h-[760px] w-[60vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px] transition-colors duration-700"
          style={{ background: current.color }}
        />
        <div className="grid-bg absolute inset-0 opacity-70" />

        <div className="relative mx-auto grid h-full max-w-7xl grid-cols-12 items-center gap-8 px-6">
          <div className="relative col-span-5 flex h-full items-end justify-center">
            <div data-arena-avatar className="relative mb-10 h-[80svh]">
              <Image
                key={current.id}
                src={
                  current.category === "inter"
                    ? current.id.includes("minecraft") || current.id.includes("video")
                      ? "/images/rinzler-run.png"
                      : "/images/rinzler-fight.png"
                    : "/images/rinzler-stand.png"
                }
                alt="Rinzler"
                width={572}
                height={933}
                sizes="40vh"
                className="h-full w-auto max-w-none object-contain object-bottom transition-all duration-700 ease-out animate-arena-in"
                style={{ filter: `drop-shadow(0 0 50px ${current.color}88) drop-shadow(0 0 4px ${current.color})` }}
              />
              <div className="absolute -top-2 -left-8 h-10 w-10 border-t-2 border-l-2 transition-colors duration-700" style={{ borderColor: current.color }} />
              <div className="absolute -right-8 -bottom-2 h-10 w-10 border-r-2 border-b-2 transition-colors duration-700" style={{ borderColor: current.color }} />
            </div>
          </div>

          <div className="col-span-7 flex items-center gap-10 pr-4">
            <div className="relative h-[220px] w-px shrink-0 bg-line">
              <div ref={progress} className="absolute inset-0 origin-top scale-y-0 bg-visor" />
            </div>

            <div className="min-w-0 flex-1">
              <div key={current.id} className="animate-arena-in">
                <div className="flex flex-wrap items-center gap-3 transition-colors duration-700" style={{ color: current.color }}>
                  <ArenaIcon icon={current.icon} className="h-6 w-6" />
                  <span className="rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wider" style={{ borderColor: `${current.color}88`, color: current.color }}>
                    {current.category === "inter" ? "Inter-school" : "Intra-school"}
                  </span>
                  <span className="font-display text-lg font-semibold">{current.status}</span>
                  {current.date && <span className="font-display text-lg text-mute">{current.date}</span>}
                </div>
                <h2
                  className="mt-4 font-display text-[clamp(2.8rem,5.6vw,5.6rem)] leading-[0.98] font-bold tracking-tighter glitch"
                  data-text={current.name}
                >
                  {current.name}
                </h2>
                <p className="mt-6 max-w-xl text-xl leading-relaxed text-mute">{current.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {current.details.map((detail) => (
                    <li
                      key={detail}
                      className="clip-hud border bg-panel/60 px-4 py-2 text-[15px] text-bone transition-colors duration-700"
                      style={{ borderColor: `${current.color}66` }}
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Magnetic>
                    <Button onClick={() => openRegister(current.id)}>Register for {current.short}</Button>
                  </Magnetic>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
                {arenas.map((arena, index) => (
                  <button
                    key={arena.id}
                    onClick={() => jump(index)}
                    className={`relative py-2 font-display text-lg font-semibold transition-colors duration-300 ${
                      index === active ? "text-bone" : "text-mute/70 hover:text-bone"
                    }`}
                    aria-current={index === active}
                  >
                    {arena.short}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left transition-transform duration-500 ${
                        index === active ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{ background: arena.color }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:hidden motion-reduce:block">
        <Heading className="text-5xl sm:text-6xl">
          <span className="glitch" data-text="Eight ways to compete">
            Eight ways to compete
          </span>
        </Heading>
        <p className="mt-5 max-w-xl text-lg text-mute">
          Inter-school &amp; Intra-school arenas. Pick the one that fits your skills, or enter more than one. All registrations via this site.
        </p>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {arenas.map((arena) => (
            <Tilt key={arena.id} max={9}>
              <li
                className="cyber-card clip-hud relative border border-line bg-panel/80 p-7 backdrop-blur-sm"
                style={{ boxShadow: `inset 3px 0 0 ${arena.color}` }}
              >
                <span className="tilt-glare" />
                <div className="relative z-[2] flex flex-wrap items-center gap-2" style={{ color: arena.color }}>
                  <ArenaIcon icon={arena.icon} className="h-5 w-5" />
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ borderColor: `${arena.color}88` }}
                  >
                    {arena.category === "inter" ? "Inter" : "Intra"}
                  </span>
                  <span className="font-display text-base font-semibold">{arena.status}</span>
                </div>
                <h3
                  className="relative z-[2] mt-3 font-display text-3xl font-bold tracking-tight glitch"
                  data-text={arena.name}
                >
                  {arena.name}
                </h3>
                <p className="relative z-[2] mt-3 leading-relaxed text-mute">{arena.blurb}</p>
                <div className="relative z-[2] mt-6">
                  <Button onClick={() => openRegister(arena.id)} variant="ghost">
                    Register for {arena.short}
                  </Button>
                </div>
              </li>
            </Tilt>
          ))}
        </ul>
      </div>
    </section>
  );
}
