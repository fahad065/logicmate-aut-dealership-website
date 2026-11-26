import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const display = Sora({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Meridian Motors — New & Certified Pre-Owned Cars in Dubai, Abu Dhabi, London, Dallas, Melbourne & Toronto",
  description:
    "Meridian Motors — new, certified pre-owned and used cars, finance, trade-in and servicing in Dubai, Abu Dhabi, London, Dallas, Melbourne and Toronto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <head>
        {/* ============================================================
            LogicMate chatbot widget — paste the <script> snippet from
            your chatbot's Channels → Website tab here, right before
            </head>. It self-injects a floating chat bubble, nothing
            else on this page needs to change.

            <script
              src="https://YOUR-FRONTEND-DOMAIN/chatbot-widget.js"
              data-embed-key="YOUR_EMBED_KEY"
              data-api-url="https://YOUR-API-DOMAIN/api/v1"
              async
            ></script>
           ============================================================ */}
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-[15px] text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
