"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useApp } from "./Providers";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const { scrollTo, ready } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const visible = ready && progress > 0.08;

  return (
    <button
      onClick={() => scrollTo(0)}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`glass fixed right-5 bottom-5 z-50 grid h-12 w-12 place-items-center rounded-full text-bone transition-all duration-500 hover:text-visor sm:right-8 sm:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="var(--visor)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp size={18} />
    </button>
  );
}
