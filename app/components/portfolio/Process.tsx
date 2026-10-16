"use client";

import { motion } from "framer-motion";
import { steps } from "./data";
import { SplitText } from "./motion";

export function Process() {
  return (
    <section id="process" className="bg-[#FBFBF9] px-6 py-24 text-stone-900 border-t border-stone-200 sm:px-12 lg:px-16 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Working Together
        </div>

        <SplitText
          text="A simple approach to {{fixing}} problems."
          className="max-w-3xl text-4xl font-light tracking-tight text-stone-950 sm:text-6xl"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs">
              <span className="text-xs font-semibold text-blue-600">STEP 0{i + 1}</span>
              <h3 className="mt-4 text-2xl font-normal text-stone-950">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}