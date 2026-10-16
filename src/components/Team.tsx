"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { team } from "@/lib/data";
import { Heading, Tilt } from "./ui";

const accents = ["#ff9f1c", "#38bdf8", "#34d399", "#e879f9"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default function Team() {
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-member]", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="relative px-6 py-32 sm:py-40">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-3 font-display text-sm font-semibold tracking-widest text-visor uppercase">
          Leadership
        </p>
        <Heading className="text-5xl sm:text-7xl">
          <span className="glitch" data-text="The committee">
            The committee
          </span>
        </Heading>
        <p className="mt-5 max-w-xl text-xl text-mute">The students behind every competition.</p>

        <ul ref={grid} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <li key={member.name} data-member>
              <Tilt className="h-full" max={11}>
                <div
                  className="cyber-card clip-hud group relative h-full border border-line bg-panel/70 p-8 backdrop-blur-sm"
                  style={{ ["--c" as string]: accents[index] }}
                >
                  <span className="tilt-glare" />
                  <div
                    className="clip-hud relative z-[2] grid h-24 w-24 place-items-center font-display text-4xl font-bold text-void shadow-[0_0_24px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-105"
                    style={{ background: accents[index] }}
                  >
                    {initials(member.name)}
                  </div>
                  <h3
                    className="relative z-[2] mt-8 font-display text-2xl font-bold tracking-tight glitch"
                    data-text={member.name}
                  >
                    {member.name}
                  </h3>
                  <p className="relative z-[2] mt-1 text-lg text-mute">{member.role}</p>
                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: accents[index], boxShadow: `0 0 12px ${accents[index]}` }}
                  />
                </div>
              </Tilt>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
