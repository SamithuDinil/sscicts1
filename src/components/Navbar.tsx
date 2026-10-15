"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { nav } from "@/lib/data";
import { useApp } from "./Providers";
import { Magnetic } from "./ui";

export default function Navbar() {
  const { ready, openRegister, lock } = useApp();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setSolid(self.scroll() > 40);
        setHidden(self.direction === 1 && self.scroll() > 320);
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!open) return;
    const unlock = lock();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-menu-item]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "power4.out", delay: 0.15 },
      );
    }, menu);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lock]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "border-b border-line/60 bg-void/70 backdrop-blur-xl" : "border-b border-transparent"} ${
          ready ? "" : "opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3" aria-label="Main">
          <a href="#top" className="flex items-center gap-3" aria-label="SSCICTS home">
            <Image src="/logo.png" alt="" width={40} height={40} />
            <span className="font-display text-xl font-bold tracking-tight">
              SSC<span className="text-visor">ICTS</span>
            </span>
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group relative py-2 text-[15px] text-mute transition-colors hover:text-bone">
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-visor transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Magnetic strength={0.2}>
                <button
                  onClick={() => openRegister()}
                  className="clip-hud bg-visor px-5 py-2.5 font-display text-sm font-semibold text-void transition-colors hover:bg-bone"
                >
                  Register now
                </button>
              </Magnetic>
            </div>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div ref={menu} className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-2xl lg:hidden">
          <ul className="flex flex-col gap-2">
            {nav.map((item) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  data-menu-item
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-display text-5xl font-bold tracking-tight text-bone hover:text-visor"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 overflow-hidden">
            <button
              data-menu-item
              onClick={() => {
                setOpen(false);
                openRegister();
              }}
              className="clip-hud bg-visor px-7 py-3.5 font-display text-lg font-semibold text-void"
            >
              Register now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
