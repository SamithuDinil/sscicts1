"use client";

import { useEffect, useState } from "react";
import { EVENT_DATE } from "@/lib/data";

function parts(diff: number) {
  const total = Math.max(0, Math.floor(diff / 1000));
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

export default function Countdown() {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(EVENT_DATE).getTime();
    const tick = () => setDiff(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (diff === null) {
    return <div className="h-[58px]" aria-hidden="true" />;
  }

  if (diff <= 0) {
    return (
      <p className="font-display text-lg text-emerald" role="status">
        Gaming Zone is live
      </p>
    );
  }

  const t = parts(diff);
  const cells: [number, string][] = [
    [t.d, "days"],
    [t.h, "hours"],
    [t.m, "min"],
    [t.s, "sec"],
  ];

  return (
    <div className="flex items-center gap-4" role="timer" aria-label="Time until Gaming Zone">
      <p className="max-w-[7.5rem] text-sm leading-snug text-mute">Gaming Zone starts in</p>
      <div className="flex gap-2">
        {cells.map(([value, label]) => (
          <div key={label} className="glass min-w-[58px] rounded-2xl px-3 py-2 text-center">
            <div className="font-display text-2xl font-semibold tabular-nums text-bone">
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-[11px] text-mute">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
