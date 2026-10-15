"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { arenas } from "@/lib/data";
import { sendMail } from "@/lib/mail";

type Status = "idle" | "sending" | "sent" | "error";

export default function RegisterModal({
  open,
  arenaId,
  onClose,
}: {
  open: boolean;
  arenaId?: string;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState(arenas[0].id);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setSelected(arenaId ?? arenas[0].id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previous = document.activeElement as HTMLElement | null;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from("[data-backdrop]", { opacity: 0, duration: 0.3 });
      gsap.from(panel.current, { y: 60, opacity: 0, scale: 0.96, duration: 0.6, ease: "power4.out" });
    });
    const focusTimer = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("input")?.focus(), 80);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      ctx.revert();
      previous?.focus?.();
    };
  }, [open, arenaId, onClose]);

  if (!open) return null;

  const arena = arenas.find((item) => item.id === selected) ?? arenas[0];

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      await sendMail({
        name: String(data.get("name")),
        email: String(data.get("email")),
        message: [
          `Competition registration: ${arena.name}`,
          `Grade / class: ${data.get("grade")}`,
          `Notes: ${data.get("notes") || "None"}`,
        ].join("\n"),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border border-line bg-void/60 px-4 py-3.5 text-base text-bone placeholder:text-mute/60 focus:border-visor focus:outline-none";

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="register-title">
      <div data-backdrop className="absolute inset-0 bg-void/85 backdrop-blur-md" onClick={onClose} />
      <div
        ref={panel}
        data-lenis-prevent
        className="clip-hud relative max-h-[94svh] w-full max-w-xl overflow-y-auto border border-line bg-deep p-7 sm:p-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-line text-bone hover:border-visor hover:text-visor"
          aria-label="Close registration"
        >
          <X size={20} />
        </button>

        {status === "sent" ? (
          <div className="py-10 text-center" role="status">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald" />
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">You are registered</h2>
            <p className="mt-3 text-lg text-mute">
              We received your registration for {arena.name}. Check your inbox for confirmation.
            </p>
            <button
              onClick={onClose}
              className="clip-hud mt-8 bg-visor px-7 py-3 font-display font-semibold text-void hover:bg-bone"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-5">
            <div>
              <h2 id="register-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Register for a competition
              </h2>
              <p className="mt-2 text-mute">Fill in your details and pick your arena.</p>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm text-mute">Competition</legend>
              <div className="grid grid-cols-2 gap-2">
                {arenas.map((item) => (
                  <label
                    key={item.id}
                    className="cursor-pointer border px-4 py-3 text-center font-display text-[15px] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-visor"
                    style={
                      item.id === selected
                        ? { borderColor: item.color, color: item.color, background: `${item.color}1a` }
                        : { borderColor: "#1f3a33", color: "#8fa398" }
                    }
                  >
                    <input
                      type="radio"
                      name="competition"
                      value={item.id}
                      checked={item.id === selected}
                      onChange={() => setSelected(item.id)}
                      className="sr-only"
                    />
                    {item.short}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2 text-sm text-mute">
              Full name
              <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-mute">
                Email
                <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
              </label>
              <label className="grid gap-2 text-sm text-mute">
                Grade and class
                <input name="grade" required className={field} placeholder="Grade 10 B" />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-mute">
              Notes (optional)
              <textarea name="notes" rows={3} className={field} placeholder="Anything we should know?" />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="clip-hud bg-visor px-7 py-4 font-display text-lg font-semibold text-void transition-colors hover:bg-bone disabled:opacity-60"
            >
              {status === "sending" ? "Sending registration" : `Register for ${arena.short}`}
            </button>
            <p className="min-h-5 text-sm text-red-400" role="alert">
              {status === "error" ? "Registration failed. Check your connection and try again." : ""}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
