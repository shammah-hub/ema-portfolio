"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, HardDrive, ShieldCheck, Wifi, Wrench } from "lucide-react";
import { services } from "./data";
import { Reveal, SplitText } from "./motion";

const serviceIcons: Record<string, any> = {
  "01": Wifi,
  "02": ShieldCheck,
  "03": HardDrive,
  "04": Wrench,
  "05": ShieldCheck,
  "06": Wrench,
};

export function Services() {
  return (
    <section id="services" className="bg-[#FBFBF9] px-6 py-24 text-stone-900 border-t border-stone-200 sm:px-12 lg:px-16 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Services & Expertise
        </div>

        <SplitText
          text="How I can help your {{business}}."
          className="max-w-3xl text-4xl font-light tracking-tight text-stone-950 sm:text-6xl"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const IconComponent = serviceIcons[s.n] || Wrench;

            return (
              <Reveal key={s.n} delay={(i % 3) * 0.07}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-stone-200 bg-white p-8 shadow-xs transition-all duration-300 hover:border-stone-900 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between border-b border-stone-100 pb-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-100 text-stone-900">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-xs font-semibold text-stone-400">0{i + 1}</span>
                    </div>

                    <h3 className="mt-6 text-2xl font-normal text-stone-950">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      {s.text}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-100">
                    <ul className="space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                          <Check size={14} className="text-emerald-600 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}