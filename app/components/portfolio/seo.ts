import type { Metadata } from "next";
import { profile } from "./data";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
// Hidden from search engines until you set NEXT_PUBLIC_INDEXABLE=true.
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const SITE_TITLE = `${profile.name} | ${profile.role}`;
export const SITE_DESCRIPTION = `${profile.name} is an IT support specialist. Helpdesk, troubleshooting, devices, networks and accounts, handled calmly and explained clearly. Get in touch.`;

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title, description, siteName: profile.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: SITE_URL,
  knowsAbout: ["IT support", "Helpdesk", "Troubleshooting", "Networking", "Microsoft 365"],
  sameAs: profile.socials.map((s) => s.href),
};
