"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./Providers";
import Countdown from "./Countdown";
import { Button, Magnetic } from "./ui";

export default function Hero() {
  const { ready, openRegister } = useApp();
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
        tl.from("[data-line]", { yPercent: 118, duration: 1.2, stagger: 0.12 }, 0.1)
          .from("[data-avatar]", { yPercent: 14, opacity: 0, scale: 1.07, duration: 1.8, ease: "power3.out" }, 0.05)
          .from("[data-ring]", { scale: 0.55, opacity: 0, rotation: -70, duration: 2, ease: "power3.out" }, 0.1)
          .from("[data-fade]", { y: 26, opacity: 0, duration: 1, stagger: 0.1 }, 0.7)
          .from("[data-callout]", { opacity: 0, x: -14, duration: 0.8, stagger: 0.15 }, 1.3);
        timeline.current = tl;

        gsap.to("[data-parallax-avatar]", {
          yPercent: 9,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-parallax-text]", {
          yPercent: -14,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom 20%", scrub: true },
        });
      }

      if (fine && !reduced) {
        const ax = gsap.quickTo("[data-mouse-avatar]", "x", { duration: 1, ease: "power3" });
        const ay = gsap.quickTo("[data-mouse-avatar]", "y", { duration: 1, ease: "power3" });
        const rx = gsap.quickTo("[data-mouse-ring]", "x", { duration: 1.3, ease: "power3" });
        const ry = gsap.quickTo("[data-mouse-ring]", "y", { duration: 1.3, ease: "power3" });
        const move = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          ax(nx * -26);
          ay(ny * -16);
          rx(nx * 34);
          ry(ny * 22);
        };
        el.addEventListener("pointermove", move);
        return () => el.removeEventListener("pointermove", move);
      }
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (ready) timeline.current?.play();
  }, [ready]);

  return (
    <section ref={root} id="top" className="relative min-h-svh overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="pointer-events-none absolute top-[6%] right-[4%] h-[50vw] max-h-[680px] w-[50vw] max-w-[680px] rounded-full bg-visor/12 blur-[130px] animate-soft-pulse" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[-10%] h-[44vw] max-h-[560px] w-[44vw] max-w-[560px] rounded-full bg-cyber/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-[40%] left-[20%] h-40 w-40 rounded-full bg-cobalt/8 blur-[80px]" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[52%]" aria-hidden="true">
        <div data-parallax-avatar className="absolute inset-0">
          <div data-mouse-ring className="absolute right-[-14%] bottom-[6%] aspect-square w-[90vw] sm:right-[-4%] sm:w-[68vh] lg:right-[0%] lg:w-[72vh]">
            <svg data-ring viewBox="0 0 400 400" className="h-full w-full animate-[spin-slow_70s_linear_infinite]">
              <circle cx="200" cy="200" r="196" fill="none" stroke="#22d3ee" strokeOpacity="0.22" strokeWidth="1" />
              <circle cx="200" cy="200" r="168" fill="none" stroke="#ff9f1c" strokeOpacity="0.55" strokeWidth="1.4" strokeDasharray="3 9" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="50 18" />
              <circle cx="200" cy="200" r="110" fill="none" stroke="#34d399" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="8 14" />
              <path d="M200 4 v14 M200 382 v14 M4 200 h14 M382 200 h14" stroke="#ff9f1c" strokeWidth="2.2" />
            </svg>
          </div>
          <div data-mouse-avatar className="absolute inset-0">
            <div data-avatar className="absolute right-[-8%] bottom-0 h-[72svh] sm:right-[4%] lg:right-[8%] lg:h-[92svh]">
              <div className="relative h-full animate-avatar-enter">
                <Image
                  src="/images/avatar.webp"
                  alt="Rinzler — Cypher ’27 avatar"
                  width={358}
                  height={933}
                  priority
                  sizes="(min-width: 1024px) 38vh, 28vh"
                  className="h-full w-auto max-w-none object-contain object-bottom opacity-60 sm:opacity-90 drop-shadow-[0_0_50px_rgba(255,159,28,0.45)] lg:opacity-100 animate-rim-light"
                />
                <span className="absolute top-[5%] left-[50%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-[visor-pulse_2.6s_ease-in-out_infinite] rounded-full bg-visor blur-xl" />
                <div
                  className="absolute inset-0"
                  style={{
                    maskImage: "url(/images/avatar.webp)",
                    WebkitMaskImage: "url(/images/avatar.webp)",
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-[12%] animate-[scan_4.5s_linear_infinite] bg-gradient-to-b from-transparent via-visor/50 to-transparent" style={{ animationName: "scan-full" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[18%] right-[46%] hidden lg:block" data-callout>
          <div className="border-l border-visor pl-3">
            <p className="font-display text-sm font-semibold text-visor">Rinzler online</p>
            <p className="text-sm text-mute">8 competitions live</p>
          </div>
        </div>
        <div className="absolute bottom-[26%] left-[2%] hidden lg:block" data-callout>
          <div className="border-l border-cobalt pl-3">
            <p className="font-display text-sm font-semibold text-cobalt">Next up</p>
            <p className="text-sm text-mute">Cypher ’27 · Feb 2027</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-7xl items-center px-6">
        <div data-parallax-text className="z-10 max-w-3xl pt-28 pb-24">
          <p data-fade className="mb-6 font-display text-base font-medium text-armor sm:text-lg">
            Sri Sumangala College ICT Society · Cypher ’27
          </p>
          <h1 className="font-display text-[clamp(3.4rem,10.5vw,9rem)] leading-[0.92] font-bold tracking-tighter">
            <span className="line-mask"><span data-line>Choose</span></span>
            <span className="line-mask"><span data-line>your arena.</span></span>
          </h1>
          <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
            Inter-school &amp; Intra-school competitions — Video Editing, Web Design, Graphic Design, Minecraft, Word Ads &amp; AI Ads. Register on this site.
          </p>
          <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button onClick={() => openRegister()}>Register for a competition</Button>
            </Magnetic>
            <Magnetic>
              <Button href="#arenas" variant="ghost">See the arenas</Button>
            </Magnetic>
          </div>
          <div data-fade className="mt-12">
            <Countdown />
          </div>
        </div>
      </div>

      <a
        href="#arenas"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-sm text-mute transition-colors hover:text-visor lg:flex"
        aria-label="Scroll to competitions"
      >
        Scroll
        <ArrowDown size={16} className="animate-[float_1.8s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
