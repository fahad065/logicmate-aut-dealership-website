"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Field } from "@/components/field";
import { Success } from "@/components/success";
import { showroomOf, showrooms, vehicleOf, vehicles } from "@/data/dealer";

export function TestDriveForm() {
  const params = useSearchParams();
  const car = vehicleOf(params.get("car"));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    showroom: car?.showroom ?? showroomOf(params.get("showroom"))?.slug ?? showrooms[0].slug,
    car: car?.slug ?? "",
    date: "", time: "Morning", where: "showroom", name: "", phone: "", email: "", licence: "yes",
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));
  const showroom = showroomOf(form.showroom)!;
  const stock = vehicles.filter((v) => v.showroom === showroom.slug);
  const chosen = vehicleOf(form.car);

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
      <Success title="Test drive requested" onReset={() => setDone(false)} resetLabel="Book another test drive">
        Thanks, {form.name.split(" ")[0] || "there"} — {chosen ? <>the <strong>{chosen.year} {chosen.make} {chosen.model}</strong></> : "your test drive"} at {showroom.name}
        {form.where === "home" ? " (delivered to your home or office)" : ""} is requested. A sales consultant will call {form.phone || "you"} to confirm the time.
        Please bring your driving licence.
      </Success>
    );
  }

  return (
    <div>
      <PageHero icon={CalendarCheck} eyebrow="Test drive" title="Book a test drive" subtitle="About 30 minutes with a sales consultant. We confirm your time by phone or WhatsApp — usually within the hour while we're open." />
      <section className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <Field label="Showroom" required>
            <select value={form.showroom} onChange={(e) => setForm((f) => ({ ...f, showroom: e.target.value, car: "", where: "showroom" }))} className="input">
              {showrooms.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Car">
            <select value={form.car} onChange={(e) => set("car", e.target.value)} className="input">
              <option value="">Not sure yet — help me choose</option>
              {stock.map((v) => <option key={v.slug} value={v.slug}>{v.year} {v.make} {v.model} {v.trim}</option>)}
            </select>
          </Field>
          {showroom.homeTestDrive && (
            <Field label="Where">
              <select value={form.where} onChange={(e) => set("where", e.target.value)} className="input">
                <option value="showroom">At the showroom</option>
                <option value="home">At my home or office in {showroom.city} (free)</option>
              </select>
            </Field>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Preferred date" required><input required type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="input" /></Field>
            <Field label="Preferred time">
              <select value={form.time} onChange={(e) => set("time", e.target.value)} className="input">{["Morning", "Afternoon", "Evening", "Any time"].map((t) => <option key={t}>{t}</option>)}</select>
            </Field>
            <Field label="Full name" required><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="input" /></Field>
            <Field label="Phone / WhatsApp" required><input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Include your country code" className="input" /></Field>
          </div>
          <Field label="Email"><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input" /></Field>
          <Field label="Do you have a valid driving licence?">
            <select value={form.licence} onChange={(e) => set("licence", e.target.value)} className="input">
              <option value="yes">Yes</option>
              <option value="visitor">I&apos;m visiting — I have my home licence and passport</option>
            </select>
          </Field>
          <button disabled={submitting} className="w-full rounded-lg bg-gold py-3 text-sm font-bold text-white hover:bg-gold-dark disabled:opacity-60">{submitting ? "Sending…" : "Request test drive"}</button>
          <p className="text-center text-xs text-foreground/50">Drivers must be 21 or over (25 for cars over 400 hp).</p>
        </form>
      </section>
    </div>
  );
}
