// ─────────────────────────────────────────────────────────────
//  ALL THE CONTENT LIVES HERE. Change words, links and email in
//  this file and the whole site updates. Lines marked EDIT are
//  placeholders to replace before launch.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Ema Tosin",
  first: "Ema",
  role: "IT Support Specialist",
  place: "Nigeria", // EDIT
  timeZone: "Africa/Lagos", // EDIT
  email: "hello@yourdomain.com", // EDIT
  phone: "", // EDIT optional, e.g. "+234 800 000 0000"
  photo: "" as string, // EDIT e.g. "/ema.jpg" (file in /public). Empty shows the monogram.
  available: true,
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" }, // EDIT
    { label: "X", href: "https://x.com/your-handle" }, // EDIT
    { label: "WhatsApp", href: "https://wa.me/234XXXXXXXXXX" }, // EDIT
  ],
};

export const navLinks = [
  { label: "What I do", id: "services" },
  { label: "How I work", id: "process" },
  { label: "Toolbox", id: "toolbox" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

export const rotating = ["calm", "fast", "clear", "friendly"];

export const marquee = ["Troubleshooting", "Helpdesk", "Networking", "Microsoft 365", "Hardware", "Remote support", "Onboarding", "Security basics"];

export type Tone = "blue" | "peach" | "mint" | "lilac" | "butter" | "rose";

export const services: { n: string; title: string; text: string; tone: Tone; points: string[] }[] = [
  {
    n: "01",
    title: "Helpdesk & troubleshooting",
    text: "The first person you call when something breaks. Clear questions, quick diagnosis, and a fix explained in plain words.",
    tone: "blue",
    points: ["Ticket handling", "Remote & on-site", "Escalation notes"],
  },
  {
    n: "02",
    title: "Hardware & devices",
    text: "Laptops, desktops, printers and phones set up, repaired and kept running.",
    tone: "peach",
    points: ["Setup & imaging", "Repairs", "Asset tracking"],
  },
  {
    n: "03",
    title: "Networks & Wi-Fi",
    text: "Connections that stay up: routers, switches, VPN and the small settings that cause big outages.",
    tone: "mint",
    points: ["LAN / Wi-Fi", "VPN", "Printers & shares"],
  },
  {
    n: "04",
    title: "Accounts & software",
    text: "Microsoft 365, email, passwords and permissions handled carefully, so people can work and data stays safe.",
    tone: "lilac",
    points: ["Microsoft 365", "User accounts", "Access & MFA"],
  },
  {
    n: "05",
    title: "Onboarding & training",
    text: "New starters ready on day one, and short, friendly how-tos so the same question isn't asked twice.",
    tone: "butter",
    points: ["Day-one setup", "Guides", "Team sessions"],
  },
  {
    n: "06",
    title: "Security hygiene",
    text: "Updates, backups and sensible habits that stop most problems before they begin.",
    tone: "rose",
    points: ["Patching", "Backups", "Phishing awareness"],
  },
];

export const steps: { title: string; text: string; tone: Tone }[] = [
  { title: "Listen first", text: "What happened, when, and what changed? Most of the answer is in a good question.", tone: "blue" },
  { title: "Find the cause", text: "Reproduce it, narrow it down and fix the root, not just the symptom.", tone: "mint" },
  { title: "Fix it properly", text: "A change that holds, tested before I say it's done.", tone: "peach" },
  { title: "Explain simply", text: "You'll know what was wrong and how to avoid it, with no jargon.", tone: "lilac" },
  { title: "Follow up", text: "A check-in and a short note, so it's documented and doesn't come back.", tone: "butter" },
];

export const toolbox = [
  "Windows", "macOS", "Linux basics", "Microsoft 365", "Active Directory", "Google Workspace",
  "TCP/IP & DNS", "DHCP", "VPN", "Wi-Fi", "Printers", "Remote desktop",
  "Ticketing systems", "Backups", "Antivirus & patching", "Documentation",
]; // EDIT: keep only what is true for Ema

// EDIT: replace these placeholder rows with real roles. Delete the Experience section from page.tsx if not wanted.
export const experience = [
  { role: "Your most recent role", org: "Company name", period: "20XX – Now", note: "One line about what you handled and what you were trusted with." },
  { role: "Previous role", org: "Company name", period: "20XX – 20XX", note: "One line about the work." },
  { role: "Earlier role", org: "Company name", period: "20XX – 20XX", note: "One line about the work." },
];

export const faqs = [
  { q: "How quickly can you help?", a: "Tell me what's wrong and I'll reply with next steps as soon as I can. Urgent issues come first." },
  { q: "Do you work remotely or on site?", a: "Both. Many problems can be solved remotely, and I'm happy to come on site when hardware or networking needs hands." }, // EDIT
  { q: "Do I need to be technical?", a: "Not at all. I'll ask simple questions and explain things without jargon." },
  { q: "What if the problem comes back?", a: "I fix the cause, document what I did, and check in afterwards so it stays fixed." },
]; // EDIT

export const about = {
  statement:
    "I'm Ema Tosin, an IT support specialist who believes technology should simply work and that the person on the other end of the ticket deserves patience, clarity and a real fix.", // EDIT
  paragraphs: [
    "Behind every ticket is someone trying to get their job done. I keep that in mind, staying calm, explaining as I go, and leaving things better than I found them.",
    "I like finding the root of a problem, writing it down so the next person is faster, and making sure nobody has to feel silly for asking.",
  ], // EDIT
};
