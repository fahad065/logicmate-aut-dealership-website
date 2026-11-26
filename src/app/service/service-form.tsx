"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Field } from "@/components/field";
import { Success } from "@/components/success";
import { money, showroomOf, showrooms } from "@/data/dealer";

const workshops = showrooms.filter((s) => s.serviceCentre);

export function ServiceForm() {
  const params = useSearchParams();
  const pre = showroomOf(params.get("showroom"));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ showroom: pre?.serviceCentre ? pre.slug : workshops[0].slug, type: "Minor service", car: "", reg: "", mileage: "", date: "", shuttle: "no", name: "", phone: "", email: "", notes: "" });
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
      <Success title="Service request sent" onReset={() => setDone(false)} resetLabel="Book another service">
        Thanks, {form.name.split(" ")[0] || "there"} — the {showroomOf(form.showroom)?.city} service team will call {form.phone || "you"} to confirm a time for your {form.type.toLowerCase()}.
      </Success>
    );
  }

  return (
    <div>
      <PageHero icon={Wrench} eyebrow="Service" title="Service & repairs" subtitle="All makes, transparent prices and a free shuttle within 10 km. Courtesy cars on request for major services." />
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h2 className="font-display text-2xl font-extrabold text-ink">Service prices</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-black/5 bg-white">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-ink text-white"><tr><th className="px-4 py-3">Showroom</th><th className="px-4 py-3">Minor service</th><th className="px-4 py-3">Major service</th></tr></thead>
            <tbody>
              {showrooms.map((s) => (
                <tr key={s.slug} className="border-t border-black/5">
                  <td className="px-4 py-3 font-semibold text-ink">{s.city}</td>
                  {s.servicePrices ? <><td className="px-4 py-3">from {money(s.servicePrices.minor, s.country)}</td><td className="px-4 py-3">from {money(s.servicePrices.major, s.country)}</td></> : <td colSpan={2} className="px-4 py-3 text-foreground/60">Sales only — no workshop. New cars are serviced at the brand&apos;s authorised centres; ask us for a trusted local workshop.</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-foreground/55">Minor: oil and filter, fluid top-ups, multi-point check. Major: adds air, cabin and fuel filters, spark plugs or brake fluid as due. London also does MOTs. Final price depends on the car.</p>

        <form onSubmit={submit} className="mx-auto mt-12 max-w-2xl space-y-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-extrabold text-ink">Request a service</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Service centre" required>
              <select value={form.showroom} onChange={(e) => set("showroom", e.target.value)} className="input">{workshops.map((s) => <option key={s.slug} value={s.slug}>{s.city}</option>)}</select>
            </Field>
            <Field label="What do you need?">
              <select value={form.type} onChange={(e) => set("type", e.target.value)} className="input">{["Minor service", "Major service", "MOT (London)", "Repair or warning light", "Tyres & brakes", "Body shop"].map((t) => <option key={t}>{t}</option>)}</select>
            </Field>
            <Field label="Make & model" required><input required value={form.car} onChange={(e) => set("car", e.target.value)} className="input" /></Field>
            <Field label="Registration / plate"><input value={form.reg} onChange={(e) => set("reg", e.target.value)} className="input" /></Field>
            <Field label="Current mileage"><input value={form.mileage} onChange={(e) => set("mileage", e.target.value)} className="input" /></Field>
            <Field label="Preferred date" required><input required type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="input" /></Field>
            <Field label="Full name" required><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="input" /></Field>
            <Field label="Phone / WhatsApp" required><input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input" /></Field>
          </div>
          <Field label="Need the free shuttle?">
            <select value={form.shuttle} onChange={(e) => set("shuttle", e.target.value)} className="input"><option value="no">No</option><option value="yes">Yes, within 10 km</option><option value="courtesy">I&apos;d like a courtesy car (major services)</option></select>
          </Field>
          <Field label="Notes"><textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Warning lights, noises, anything we should check…" className="input" /></Field>
          <button disabled={submitting} className="w-full rounded-lg bg-ink py-3 text-sm font-bold text-white hover:bg-ink-soft disabled:opacity-60">{submitting ? "Sending…" : "Request service"}</button>
        </form>
      </section>
    </div>
  );
}
