"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "./data";

export function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
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
      <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4 font-sans">
        <nav className="flex items-center gap-3 rounded-full border border-stone-200 bg-white/90 p-2 pl-6 shadow-sm backdrop-blur-md">
          {/* Brand Name */}
          <a href="#top" className="text-sm font-semibold tracking-tight text-stone-950">
            {profile.name}
          </a>

          <span className="hidden h-4 w-px bg-stone-200 md:block" />

          {/* Simple Navigation Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative block rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                    active === l.id
                      ? "bg-stone-100 text-stone-950 font-semibold"
                      : "text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="hidden rounded-full bg-stone-950 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600 md:block"
          >
            Contact
          </a>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full bg-stone-100 text-stone-900 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-[#FBFBF9]/98 px-8 font-sans backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="text-3xl font-light text-stone-950 hover:text-blue-600"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}