"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children when scrolled into view. */
export function Reveal({ children, delay = 0, y = 28, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that slides up word by word. Wrap emphasised words in {{ }} for the serif italic accent. */
export function SplitText({ text, className = "", delay = 0, as: Tag = "h2" }: { text: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p" }) {
  const parts = text.split(/(\{\{.*?\}\})/g).filter(Boolean);
  const words: { w: string; em: boolean }[] = [];
  parts.forEach((p) => {
    const em = p.startsWith("{{");
    let clean = em ? p.slice(2, -2) : p;
    // punctuation right after an emphasised word ("{{ship}},") stays glued to it
    if (!em && words.length && /^[^\s]/.test(clean)) {
      const m = clean.match(/^[^\s]+/)![0];
      words[words.length - 1].w += m;
      clean = clean.slice(m.length);
    }
    clean.split(" ").filter(Boolean).forEach((w) => words.push({ w, em }));
  });
  const M = motion[Tag];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text.replace(/\{\{|\}\}/g, "")}
    >
      {words.map((x, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-top">
          <motion.span
            className={`inline-block ${x.em ? "font-serif-i text-accent" : ""}`}
            variants={{ hidden: { y: "115%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease }}
          >
            {x.w}&nbsp;
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** A big paragraph whose words darken one by one as you scroll past. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.26em] inline-block">{children}</motion.span>;
}

/** A button that leans toward the cursor. */
export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts toward the cursor. */
export function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      data-hover
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}
