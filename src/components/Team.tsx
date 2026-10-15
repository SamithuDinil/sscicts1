"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { team } from "@/lib/data";
import { Heading, Tilt } from "./ui";

const accents = ["#ffa629", "#4da8ff", "#3ddc97", "#a78bfa"];

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
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <Heading className="text-5xl sm:text-7xl">The committee</Heading>
        <p className="mt-5 max-w-xl text-xl text-mute">The students behind every competition.</p>

        <ul ref={grid} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <li key={member.name} data-member>
              <Tilt className="h-full">
                <div className="clip-hud group relative h-full border border-line bg-panel/60 p-8 transition-colors duration-500 hover:border-[var(--c)]" style={{ "--c": accents[index] } as React.CSSProperties}>
                  <div
                    className="clip-hud grid h-24 w-24 place-items-center font-display text-4xl font-bold text-void"
                    style={{ background: accents[index] }}
                  >
                    {initials(member.name)}
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold tracking-tight">{member.name}</h3>
                  <p className="mt-1 text-lg text-mute">{member.role}</p>
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: accents[index] }}
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
