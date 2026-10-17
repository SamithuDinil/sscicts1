"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowRight, CalendarPlus, CornerDownLeft, Link2, Mail, Moon, Search, Sun, Ticket } from "lucide-react";
import { arenas, contact, faqs, nav } from "@/lib/data";
import { copyText, downloadCalendar, shareSite } from "@/lib/event";
import { useApp } from "./Providers";

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: ReactNode;
  run: () => void;
};

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { scrollTo, openRegister, toggleTheme, theme, notify } = useApp();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      onClose();
      setTimeout(() => scrollTo(href), 60);
    };
    return [
      ...nav.map((item) => ({
        id: `nav-${item.href}`,
        group: "Go to",
        label: item.label,
        icon: <ArrowRight size={16} />,
        run: go(item.href),
      })),
      { id: "nav-faq", group: "Go to", label: "FAQ", icon: <ArrowRight size={16} />, run: go("#faq") },
      ...arenas.map((arena) => ({
        id: `reg-${arena.id}`,
        group: "Register",
        label: `${arena.name}`,
        hint: arena.category === "inter" ? "Inter-school" : "Intra-school",
        icon: <Ticket size={16} style={{ color: arena.color }} />,
        run: () => {
          onClose();
          openRegister(arena.id);
        },
      })),
      {
        id: "calendar",
        group: "Actions",
        label: "Add Cypher ’27 to calendar",
        icon: <CalendarPlus size={16} />,
        run: () => {
          downloadCalendar();
          onClose();
          notify("Calendar file downloaded");
        },
      },
      {
        id: "share",
        group: "Actions",
        label: "Share this site",
        icon: <Link2 size={16} />,
        run: async () => {
          onClose();
          const result = await shareSite();
          if (result === "copied") notify("Link copied to clipboard");
          if (result === "failed") notify("Could not share the link");
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Copy contact email",
        hint: contact.email,
        icon: <Mail size={16} />,
        run: async () => {
          onClose();
          notify((await copyText(contact.email)) ? "Email copied to clipboard" : "Could not copy the email");
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
        run: () => {
          toggleTheme();
          onClose();
        },
      },
    ];
  }, [onClose, scrollTo, openRegister, toggleTheme, theme, notify]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setIndex(0);
    const id = requestAnimationFrame(() => input.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[index]?.run();
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-void/70 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="glass relative w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl animate-palette-in">
        <div className="flex items-center gap-3 border-b border-line/70 px-5 py-4">
          <Search size={18} className="text-mute" aria-hidden="true" />
          <input
            ref={input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sections, competitions, actions…"
            className="w-full bg-transparent text-lg text-bone outline-none placeholder:text-mute"
            aria-label="Search commands"
          />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-xs text-mute sm:block">Esc</kbd>
        </div>
        <ul ref={list} className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-4 py-10 text-center text-mute">No matches for “{query}”</li>}
          {results.map((command, i) => {
            const header = command.group !== lastGroup;
            lastGroup = command.group;
            return (
              <li key={command.id} role="presentation">
                {header && (
                  <p className="px-3 pt-3 pb-1.5 font-display text-xs font-semibold tracking-widest text-mute uppercase">{command.group}</p>
                )}
                <button
                  data-index={i}
                  role="option"
                  aria-selected={i === index}
                  onMouseMove={() => setIndex(i)}
                  onClick={command.run}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === index ? "bg-visor/15 text-bone" : "text-bone/80"
                  }`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line/70 bg-panel/70">{command.icon}</span>
                  <span className="flex-1 truncate">{command.label}</span>
                  {command.hint && <span className="truncate text-sm text-mute">{command.hint}</span>}
                  {i === index && <CornerDownLeft size={14} className="text-mute" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-line/70 px-5 py-2.5 text-xs text-mute">
          <span>{faqs.length > 0 ? "↑ ↓ to navigate · Enter to select" : ""}</span>
          <span>Ctrl/⌘ K</span>
        </div>
      </div>
    </div>
  );
}
