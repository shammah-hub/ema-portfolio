"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "./data";

export function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 font-mono">
        <nav className="flex items-center gap-3 rounded-2xl border border-stone-300 bg-white/90 p-2 pl-5 shadow-sm backdrop-blur-xl">
          {/* Brand / Terminal Prompt */}
          <a
            href="#top"
            className="flex items-center gap-2 text-xs font-bold text-stone-900 transition-colors hover:text-blue-600"
          >
            <Terminal size={14} className="text-blue-600" />
            <span>{profile.first.toLowerCase()}@sys</span>
            <span className="text-blue-600 font-bold">:~$</span>
          </a>

          <span className="hidden h-4 w-px bg-stone-200 md:block" />

          {/* Blueprint Navigation Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    active === l.id
                      ? "text-stone-950 font-bold"
                      : "text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill-light"
                      className="absolute inset-0 rounded-lg border border-stone-300 bg-stone-100"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <span className="hidden h-4 w-px bg-stone-200 md:block" />

          {/* Dispatch CTA Button */}
          <a
            href="#contact"
            className="hidden rounded-xl bg-stone-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 md:block"
          >
            DISPATCH_
          </a>

          {/* Mobile Menu Trigger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-xl border border-stone-300 bg-stone-100 text-stone-900 md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-[#F4F4F0]/98 px-8 font-mono backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="border-b border-stone-300 pb-4 text-xs text-stone-500">
              // SYSTEM_NAVIGATION_DIRECTORY
            </div>
            {navLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center justify-between text-2xl font-light text-stone-950 hover:text-blue-600"
              >
                <span>{l.label}</span>
                <span className="text-xs text-stone-400">0{i + 1}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}