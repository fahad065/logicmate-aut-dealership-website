// Meridian Motors — demo multi-brand dealership. Illustrative only: showrooms,
// cars, prices, finance rates and phone numbers are made up for demo purposes.
// Not an authorised dealer of any brand named here.

export type CountryCode = "AE" | "GB" | "US" | "AU" | "CA";

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
  distance: "km" | "mi";
  /** Refundable holding deposit (local currency). */
  holdDeposit: number;
  finance: {
    rateLabel: string;
    /** Annual rate used for the example monthly payments. */
    rate: number;
    minDownPct: number;
    terms: string;
    products: string;
    documents: string;
    note: string;
  };
  registrationDoc: string;
}

export const countries: Country[] = [
  {
    code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", distance: "km", holdDeposit: 5000,
    finance: {
      rateLabel: "from 3.49% a year, reducing balance", rate: 3.49, minDownPct: 20, terms: "12 to 60 months",
      products: "Bank car loans through our partner banks",
      documents: "Emirates ID, passport with residence visa, UAE driving licence, salary certificate and 3 months' bank statements (minimum salary AED 5,000 a month)",
      note: "UAE rules require at least 20% down payment. Approval and the final rate are decided by the bank.",
    },
    registrationDoc: "registration card (Mulkiya)",
  },
  {
    code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", distance: "mi", holdDeposit: 500,
    finance: {
      rateLabel: "representative 7.9% APR", rate: 7.9, minDownPct: 10, terms: "24 to 60 months",
      products: "Hire Purchase (HP) and Personal Contract Purchase (PCP)",
      documents: "UK driving licence, proof of address and 3 years' address history; a credit check is run",
      note: "Finance is subject to status and provided by our lending partners. We are a credit broker, not a lender.",
    },
    registrationDoc: "V5C logbook",
  },
  {
    code: "US", name: "United States", flag: "🇺🇸", currency: "USD", distance: "mi", holdDeposit: 500,
    finance: {
      rateLabel: "APR from 5.99% with approved credit", rate: 5.99, minDownPct: 10, terms: "36 to 72 months",
      products: "Auto loans and leases through our lending partners",
      documents: "Driver's licence, proof of income (recent pay stubs) and proof of insurance; a credit check is run",
      note: "Rates depend on your credit score. Tax, title and licence fees are extra.",
    },
    registrationDoc: "title",
  },
  {
    code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", distance: "km", holdDeposit: 500,
    finance: {
      rateLabel: "comparison rate from 7.49% p.a.", rate: 7.49, minDownPct: 0, terms: "12 to 84 months",
      products: "Consumer and business car loans, including balloon payments",
      documents: "Australian driver licence, recent payslips and bank statements; a credit check is run",
      note: "Subject to lender approval. Prices are drive-away unless stated.",
    },
    registrationDoc: "registration papers",
  },
  {
    code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", distance: "km", holdDeposit: 500,
    finance: {
      rateLabel: "from 5.49% APR, on approved credit", rate: 5.49, minDownPct: 0, terms: "36 to 84 months",
      products: "Car loans and leases through our lending partners",
      documents: "Ontario driver's licence, proof of income and proof of insurance; a credit check is run",
      note: "Prices exclude HST and licensing. Rates depend on your credit.",
    },
    registrationDoc: "ownership permit",
  },
];

export const countryOf = (code: CountryCode) => countries.find((c) => c.code === code)!;

