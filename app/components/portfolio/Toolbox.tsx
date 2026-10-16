"use client";

import { toolbox } from "./data";
import { SplitText } from "./motion";

export function Toolbox() {
  return (
    <section id="toolbox" className="bg-[#FBFBF9] px-6 py-24 text-stone-900 border-t border-stone-200 sm:px-12 lg:px-16 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Tools & Hardware
        </div>

        <SplitText
          text="Technologies I work with {{daily}}."
          className="max-w-3xl text-4xl font-light tracking-tight text-stone-950 sm:text-6xl"
        />

        <div className="mt-12 flex flex-wrap gap-3">
          {toolbox.map((tool) => (
            <div
              key={tool}
              className="rounded-2xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-medium text-stone-800 shadow-xs"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}