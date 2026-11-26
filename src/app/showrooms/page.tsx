import Link from "next/link";
import { Car, Clock, Globe2, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SafeImg } from "@/components/safe-img";
import { countryOf, showrooms, vehicles } from "@/data/dealer";

export const metadata = { title: "Showrooms — Meridian Motors" };

export default function ShowroomsPage() {
  return (
    <div>
      <PageHero icon={MapPin} eyebrow="Visit us" title="Our showrooms" subtitle="Six showrooms in five countries. Opening hours are local time." />
      <section className="mx-auto max-w-6xl space-y-8 px-5 py-14 sm:px-8">
        {showrooms.map((s) => {
          const c = countryOf(s.country);
          return (
            <article key={s.slug} id={s.slug} className="scroll-mt-24 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm md:grid md:grid-cols-[2fr_3fr]">
              <SafeImg src={s.image} alt={s.name} className="h-52 w-full object-cover md:h-full" />
              <div className="p-6 sm:p-8">
                <p className="text-sm text-foreground/55">{c.flag} {c.name} · prices in {c.currency}</p>
                <h2 className="font-display text-2xl font-extrabold text-ink">{s.name}</h2>
                <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> <a href={s.mapsUrl} target="_blank" rel="noreferrer" className="hover:underline">{s.address}</a></p>
                  <div className="space-y-1">
                    <p className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-gold" /> {s.phone}</p>
                    <p className="flex gap-2"><MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" /> WhatsApp {s.whatsapp}</p>
                  </div>
                  <div className="flex gap-2"><Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                    <ul>{s.hours.map((h) => <li key={h.days}><span className="text-foreground/60">{h.days}:</span> {h.time}</li>)}<li className="text-xs text-foreground/45">{s.timezone}</li></ul>
                  </div>
                  <div className="space-y-1">
                    <p className="flex gap-2"><Globe2 className="mt-0.5 size-4 shrink-0 text-gold" /> {s.languages.join(", ")}</p>
                    <p className="flex gap-2"><Car className="mt-0.5 size-4 shrink-0 text-gold" /> {s.parking}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">{s.services.map((x) => <span key={x} className="flex items-center gap-1 rounded-md bg-sand px-2.5 py-1 text-xs font-medium text-ink"><Sparkles className="size-3 text-gold" /> {x}</span>)}</div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/cars?showroom=${s.slug}`} className="rounded-lg bg-ink px-5 py-2 text-sm font-bold text-white hover:bg-ink-soft">{vehicles.filter((v) => v.showroom === s.slug).length} cars in stock</Link>
                  <Link href={`/test-drive?showroom=${s.slug}`} className="rounded-lg border border-black/15 px-5 py-2 text-sm font-bold text-ink hover:border-ink">Book a test drive</Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
