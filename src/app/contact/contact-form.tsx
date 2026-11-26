"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Field } from "@/components/field";
import { Success } from "@/components/success";
import { showrooms } from "@/data/dealer";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", showroom: showrooms[0].slug, topic: "A question about a car", reference: "", message: "" });
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
      <Success title="Message sent" onReset={() => setDone(false)} resetLabel="Send another message">
        Thanks, {form.name.split(" ")[0] || "there"} — our {showrooms.find((s) => s.slug === form.showroom)?.city} team will reply within a few hours while we&apos;re open.
      </Success>
    );
  }

  return (
    <div>
      <PageHero icon={Mail} eyebrow="Get in touch" title="Contact us" subtitle="Questions about a car, finance, a service or something you bought from us — we'll get back to you fast." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[3fr_2fr]">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" required><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="input" /></Field>
            <Field label="Email" required><input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input" /></Field>
            <Field label="Phone (optional)"><input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input" /></Field>
            <Field label="Showroom">
              <select value={form.showroom} onChange={(e) => set("showroom", e.target.value)} className="input">
                {showrooms.map((s) => <option key={s.slug} value={s.slug}>{s.city}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Topic">
              <select value={form.topic} onChange={(e) => set("topic", e.target.value)} className="input">
                {["A question about a car", "Finance", "After-sales or a problem with my car", "Documents or registration", "Feedback", "Careers"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Car or registration (if relevant)"><input value={form.reference} onChange={(e) => set("reference", e.target.value)} placeholder="e.g. the Patrol, or your plate number" className="input" /></Field>
          </div>
          <Field label="Message" required><textarea required rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} className="input" /></Field>
          <button disabled={submitting} className="w-full rounded-lg bg-ink py-3 text-sm font-bold text-white hover:bg-ink-soft disabled:opacity-60">{submitting ? "Sending…" : "Send message"}</button>
        </form>
        <aside className="space-y-4">
          {showrooms.map((h) => (
            <div key={h.slug} className="rounded-2xl bg-sand p-5 text-sm">
              <p className="font-display text-xl font-semibold text-ink">{h.name}</p>
              <p className="mt-1 flex gap-2"><Phone className="mt-0.5 size-4 text-gold-dark" /> {h.phone}</p>
              <p className="flex gap-2"><MessageCircle className="mt-0.5 size-4 text-gold-dark" /> {h.whatsapp}</p>
            </div>
          ))}
          <p className="flex gap-2 text-sm text-foreground/70"><Mail className="mt-0.5 size-4 text-gold-dark" /> sales@meridian-motors.example</p>
        </aside>
      </section>
    </div>
  );
}
