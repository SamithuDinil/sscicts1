"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { boards, type Board } from "@/lib/data";
import { Heading, Tilt } from "./ui";

const accents = [
  "#ff9f1c",
  "#38bdf8",
  "#34d399",
  "#e879f9",
  "#f97316",
  "#22d3ee",
  "#a78bfa",
  "#4ade80",
  "#fb7185",
  "#60a5fa",
  "#fbbf24",
  "#2dd4bf",
];

function initials(name: string) {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Team() {
  const [activeId, setActiveId] = useState(boards.find((b) => b.current)?.id ?? boards[0].id);
  const grid = useRef<HTMLUListElement>(null);
  const active: Board = boards.find((b) => b.id === activeId) ?? boards[0];

  useEffect(() => {
    const el = grid.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-member]", {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power4.out",
      });
    }, el);
    return () => ctx.revert();
  }, [activeId]);

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
        <p className="mt-5 max-w-xl text-xl text-mute">
          Current board is shown by default. Switch years to see previous committees.
        </p>

        {/* Year tabs */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Committee year"
        >
          {boards.map((board) => {
            const isActive = board.id === activeId;
            return (
              <button
                key={board.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(board.id)}
                className={`clip-hud px-5 py-2.5 font-display text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-visor text-void shadow-[0_0_20px_rgba(255,159,28,0.35)]"
                    : "border border-line bg-panel/50 text-mute hover:border-visor hover:text-visor"
                }`}
              >
                {board.year}
                {board.current && (
                  <span className={`ml-2 text-[10px] tracking-wider uppercase ${isActive ? "text-void/70" : "text-visor"}`}>
                    Now
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-4 font-display text-sm text-mute">
          {active.year} · {active.label}
          <span className="text-bone/40"> · {active.members.length} members</span>
        </p>

        <ul
          ref={grid}
          key={activeId}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="tabpanel"
        >
          {active.members.map((member, index) => {
            const color = accents[index % accents.length];
            return (
              <li key={`${activeId}-${member.name}-${member.role}`} data-member>
                <Tilt className="h-full" max={10}>
                  <div className="cyber-card clip-hud group relative h-full border border-line bg-panel/70 p-6 backdrop-blur-sm sm:p-7">
                    <span className="tilt-glare" />
                    <div
                      className="clip-hud relative z-[2] grid h-16 w-16 place-items-center font-display text-2xl font-bold text-void shadow-[0_0_20px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-20 sm:text-3xl"
                      style={{ background: color }}
                    >
                      {initials(member.name)}
                    </div>
                    <h3
                      className="relative z-[2] mt-5 font-display text-lg font-bold tracking-tight sm:text-xl"
                    >
                      {member.name}
                    </h3>
                    <p className="relative z-[2] mt-1 text-sm font-medium sm:text-base" style={{ color }}>
                      {member.role}
                    </p>
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/-/g, "")}`}
                        className="relative z-[2] mt-2 block text-sm text-mute transition-colors hover:text-visor"
                      >
                        {member.phone}
                      </a>
                    )}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                    />
                  </div>
                </Tilt>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
