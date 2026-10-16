"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Cpu,
  Globe2,
  MapPin,
  ShieldCheck,
  Terminal,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { about, profile } from "./data";
import { Reveal, ScrollWords } from "./motion";

export function About() {
  const [activeTab, setActiveTab] = useState<"bio" | "philosophy" | "sla">("bio");
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const tabs = [
    { id: "bio", label: "01. Background & Profile", icon: UserCheck },
    { id: "philosophy", label: "02. Systems Philosophy", icon: Cpu },
    { id: "sla", label: "03. Operating Standards", icon: ShieldCheck },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[#F4F4F0] px-6 py-32 text-stone-900 sm:px-12 lg:px-16 border-t border-stone-300">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 uppercase tracking-widest text-stone-500">
            <Terminal size={14} className="text-blue-600" />
            <span>( Systems Engineer Profile )</span>
          </div>

          <button
            onClick={() => setShowDiagnostics(!showDiagnostics)}
            className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3 py-1 text-stone-700 shadow-xs hover:border-stone-950 transition-colors"
          >
            <Activity size={13} className="text-emerald-600" />
            <span>{showDiagnostics ? "Hide Telemetry" : "Diagnostics Mode"}</span>
          </button>
        </div>

        <div className="mb-20">
          <ScrollWords
            text={about.statement}
            className="max-w-5xl font-light tracking-tight text-stone-950 text-3xl sm:text-5xl lg:text-6xl"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="group relative overflow-hidden rounded-3xl border border-stone-300 bg-white p-6 shadow-sm transition-all duration-300 hover:border-stone-950 hover:shadow-xl">
                <div className="relative aspect-[4/4] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                  {profile.photo ? (
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, 80vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-stone-200">
                      <span className="font-mono text-8xl font-light text-stone-700">
                        {profile.first?.[0] || "S"}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-stone-300 bg-white/90 px-3 py-1.5 font-mono text-xs font-semibold text-stone-800 shadow-sm backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                    </span>
                    <span>ACTIVE & OPERATIONAL</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3 font-mono">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <h3 className="font-sans text-xl font-semibold text-stone-950">{profile.name}</h3>
                    <span className="text-xs font-bold text-blue-600">ENGINEER</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-stone-400" />
                      <span>Abuja, Nigeria</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe2 size={13} className="text-stone-400" />
                      <span>UTC +1</span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {showDiagnostics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 border-t border-stone-200 pt-4 font-mono text-xs text-stone-600 space-y-2"
                    >
                      <div className="flex justify-between">
                        <span>SYS_MEMORY:</span>
                        <span className="text-emerald-700 font-semibold">OPTIMAL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SECURITY_FLAGS:</span>
                        <span className="text-blue-700 font-semibold">0 CRITICAL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PRIMARY_RAILS:</span>
                        <span className="text-stone-900 font-semibold">Cloud & Local IT</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-stone-300 bg-white p-1.5 shadow-xs font-mono">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs transition-all ${
                      isActive
                        ? "bg-stone-950 text-white font-semibold shadow-sm"
                        : "text-stone-600 hover:text-stone-950"
                    }`}
                  >
                    <TabIcon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-stone-300 bg-white p-8 shadow-xs"
              >
                {activeTab === "bio" && (
                  <div className="space-y-6 font-sans text-base leading-relaxed text-stone-700 sm:text-lg">
                    {about.paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}

                {activeTab === "philosophy" && (
                  <div className="space-y-6 font-mono text-xs sm:text-sm text-stone-800">
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                        <CheckCircle2 size={16} /> Predictable Reliability Over Quick Hacks
                      </div>
                      <p className="font-sans text-stone-600 leading-relaxed">
                        Every system or software pipeline is built with automated monitoring, redundancy, and zero-downtime failover in mind.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                        <ShieldCheck size={16} /> Security-First Architecture
                      </div>
                      <p className="font-sans text-stone-600 leading-relaxed">
                        Zero-Trust access policies, instant webhook JIT controls, and isolated environments ensure infrastructure stays protected.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "sla" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                      <span className="text-stone-500">FIRST-RESPONSE SLA</span>
                      <p className="mt-2 text-xl font-bold text-blue-700">&lt; 15 Minutes</p>
                      <p className="mt-1 text-stone-500">Rapid containment for urgent outages.</p>
                    </div>

                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                      <span className="text-stone-500">UPTIME TARGET</span>
                      <p className="mt-2 text-xl font-bold text-emerald-700">99.9% Operational</p>
                      <p className="mt-1 text-stone-500">Proactive health checks & load balancing.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-3 gap-4 font-mono text-xs text-stone-600">
              <div className="rounded-2xl border border-stone-300 bg-white p-4 text-center">
                <p className="text-2xl font-light font-sans text-stone-950">100%</p>
                <p className="mt-1 text-[11px] text-stone-500">Dedicated Focus</p>
              </div>

              <div className="rounded-2xl border border-stone-300 bg-white p-4 text-center">
                <p className="text-2xl font-light font-sans text-blue-700">&lt; 4s</p>
                <p className="mt-1 text-[11px] text-stone-500">JIT Webhook Speed</p>
              </div>

              <div className="rounded-2xl border border-stone-300 bg-white p-4 text-center">
                <p className="text-2xl font-light font-sans text-emerald-700">24/7</p>
                <p className="mt-1 text-[11px] text-stone-500">System Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}