"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { HeroAvatar } from "./HeroAvatar";

const checks = ["Network & Wi-Fi", "Devices & printers", "Accounts & access", "Backups & updates"];

/** A "remote support session" window with Ema live inside, plus a playful demo health check. */
export function RemoteWindow({ className = "" }: { className?: string }) {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [step, setStep] = useState(0);
  const [waveKey, setWaveKey] = useState(0);

  useEffect(() => {
    if (phase !== "running") return;
    if (step >= checks.length) { setPhase("done"); setWaveKey((k) => k + 1); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [phase, step]);

  const start = () => { setStep(0); setPhase("running"); };
  const reset = () => { setStep(0); setPhase("idle"); };

  return (
    <div className={`overflow-hidden rounded-[1.8rem] border border-line-2 bg-paper shadow-[0_40px_90px_-40px_rgba(21,22,28,0.45)] ${className}`}>
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-p-rose" /><span className="h-3 w-3 rounded-full bg-p-butter" /><span className="h-3 w-3 rounded-full bg-p-mint" />
        </div>
        <p className="min-w-0 flex-1 truncate text-center font-mono text-xs text-ink-3">remote-session · Ema Tosin</p>
        <span className="flex items-center gap-1.5 rounded-full bg-p-mint px-2.5 py-1 text-[11px] font-semibold"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" /> Connected</span>
      </div>

      {/* stage */}
      <div className="relative bg-[radial-gradient(90%_70%_at_50%_0%,var(--p-lilac),transparent),linear-gradient(180deg,var(--p-blue),var(--paper))]">
        <div aria-hidden className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(21,22,28,0.14)_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        <HeroAvatar className="relative [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]" waveKey={waveKey} />

        <AnimatePresence>
          {phase !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 bottom-3 rounded-2xl border border-line bg-paper/90 p-4 shadow-[0_20px_50px_-24px_rgba(21,22,28,0.4)] backdrop-blur-md"
              role="status" aria-live="polite"
            >
              <p className="eyebrow mb-3">Demo health check</p>
              <ul className="space-y-2">
                {checks.map((c, i) => {
                  const state = i < step ? "ok" : i === step && phase === "running" ? "run" : "wait";
                  return (
                    <li key={c} className={`flex items-center justify-between text-sm transition-opacity ${state === "wait" ? "opacity-40" : ""}`}>
                      <span className="font-medium">{c}</span>
                      <span className="grid h-6 w-6 place-items-center rounded-full">
                        {state === "ok" && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid h-6 w-6 place-items-center rounded-full bg-p-mint"><Check size={14} /></motion.span>}
                        {state === "run" && <Loader2 size={16} className="animate-spin text-accent" />}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {phase === "done" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 border-t border-line pt-3 text-sm text-ink-2">
                  All clear. Nothing to fix here, but when something breaks, I&apos;m the one to call.
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* action bar */}
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
        <p className="text-sm text-ink-2">{phase === "idle" ? "Try a quick demo scan" : phase === "running" ? "Scanning…" : "Scan complete"}</p>
        {phase === "done" ? (
          <button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-p-blue px-4 py-2 text-sm font-semibold"><RotateCcw size={14} /> Run again</button>
        ) : (
          <button onClick={start} disabled={phase === "running"} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            <Play size={14} /> Run diagnostics
          </button>
        )}
      </div>
    </div>
  );
}
