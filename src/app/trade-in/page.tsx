import { Suspense } from "react";
import { TradeInForm } from "./trade-in-form";

export const metadata = { title: "Value my car — Meridian Motors" };

export default function TradeInPage() {
  return <Suspense fallback={null}><TradeInForm /></Suspense>;
}
