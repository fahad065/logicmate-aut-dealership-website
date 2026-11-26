# Meridian Motors — Demo Car Dealership Website

A standalone, frontend-only Next.js demo site built to showcase the LogicMate
auto dealership chatbot widget on a realistic international multi-brand
dealer — two showrooms in the UAE (Dubai, Abu Dhabi) and four abroad (London,
Dallas, Melbourne, Toronto), with 24 new, certified pre-owned and used cars
priced in each showroom's own currency. **This is not a real business** — cars,
prices, finance rates, showrooms, phone numbers and reviews are illustrative,
and Meridian Motors is not an authorised dealer of any brand shown.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- `lucide-react` + `react-icons/fa` for icons
- `Sora` (headings) + `Inter` (body) via `next/font/google`
- No backend, no database, no API calls — all content lives in `src/data/dealer.ts`.
  Forms (Test drive, Trade-in, Service, Contact) simulate a network request and
  show a success state, but submit nowhere. The finance calculator is an
  estimate only.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Pages

- `/` — Home: featured cars, quick links by body type and fuel, showrooms, reviews
- `/cars` — All 24 cars; filter with `?showroom=<slug>`, `?condition=new|certified|used`, `?body=suv|sedan|hatchback|pickup`, `?fuel=petrol|diesel|hybrid|electric`
- `/cars/<slug>` — One page per car: price, specs, features, warranty, finance example, test-drive and trade-in buttons, showroom contact
- `/finance` — Payment calculator (`?car=<slug>` preselects) + finance products, rates, terms and documents per country
- `/trade-in` — Value my car (mock submit); `?car=<slug>` notes the car being traded towards
- `/test-drive` — Test-drive request (mock submit); `?car=<slug>` or `?showroom=<slug>` preselect; home test drives in Dubai and London
- `/service` — Service prices per showroom + service request (mock submit); `?showroom=<slug>`
- `/showrooms` — 6 showrooms: address, phone/WhatsApp, hours + time zone, languages, parking, services
- `/policies` — Warranty (new / certified / used), test drives, reservations, trade-in, delivery, returns, service + FAQ
- `/about`, `/contact`

## Setting up the matching chatbot

The full knowledge base for this site is `auto-dealership-knowledge-base.md`
(delivered with the chatbot's CMS content) — 65 entries generated from the same
data as this site: one per car (price, mileage, specs, warranty, finance
example, link `https://<this-site>/cars/<slug>`), test drives and servicing per
showroom, finance per country, warranty, policies, FAQs and hand-off entries,
plus the Locations and Overview settings. In short:

- **Knowledge Base tab** — paste the entries; attach car photos to each car.
- **Locations tab** — one location per showroom with its "Brands & services".
- **Overview → Test drive booking link** — `https://<this-site>/test-drive`.

Useful demo questions: "Do you have an electric SUV in London?", "How much is
the Land Cruiser a month?", "Can I service my car in Melbourne?" (no — sales
only), "Do you do home test drives in Dallas?" (no — Dubai and London only),
"I want to make an offer on the Patrol" (hand-off), "What do I need for finance
in Dubai?".

## Adding the LogicMate chatbot widget

Open `src/app/layout.tsx` and find the commented placeholder inside `<head>`.
Paste the `<script>` snippet from your chatbot's **Channels → Website** tab
right there — it self-injects a floating chat bubble, nothing else on the
page needs to change.

## Notes

- Images are hotlinked from Unsplash and fall back to a branded gradient
  (`src/components/safe-img.tsx`) if a URL fails to load — check them on the
  machine you're demoing from.
- Prices are set per showroom in local currency (`src/data/dealer.ts`).
