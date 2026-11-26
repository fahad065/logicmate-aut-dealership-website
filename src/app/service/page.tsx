import { Suspense } from "react";
import { ServiceForm } from "./service-form";

export const metadata = { title: "Service & MOT — Meridian Motors" };

export default function ServicePage() {
  return <Suspense fallback={null}><ServiceForm /></Suspense>;
}
