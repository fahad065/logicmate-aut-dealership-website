import { Suspense } from "react";
import { TestDriveForm } from "./test-drive-form";

export const metadata = { title: "Book a test drive — Meridian Motors" };

export default function TestDrivePage() {
  return <Suspense fallback={null}><TestDriveForm /></Suspense>;
}
