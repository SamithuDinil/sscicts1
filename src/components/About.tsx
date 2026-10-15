"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { mission, stats } from "@/lib/data";
import { Counter, Heading } from "./ui";

const statement =
  "A student-driven community building ICT skills, innovation and leadership to shape the digital future.";

export default function About() {
  const text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = text.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative px-6 py-32 sm:py-44">
      <div className="mx-auto max-w-7xl">
        <Heading className="text-2xl text-armor sm:text-3xl">About the society</Heading>
        <p ref={text} className="mt-8 max-w-5xl font-display text-[clamp(2rem,5vw,4.4rem)] leading-[1.08] font-semibold tracking-tight">
          {statement.split(" ").map((word, index) => (
            <span key={index} data-word className="inline-block pr-[0.28em]">
              {word}
            </span>
          ))}
        </p>

        <dl className="mt-24 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`border-b border-line py-10 pr-6 ${index % 2 === 1 ? "pl-6 sm:pl-8" : ""} ${
                index > 0 ? "lg:border-l lg:pl-8" : ""
              } ${index === 1 ? "border-l lg:border-l" : ""} ${index === 3 ? "border-l" : ""}`}
            >
              <dd className="font-display text-6xl font-bold tracking-tighter text-bone sm:text-7xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-lg text-mute">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-24 grid gap-14 lg:grid-cols-12">
          <Heading className="text-4xl sm:text-5xl lg:col-span-5">Our mission</Heading>
          <ul className="lg:col-span-7">
            {mission.map((item) => (
              <li key={item} className="group flex items-start gap-5 border-b border-line py-6 first:pt-0">
                <span className="mt-2.5 h-3 w-3 shrink-0 rotate-45 bg-visor transition-transform duration-500 group-hover:rotate-[225deg]" />
                <span className="text-xl leading-relaxed text-bone sm:text-2xl">{item}</span>
              </li>
            ))}
            <li className="grid gap-6 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl font-semibold text-emerald">Innovation</h3>
                <p className="mt-2 text-mute">Pushing boundaries with creative tech solutions.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-cobalt">Community</h3>
                <p className="mt-2 text-mute">A network of future tech leaders.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
