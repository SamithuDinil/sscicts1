"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={bar}
      className="fixed top-0 left-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-emerald via-cobalt to-visor"
      aria-hidden="true"
    />
  );
}
