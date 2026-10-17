"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { InstagramIcon, socialIcons } from "./SocialIcons";
import { contact, nav } from "@/lib/data";
import { useApp } from "./Providers";
import { Magnetic } from "./ui";

export default function Navbar() {
  const { ready, theme, toggleTheme, openRegister, openPalette, lock } = useApp();
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
        setHidden(self.direction === 1 && self.scroll() > 320 && !open);
      },
    });
    return () => trigger.kill();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const unlock = lock();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-menu-item]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "power4.out", delay: 0.12 },
      );
      gsap.fromTo(
        "[data-menu-social]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.45, ease: "power3.out" },
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
        } ${solid || open ? "border-b border-line/60 bg-void/80 backdrop-blur-xl" : "border-b border-transparent"} ${
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
                <a
                  href={item.href}
                  className="group relative py-2 text-[15px] text-mute transition-colors hover:text-bone"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-visor transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openPalette}
              className="glass hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm text-mute transition-colors hover:text-bone md:flex"
              aria-label="Open command palette"
            >
              <Search size={15} aria-hidden="true" />
              <span>Search</span>
              <kbd className="rounded border border-line px-1.5 text-[11px]">Ctrl K</kbd>
            </button>
            <button
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-bone transition-all duration-300 hover:border-visor hover:text-visor hover:shadow-[0_0_16px_rgba(255,159,28,0.25)]"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="hidden sm:block">
              <Magnetic strength={0.2}>
                <button
                  onClick={() => openRegister()}
                  className="rounded-full bg-visor px-5 py-2.5 font-display text-sm font-semibold text-void transition-colors hover:bg-bone"
                >
                  Register now
                </button>
              </Magnetic>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="relative grid h-11 w-11 place-items-center rounded-full border border-line text-bone transition-all duration-300 hover:border-visor hover:text-visor lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative h-5 w-5">
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        ref={menu}
        className={`fixed inset-0 z-40 flex flex-col bg-void/97 backdrop-blur-2xl transition-all duration-400 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-1 flex-col justify-center px-8 pt-24 pb-10">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  data-menu-item
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-display text-4xl font-bold tracking-tight text-bone transition-colors hover:text-visor sm:text-5xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3 overflow-hidden">
            <button
              data-menu-item
              onClick={() => {
                setOpen(false);
                openRegister();
              }}
              className="rounded-full bg-visor px-7 py-3.5 font-display text-lg font-semibold text-void"
            >
              Register now
            </button>
            <button
              data-menu-item
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-full border border-line px-5 py-3 font-display text-sm font-semibold text-bone transition-colors hover:border-visor hover:text-visor"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          {/* Social links */}
          {contact.socials.length > 0 && (
            <div data-menu-social className="mt-12 border-t border-line/60 pt-8">
              <p className="mb-4 font-display text-xs font-semibold tracking-widest text-mute uppercase">
                Follow us
              </p>
              <ul className="flex flex-wrap gap-3">
                {contact.socials.map((social) => {
                  const Icon = socialIcons[social.icon] ?? InstagramIcon;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-12 w-12 place-items-center rounded-full border border-line text-bone transition-all duration-300 hover:border-visor hover:text-visor hover:shadow-[0_0_18px_rgba(255,159,28,0.3)]"
                        aria-label={social.label}
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
