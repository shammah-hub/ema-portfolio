"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { faqs } from "./data";
import { SplitText } from "./motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#FBFBF9] px-6 py-24 text-stone-900 border-t border-stone-200 sm:px-12 lg:px-16 font-sans">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Frequently Asked Questions
        </div>

        <SplitText
          text="Got {{questions}}? Answers here."
          className="text-4xl font-light tracking-tight text-stone-950 sm:text-6xl"
        />

        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;

            return (
              <div
                key={f.q}
                className="rounded-3xl border border-stone-200 bg-white transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left sm:p-8"
                >
                  <h3 className="text-lg font-medium text-stone-950 sm:text-xl">{f.q}</h3>
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-600">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-stone-100 px-6 pb-8 pt-4 sm:px-8 text-sm leading-relaxed text-stone-600 sm:text-base">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}