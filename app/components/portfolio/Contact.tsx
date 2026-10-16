"use client";

import { Check, Clock, Copy, Globe2, Mail, MessageSquare, Phone, Send, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "./data";
import { Magnetic, SplitText } from "./motion";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [currentYear, setCurrentYear] = useState<number>(2026);
  
  const [ticketPriority, setTicketPriority] = useState<"standard" | "urgent" | "contract">("standard");
  const [messageText, setMessageText] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Lagos",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch { /* ignore */ }
  };

  const copyPhone = async () => {
    if (!profile.phone) return;
    try {
      await navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch { /* ignore */ }
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !messageText) return;

    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
      setTimeout(() => {
        setTransmitted(false);
        setMessageText("");
        setSenderEmail("");
      }, 3500);
    }, 1200);
  };

  return (
    <section id="contact" className="relative bg-[#F4F4F0] px-3 pb-3 pt-16 sm:px-6 border-t border-stone-300 font-mono">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-300 bg-white px-6 pb-10 pt-20 shadow-xl sm:px-12 lg:px-16 text-stone-900">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500">
              <Terminal size={14} className="text-blue-600" />
              <span>( Dispatch Terminal & Operations )</span>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-stone-300 bg-stone-100 px-4 py-1.5 text-xs text-stone-600">
              <span className="flex items-center gap-1 font-semibold text-stone-900">
                <Globe2 size={13} className="text-blue-600" /> Abuja, NG
              </span>
              <span className="text-stone-300">/</span>
              <span className="flex items-center gap-1 font-bold text-stone-900">
                <Clock size={13} className="text-emerald-600" /> {localTime || "11:43 AM"} WAT
              </span>
            </div>
          </div>

          <SplitText
            text="Got a problem? Let's {{sort}} it."
            className="font-sans font-light tracking-tight text-stone-950 text-5xl sm:text-7xl lg:text-9xl"
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="space-y-8 lg:col-span-6">
              <p className="max-w-xl font-sans text-lg text-stone-600 leading-relaxed sm:text-xl">
                Need immediate system diagnostics, IT support, or full-stack software development? Reach out directly via dispatch or copy my credentials below.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-3 rounded-full bg-stone-950 px-8 py-4 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    <Mail size={16} />
                    <span>{profile.email}</span>
                  </a>
                </Magnetic>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-6 py-4 text-xs font-semibold text-stone-800 hover:border-stone-950 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={16} className="text-emerald-600" />
                      <span className="text-emerald-700">EMAIL COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>
              </div>

              {profile.phone && (
                <div className="flex items-center gap-3 pt-2 text-xs">
                  <span className="text-stone-500">DIRECT LINE:</span>
                  <button
                    onClick={copyPhone}
                    className="inline-flex items-center gap-2 text-stone-900 hover:text-blue-600 font-bold transition-colors"
                  >
                    <Phone size={14} className="text-blue-600" />
                    <span>{profile.phone}</span>
                    <span className="text-[10px] text-stone-400">
                      [{copiedPhone ? "COPIED" : "CLICK TO COPY"}]
                    </span>
                  </button>
                </div>
              )}

              <div className="rounded-2xl border border-stone-300 bg-stone-50 p-4 max-w-md text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-700">
                  <ShieldCheck size={14} /> Guaranteed SLA Response
                </div>
                <p className="mt-1 text-stone-600 font-sans">
                  Critical incident dispatches are reviewed within 15 minutes during operating hours.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-stone-950 bg-stone-950 p-6 sm:p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-blue-400" />
                    <span>dispatch-terminal.sh</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-bold">
                    DISPATCH READY
                  </span>
                </div>

                <form onSubmit={handleDispatchSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-stone-400 mb-2">
                      SELECT PRIORITY LEVEL
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "standard", label: "Standard Support" },
                        { id: "urgent", label: "Urgent Incident" },
                        { id: "contract", label: "Project Contract" },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setTicketPriority(p.id as any)}
                          className={`rounded-xl border py-2 px-3 text-xs transition-all ${
                            ticketPriority === p.id
                              ? "border-blue-500 bg-blue-500/20 text-blue-300 font-bold"
                              : "border-stone-800 bg-stone-900 text-stone-400 hover:text-white"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1.5">
                      YOUR EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-xs text-white placeholder-stone-600 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1.5">
                      PROBLEM DESCRIPTION / SYSTEM SCOPE
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the issue, network environment, or project specs..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-xs text-white placeholder-stone-600 outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting || transmitted}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                  >
                    {isTransmitting ? (
                      <>
                        <Sparkles size={14} className="animate-spin" />
                        <span>TRANSMITTING DISPATCH...</span>
                      </>
                    ) : transmitted ? (
                      <>
                        <Check size={14} />
                        <span>DISPATCH TRANSMITTED SUCCESSFULLY</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>TRANSMIT TICKET</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <footer className="mt-24 flex flex-col justify-between gap-6 border-t border-stone-200 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center">
            <p suppressHydrationWarning>
              © {currentYear} {profile.name}. All systems operational.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </div>
    </section>
  );
}