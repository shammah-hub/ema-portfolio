import { ImageResponse } from "next/og";

export const alt = "Ema Tosin, IT Support Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#e3e8ff", color: "#15161c" }}>
        <div style={{ display: "flex", fontSize: 32, color: "#4f63ff", fontWeight: 700 }}>Ema Tosin.</div>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 800, lineHeight: 0.95, letterSpacing: -5 }}>IT support that&apos;s calm.</div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(21,22,28,0.6)" }}>IT Support Specialist</div>
      </div>
    ),
    size,
  );
}
