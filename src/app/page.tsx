import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, Calculator, MessageCircle, RefreshCw, ShieldCheck, Star, Wrench } from "lucide-react";
import { SafeImg } from "@/components/safe-img";
import { CarCard } from "@/components/car-card";
import { countryOf, showrooms, vehicles } from "@/data/dealer";

const reviews = [
  { name: "Ahmed R.", city: "Dubai", text: "Asked about the Patrol at 11pm on WhatsApp, test drove it the next morning and drove it home on Saturday. Smooth from start to finish." },
  { name: "Claire W.", city: "London", text: "Fair part-exchange price for my old Golf and the PCP was explained properly. No pressure at all." },
  { name: "Marcus T.", city: "Dallas", text: "The certified RAV4 came with a clean history report and a real warranty. Finance was approved the same day." },
];

const featured = ["2025-toyota-land-cruiser-gxr-dubai", "2023-bmw-320i-m-sport-london", "2024-toyota-rav4-hybrid-xle-dallas", "2023-hyundai-ioniq-5-melbourne", "2025-honda-cr-v-hybrid-ex-l-toronto", "2024-ford-f-150-raptor-abu-dhabi"]
  .map((s) => vehicles.find((v) => v.slug === s)!);

const bodies = [
  { label: "SUVs", q: "body=suv" },
  { label: "Sedans", q: "body=sedan" },
  { label: "Pickups", q: "body=pickup" },
  { label: "Hatchbacks", q: "body=hatchback" },
  { label: "Electric", q: "fuel=electric" },
  { label: "Hybrid", q: "fuel=hybrid" },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-white">
        <SafeImg src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1800&q=60" alt="Car in the Meridian Motors showroom" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <span className="mb-5 inline-flex items-center gap-2 rounded-md border border-gold/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {vehicles.length} cars in stock · {showrooms.length} showrooms
          </span>
          <h1 className="font-display max-w-2xl text-balance text-5xl font-extrabold leading-[1.05] sm:text-6xl">Your next car, without the runaround.</h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">
            New, certified pre-owned and used cars with clear prices, honest finance and a fair price for your trade-in — in Dubai,
            Abu Dhabi, London, Dallas, Melbourne and Toronto.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cars" className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3 text-sm font-bold text-white hover:bg-gold-dark">Browse cars for sale <ArrowRight className="size-4" /></Link>
            <Link href="/test-drive" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-7 py-3 text-sm font-bold text-white hover:border-gold hover:text-gold"><CalendarCheck className="size-4" /> Book a test drive</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {bodies.map((b) => <Link key={b.label} href={`/cars?${b.q}`} className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white/85 hover:bg-white/20">{b.label}</Link>)}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/60"><MessageCircle className="size-4 text-gold" /> Is a car still available? Ask our chat assistant — any language, any hour.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Featured</p>
            <h2 className="font-display mt-2 text-3xl font-extrabold text-ink sm:text-4xl">Just arrived</h2>
          </div>
          <Link href="/cars" className="inline-flex items-center gap-1 text-sm font-bold text-ink hover:text-gold-dark">All {vehicles.length} cars <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((v) => <CarCard key={v.slug} v={v} />)}</div>
        <p className="mt-4 text-xs text-foreground/50">*Finance examples over 60 months with the minimum deposit for that country; subject to status and lender approval.</p>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BadgeCheck, title: "Certified pre-owned", text: "150-point inspection, 12-month warranty and a 7-day exchange promise.", href: "/policies" },
            { icon: Calculator, title: "Finance in minutes", text: "Loans, PCP and leasing through our lending partners — see your monthly payment first.", href: "/finance" },
            { icon: RefreshCw, title: "Fair trade-in price", text: "Any make, any model. Free 20-minute appraisal and we settle your old finance.", href: "/trade-in" },
            { icon: Wrench, title: "Service you can trust", text: "Service centres in five cities, courtesy shuttle and transparent prices.", href: "/service" },
          ].map((f) => (
            <Link key={f.title} href={f.href} className="rounded-2xl border border-black/5 p-6 transition-colors hover:border-gold/40">
              <f.icon className="mb-3 size-7 text-gold" />
              <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{f.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <h2 className="font-display mb-8 text-3xl font-extrabold text-ink sm:text-4xl">Find a showroom</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showrooms.map((s) => (
            <Link key={s.slug} href={`/cars?showroom=${s.slug}`} className="group relative h-44 overflow-hidden rounded-2xl">
              <SafeImg src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-sm text-white/70">{countryOf(s.country).flag} {countryOf(s.country).name}</p>
                <h3 className="font-display text-2xl font-extrabold">{s.city}</h3>
                <p className="text-sm text-white/75">{vehicles.filter((v) => v.showroom === s.slug).length} cars in stock</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-extrabold text-ink sm:text-4xl">What our customers say</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-3 flex gap-0.5 text-gold">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
                <blockquote className="text-sm leading-relaxed text-foreground/75">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-ink">{r.name} · {r.city}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8">
        <ShieldCheck className="mx-auto size-9 text-gold" />
        <h2 className="font-display mt-3 text-3xl font-extrabold text-ink sm:text-4xl">What&apos;s your car worth?</h2>
        <p className="mx-auto mt-3 max-w-xl text-foreground/65">Tell us about it and get a guide price — the final offer comes after a free 20-minute appraisal.</p>
        <Link href="/trade-in" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-ink px-7 py-3 text-sm font-bold text-white hover:bg-ink-soft">Value my car <ArrowRight className="size-4" /></Link>
      </section>
    </div>
  );
}
