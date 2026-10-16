"use client";

import { Check, Copy, Mail, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "./data";
import { SplitText } from "./motion";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [messageText, setMessageText] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch { /* ignore */ }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !messageText) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessageText("");
      setSenderEmail("");
    }, 3000);
  };

  return (
    <section id="contact" className="bg-[#FBFBF9] px-6 py-24 text-stone-900 border-t border-stone-200 sm:px-12 lg:px-16 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Get In Touch
        </div>

        <SplitText
          text="Let's work {{together}}."
          className="text-4xl font-light tracking-tight text-stone-950 sm:text-6xl lg:text-7xl"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 lg:col-span-5">
            <p className="text-lg text-stone-600 leading-relaxed">
              Have an issue that needs fixing or interested in hiring me for an IT role? Send a message or reach out directly.
            </p>

            <div className="space-y-3 pt-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 font-medium text-stone-900 shadow-xs hover:border-stone-950"
              >
                <Mail size={18} className="text-blue-600" />
                <span>{profile.email}</span>
              </a>

              <button
                onClick={copyEmail}
                className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white p-4 text-sm font-medium text-stone-700 shadow-xs hover:border-stone-950"
              >
                <span>{copiedEmail ? "Email copied!" : "Copy email address"}</span>
                {copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-stone-200 bg-white p-8 shadow-xs">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none focus:border-stone-950 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 px-6 py-4 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                {submitted ? "Message Sent!" : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-24 border-t border-stone-200 pt-8 text-xs text-stone-500 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>© {currentYear} {profile.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-stone-950">
                {s.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}