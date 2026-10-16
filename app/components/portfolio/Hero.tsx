"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Globe2 } from "lucide-react";
import { profile } from "./data";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[90vh] flex-col justify-between bg-[#FBFBF9] px-6 pb-16 pt-32 text-stone-900 sm:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-5xl flex-1 flex-col justify-center">
        
        {/* Simple Availability Badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Available for IT roles & contracts</span>
        </div>

        {/* Big, Clean Headline */}
        <h1 className="font-sans text-5xl font-light tracking-tight text-stone-950 sm:text-7xl lg:text-8xl leading-[1.08]">
          Calm, reliable <br />
          <span className="font-serif italic text-blue-600">IT support</span> for your business.
        </h1>

        <p className="mt-8 max-w-2xl font-sans text-lg text-stone-600 sm:text-xl leading-relaxed">
          Hi, I&apos;m <span className="font-semibold text-stone-900">{profile.name}</span>. I solve technical issues, keep systems running smoothly, and make tech easy for everyone on your team.
        </p>

        {/* Clear Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-stone-950 px-8 py-4 font-sans text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors"
          >
            Get in touch <ArrowUpRight size={16} />
          </a>

          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-8 py-4 font-sans text-sm font-medium text-stone-800 hover:border-stone-950 transition-colors"
          >
            See services
          </a>
        </div>

        {/* Key Highlights Banner */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-stone-200 pt-8 font-sans text-sm text-stone-600">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>Fast response times</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>Networks, devices & cloud</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Globe2 size={18} className="text-blue-600 shrink-0" />
            <span>Based in Abuja, NG</span>
          </div>
        </div>

      </div>
    </section>
  );
}