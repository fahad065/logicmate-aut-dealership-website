import Link from "next/link";
import { CarFront, MapPin, Mail } from "lucide-react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { countryOf, showrooms } from "@/data/dealer";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gold text-white"><CarFront className="size-4" /></span>
            <span className="font-display text-lg font-extrabold uppercase text-white">Meridian Motors</span>
          </div>
          <p className="text-sm leading-relaxed text-white/55">
            New, certified pre-owned and used cars from {showrooms.length} showrooms — with finance, trade-in and servicing under one roof.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="text-white/55 hover:text-gold"><FaInstagram className="size-5" /></a>
            <a href="#" aria-label="Facebook" className="text-white/55 hover:text-gold"><FaFacebook className="size-5" /></a>
            <a href="#" aria-label="YouTube" className="text-white/55 hover:text-gold"><FaYoutube className="size-5" /></a>
            <a href="#" aria-label="WhatsApp" className="text-white/55 hover:text-gold"><FaWhatsapp className="size-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Buy &amp; own</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/cars?condition=new" className="hover:text-gold">New cars</Link></li>
            <li><Link href="/cars?condition=certified" className="hover:text-gold">Certified pre-owned</Link></li>
            <li><Link href="/finance" className="hover:text-gold">Finance &amp; calculator</Link></li>
            <li><Link href="/trade-in" className="hover:text-gold">Value my car</Link></li>
            <li><Link href="/service" className="hover:text-gold">Book a service</Link></li>
            <li><Link href="/about" className="hover:text-gold">About us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Showrooms</h4>
          <ul className="space-y-2 text-sm">
            {showrooms.map((s) => (
              <li key={s.slug}><Link href={`/showrooms#${s.slug}`} className="flex items-center gap-2 hover:text-gold"><MapPin className="size-4 shrink-0 text-gold" />{s.city}, {countryOf(s.country).name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Sales</h4>
          <p className="flex items-center gap-2 text-sm"><Mail className="size-4 text-gold" /> sales@meridian-motors.example</p>
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            Prices and stock change daily. Finance examples are for illustration and subject to status and lender approval.
            Not an authorised dealer of the brands shown.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/35">
        © {new Date().getFullYear()} Meridian Motors. Demo site for illustrative purposes — not a real business.
      </div>
    </footer>
  );
}
