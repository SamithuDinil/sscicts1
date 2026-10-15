"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { gallery } from "@/lib/data";
import { useApp } from "./Providers";
import { Heading, Wipe } from "./ui";

const layout = [
  "md:col-span-7",
  "md:col-span-5 md:mt-28",
  "md:col-span-5 md:mt-10",
  "md:col-span-7 md:mt-16",
];
const speeds = [-40, 70, -20, 50];

export default function Gallery() {
  const { lock } = useApp();
  const grid = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: Number(item.dataset.speed) },
          {
            y: -Number(item.dataset.speed),
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (index === null) return;
    const unlock = lock();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex((value) => (value === null ? value : (value + 1) % gallery.length));
      if (event.key === "ArrowLeft") setIndex((value) => (value === null ? value : (value - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [index, lock]);

  const shift = (step: number) =>
    setIndex((value) => (value === null ? value : (value + step + gallery.length) % gallery.length));

  return (
    <section id="gallery" className="overflow-hidden bg-deep px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <Heading className="text-5xl sm:text-7xl">From our events</Heading>
        <div ref={grid} className="mt-16 grid gap-6 md:grid-cols-12 md:pb-24">
          {gallery.map((photo, i) => (
            <div key={photo.src} data-speed={speeds[i]} className={layout[i]}>
              <button
                onClick={() => setIndex(i)}
                className="group block w-full text-left"
                aria-label={`Open photo: ${photo.alt}`}
                data-cursor
              >
                <Wipe className="relative overflow-hidden" >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </Wipe>
              </button>
            </div>
          ))}
        </div>
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-void/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setIndex(null)}
        >
          <button
            className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-line text-bone hover:border-visor hover:text-visor"
            onClick={() => setIndex(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <button
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-line text-bone hover:border-visor hover:text-visor"
            onClick={(event) => {
              event.stopPropagation();
              shift(-1);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-line text-bone hover:border-visor hover:text-visor sm:right-24"
            onClick={(event) => {
              event.stopPropagation();
              shift(1);
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
          <Image
            src={gallery[index].src}
            alt={gallery[index].alt}
            width={gallery[index].w}
            height={gallery[index].h}
            sizes="90vw"
            className="max-h-[86svh] w-auto max-w-[88vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
