"use client";

import type { ComponentType } from "react";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, Sun, Moon, Instagram, Facebook, Youtube } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { contact, nav } from "@/lib/data";
import { useApp } from "./Providers";
import { Magnetic } from "./ui";

function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  whatsapp: WhatsAppIcon,
};

export default function Navbar() {
  const { ready, theme, toggleTheme, openRegister, lock } = useApp();
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
                  className="clip-hud bg-visor px-5 py-2.5 font-display text-sm font-semibold text-void transition-colors hover:bg-bone"
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
              className="clip-hud bg-visor px-7 py-3.5 font-display text-lg font-semibold text-void"
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
                  const Icon = socialIcons[social.icon] ?? Instagram;
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
