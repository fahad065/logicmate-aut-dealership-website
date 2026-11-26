import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, Check, MapPin, MessageCircle, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import { SafeImg } from "@/components/safe-img";
import { CarCard, conditionBadge } from "@/components/car-card";
import { countryOf, exampleMonthly, money, showroomOf, vehicleOf, vehicles, warranty } from "@/data/dealer";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cars/[slug]">) {
  const { slug } = await params;
  const v = vehicleOf(slug);
  return { title: v ? `${v.year} ${v.make} ${v.model} ${v.trim} — Meridian Motors` : "Car — Meridian Motors" };
}

export default async function CarPage({ params }: PageProps<"/cars/[slug]">) {
  const { slug } = await params;
  const v = vehicleOf(slug);
  if (!v) notFound();
  const s = showroomOf(v.showroom)!;
  const c = countryOf(s.country);
  const f = exampleMonthly(v);
  const specs: [string, string][] = [
    ["Condition", v.condition], ["Year", String(v.year)], ["Mileage", v.mileage === 0 ? `0 ${c.distance}` : `${v.mileage.toLocaleString("en")} ${c.distance}`],
    ["Body", v.body], ["Fuel", v.fuel], [v.fuel === "Electric" ? "Motor & range" : "Engine", v.engine], ["Transmission", v.transmission],
    ["Seats", String(v.seats)], ["Colour", v.colour], ["Showroom", s.city],
  ];
  const similar = vehicles.filter((x) => x.slug !== v.slug && (x.body === v.body || x.showroom === v.showroom)).slice(0, 3);
  const taxNote = s.country === "US" ? "Plus tax, title and licence." : s.country === "CA" ? "Plus HST and licensing." : s.country === "AU" ? "Drive-away price." : "Price includes VAT.";

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <Link href={`/cars?showroom=${s.slug}`} className="text-sm text-foreground/60 hover:text-gold-dark">← Cars in {s.city}</Link>
        <div className="mt-4 grid gap-8 lg:grid-cols-[3fr_2fr]">
          <div>
            <div className="relative overflow-hidden rounded-2xl">
              <SafeImg src={v.image} alt={`${v.year} ${v.make} ${v.model}`} className="h-72 w-full object-cover sm:h-96" />
              <span className={`absolute left-4 top-4 rounded-md px-3 py-1 text-sm font-bold ${conditionBadge(v.condition)}`}>{v.condition}</span>
            </div>
            {/* Phones: price and the main action straight under the photo; the full box follows below. */}
            <div className="mt-5 lg:hidden">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground/50">{v.year} · {v.body}</p>
              <p className="font-display text-2xl font-extrabold text-ink">{v.make} {v.model} <span className="text-base font-semibold text-foreground/60">{v.trim}</span></p>
              <p className="font-display mt-2 text-3xl font-extrabold text-ink">{money(v.price, s.country)}</p>
              <p className="text-xs text-foreground/55">or about {money(f.monthly, s.country)}/month · {taxNote}</p>
              <Link href={`/test-drive?car=${v.slug}`} className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-bold text-white hover:bg-gold-dark"><CalendarCheck className="size-4" /> Book a test drive</Link>
            </div>
            <h2 className="font-display mt-8 text-2xl font-extrabold text-ink">Specifications</h2>
            <dl className="mt-3 grid grid-cols-1 overflow-hidden rounded-2xl border border-black/5 bg-white sm:grid-cols-2">
              {specs.map(([k, val]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-black/5 px-4 py-3 text-sm">
                  <dt className="text-foreground/55">{k}</dt><dd className="text-right font-semibold text-ink">{val}</dd>
                </div>
              ))}
            </dl>
            <h2 className="font-display mt-8 text-2xl font-extrabold text-ink">Features</h2>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">{v.features.map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-gold" /> {x}</li>)}</ul>
            <h2 className="font-display mt-8 text-2xl font-extrabold text-ink">Warranty</h2>
            <p className="mt-2 flex gap-2 text-sm text-foreground/75"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" /> {warranty[v.condition]}</p>
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground/50">{v.year} · {v.body}</p>
              <h1 className="font-display text-3xl font-extrabold text-ink">{v.make} {v.model}</h1>
              <p className="text-foreground/60">{v.trim}</p>
              <p className="font-display mt-4 text-4xl font-extrabold text-ink">{money(v.price, s.country)}</p>
              <p className="text-xs text-foreground/55">{taxNote}</p>
              <div className="mt-4 rounded-xl bg-sand p-4 text-sm">
                <p className="font-semibold text-ink">About {money(f.monthly, s.country)} a month</p>
                <p className="mt-1 text-foreground/65">{f.months} months, {money(f.down, s.country)} ({f.downPct}%) down, {c.finance.rateLabel}. Example only — subject to status and lender approval.</p>
                <Link href={`/finance?car=${v.slug}`} className="mt-2 inline-block text-sm font-bold text-gold-dark hover:underline">Work out your own payment →</Link>
              </div>
              <div className="mt-5 grid gap-2">
                <Link href={`/test-drive?car=${v.slug}`} className="flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-bold text-white hover:bg-gold-dark"><CalendarCheck className="size-4" /> Book a test drive</Link>
                <Link href={`/trade-in?car=${v.slug}`} className="flex items-center justify-center gap-2 rounded-lg border border-black/15 px-5 py-3 text-sm font-bold text-ink hover:border-ink"><RefreshCw className="size-4" /> Value my trade-in</Link>
              </div>
              <p className="mt-4 text-xs text-foreground/55">Reserve it for 72 hours with a refundable {money(c.holdDeposit, s.country)} deposit — ask our team.</p>
            </div>
            <div className="rounded-2xl bg-ink p-5 text-sm text-white/85">
              <p className="font-semibold text-white">{s.name}</p>
              <p className="mt-2 flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {s.address}</p>
              <p className="mt-1 flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-gold" /> {s.phone}</p>
              <p className="mt-1 flex gap-2"><MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" /> WhatsApp {s.whatsapp}</p>
            </div>
          </aside>
        </div>
      </section>
      {similar.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display mb-6 text-2xl font-extrabold text-ink">You might also like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.map((x) => <CarCard key={x.slug} v={x} />)}</div>
          </div>
        </section>
      )}
    </div>
  );
}
