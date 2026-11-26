import Link from "next/link";
import { CarFront } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CarCard } from "@/components/car-card";
import { showroomOf, showrooms, vehicles, type Vehicle } from "@/data/dealer";
import { one } from "@/lib";

export const metadata = { title: "Cars for sale — Meridian Motors" };

const CONDITIONS: Record<string, Vehicle["condition"]> = { new: "New", certified: "Certified pre-owned", used: "Used" };
const BODIES = ["suv", "sedan", "hatchback", "pickup"];
const FUELS = ["petrol", "diesel", "hybrid", "electric"];
type Filters = { showroom?: string; condition?: string; body?: string; fuel?: string };

function href(f: Filters, key: keyof Filters, value?: string) {
  const next = { ...f, [key]: value };
  const q = Object.entries(next).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join("&");
  return q ? `/cars?${q}` : "/cars";
}

function Row({ label, f, k, options }: { label: string; f: Filters; k: keyof Filters; options: { value: string; label: string }[] }) {
  const chip = (on: boolean) => `rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${on ? "border-ink bg-ink text-white" : "border-black/10 bg-white text-ink hover:border-ink"}`;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-24 text-xs font-semibold uppercase tracking-wider text-foreground/50">{label}</span>
      <Link href={href(f, k)} scroll={false} className={chip(!f[k])}>All</Link>
      {options.map((o) => <Link key={o.value} href={href(f, k, o.value)} scroll={false} className={chip(f[k] === o.value)}>{o.label}</Link>)}
    </div>
  );
}

export default async function CarsPage({ searchParams }: PageProps<"/cars">) {
  const sp = await searchParams;
  const f: Filters = { showroom: one(sp.showroom), condition: one(sp.condition), body: one(sp.body), fuel: one(sp.fuel) };
  const list = vehicles.filter((v) =>
    (!f.showroom || v.showroom === f.showroom) &&
    (!f.condition || v.condition === CONDITIONS[f.condition]) &&
    (!f.body || v.body.toLowerCase() === f.body) &&
    (!f.fuel || v.fuel.toLowerCase() === f.fuel));
  const where = showroomOf(f.showroom);
  const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

  return (
    <div>
      <PageHero icon={CarFront} eyebrow="Cars for sale" title={where ? `Cars for sale in ${where.city}` : "Cars for sale"} subtitle="Prices in each showroom's local currency. Every used and certified car comes with a history report and a warranty." />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="space-y-3 rounded-2xl border border-black/5 bg-white p-5">
          <Row label="Showroom" f={f} k="showroom" options={showrooms.map((s) => ({ value: s.slug, label: s.city }))} />
          <Row label="Condition" f={f} k="condition" options={Object.entries(CONDITIONS).map(([value, label]) => ({ value, label }))} />
          <Row label="Body" f={f} k="body" options={BODIES.map((b) => ({ value: b, label: b === "suv" ? "SUV" : cap(b) }))} />
          <Row label="Fuel" f={f} k="fuel" options={FUELS.map((x) => ({ value: x, label: cap(x) }))} />
        </div>
        <p className="mt-6 text-sm text-foreground/60">{list.length} car{list.length === 1 ? "" : "s"} found</p>
        {list.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((v) => <CarCard key={v.slug} v={v} />)}</div>
        ) : (
          <div className="mt-4 rounded-2xl bg-sand p-8 text-center">
            <p className="font-semibold text-ink">Nothing matches those filters right now.</p>
            <p className="mt-1 text-sm text-foreground/65">Stock changes daily — tell us what you&apos;re looking for and we&apos;ll call you when it arrives.</p>
            <Link href="/contact" className="mt-4 inline-block rounded-lg bg-ink px-5 py-2 text-sm font-bold text-white">Ask us to find it</Link>
          </div>
        )}
        <p className="mt-6 text-xs text-foreground/50">*Finance examples over 60 months with the minimum deposit for that country; subject to status and lender approval. US prices exclude tax, title and licence; Canadian prices exclude HST and licensing; Australian prices are drive-away.</p>
      </section>
    </div>
  );
}
