"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CarFront, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/cars", label: "Cars for sale" },
  { href: "/finance", label: "Finance" },
  { href: "/trade-in", label: "Trade-in" },
  { href: "/service", label: "Service" },
  { href: "/showrooms", label: "Showrooms" },
  { href: "/policies", label: "Warranty & FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-gold text-white">
            <CarFront className="size-5" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-lg font-extrabold uppercase tracking-wide">Meridian</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Motors</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${active(link.href) ? "text-gold" : "text-white/75 hover:text-gold"}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/test-drive" className="hidden rounded-lg bg-gold px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-gold-dark lg:block">
          Book a test drive
        </Link>

        <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3.5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`text-base font-medium ${active(link.href) ? "text-gold" : "text-white/85"}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/test-drive" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-gold px-5 py-2.5 text-center text-sm font-bold text-white">
              Book a test drive
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
