"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  HardDrive,
  Lock,
  Network,
  ShieldCheck,
  Terminal,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { services } from "./data";
import { Reveal, SplitText, Tilt } from "./motion";

const serviceIcons: Record<string, any> = {
  "01": Network,
  "02": ShieldCheck,
  "03": HardDrive,
  "04": Cpu,
  "05": Lock,
  "06": Wrench,
};

export function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeHoveredService, setActiveHoveredService] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "infra", label: "Infrastructure & Networking" },
    { id: "security", label: "Security & Access" },
    { id: "support", label: "Ops & Desktop Support" },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-[#F4F4F0] px-6 py-32 text-stone-900 sm:px-12 lg:px-16 border-t border-stone-300">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-500">
          <Terminal size={14} className="text-blue-600" />
          <span>( Technical Capabilities )</span>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SplitText
            text="Whatever's broken, I'll {{fix}} it."
            className="max-w-4xl font-light tracking-tight text-stone-950 text-5xl sm:text-7xl lg:text-8xl"
          />

          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-stone-300 bg-white p-1.5 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 font-mono text-xs transition-all ${
                  activeCategory === cat.id
                    ? "bg-stone-950 text-white font-semibold"
                    : "text-stone-600 hover:text-stone-950"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const IconComponent = serviceIcons[s.n] || Wrench;
            const isHovered = activeHoveredService === s.n;

            return (
              <Reveal key={s.n} delay={(i % 3) * 0.07}>
                <div
                  onMouseEnter={() => setActiveHoveredService(s.n)}
                  onMouseLeave={() => setActiveHoveredService(null)}
                  className="h-full"
                >
                  <Tilt className="group relative flex h-full min-h-[24rem] flex-col justify-between rounded-3xl border border-stone-300 bg-white p-8 transition-all duration-300 hover:border-blue-600 hover:shadow-xl">
                    <div>
                      <div className="flex items-center justify-between border-b border-stone-200 pb-5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-300 bg-stone-100 text-blue-600">
                            <IconComponent size={18} />
                          </div>
                          <span className="font-mono text-xs font-semibold text-stone-500">{s.n}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-800">
                            <CheckCircle2 size={11} /> READY
                          </span>
                          <span className="grid h-8 w-8 place-items-center rounded-full border border-stone-300 bg-stone-100 text-stone-600 transition-transform duration-300 group-hover:rotate-45 group-hover:border-blue-600 group-hover:text-blue-600">
                            <ArrowUpRight size={15} />
                          </span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-sans text-2xl font-light tracking-tight text-stone-950 sm:text-3xl">
                          {s.title}
                        </h3>
                        <p className="mt-3 font-sans text-sm leading-relaxed text-stone-600">
                          {s.text}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-4">
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 rounded-xl border border-blue-200 bg-blue-50/80 p-3 font-mono text-xs text-blue-900"
                          >
                            <div className="flex items-center justify-between text-[11px] font-semibold">
                              <span>DIAGNOSTIC_MODE</span>
                              <span className="text-blue-700">100% HEALTH</span>
                            </div>
                            <p className="mt-1 text-[11px] text-emerald-700 font-medium">
                              &gt; Automated SLA monitoring & active failover.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <ul className="flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="rounded-lg border border-stone-200 bg-stone-100 px-3 py-1 font-mono text-xs font-semibold text-stone-700"
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Tilt>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}