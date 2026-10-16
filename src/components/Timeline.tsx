"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { timeline } from "@/lib/data";
import { Heading } from "./ui";

export default function Timeline() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-tl-item]", {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={section} className="relative py-24 lg:py-32">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-visor/5 blur-[100px]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 font-display text-sm font-semibold tracking-widest text-visor uppercase">
            Roadmap
          </p>
          <Heading className="text-4xl sm:text-5xl lg:text-6xl">
            <span className="glitch" data-text="Timeline to Cypher ’27">
              Timeline to Cypher ’27
            </span>
          </Heading>
          <p className="mx-auto mt-4 max-w-2xl text-mute">
            All competition registrations happen on this website · November 30 – December 11
          </p>
        </div>

        <ol className="relative space-y-0 border-l border-line/80 pl-8 sm:pl-10">
          {timeline.map((item) => (
            <li key={item.date + item.title} data-tl-item className="relative pb-10 last:pb-0 group">
              <span
                className="absolute -left-[1.4rem] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-visor bg-panel transition-all duration-400 group-hover:scale-125 group-hover:shadow-[0_0_16px_rgba(255,159,28,0.5)] sm:-left-[1.65rem]"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-visor" />
              </span>
              <p className="font-display text-sm font-semibold text-visor tracking-wide">{item.date}</p>
              <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-bone sm:text-2xl transition-colors duration-300 group-hover:text-visor">
                {item.title}
              </h3>
              <p className="mt-1 text-mute">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
