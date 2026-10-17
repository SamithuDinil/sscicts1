"use client";

import { CalendarPlus, Share2 } from "lucide-react";
import { downloadCalendar, shareSite } from "@/lib/event";
import { useApp } from "./Providers";

export default function EventActions() {
  const { notify } = useApp();

  const share = async () => {
    const result = await shareSite();
    if (result === "copied") notify("Link copied to clipboard");
    if (result === "failed") notify("Could not share the link");
  };

  const style =
    "glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-bone transition-colors hover:text-visor";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => {
          downloadCalendar();
          notify("Calendar file downloaded");
        }}
        className={style}
      >
        <CalendarPlus size={16} aria-hidden="true" />
        Add to calendar
      </button>
      <button onClick={share} className={style}>
        <Share2 size={16} aria-hidden="true" />
        Share
      </button>
    </div>
  );
}
