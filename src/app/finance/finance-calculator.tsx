"use client";

import { useState } from "react";
import { countryOf, money, showroomOf, vehicleOf, vehicles } from "@/data/dealer";

export function FinanceCalculator({ initialCar }: { initialCar?: string }) {
  const start = vehicleOf(initialCar) ?? vehicles[0];
  const [slug, setSlug] = useState(start.slug);
  const v = vehicleOf(slug)!;
  const country = countryOf(showroomOf(v.showroom)!.country);
  const minDown = country.finance.minDownPct;
  const [downPct, setDownPct] = useState(Math.max(minDown, 10));
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(country.finance.rate);

  function pick(next: string) {
    setSlug(next);
    const c = countryOf(showroomOf(vehicleOf(next)!.showroom)!.country);
    setDownPct((d) => Math.max(d, c.finance.minDownPct));
    setRate(c.finance.rate);
  }

  const down = (v.price * downPct) / 100;
  const principal = v.price - down;
  const r = rate / 100 / 12;
  const monthly = r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
  const total = monthly * months + down;

  return (
    <div className="grid gap-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm md:grid-cols-[3fr_2fr] sm:p-8">
      <div className="space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Car</span>
          <select value={slug} onChange={(e) => pick(e.target.value)} className="input">
            {vehicles.map((x) => <option key={x.slug} value={x.slug}>{x.year} {x.make} {x.model} — {showroomOf(x.showroom)!.city} — {money(x.price, showroomOf(x.showroom)!.country)}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 flex justify-between text-sm font-semibold text-ink"><span>Deposit</span><span>{downPct}% · {money(Math.round(down), country.code)}</span></span>
          <input type="range" min={minDown} max={60} step={5} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-[var(--brand-gold)]" />
          {minDown > 0 && <span className="text-xs text-foreground/55">Minimum {minDown}% in {country.name}.</span>}
        </label>
        <label className="block">
          <span className="mb-1.5 flex justify-between text-sm font-semibold text-ink"><span>Term</span><span>{months} months</span></span>
          <input type="range" min={12} max={84} step={12} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-[var(--brand-gold)]" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Interest rate (% a year)</span>
          <input type="number" min={0} max={30} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="input" />
          <span className="text-xs text-foreground/55">Our partners&apos; headline rate in {country.name}: {country.finance.rateLabel}.</span>
        </label>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-ink p-6 text-white">
        <p className="text-sm uppercase tracking-wider text-white/60">Estimated monthly payment</p>
        <p className="font-display mt-1 text-4xl font-extrabold text-gold">{money(Math.round(monthly), country.code)}</p>
        <dl className="mt-4 space-y-1 text-sm text-white/75">
          <div className="flex justify-between"><dt>Amount borrowed</dt><dd>{money(Math.round(principal), country.code)}</dd></div>
          <div className="flex justify-between"><dt>Total payable</dt><dd>{money(Math.round(total), country.code)}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-white/55">An estimate only, not an offer of credit. Your rate depends on your credit and the lender&apos;s decision. {country.finance.note}</p>
      </div>
    </div>
  );
}
