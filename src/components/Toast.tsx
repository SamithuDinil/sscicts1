"use client";

import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }: { message: string | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[95] flex justify-center px-4" role="status" aria-live="polite">
      {message && (
        <div className="glass flex items-center gap-2.5 rounded-full px-5 py-3 text-bone shadow-xl animate-palette-in">
          <CheckCircle2 size={18} className="text-emerald" aria-hidden="true" />
          {message}
        </div>
      )}
    </div>
  );
}
