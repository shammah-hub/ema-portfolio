"use client";

import { Building2, Calendar } from "lucide-react";
import { experience } from "./data";
import { Reveal, SplitText } from "./motion";

export function Experience() {
  return (
    <section id="experience" className="bg-[#FBFBF9] px-6 py-24 text-stone-900 border-t border-stone-200 sm:px-12 lg:px-16 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Work History
        </div>

        <SplitText
          text="Where I've delivered {{results}}."
          className="max-w-3xl text-4xl font-light tracking-tight text-stone-950 sm:text-6xl"
        />

        <div className="mt-16 space-y-6">
          {experience.map((e, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-normal text-stone-950">{e.role}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-stone-600">
                      <Building2 size={15} className="text-stone-400" /> {e.org}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                    <Calendar size={14} /> {e.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}