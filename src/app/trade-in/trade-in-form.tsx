"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Check, RefreshCw } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Field } from "@/components/field";
import { Success } from "@/components/success";
import { showroomOf, showrooms, vehicleOf } from "@/data/dealer";

export function TradeInForm() {
  const params = useSearchParams();
  const wanted = vehicleOf(params.get("car"));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ make: "", model: "", year: "", mileage: "", condition: "Good", finance: "no", showroom: wanted?.showroom ?? showrooms[0].slug, name: "", phone: "", email: "", notes: "" });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Demo site — no backend. Simulates a network round trip only.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <Success title="Thanks — we're on it" onReset={() => setDone(false)} resetLabel="Value another car">
        Our {showroomOf(form.showroom)?.city} team will send a guide price for your {form.year} {form.make} {form.model} within one working day.
        The final offer comes after a free 20-minute appraisal at the showroom.
      </Success>
    );
  }

  return (
    <div>
      <PageHero icon={RefreshCw} eyebrow="Trade-in" title="Value my car" subtitle="Any make, any model. Tell us about your car for a guide price — and we'll settle any finance you still owe." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[3fr_2fr]">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          {wanted && <p className="rounded-lg bg-sand px-3 py-2 text-sm text-foreground/75">Trading in towards the <strong>{wanted.year} {wanted.make} {wanted.model}</strong>.</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Make" required><input required value={form.make} onChange={(e) => set("make", e.target.value)} placeholder="e.g. Toyota" className="input" /></Field>
            <Field label="Model" required><input required value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="e.g. Corolla" className="input" /></Field>
            <Field label="Year" required><input required type="number" min={1990} max={2026} value={form.year} onChange={(e) => set("year", e.target.value)} className="input" /></Field>
            <Field label="Mileage (km or miles)" required><input required value={form.mileage} onChange={(e) => set("mileage", e.target.value)} className="input" /></Field>
            <Field label="Condition">
              <select value={form.condition} onChange={(e) => set("condition", e.target.value)} className="input">{["Excellent", "Good", "Fair", "Needs work"].map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Finance still owed?">
              <select value={form.finance} onChange={(e) => set("finance", e.target.value)} className="input"><option value="no">No</option><option value="yes">Yes</option></select>
            </Field>
          </div>
          <Field label="Nearest showroom">
            <select value={form.showroom} onChange={(e) => set("showroom", e.target.value)} className="input">{showrooms.map((s) => <option key={s.slug} value={s.slug}>{s.city}</option>)}</select>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" required><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="input" /></Field>
            <Field label="Phone / WhatsApp" required><input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Include your country code" className="input" /></Field>
          </div>
          <Field label="Email"><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input" /></Field>
          <Field label="Anything else?"><textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Service history, accidents, extras, a second key…" className="input" /></Field>
          <button disabled={submitting} className="w-full rounded-lg bg-ink py-3 text-sm font-bold text-white hover:bg-ink-soft disabled:opacity-60">{submitting ? "Sending…" : "Get my guide price"}</button>
        </form>
        <aside className="h-fit rounded-2xl bg-sand p-6">
          <h2 className="font-display text-xl font-bold text-ink">How it works</h2>
          <ul className="mt-4 space-y-3 text-sm text-foreground/75">
            {["Send us the details — we reply with a guide price.", "Bring the car for a free 20-minute appraisal with the registration document, service history and both keys.", "Accept the offer and it comes straight off your next car — or we pay you by bank transfer.", "Still paying finance? We settle it with your lender."].map((t) => <li key={t} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-gold" /> {t}</li>)}
          </ul>
        </aside>
      </section>
    </div>
  );
}
