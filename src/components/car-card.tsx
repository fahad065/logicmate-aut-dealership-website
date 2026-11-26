import Link from "next/link";
import { Fuel, Gauge, MapPin } from "lucide-react";
import { SafeImg } from "./safe-img";
import { countryOf, exampleMonthly, money, showroomOf, type Vehicle } from "@/data/dealer";

export function conditionBadge(c: Vehicle["condition"]) {
  return c === "New" ? "bg-gold text-white" : c === "Certified pre-owned" ? "bg-ink text-white" : "bg-sand text-ink";
}

export function CarCard({ v }: { v: Vehicle }) {
  const s = showroomOf(v.showroom)!;
  const unit = countryOf(s.country).distance;
  const f = exampleMonthly(v);
  return (
    <Link href={`/cars/${v.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <SafeImg src={v.image} alt={`${v.year} ${v.make} ${v.model}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold ${conditionBadge(v.condition)}`}>{v.condition}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">{v.year} · {v.body}</p>
        <h3 className="font-display mt-0.5 text-xl font-bold text-ink">{v.make} {v.model}</h3>
        <p className="text-sm text-foreground/60">{v.trim}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60">
          <span className="flex items-center gap-1"><Gauge className="size-3.5" /> {v.mileage === 0 ? "New" : `${v.mileage.toLocaleString("en")} ${unit}`}</span>
          <span className="flex items-center gap-1"><Fuel className="size-3.5" /> {v.fuel}</span>
          <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {s.city}</span>
        </div>
        <div className="mt-auto pt-4">
          <p className="font-display text-2xl font-extrabold text-ink">{money(v.price, s.country)}</p>
          <p className="text-xs text-foreground/55">or about {money(f.monthly, s.country)}/month*</p>
        </div>
      </div>
    </Link>
  );
}
