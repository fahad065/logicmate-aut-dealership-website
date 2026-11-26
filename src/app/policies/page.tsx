import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { faqs, policies, warranty } from "@/data/dealer";

export const metadata = { title: "Warranty, policies & FAQ — Meridian Motors" };

export default function PoliciesPage() {
  return (
    <div>
      <PageHero icon={ShieldCheck} eyebrow="Peace of mind" title="Warranty, policies & FAQ" subtitle="What every car comes with, how test drives, deposits and trade-ins work, and the questions we hear most." />
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <h2 className="font-display text-2xl font-extrabold text-ink">Warranty</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {Object.entries(warranty).map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-black/5 bg-white p-5">
              <h3 className="font-semibold text-ink">{k}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{v}</p>
            </div>
          ))}
        </div>
        <h2 className="font-display mt-14 text-2xl font-extrabold text-ink">Our policies</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {policies.map((p) => (
            <div key={p.title} className="rounded-2xl border border-black/5 bg-white p-5">
              <h3 className="font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.body}</p>
            </div>
          ))}
        </div>
        <h2 className="font-display mt-14 text-2xl font-extrabold text-ink">Frequently asked</h2>
        <div className="mt-5 divide-y divide-black/10 rounded-2xl border border-black/5 bg-white">
          {faqs.map((f) => (
            <details key={f.title} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">{f.title}<span className="float-right text-gold transition-transform group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{f.body}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
