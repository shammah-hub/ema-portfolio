"use client";

import { MapPin, Globe } from "lucide-react";
import Image from "next/image";
import { about, profile } from "./data";
import { Reveal, ScrollWords } from "./motion";

export function About() {
  return (
    <section id="about" className="bg-[#FBFBF9] px-6 py-24 text-stone-900 border-t border-stone-200 sm:px-12 lg:px-16 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
          About Me
        </div>

        <div className="mb-16">
          <ScrollWords
            text={about.statement}
            className="max-w-4xl text-3xl font-light tracking-tight text-stone-950 sm:text-5xl"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-xs">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-100">
                  {profile.photo ? (
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-7xl font-light text-stone-400">
                      {profile.first?.[0]}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">{profile.name}</h3>
                    <p className="text-xs text-stone-500">IT Specialist</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <MapPin size={14} /> Abuja, NG
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6 lg:col-span-7 text-base leading-relaxed text-stone-700 sm:text-lg">
            {about.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}