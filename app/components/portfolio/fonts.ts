import { DM_Mono, Fraunces, Manrope } from "next/font/google";

// Display + body: Manrope. Serif italic accent words: Fraunces. Labels: DM Mono.
export const display = Manrope({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
export const body = display;
export const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono", display: "swap" });
export const serif = Fraunces({ subsets: ["latin"], style: ["italic"], variable: "--ff-serif", display: "swap" });
