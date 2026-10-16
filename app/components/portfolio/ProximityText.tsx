"use client";

import { useEffect, useRef } from "react";

/** Text whose letters lift and turn accent-coloured as the cursor comes near. Only runs with a mouse. */
export function ProximityText({ text, className = "", radius = 200 }: { text: string; className?: string; radius?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = ref.current;
    if (!root) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>("[data-ch]"));
    let raf = 0, px = -9999, py = -9999;
    const run = () => {
      raf = 0;
      for (const c of chars) {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        c.style.setProperty("--p", Math.max(0, 1 - d / radius).toFixed(3));
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(run); };
    const move = (e: PointerEvent) => { px = e.clientX; py = e.clientY; kick(); };
    const leave = () => { px = py = -9999; kick(); };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, [radius]);

  return (
    <span ref={ref} aria-label={text} className={className}>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          " "
        ) : (
          <span
            key={i}
            aria-hidden
            data-ch
            className="inline-block transition-[transform,color] duration-200 ease-out will-change-transform"
            style={{
              transform: "translateY(calc(var(--p, 0) * -0.05em))",
              color: "color-mix(in srgb, var(--accent) calc(var(--p, 0) * 100%), var(--ink))",
            }}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
