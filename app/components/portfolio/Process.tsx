"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Cpu,
  HardDrive,
  RefreshCw,
  ShieldCheck,
  Terminal,
  Wrench,
} from "lucide-react";
import { useRef, useState } from "react";
import { steps } from "./data";
import { SplitText } from "./motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Process() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <section id="process" className="relative overflow-hidden bg-[#F4F4F0] px-6 py-32 text-stone-900 sm:px-12 lg:px-16 border-t border-stone-300">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-500">
          <Wrench size={14} className="text-blue-600" />
          <span>( How Systems Get Fixed )</span>
        </div>

        <div className="mb-20">
          <SplitText
            text="Five steps to {{fixed}} for good."
            className="max-w-5xl font-light tracking-tight text-stone-950 text-5xl sm:text-7xl lg:text-8xl"
          />
          <p className="mt-6 max-w-2xl font-sans text-lg text-stone-600">
            From root-cause diagnostic audits to zero-downtime maintenance, here is the structured methodology used to secure and stabilize IT infrastructure.
          </p>
        </div>

        <div className="relative mt-12 space-y-6">
          {steps.map((s, i) => (
            <StepCard
              key={s.title}
              s={s}
              i={i}
              isExpanded={expandedStep === i}
              onToggle={() => setExpandedStep(expandedStep === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  s,
  i,
  isExpanded,
  onToggle,
}: {
  s: (typeof steps)[number];
  i: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const itDeliverables = [
    { label: "Audit & Recon", cmd: "nmap -sV -T4 gateway.local", icon: Terminal },
    { label: "Root Cause Isolation", cmd: "systemctl status --failed", icon: AlertCircle },
    { label: "Remediation & Patching", cmd: "sysctl -w net.ipv4.conf.all=1", icon: ShieldCheck },
    { label: "Automation Setup", cmd: "crontab -e && rsync -avz /data", icon: HardDrive },
    { label: "SLA Monitoring", cmd: "ping -i 60 -c 100 1.1.1.1", icon: RefreshCw },
  ];

  const currentIT = itDeliverables[i % itDeliverables.length];
  const IconComponent = currentIT.icon;

  return (
    <div ref={ref} className="sticky mb-6 last:mb-0" style={{ top: `${5 + i * 1.5}rem`, zIndex: i + 1 }}>
      <motion.div
        style={{ scale }}
        className={`origin-top rounded-3xl border transition-all duration-300 ${
          isExpanded
            ? "border-blue-600 bg-white shadow-xl"
            : "border-stone-300 bg-white/80 hover:border-stone-400 hover:bg-white"
        } p-6 sm:p-10`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold tracking-wider text-blue-600">
                PHASE_0{i + 1}
              </span>
              <button
                onClick={onToggle}
                className="lg:hidden flex items-center gap-1 text-xs font-mono text-stone-500 hover:text-stone-900"
              >
                {isExpanded ? "Collapse" : "View Details"}
                <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
            </div>

            <h3 className="mt-3 font-sans text-3xl font-light tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
              {s.title}
            </h3>

            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-stone-600 sm:text-lg">
              {s.text}
            </p>
          </div>

          <div className="lg:w-96 flex flex-col justify-between">
            <button
              onClick={onToggle}
              className="hidden lg:flex items-center justify-end gap-2 text-xs font-mono text-stone-500 hover:text-stone-900 transition-colors"
            >
              <span>{isExpanded ? "Hide IT Metrics" : "Expand IT Deliverables"}</span>
              <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 p-3 font-mono text-xs text-stone-800">
              <IconComponent size={15} className="text-blue-600" />
              <span className="truncate">{currentIT.cmd}</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mt-8 border-t border-stone-200 pt-6 font-mono text-xs"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-center gap-2 font-mono text-stone-500">
                    <CheckCircle2 size={13} className="text-emerald-600" /> SLA Response
                  </div>
                  <p className="mt-2 font-sans text-sm font-semibold text-stone-900">&lt; 30 Minute Intervention</p>
                  <p className="mt-1 text-stone-500">Immediate incident containment.</p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-center gap-2 font-mono text-stone-500">
                    <ShieldCheck size={13} className="text-blue-600" /> Key Output
                  </div>
                  <p className="mt-2 font-sans text-sm font-semibold text-stone-900">Zero-Downtime Patch</p>
                  <p className="mt-1 text-stone-500">Full audit log & rollback plan.</p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-center gap-2 font-mono text-stone-500">
                    <Cpu size={13} className="text-purple-600" /> Hardware Verification
                  </div>
                  <p className="mt-2 font-sans text-sm font-semibold text-stone-900">Stress Test Passed</p>
                  <p className="mt-1 text-stone-500">Redundant fallback verified.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}