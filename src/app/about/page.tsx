import Link from "next/link";
import { BadgeCheck, CarFront, Handshake, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SafeImg } from "@/components/safe-img";
import { showrooms } from "@/data/dealer";

export const metadata = { title: "About — Meridian Motors" };

const timeline = [
  { year: "2006", text: "Meridian Motors opens a used-car lot on Sheikh Zayed Road, Dubai." },
  { year: "2011", text: "Abu Dhabi showroom and our first service centre." },
  { year: "2016", text: "London (Park Royal) — our first showroom outside the UAE." },
  { year: "2020", text: "Dallas and Toronto open; the Meridian Certified programme launches." },
  { year: "2024", text: "Melbourne joins, and every showroom sells electric and hybrid cars." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero icon={CarFront} eyebrow="Our story" title="About Meridian Motors" subtitle="An independent, multi-brand dealer built on clear prices and straight answers." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">{showrooms.length} showrooms, one promise</h2>
          <p className="mt-4 leading-relaxed text-foreground/70">We started with twelve used cars and a rule: every price on the windscreen is the real price, and every question gets a straight answer. Today we sell new, certified pre-owned and used cars of every major brand — and the rule hasn&apos;t changed.</p>
          <p className="mt-3 leading-relaxed text-foreground/70">Meridian Motors is an independent dealer. We aren&apos;t an authorised franchise of the brands we sell; new cars carry the manufacturer&apos;s warranty, serviced at any authorised centre.</p>
        </div>
        <SafeImg src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=60" alt="Meridian Motors showroom" className="h-80 w-full rounded-2xl object-cover" />
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-3">
          {[
            { icon: BadgeCheck, title: "Inspected, not just washed", text: "Every used car is inspected and comes with a history report and a warranty." },
            { icon: Handshake, title: "No pressure", text: "Salary-based targets, not commission — so our team helps you choose, not just buy." },
            { icon: Users, title: "Here after the sale", text: "Service centres in five cities and a 7-day exchange promise on certified cars." },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl border border-black/5 p-6">
              <v.icon className="size-7 text-gold" />
              <h3 className="font-display mt-3 text-lg font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm text-foreground/65">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <h2 className="font-display text-2xl font-extrabold text-ink">Our journey</h2>
        <ol className="mt-6 space-y-4 border-l-2 border-gold/50 pl-6">
          {timeline.map((t) => <li key={t.year}><p className="font-display text-lg font-bold text-gold-dark">{t.year}</p><p className="text-foreground/70">{t.text}</p></li>)}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/cars" className="rounded-lg bg-ink px-6 py-2.5 text-sm font-bold text-white hover:bg-ink-soft">Browse cars</Link>
          <Link href="/showrooms" className="rounded-lg border border-black/15 px-6 py-2.5 text-sm font-bold text-ink hover:border-ink">Find a showroom</Link>
        </div>
      </section>
    </div>
  );
}
