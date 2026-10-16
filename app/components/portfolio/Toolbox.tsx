"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Cpu,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { useState } from "react";
import { toolbox } from "./data";
import { SplitText } from "./motion";

const toolMetadata: Record<string, { category: string; status: string; latency: string; desc: string }> = {
  Docker: { category: "Dev & Cloud", status: "CONTAINERIZED", latency: "2ms", desc: "Microservices isolation and automated environment deployment." },
  AWS: { category: "Infrastructure", status: "HEALTHY", latency: "14ms", desc: "Cloud server provisioning, S3 storage, and IAM security policies." },
  Linux: { category: "Infrastructure", status: "KERNEL ACTIVE", latency: "0ms", desc: "Server administration, bash scripting, and system hardening." },
  "Next.js": { category: "Dev & Cloud", status: "COMPILED", latency: "18ms", desc: "Full-stack React web architecture with server-side rendering." },
  Flutter: { category: "Dev & Cloud", status: "BUILT", latency: "60fps", desc: "Cross-platform mobile applications with BLoC & Stacked state management." },
  Wireshark: { category: "Security & Network", status: "PACKET CAPTURE", latency: "REAL-TIME", desc: "Deep packet inspection and network troubleshooting." },
  PostgreSQL: { category: "Dev & Cloud", status: "CONNECTED", latency: "4ms", desc: "Relational database management with Prisma ORM." },
  Tailwind: { category: "Dev & Cloud", status: "STYLED", latency: "0ms", desc: "Utility-first design systems and custom glassmorphism styling." },
};

export function Toolbox() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Infrastructure", "Dev & Cloud", "Security & Network"];

  const filteredTools = toolbox.filter((tool) => {
    const meta = toolMetadata[tool] || { category: "Dev & Cloud" };
    const matchesCategory = activeCategory === "All" || meta.category === activeCategory;
    const matchesSearch = tool.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="toolbox" className="relative overflow-hidden bg-[#F4F4F0] px-6 py-32 text-stone-900 sm:px-12 lg:px-16 border-t border-stone-300">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-500">
          <Terminal size={14} className="text-blue-600" />
          <span>( System Utilities & Technologies )</span>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SplitText
            text="What I use to {{get it done}}."
            className="max-w-4xl font-light tracking-tight text-stone-950 text-5xl sm:text-7xl lg:text-8xl"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex items-center">
              <Search size={14} className="absolute left-3.5 text-stone-500" />
              <input
                type="text"
                placeholder="grep tool_name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 rounded-2xl border border-stone-300 bg-white py-2 pl-9 pr-4 font-mono text-xs text-stone-900 placeholder-stone-500 outline-none shadow-xs focus:border-stone-950"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-stone-300 bg-white p-1.5 shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-3 py-1 font-mono text-xs transition-all ${
                    activeCategory === cat
                      ? "bg-stone-950 text-white font-semibold"
                      : "text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-16 flex flex-wrap gap-3 sm:gap-4">
          <AnimatePresence>
            {filteredTools.map((t, i) => {
              const meta = toolMetadata[t] || { category: "Dev & Cloud", status: "VERIFIED", latency: "5ms", desc: "Core production technology stack." };
              const isSelected = selectedTool === t;

              return (
                <motion.li
                  key={t}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ delay: (i % 8) * 0.03, type: "spring", stiffness: 240, damping: 20 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedTool(isSelected ? null : t)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border px-6 py-3.5 font-mono text-sm sm:text-base transition-all duration-300 ${
                    isSelected
                      ? "border-blue-600 bg-stone-950 text-white shadow-lg"
                      : "border-stone-300 bg-white text-stone-800 hover:border-stone-950 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-blue-400 animate-pulse" : "bg-stone-400 group-hover:bg-emerald-600"}`} />
                    <span>{t}</span>
                    <span className="ml-1 text-[10px] font-mono opacity-60">
                      [{meta.status}]
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {selectedTool && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mt-8 rounded-3xl border border-stone-950 bg-stone-950 p-6 text-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-700 bg-stone-900 text-blue-400">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xl font-medium text-white">{selectedTool}</h4>
                    <p className="font-mono text-xs text-stone-400">
                      Category: <span className="text-blue-400">{toolMetadata[selectedTool]?.category || "Dev & Systems"}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTool(null)}
                  className="rounded-full border border-stone-700 bg-stone-900 p-2 text-stone-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 font-mono text-xs">
                <div className="rounded-xl border border-stone-800 bg-stone-900 p-3.5">
                  <span className="text-stone-400">OPERATIONAL STATUS</span>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                    <CheckCircle2 size={13} /> {toolMetadata[selectedTool]?.status || "ACTIVE"}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-900 p-3.5">
                  <span className="text-stone-400">BENCHMARK LATENCY</span>
                  <p className="mt-1 text-sm font-semibold text-blue-400">
                    {toolMetadata[selectedTool]?.latency || "< 10ms"}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-900 p-3.5">
                  <span className="text-stone-400">USAGE SCOPE</span>
                  <p className="mt-1 text-sm font-semibold text-white">Production Systems</p>
                </div>
              </div>

              <p className="mt-4 font-mono text-xs leading-relaxed text-stone-300 border-t border-stone-800 pt-3">
                <span className="text-blue-400">&gt; EXEC_NOTE:</span> {toolMetadata[selectedTool]?.desc || "Integrated into core development, cloud infrastructure, and operational workflows."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}