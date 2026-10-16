"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import ScrollProgress from "./ScrollProgress";
import RegisterModal from "./RegisterModal";

type Theme = "dark" | "light";

type AppContext = {
  ready: boolean;
  theme: Theme;
  toggleTheme: () => void;
  openRegister: (arenaId?: string) => void;
  scrollTo: (target: string | number) => void;
  lock: () => () => void;
};

const Ctx = createContext<AppContext | null>(null);

export function useApp() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useApp must be used inside Providers");
  return value;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem("sscicts-theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [lockCount, setLockCount] = useState(0);
  const [register, setRegister] = useState<{ open: boolean; arenaId?: string }>({ open: false });
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    try {
      localStorage.setItem("sscicts-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const locked = !ready || lockCount > 0 || register.open;

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [locked]);

  const lock = useCallback(() => {
    setLockCount((count) => count + 1);
    return () => setLockCount((count) => Math.max(0, count - 1));
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as number, { duration: 1.6 });
      return;
    }
    if (typeof target === "number") window.scrollTo({ top: target });
    else document.querySelector(target)?.scrollIntoView();
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  const openRegister = useCallback((arenaId?: string) => setRegister({ open: true, arenaId }), []);

  const value = useMemo(
    () => ({ ready, theme, toggleTheme, openRegister, scrollTo, lock }),
    [ready, theme, toggleTheme, openRegister, scrollTo, lock],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <ScrollProgress />
      <Cursor />
      <RegisterModal
        open={register.open}
        arenaId={register.arenaId}
        onClose={() => setRegister((state) => ({ ...state, open: false }))}
      />
      {!ready && <Preloader onDone={onReady} />}
    </Ctx.Provider>
  );
}
