"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={section} className="relative py-24 lg:py-32">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 font-display text-sm font-semibold tracking-widest text-visor uppercase">
            Roadmap
          </p>
          <Heading className="text-4xl sm:text-5xl lg:text-6xl">Timeline to Cypher ’27</Heading>
          <p className="mx-auto mt-4 max-w-2xl text-mute">
            All competition registrations happen on this website · November 30 – December 11
          </p>
        </div>

        <ol className="relative space-y-0 border-l border-line pl-8 sm:pl-10">
          {timeline.map((item, i) => (
            <li
              key={item.date + item.title}
              data-tl-item
              className="relative pb-10 last:pb-0"
            >
              <span
                className="absolute -left-[1.4rem] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-visor bg-panel sm:-left-[1.65rem]"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-visor" />
              </span>
              <p className="font-display text-sm font-semibold text-visor">{item.date}</p>
              <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-bone sm:text-2xl">
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