export interface Showroom {
  slug: string;
  name: string;
  city: string;
  country: CountryCode;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  timezone: string;
  hours: { days: string; time: string }[];
  languages: string[];
  services: string[];
  serviceCentre: boolean;
  /** Minor / major service prices (local currency), if there's a workshop. */
  servicePrices?: { minor: number; major: number };
  homeTestDrive: boolean;
  parking: string;
  mapsUrl: string;
  image: string;
}

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=60`;

export const showrooms: Showroom[] = [
  {
    slug: "dubai", name: "Meridian Motors Dubai", city: "Dubai", country: "AE",
    address: "Showroom 12, Sheikh Zayed Road (Al Quoz 1), Dubai, UAE", phone: "+971 4 555 0910", whatsapp: "+971 50 555 0910", email: "dubai@meridian-motors.example",
    timezone: "GST (UTC+4)",
    hours: [{ days: "Saturday – Thursday", time: "9:00 am – 9:00 pm" }, { days: "Friday", time: "2:00 pm – 9:00 pm" }],
    languages: ["English", "Arabic", "Hindi", "Urdu", "Russian"],
    services: ["New cars", "Certified pre-owned", "Finance", "Trade-in", "Service centre", "Body shop", "Home test drives"],
    serviceCentre: true, servicePrices: { minor: 650, major: 1450 }, homeTestDrive: true,
    parking: "Free customer parking at the showroom", mapsUrl: "https://maps.google.com/?q=Sheikh+Zayed+Road+Al+Quoz+1+Dubai",
    image: img("photo-1562141961-b5d1e1e8f0b5"),
  },
  {
    slug: "abu-dhabi", name: "Meridian Motors Abu Dhabi", city: "Abu Dhabi", country: "AE",
    address: "Plot 7, Al Khaleej Al Arabi Street, Abu Dhabi, UAE", phone: "+971 2 555 0920", whatsapp: "+971 50 555 0920", email: "abudhabi@meridian-motors.example",
    timezone: "GST (UTC+4)",
    hours: [{ days: "Saturday – Thursday", time: "9:00 am – 9:00 pm" }, { days: "Friday", time: "2:00 pm – 9:00 pm" }],
    languages: ["English", "Arabic", "Hindi", "Tagalog"],
    services: ["New cars", "Certified pre-owned", "Finance", "Trade-in", "Service centre"],
    serviceCentre: true, servicePrices: { minor: 600, major: 1400 }, homeTestDrive: false,
    parking: "Free customer parking", mapsUrl: "https://maps.google.com/?q=Al+Khaleej+Al+Arabi+Street+Abu+Dhabi",
    image: img("photo-1567818735868-e71b99932e29"),
  },
  {
    slug: "london", name: "Meridian Motors London", city: "London", country: "GB",
    address: "Unit 4, Western Avenue, Park Royal, London NW10 7NZ, UK", phone: "+44 20 7946 0930", whatsapp: "+44 7700 900930", email: "london@meridian-motors.example",
    timezone: "GMT/BST (UTC+0/+1)",
    hours: [{ days: "Monday – Friday", time: "9:00 am – 7:00 pm" }, { days: "Saturday", time: "9:00 am – 6:00 pm" }, { days: "Sunday", time: "10:30 am – 4:30 pm" }],
    languages: ["English", "Polish", "Arabic", "Punjabi"],
    services: ["New cars", "Approved used", "Finance (HP & PCP)", "Part-exchange", "Service centre & MOT", "Home test drives"],
    serviceCentre: true, servicePrices: { minor: 189, major: 349 }, homeTestDrive: true,
    parking: "Free customer parking; nearest Tube: Park Royal (Piccadilly line)", mapsUrl: "https://maps.google.com/?q=Western+Avenue+Park+Royal+London",
    image: img("photo-1580274455191-1c62238fa333"),
  },
  {
    slug: "dallas", name: "Meridian Motors Dallas", city: "Dallas", country: "US",
    address: "8800 N Central Expressway, Dallas, TX 75231, USA", phone: "+1 (214) 555-0940", whatsapp: "+1 (469) 555-0940", email: "dallas@meridian-motors.example",
    timezone: "CT (UTC−6/−5)",
    hours: [{ days: "Monday – Saturday", time: "9:00 am – 8:00 pm" }, { days: "Sunday", time: "Closed" }],
    languages: ["English", "Spanish", "Vietnamese"],
    services: ["New cars", "Certified pre-owned", "Finance & leasing", "Trade-in", "Service centre"],
    serviceCentre: true, servicePrices: { minor: 89, major: 449 }, homeTestDrive: false,
    parking: "Free customer parking", mapsUrl: "https://maps.google.com/?q=8800+N+Central+Expressway+Dallas",
    image: img("photo-1605559424843-9e4c228bf1c2"),
  },
  {
    slug: "melbourne", name: "Meridian Motors Melbourne", city: "Melbourne", country: "AU",
    address: "512 Ferntree Gully Road, Notting Hill VIC 3168, Australia", phone: "+61 3 5550 0950", whatsapp: "+61 412 555 950", email: "melbourne@meridian-motors.example",
    timezone: "AEST/AEDT (UTC+10/+11)",
    hours: [{ days: "Monday – Friday", time: "8:30 am – 6:00 pm" }, { days: "Saturday", time: "8:30 am – 5:00 pm" }, { days: "Sunday", time: "10:00 am – 4:00 pm" }],
    languages: ["English", "Mandarin", "Greek", "Vietnamese"],
    services: ["New cars", "Used cars", "Finance", "Trade-in"],
    serviceCentre: false, homeTestDrive: false,
    parking: "Free customer parking", mapsUrl: "https://maps.google.com/?q=Ferntree+Gully+Road+Notting+Hill+VIC",
    image: img("photo-1597007030739-6d2e7172ee6e"),
  },
  {
    slug: "toronto", name: "Meridian Motors Toronto", city: "Toronto", country: "CA",
    address: "1200 Castlefield Avenue, Toronto, ON M6B 1G2, Canada", phone: "+1 (416) 555-0960", whatsapp: "+1 (647) 555-0960", email: "toronto@meridian-motors.example",
    timezone: "ET (UTC−5/−4)",
    hours: [{ days: "Monday – Thursday", time: "9:00 am – 8:00 pm" }, { days: "Friday – Saturday", time: "9:00 am – 6:00 pm" }, { days: "Sunday", time: "Closed" }],
    languages: ["English", "French", "Portuguese", "Tagalog"],
    services: ["New cars", "Certified pre-owned", "Finance & leasing", "Trade-in", "Service centre", "Winter tyre storage"],
    serviceCentre: true, servicePrices: { minor: 129, major: 489 }, homeTestDrive: false,
    parking: "Free customer parking", mapsUrl: "https://maps.google.com/?q=1200+Castlefield+Avenue+Toronto",
    image: img("photo-1532974297617-c0f05fe48bff"),
  },
];

export const showroomOf = (slug: string | undefined | null) => showrooms.find((s) => s.slug === slug);

export type Condition = "New" | "Certified pre-owned" | "Used";
export type Body = "SUV" | "Sedan" | "Hatchback" | "Pickup" | "Coupe";

export interface Vehicle {
  slug: string;
  showroom: string;
  condition: Condition;
  year: number;
  make: string;
  model: string;
  trim: string;
  body: Body;
  /** Local currency of the showroom's country. */
  price: number;
  mileage: number;
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  transmission: "Automatic" | "Manual";
  seats: number;
  colour: string;
  /** Range for electric cars, else engine. */
  engine: string;
  features: string[];
  image: string;
}

const CAR = [
  img("photo-1494976388531-d1058494cdd8", 900), img("photo-1552519507-da3b142c6e3d", 900), img("photo-1542362567-b07e54358753", 900),
  img("photo-1533473359331-0135ef1b58bf", 900), img("photo-1583121274602-3e2820c69888", 900), img("photo-1549317661-bd32c8ce0db2", 900),
  img("photo-1606664515524-ed2f786a0bd6", 900), img("photo-1617788138017-80ad40651399", 900), img("photo-1560958089-b8a1929cea89", 900),
  img("photo-1568605117036-5fe5e7bab0b7", 900), img("photo-1503376780353-7e6692767b70", 900), img("photo-1511919884226-fd3cad34687c", 900),
];
const c = (i: number) => CAR[i % CAR.length];

export const vehicles: Vehicle[] = [
  // Dubai (AED, km)
  { slug: "2025-toyota-land-cruiser-gxr-dubai", showroom: "dubai", condition: "New", year: 2025, make: "Toyota", model: "Land Cruiser", trim: "GXR 3.5 V6 twin-turbo", body: "SUV", price: 329900, mileage: 0, fuel: "Petrol", transmission: "Automatic", seats: 7, colour: "Pearl White", engine: "3.5L V6 twin-turbo, 409 hp", features: ["4WD with crawl control", "360° camera", "Cooled front seats", "Apple CarPlay & Android Auto"], image: c(0) },
  { slug: "2024-nissan-patrol-le-platinum-dubai", showroom: "dubai", condition: "Certified pre-owned", year: 2024, make: "Nissan", model: "Patrol", trim: "LE Platinum", body: "SUV", price: 279000, mileage: 18000, fuel: "Petrol", transmission: "Automatic", seats: 8, colour: "Black", engine: "5.6L V8, 400 hp", features: ["GCC spec", "Rear entertainment screens", "Full service history", "Remaining factory warranty"], image: c(1) },
  { slug: "2025-tesla-model-y-long-range-dubai", showroom: "dubai", condition: "New", year: 2025, make: "Tesla", model: "Model Y", trim: "Long Range AWD", body: "SUV", price: 199990, mileage: 0, fuel: "Electric", transmission: "Automatic", seats: 5, colour: "Midnight Silver", engine: "Electric, about 530 km range", features: ["Dual-motor AWD", "Glass roof", "15-inch touchscreen", "Free home charger installation in Dubai"], image: c(7) },
  { slug: "2022-toyota-camry-hybrid-dubai", showroom: "dubai", condition: "Used", year: 2022, make: "Toyota", model: "Camry", trim: "Grande Hybrid 2.5", body: "Sedan", price: 89500, mileage: 42000, fuel: "Hybrid", transmission: "Automatic", seats: 5, colour: "Silver", engine: "2.5L hybrid, 215 hp", features: ["GCC spec", "One owner", "Leather seats", "Sunroof"], image: c(2) },
  // Abu Dhabi (AED, km)
  { slug: "2025-lexus-rx-350h-abu-dhabi", showroom: "abu-dhabi", condition: "New", year: 2025, make: "Lexus", model: "RX", trim: "350h F Sport", body: "SUV", price: 299000, mileage: 0, fuel: "Hybrid", transmission: "Automatic", seats: 5, colour: "Sonic Grey", engine: "2.5L hybrid AWD, 246 hp", features: ["Mark Levinson audio", "Head-up display", "Panoramic roof", "Lexus Safety System+"], image: c(3) },
  { slug: "2024-ford-f-150-raptor-abu-dhabi", showroom: "abu-dhabi", condition: "Certified pre-owned", year: 2024, make: "Ford", model: "F-150", trim: "Raptor", body: "Pickup", price: 339000, mileage: 12000, fuel: "Petrol", transmission: "Automatic", seats: 5, colour: "Code Orange", engine: "3.5L V6 EcoBoost, 450 hp", features: ["Fox Live Valve suspension", "Off-road modes", "B&O audio", "Remaining factory warranty"], image: c(4) },
  { slug: "2023-hyundai-tucson-abu-dhabi", showroom: "abu-dhabi", condition: "Used", year: 2023, make: "Hyundai", model: "Tucson", trim: "2.5 GDi", body: "SUV", price: 82000, mileage: 35000, fuel: "Petrol", transmission: "Automatic", seats: 5, colour: "Amazon Grey", engine: "2.5L petrol, 187 hp", features: ["GCC spec", "Wireless phone charging", "Lane keeping assist", "Full service history"], image: c(5) },
  { slug: "2025-byd-seal-abu-dhabi", showroom: "abu-dhabi", condition: "New", year: 2025, make: "BYD", model: "Seal", trim: "Performance AWD", body: "Sedan", price: 175900, mileage: 0, fuel: "Electric", transmission: "Automatic", seats: 5, colour: "Arctic Blue", engine: "Electric, about 520 km range", features: ["0–100 km/h in 3.8 s", "Rotating 15.6-inch screen", "Heat pump", "8-year battery warranty"], image: c(8) },
  // London (GBP, miles)
  { slug: "2025-volkswagen-golf-life-london", showroom: "london", condition: "New", year: 2025, make: "Volkswagen", model: "Golf", trim: "1.5 eTSI Life", body: "Hatchback", price: 28995, mileage: 0, fuel: "Hybrid", transmission: "Automatic", seats: 5, colour: "Moonstone Grey", engine: "1.5L mild hybrid, 148 hp", features: ["Digital cockpit", "Adaptive cruise control", "Heated front seats", "Ultra Low Emission Zone compliant"], image: c(6) },
  { slug: "2023-bmw-320i-m-sport-london", showroom: "london", condition: "Certified pre-owned", year: 2023, make: "BMW", model: "3 Series", trim: "320i M Sport", body: "Sedan", price: 26750, mileage: 21000, fuel: "Petrol", transmission: "Automatic", seats: 5, colour: "Alpine White", engine: "2.0L petrol, 181 hp", features: ["Full BMW service history", "Live Cockpit Professional", "Parking sensors", "ULEZ compliant"], image: c(10) },
  { slug: "2024-kia-ev6-gt-line-london", showroom: "london", condition: "Used", year: 2024, make: "Kia", model: "EV6", trim: "GT-Line", body: "SUV", price: 33500, mileage: 9500, fuel: "Electric", transmission: "Automatic", seats: 5, colour: "Runway Red", engine: "Electric, about 300 miles range", features: ["800V ultra-fast charging", "Remaining 7-year Kia warranty", "Heat pump", "Vehicle-to-load socket"], image: c(9) },
  { slug: "2022-land-rover-defender-110-london", showroom: "london", condition: "Used", year: 2022, make: "Land Rover", model: "Defender", trim: "110 D250 SE", body: "SUV", price: 52995, mileage: 31000, fuel: "Diesel", transmission: "Automatic", seats: 5, colour: "Gondwana Stone", engine: "3.0L mild-hybrid diesel, 246 hp", features: ["Air suspension", "Towing pack", "Meridian sound", "Full Land Rover history"], image: c(11) },
  // Dallas (USD, miles)
  { slug: "2025-ford-f-150-xlt-dallas", showroom: "dallas", condition: "New", year: 2025, make: "Ford", model: "F-150", trim: "XLT SuperCrew 4x4", body: "Pickup", price: 54990, mileage: 0, fuel: "Petrol", transmission: "Automatic", seats: 5, colour: "Antimatter Blue", engine: "2.7L EcoBoost V6, 325 hp", features: ["Tow package (up to 9,000 lb)", "Pro Trailer Backup Assist", "12-inch touchscreen", "Ford Co-Pilot360"], image: c(4) },
  { slug: "2024-toyota-rav4-hybrid-xle-dallas", showroom: "dallas", condition: "Certified pre-owned", year: 2024, make: "Toyota", model: "RAV4", trim: "Hybrid XLE", body: "SUV", price: 33900, mileage: 14000, fuel: "Hybrid", transmission: "Automatic", seats: 5, colour: "Blueprint", engine: "2.5L hybrid AWD, 219 hp", features: ["About 39 mpg combined", "Toyota Safety Sense 2.5", "Power moonroof", "Clean history report"], image: c(5) },
  { slug: "2023-tesla-model-3-long-range-dallas", showroom: "dallas", condition: "Used", year: 2023, make: "Tesla", model: "Model 3", trim: "Long Range AWD", body: "Sedan", price: 29500, mileage: 22000, fuel: "Electric", transmission: "Automatic", seats: 5, colour: "Pearl White", engine: "Electric, about 330 miles range", features: ["Autopilot", "Premium interior", "Remaining battery warranty", "Clean history report"], image: c(7) },
  { slug: "2025-chevrolet-tahoe-lt-dallas", showroom: "dallas", condition: "New", year: 2025, make: "Chevrolet", model: "Tahoe", trim: "LT 4WD", body: "SUV", price: 64850, mileage: 0, fuel: "Petrol", transmission: "Automatic", seats: 8, colour: "Black", engine: "5.3L V8, 355 hp", features: ["Third-row seating", "Max Trailering Package", "Heated front seats", "10.2-inch touchscreen"], image: c(0) },
  // Melbourne (AUD, km)
  { slug: "2025-toyota-hilux-sr5-melbourne", showroom: "melbourne", condition: "New", year: 2025, make: "Toyota", model: "HiLux", trim: "SR5 4x4 double cab", body: "Pickup", price: 64990, mileage: 0, fuel: "Diesel", transmission: "Automatic", seats: 5, colour: "Graphite", engine: "2.8L turbo-diesel, 150 kW", features: ["3,500 kg braked towing", "Tub liner", "Apple CarPlay & Android Auto", "Drive-away price"], image: c(3) },
  { slug: "2024-mazda-cx-5-touring-melbourne", showroom: "melbourne", condition: "Used", year: 2024, make: "Mazda", model: "CX-5", trim: "G25 Touring AWD", body: "SUV", price: 41990, mileage: 15000, fuel: "Petrol", transmission: "Automatic", seats: 5, colour: "Soul Red Crystal", engine: "2.5L petrol, 140 kW", features: ["Leather trim", "Head-up display", "Remaining Mazda warranty", "Drive-away price"], image: c(1) },
  { slug: "2023-hyundai-ioniq-5-melbourne", showroom: "melbourne", condition: "Used", year: 2023, make: "Hyundai", model: "Ioniq 5", trim: "Dynamiq AWD", body: "SUV", price: 52500, mileage: 28000, fuel: "Electric", transmission: "Automatic", seats: 5, colour: "Gravity Gold", engine: "Electric, about 430 km range", features: ["Ultra-fast charging", "Vehicle-to-load", "Remaining battery warranty", "Drive-away price"], image: c(8) },
  { slug: "2022-subaru-outback-melbourne", showroom: "melbourne", condition: "Used", year: 2022, make: "Subaru", model: "Outback", trim: "AWD Touring", body: "SUV", price: 36990, mileage: 48000, fuel: "Petrol", transmission: "Automatic", seats: 5, colour: "Autumn Green", engine: "2.5L petrol, 138 kW", features: ["EyeSight driver assist", "Roof rails", "Logbook serviced", "Drive-away price"], image: c(9) },
  // Toronto (CAD, km)
  { slug: "2025-honda-cr-v-hybrid-ex-l-toronto", showroom: "toronto", condition: "New", year: 2025, make: "Honda", model: "CR-V", trim: "Hybrid EX-L AWD", body: "SUV", price: 47990, mileage: 0, fuel: "Hybrid", transmission: "Automatic", seats: 5, colour: "Canyon River Blue", engine: "2.0L hybrid AWD, 204 hp", features: ["Heated seats and steering wheel", "Honda Sensing", "Wireless CarPlay", "Winter tyre package available"], image: c(2) },
  { slug: "2024-toyota-corolla-le-toronto", showroom: "toronto", condition: "Certified pre-owned", year: 2024, make: "Toyota", model: "Corolla", trim: "LE", body: "Sedan", price: 27900, mileage: 18000, fuel: "Petrol", transmission: "Automatic", seats: 5, colour: "Celestite Grey", engine: "2.0L petrol, 169 hp", features: ["Heated front seats", "Toyota Safety Sense 3.0", "Clean CARFAX report", "Remaining factory warranty"], image: c(6) },
  { slug: "2023-ford-mustang-mach-e-toronto", showroom: "toronto", condition: "Used", year: 2023, make: "Ford", model: "Mustang Mach-E", trim: "Select AWD", body: "SUV", price: 41500, mileage: 30000, fuel: "Electric", transmission: "Automatic", seats: 5, colour: "Grabber Blue", engine: "Electric, about 360 km range", features: ["Heat pump", "15.5-inch touchscreen", "Remaining battery warranty", "Clean CARFAX report"], image: c(10) },
  { slug: "2025-hyundai-palisade-toronto", showroom: "toronto", condition: "New", year: 2025, make: "Hyundai", model: "Palisade", trim: "Preferred AWD", body: "SUV", price: 54999, mileage: 0, fuel: "Petrol", transmission: "Automatic", seats: 8, colour: "Moonlight Cloud", engine: "3.8L V6, 291 hp", features: ["Three rows, 8 seats", "Heated second-row seats", "Smart Cruise Control", "Winter tyre package available"], image: c(11) },
];

export const vehicleOf = (slug: string | undefined | null) => vehicles.find((v) => v.slug === slug);

export function money(amount: number, code: CountryCode): string {
  const cur = countryOf(code).currency;
  return new Intl.NumberFormat("en", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(amount).replace(/ /g, " ");
}

/** Example monthly payment over 60 months with the country's minimum deposit (at least 10% for the example). */
export function exampleMonthly(v: Vehicle) {
  const s = showroomOf(v.showroom)!;
  const c = countryOf(s.country);
  const downPct = Math.max(c.finance.minDownPct, 10);
  const principal = v.price * (1 - downPct / 100);
  const r = c.finance.rate / 100 / 12;
  const n = 60;
  const monthly = (principal * r) / (1 - Math.pow(1 + r, -n));
  return { monthly: Math.round(monthly), downPct, down: Math.round(v.price * downPct / 100), months: n };
}

export const warranty = {
  New: "Full manufacturer's warranty (length depends on the brand, usually 3 to 5 years) plus roadside assistance.",
  "Certified pre-owned": "150-point inspection, 12-month Meridian Certified warranty (extendable to 36 months), roadside assistance and a 7-day / 500 km exchange promise.",
  Used: "Multi-point safety inspection, a 3-month powertrain warranty, and a full vehicle history report on request.",
} as const;

export const policies = [
  { title: "Test drives", question: "What do I need for a test drive?", body: "Bring a valid driving licence (visitors: your home licence plus passport; an International Driving Permit where the country requires one). Drivers must be 21 or over (25 for cars over 400 hp). Test drives last about 30 minutes with a sales consultant. Book ahead so the car is charged, fuelled and waiting." },
  { title: "Reserving a car", question: "Can I reserve a car? Do you take a deposit?", body: "A refundable holding deposit (AED 5,000 in the UAE; 500 in local currency elsewhere) holds a car for 72 hours while you arrange finance or a viewing. It comes off the price if you buy, and is refunded in full if you don't." },
  { title: "Trade-in / part-exchange", question: "Do you take trade-ins or part-exchange?", body: "We take any make and model. An online estimate is a guide only — the final offer comes after a free 20-minute appraisal at the showroom. Bring the registration document, service history and both keys. If there's finance outstanding, we settle it with your lender and take it off the price." },
  { title: "Delivery & registration", question: "Do you deliver the car and handle registration?", body: "We handle registration, plates and the first insurance quote. Free delivery to your home within the city; elsewhere on request." },
  { title: "Returns & exchanges", question: "Can I return or exchange a car?", body: "Certified pre-owned cars come with a 7-day / 500 km exchange promise. New cars can't be returned once registered. Consumer rights in your country always apply." },
  { title: "Service bookings", question: "How do service bookings work?", body: "Book a service at showrooms with a service centre. Free courtesy shuttle within 10 km, and a courtesy car on request for major services (subject to availability)." },
];

export const faqs = [
  { title: "Do you sell cars to visitors or export cars?", body: "Yes in Dubai and Abu Dhabi — our team handles export paperwork and shipping quotes. Elsewhere, cars are sold for local registration only." },
  { title: "Can I buy a car online?", body: "You can reserve a car online with a refundable deposit and arrange finance; the final paperwork is signed at the showroom or at your home with a home delivery." },
  { title: "Do you accept cash, card or bank transfer?", body: "Bank transfer, financed purchase or manager's cheque for the car itself; card for the holding deposit and service bills. Cash limits apply by country." },
  { title: "Are your prices negotiable?", body: "Our used-car prices are set from market data and include the inspection and warranty. Your sales consultant can talk about trade-in, finance and accessories packages." },
  { title: "Can I see the car's history?", body: "Yes. Every used and certified car has a service history and a vehicle history report (CARFAX in North America, HPI in the UK)." },
];
