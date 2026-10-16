"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  Globe2,
  HardDrive,
  RefreshCw,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { marquee, profile, rotating } from "./data";
import { Magnetic } from "./motion";

export function Hero() {
  const [rotIndex, setRotIndex] = useState(0);
  const [localTime, setLocalTime] = useState("");
  const [ticketResolved, setTicketResolved] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setRotIndex((prev) => (prev + 1) % rotating.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between bg-[#F4F4F0] px-0 pt-24 text-stone-900 font-mono">
      {/* Structural Telemetry Rail */}
      <div className="w-full border-y border-stone-300 bg-white/70 px-6 py-3 backdrop-blur-md sm:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-semibold text-stone-900">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              SYS_STATUS: ONLINE
            </span>
            <span className="hidden sm:inline text-stone-400">|</span>
            <span className="hidden sm:inline text-stone-600">
              GATEWAY: <span className="text-blue-600">192.168.1.1 (14ms)</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-stone-600">
            <span className="flex items-center gap-1.5">
              <Globe2 size={13} /> CANADA, Ontario
            </span>
            <span className="text-stone-400">|</span>
            <span className="flex items-center gap-1.5 font-bold text-stone-900">
              <Clock size={13} /> {localTime || "12:00 PM"} WAT
            </span>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Blueprint Workspace */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-12">
        <div className="grid grid-cols-1 border-l border-stone-300 lg:grid-cols-12">
          
          {/* Left Main Spine */}
          <div className="border-b border-r border-stone-300 p-6 sm:p-10 lg:col-span-8 lg:border-b-0">
            <div className="mb-6 inline-flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1">
              <Terminal size={12} /> IT SUPPORT & SYSTEMS ENGINEERING
            </div>

            <h1 className="font-sans text-5xl font-light tracking-tight text-stone-950 sm:text-7xl lg:text-8xl">
              IT support <br />
              <span className="font-mono text-stone-400">that&apos;s</span>{" "}
              <button
                onClick={() => setRotIndex((prev) => (prev + 1) % rotating.length)}
                className="inline-block text-left font-serif italic text-blue-600 underline decoration-blue-300 underline-offset-8"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotating[rotIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {rotating[rotIndex]}.
                  </motion.span>
                </AnimatePresence>
              </button>
            </h1>

            <p className="mt-8 max-w-xl font-sans text-lg text-stone-700 sm:text-xl leading-relaxed">
              Hi, I&apos;m <span className="font-semibold text-stone-950">{profile.name}</span>. I keep systems online, manage infrastructure, and resolve technical challenges before they affect operations.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-stone-950 px-8 py-4 font-mono text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  INITIALIZE_CONTACT <ArrowUpRight size={15} />
                </a>
              </Magnetic>

              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-stone-300 bg-white px-6 py-4 font-mono text-xs font-semibold text-stone-800 hover:border-stone-950 transition-colors"
              >
                VIEW_CAPABILITIES <ArrowDownRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Blueprint Ledger */}
          <div className="flex flex-col justify-between border-r border-b border-stone-300 lg:col-span-4 lg:border-b-0">
            <div className="border-b border-stone-300 p-6">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>INCIDENT_LOG</span>
                <button
                  onClick={() => setTicketResolved(!ticketResolved)}
                  className="hover:text-stone-900 transition-colors"
                >
                  <RefreshCw size={13} />
                </button>
              </div>

              <p className="mt-3 font-sans text-sm font-medium text-stone-900">
                Printer won&apos;t connect to office Wi-Fi
              </p>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span
                  className={`px-2.5 py-1 font-semibold ${
                    ticketResolved
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {ticketResolved ? "STATUS: RESOLVED" : "STATUS: DIAGNOSING"}
                </span>
                <span className="text-stone-500">0.4m SLA</span>
              </div>
            </div>

            <div className="p-6 space-y-3 text-xs text-stone-700">
              <span className="text-stone-400">HARDWARE & SECURITY:</span>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-blue-600" /> Security Standard</span>
                  <span className="font-semibold text-stone-900">Sec+ Certified</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <span className="flex items-center gap-1.5"><Cpu size={13} className="text-purple-600" /> Infrastructure</span>
                  <span className="font-semibold text-stone-900">SysAdmin / AWS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><HardDrive size={13} className="text-emerald-600" /> Network SLA</span>
                  <span className="font-semibold text-emerald-700">99.98% Operational</span>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-300 bg-stone-200/50 p-6 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>ALL LOCAL & CLOUD NODES OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="w-full border-t border-stone-300 bg-white py-4 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-xs text-stone-500">
          {[...marquee, ...marquee, ...marquee].map((item, idx) => (
            <span key={idx} className="flex items-center gap-8 font-mono uppercase tracking-widest">
              {item} <span className="text-blue-600">///</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}