"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  HardDrive,
  LayoutGrid,
  List,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { experience } from "./data";
import { Reveal, SplitText } from "./motion";

const roleTelemetry: Record<
  number,
  {
    type: string;
    metrics: { label: string; value: string; icon: any }[];
    achievements: string[];
    stack: string[];
  }
> = {
  0: {
    type: "Systems & Infrastructure",
    metrics: [
      { label: "Uptime SLA", value: "99.98%", icon: ShieldCheck },
      { label: "Tickets Resolved", value: "450+", icon: CheckCircle2 },
      { label: "Deployments", value: "Zero Downtime", icon: Cpu },
    ],
    achievements: [
      "Configured automated backup and disaster recovery policies.",
      "Optimized cross-department network infrastructure and active directory permissions.",
      "Reduced system diagnostic and resolution times by 40%.",
    ],
    stack: ["Linux", "AWS", "Docker", "Active Directory", "Bash", "Wireshark"],
  },
  1: {
    type: "Software & Mobile Systems",
    metrics: [
      { label: "JIT Latency", value: "< 4s Timeout", icon: Terminal },
      { label: "Security Isolation", value: "Burner Cards", icon: HardDrive },
      { label: "State Architecture", value: "BLoC / Stacked", icon: Cpu },
    ],
    achievements: [
      "Architected JIT card authorization infrastructure with real-time webhook rules.",
      "Engineered cross-platform mobile apps using Flutter and Firebase backend rails.",
      "Implemented automated merchant identification patterns and descriptor matching.",
    ],
    stack: ["Next.js", "Flutter", "Node.js", "Firebase", "PostgreSQL", "Tailwind"],
  },
  2: {
    type: "IT Support & Network Ops",
    metrics: [
      { label: "Response SLA", value: "< 15 Mins", icon: Clock },
      { label: "Hardware Assets", value: "100+ Managed", icon: Building2 },
      { label: "Security Audit", value: "Passed", icon: ShieldCheck },
    ],
    achievements: [
      "Provided tier-1 through tier-3 IT diagnostics and technical troubleshooting.",
      "Maintained network switches, VPN gateways, and secure office connectivity.",
      "Authored operational documentation and onboarding procedures for end-users.",
    ],
    stack: ["Network Routing", "Windows Server", "Hardware Repair", "MacOS", "VPNs"],
  },
};

export function Experience() {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <section id="experience" className="relative overflow-hidden bg-[#F4F4F0] px-6 py-32 text-stone-900 sm:px-12 lg:px-16 border-t border-stone-300">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-500">
            <Briefcase size={14} className="text-blue-600" />
            <span>( Career Operations & Track Record )</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 rounded-2xl border border-stone-300 bg-white p-1 shadow-xs">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1 font-mono text-xs transition-all ${
                viewMode === "list"
                  ? "bg-stone-950 text-white font-semibold"
                  : "text-stone-600 hover:text-stone-950"
              }`}
            >
              <List size={13} /> Timeline
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1 font-mono text-xs transition-all ${
                viewMode === "grid"
                  ? "bg-stone-950 text-white font-semibold"
                  : "text-stone-600 hover:text-stone-950"
              }`}
            >
              <LayoutGrid size={13} /> Matrix
            </button>
          </div>
        </div>

        <div className="mb-16">
          <SplitText
            text="Where I've been {{helping}}."
            className="max-w-5xl font-light tracking-tight text-stone-950 text-5xl sm:text-7xl lg:text-8xl"
          />
        </div>

        {viewMode === "list" ? (
          <div className="mt-12 space-y-4">
            {experience.map((e, i) => {
              const isSelected = activeRoleIndex === i;
              const telemetry = roleTelemetry[i] || roleTelemetry[0];

              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div
                    onClick={() => setActiveRoleIndex(isSelected ? null : i)}
                    className={`group cursor-pointer rounded-3xl border transition-all duration-300 ${
                      isSelected
                        ? "border-blue-600 bg-white shadow-xl"
                        : "border-stone-300 bg-white/80 hover:border-stone-400 hover:bg-white"
                    } p-6 sm:p-8`}
                  >
                    <div className="grid gap-4 sm:grid-cols-[1.2fr_1.5fr_auto] sm:items-center sm:gap-8">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600">EXP_0{i + 1}</span>
                          <span className="rounded-full border border-stone-200 bg-stone-100 px-2.5 py-0.5 font-mono text-[10px] text-stone-600">
                            {telemetry.type}
                          </span>
                        </div>
                        <h3 className="mt-2 font-sans text-2xl font-light text-stone-950 sm:text-3xl lg:text-4xl">
                          {e.role}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 font-sans text-sm font-medium text-stone-600">
                          <Building2 size={13} className="text-stone-400" /> {e.org}
                        </p>
                      </div>

                      <div>
                        <p className="font-sans text-sm leading-relaxed text-stone-600 sm:text-base">
                          {e.note}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                        <span className="flex items-center gap-1.5 font-mono text-xs text-stone-500">
                          <Calendar size={13} /> {e.period}
                        </span>
                        <div className="flex items-center gap-1 font-mono text-xs font-semibold text-blue-600 group-hover:text-blue-800">
                          <span>{isSelected ? "Close Log" : "View Telemetry"}</span>
                          <ChevronRight
                            size={14}
                            className={`transition-transform duration-300 ${isSelected ? "rotate-90" : "group-hover:translate-x-1"}`}
                          />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="mt-6 border-t border-stone-200 pt-6"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 font-mono text-xs">
                            {telemetry.metrics.map((m, idx) => {
                              const MetricIcon = m.icon;
                              return (
                                <div key={idx} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                                  <div className="flex items-center gap-2 text-stone-500">
                                    <MetricIcon size={13} className="text-blue-600" /> {m.label}
                                  </div>
                                  <p className="mt-2 text-xl font-semibold text-stone-950">{m.value}</p>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-6 font-mono text-xs">
                            <h4 className="uppercase tracking-wider text-stone-400 mb-3">Key Impact Deliverables</h4>
                            <ul className="space-y-2">
                              {telemetry.achievements.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-stone-700">
                                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-stone-200 font-mono text-xs">
                            <span className="text-stone-400">Infrastructure & Tools:</span>
                            {telemetry.stack.map((tech) => (
                              <span key={tech} className="rounded-lg border border-stone-200 bg-stone-100 px-2.5 py-1 font-semibold text-stone-800">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-mono">
            {experience.map((e, i) => (
              <div
                key={i}
                onClick={() => {
                  setViewMode("list");
                  setActiveRoleIndex(i);
                }}
                className="group cursor-pointer rounded-3xl border border-stone-300 bg-white p-6 shadow-sm transition-all duration-300 hover:border-stone-950 hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>EXP_0{i + 1}</span>
                  <span className="text-blue-600 font-semibold">{e.period}</span>
                </div>
                <h3 className="mt-4 font-sans text-2xl font-light text-stone-950">{e.role}</h3>
                <p className="mt-1 font-sans text-sm font-medium text-stone-600">{e.org}</p>
                <p className="mt-4 font-sans text-xs leading-relaxed text-stone-500">{e.note}</p>

                <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4 text-xs font-semibold text-blue-600">
                  <span>Inspect Log</span>
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}