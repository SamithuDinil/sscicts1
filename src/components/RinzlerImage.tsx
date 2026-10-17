"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";

type Art = { src: string; width: number; height: number };

export default function RinzlerImage({
  art,
  alt,
  sizes,
  priority,
  className,
  style,
  children,
  renderMask,
}: {
  art: Art;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  renderMask?: (src: string) => ReactNode;
}) {
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");

  if (state === "missing") return null;

  return (
    <>
      <Image
        src={art.src}
        alt={alt}
        width={art.width}
        height={art.height}
        sizes={sizes}
        quality={100}
        priority={priority}
        onLoad={() => setState("ok")}
        onError={() => setState("missing")}
        className={className}
        style={style}
      />
      {state === "ok" && children}
      {state === "ok" && renderMask?.(art.src)}
    </>
  );
}
