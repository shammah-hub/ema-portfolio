"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Minus,
  Plus,
  Search,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { faqs } from "./data";
import { Reveal, SplitText } from "./motion";

const faqMetadata: Record<number, { category: string; sla: string; priority: string }> = {
  0: { category: "Support & Response", sla: "< 15 Mins", priority: "HIGH" },
  1: { category: "Security & Infrastructure", sla: "Real-Time", priority: "CRITICAL" },
  2: { category: "Systems & Ops", sla: "< 1 Hour", priority: "NORMAL" },
  3: { category: "Billing & Contracts", sla: "Same-Day", priority: "STANDARD" },
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Support & Response", "Security & Infrastructure", "Systems & Ops"];

  const filteredFaqs = faqs.filter((f, i) => {
    const meta = faqMetadata[i] || { category: "Support & Response" };
    const matchesCategory = activeCategory === "All" || meta.category === activeCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative overflow-hidden bg-[#F4F4F0] px-6 py-32 text-stone-900 sm:px-12 lg:px-16 border-t border-stone-300">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="space-y-8 lg:col-span-5 lg:sticky lg:top-32 font-mono">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500">
                <HelpCircle size={14} className="text-blue-600" />
                <span>( Knowledge Base & Diagnostics )</span>
              </div>
              <SplitText
                text="Good {{questions}}."
                className="font-sans font-light tracking-tight text-stone-950 text-5xl sm:text-6xl lg:text-7xl"
              />
            </div>

            <p className="font-sans text-base text-stone-600 leading-relaxed sm:text-lg">
              Have questions about response SLAs, IT security protocols, or systems engineering contracts? Search or select a topic below.
            </p>

            <div className="relative flex items-center">
              <Search size={15} className="absolute left-4 text-stone-500" />
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white py-3.5 pl-11 pr-4 text-xs text-stone-900 placeholder-stone-500 outline-none shadow-xs focus:border-stone-950"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs transition-all ${
                    activeCategory === cat
                      ? "bg-stone-950 text-white font-semibold"
                      : "border border-stone-300 bg-white text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-stone-300 bg-white p-6 shadow-xs font-mono">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <Terminal size={14} /> Need Immediate IT Help?
              </div>
              <p className="mt-2 font-sans text-sm text-stone-600">
                Don't see your specific technical scenario answered here? Send a direct dispatch message.
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                <MessageSquare size={13} className="text-emerald-400" /> Submit Ticket
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-4 font-mono">
              {filteredFaqs.map((f, i) => {
                const isOpen = open === i;
                const meta = faqMetadata[i] || { category: "Support & Ops", sla: "< 30 Mins", priority: "NORMAL" };

                return (
                  <Reveal key={f.q} delay={i * 0.04}>
                    <li
                      className={`group rounded-3xl border transition-all duration-300 ${
                        isOpen
                          ? "border-blue-600 bg-white shadow-xl"
                          : "border-stone-300 bg-white/80 hover:border-stone-400 hover:bg-white"
                      }`}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-6 p-6 text-left sm:p-8"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                            <span className="font-bold text-blue-600">KB_ITEM_0{i + 1}</span>
                            <span>/</span>
                            <span>SLA: {meta.sla}</span>
                          </div>

                          <h3 className="font-sans text-xl font-light text-stone-950 sm:text-2xl lg:text-3xl">
                            {f.q}
                          </h3>
                        </div>

                        <div
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? "border-blue-600 bg-stone-950 text-white rotate-180"
                              : "border-stone-300 bg-stone-100 text-stone-600 group-hover:border-stone-950 group-hover:text-stone-950"
                          }`}
                        >
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-stone-200 px-6 pb-8 pt-6 sm:px-8">
                              <p className="max-w-xl font-sans text-sm leading-relaxed text-stone-700 sm:text-base">
                                {f.a}
                              </p>

                              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4 text-xs text-stone-500">
                                <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                                  <CheckCircle2 size={13} /> VERIFIED SOLUTION
                                </span>
                                <span>PRIORITY: {meta.priority}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}