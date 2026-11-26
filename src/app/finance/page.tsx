import { Calculator, FileText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { countries, showrooms } from "@/data/dealer";
import { one } from "@/lib";
import { FinanceCalculator } from "./finance-calculator";

export const metadata = { title: "Car finance — Meridian Motors" };

export default async function FinancePage({ searchParams }: PageProps<"/finance">) {
  const sp = await searchParams;
  return (
    <div>
      <PageHero icon={Calculator} eyebrow="Finance" title="Car finance, explained" subtitle="See your monthly payment before you visit. Our finance team then finds the best rate from our lending partners." />
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <FinanceCalculator initialCar={one(sp.car)} />
        <h2 className="font-display mt-14 text-3xl font-extrabold text-ink">Finance in each country</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {countries.map((c) => (
            <article key={c.code} className="rounded-2xl border border-black/5 bg-white p-6">
              <p className="text-sm text-foreground/55">{c.flag} {showrooms.filter((s) => s.country === c.code).map((s) => s.city).join(" & ")}</p>
              <h3 className="font-display text-xl font-bold text-ink">{c.name}</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div><dt className="inline font-semibold text-ink">Products: </dt><dd className="inline text-foreground/70">{c.finance.products}</dd></div>
                <div><dt className="inline font-semibold text-ink">Rate: </dt><dd className="inline text-foreground/70">{c.finance.rateLabel}</dd></div>
                <div><dt className="inline font-semibold text-ink">Terms: </dt><dd className="inline text-foreground/70">{c.finance.terms}, {c.finance.minDownPct ? `at least ${c.finance.minDownPct}% down` : "deposits from 0%"}</dd></div>
                <div className="flex gap-2"><FileText className="mt-0.5 size-4 shrink-0 text-gold" /><dd className="text-foreground/70">{c.finance.documents}</dd></div>
              </dl>
              <p className="mt-3 text-xs text-foreground/55">{c.finance.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
