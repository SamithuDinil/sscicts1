"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { Gamepad2, Brain, Palette, Type, Video, Globe, Sparkles, PenTool } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import type { Arena } from "@/lib/data";

const finePointer = () => window.matchMedia("(pointer: fine)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ArenaIcon({ icon, className }: { icon: Arena["icon"]; className?: string }) {
  const map = {
    gamepad: Gamepad2,
    brain: Brain,
    palette: Palette,
    type: Type,
    video: Video,
    web: Globe,
    sparkles: Sparkles,
    pen: PenTool,
  };
  const Icon = map[icon];
  return <Icon className={className} aria-hidden="true" />;
}

export function Heading({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let split: SplitText | undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
      });
    });
    return () => {
      cancelled = true;
      split?.revert();
    };
  }, []);

  return (
    <Tag ref={ref} className={`font-display font-bold tracking-tight ${className}`}>
      {children}
    </Tag>
  );
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}

export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      ry(px * max * 2);
      rx(-py * max * 2);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Wipe({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
      if (inner) {
        gsap.fromTo(
          inner,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const state = { v: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: value,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = `${Math.round(state.v)}${suffix}`;
          },
        }),
    });
    return () => trigger.kill();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "clip-hud inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display text-base font-semibold transition-colors duration-300 disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-visor text-void hover:bg-bone"
      : "border border-line bg-panel/60 text-bone hover:border-visor hover:text-visor backdrop-blur";
  const cls = `${base} ${styles} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
