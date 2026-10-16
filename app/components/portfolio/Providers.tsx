"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import { profile } from "./data";

/** Smooth scroll, preloader, scroll progress bar and custom cursor. */
export function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      e.preventDefault();
      if (el) lenis.scrollTo(el, { offset: -16 }); else lenis.scrollTo(0);
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener("click", onClick); };
  }, []);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1500); return () => clearTimeout(t); }, []);
  useEffect(() => { document.documentElement.style.overflow = loaded ? "" : "hidden"; }, [loaded]);

  return (
    <>
      <Preloader done={loaded} />
      <Progress />
      <Cursor />
      {children}
    </>
  );
}

function Preloader({ done }: { done: boolean }) {
  const [percent, setPercent] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const bootSteps = [
    "LOADING_KERNEL_MODULES",
    "CHECKING_NETWORK_GATEWAY",
    "VERIFYING_SEC+_POLICIES",
    "SYSTEM_READY",
  ];

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 12);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cycle through diagnostic steps based on completion percentage
    if (percent < 30) setCurrentStep(0);
    else if (percent < 60) setCurrentStep(1);
    else if (percent < 85) setCurrentStep(2);
    else setCurrentStep(3);
  }, [percent]);

  const nameText = (profile.name || "Ema Tosin").split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader-overlay"
          className="fixed inset-0 z-[100] flex flex-col justify-between font-mono text-stone-900 pointer-events-none"
        >
          {/* TOP SHUTTER (Slides UP on Exit) */}
          <motion.div
            className="relative flex flex-1 flex-col justify-end bg-[#F4F4F0] px-6 pb-6 sm:px-12"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Edge Blueprint Grid Pattern */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-60"
            />

            {/* Top Telemetry Header */}
            <div className="relative z-10 mb-auto pt-8 flex items-center justify-between text-xs text-stone-500 border-b border-stone-300 pb-4">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-ping" />
                <span>SYS_BOOT // V8.04</span>
              </div>
              <span>ABUJA_NG // UTC+1</span>
            </div>

            {/* Kinetic Letter-by-Letter Name Reveal */}
            <div className="relative z-10 overflow-hidden py-2">
              <div className="flex items-baseline overflow-hidden font-sans text-[clamp(2.8rem,9vw,7rem)] font-light tracking-tight text-stone-950">
                {nameText.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "120%", rotate: 6 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="text-blue-600 font-mono font-bold text-4xl sm:text-6xl"
                >
                  .
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM SHUTTER (Slides DOWN on Exit) */}
          <motion.div
            className="relative flex flex-1 flex-col justify-between bg-[#F4F4F0] px-6 pt-6 pb-10 sm:px-12"
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Edge Blueprint Grid Pattern */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-60"
            />

            {/* Live Boot Diagnostic Console */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 font-semibold text-blue-700"
                  >
                    <span>&gt;</span> {bootSteps[currentStep]}...
                  </motion.span>
                </AnimatePresence>

                <span className="font-bold text-stone-900">{percent}%</span>
              </div>

              {/* High-Precision Progress Bar Rail */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-300">
                <motion.div
                  className="h-full bg-blue-600"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Bottom Status Message */}
            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-stone-300 pt-4 text-xs text-stone-500">
              <span className="animate-pulse font-semibold text-stone-700">
                PLEASE WAIT // PREPARING WORKSPACE
              </span>
              <span>SLA: 99.98%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Progress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-accent" />;
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [on, setOn] = useState(false);
  const [big, setBig] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setBig(!!(e.target as HTMLElement).closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); document.documentElement.classList.remove("has-cursor"); };
  }, [x, y]);

  if (!on) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[95]">
      <motion.div
        animate={{ width: big ? 52 : 12, height: big ? 52 : 12, opacity: big ? 0.35 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
    </motion.div>
  );
}
