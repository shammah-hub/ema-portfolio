import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-6xl sm:text-9xl">Page not <span className="font-serif-i text-accent">found</span>.</h1>
        <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-7 py-4 text-base font-semibold text-white">Back home</Link>
      </div>
    </main>
  );
}
