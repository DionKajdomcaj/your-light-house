import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import colModern from "@/assets/collection-modern.jpg";
import colClassic from "@/assets/collection-classic.jpg";
import colOutdoor from "@/assets/collection-outdoor.jpg";
import colKids from "@/assets/collection-kids.jpg";

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  type: string;
  price: number;
  finishes: string[];
  image: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const collections: Collection[] = [
  {
    slug: "modern",
    name: "Modern",
    tagline: "Architectural restraint",
    description:
      "Pared-back silhouettes in brass, blackened steel and opal glass — built for rooms where the light is the gesture.",
    image: colModern,
  },
  {
    slug: "classic",
    name: "Classic",
    tagline: "Crystal and candlelight",
    description:
      "Hand-finished chandeliers and sconces drawing from European decorative traditions, reissued for contemporary homes.",
    image: colClassic,
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    tagline: "Weather, warmly answered",
    description:
      "IP-rated wall lanterns, bollards and ceiling fixtures engineered for terraces, gardens and façades.",
    image: colOutdoor,
  },
  {
    slug: "kids",
    name: "Kids",
    tagline: "Soft worlds, soft light",
    description:
      "Sculptural ceiling and wall pieces designed for bedrooms — playful forms, warm temperatures, gentle dimming.",
    image: colKids,
  },
];

export const products: Product[] = [
  {
    slug: "orbit-pendant",
    name: "Orbit Pendant",
    collection: "modern",
    type: "Pendant",
    price: 289,
    finishes: ["Brushed brass", "Matte black", "Polished nickel"],
    image: product1,
    description:
      "A single opal globe suspended from a slender brass collar. Designed to hang in pairs over a kitchen island or alone above a stairwell.",
    specs: [
      { label: "Diameter", value: "180 mm" },
      { label: "Drop", value: "Adjustable 400–1800 mm" },
      { label: "Bulb", value: "1 × E27, max 60W" },
      { label: "Material", value: "Solid brass, opal glass" },
    ],
  },
  {
    slug: "aurelia-chandelier",
    name: "Aurelia Chandelier",
    collection: "classic",
    type: "Chandelier",
    price: 1480,
    finishes: ["Aged brass", "Antique gold"],
    image: product2,
    description:
      "Seven candle arms strung with hand-cut crystal pendants. A reissue of an 1890s Venetian model, made today in our Brescia workshop.",
    specs: [
      { label: "Diameter", value: "720 mm" },
      { label: "Height", value: "880 mm" },
      { label: "Bulbs", value: "7 × E14, max 40W" },
      { label: "Material", value: "Brass, lead crystal" },
    ],
  },
  {
    slug: "harbor-wall-lantern",
    name: "Harbor Wall Lantern",
    collection: "outdoor",
    type: "Wall lantern",
    price: 245,
    finishes: ["Matte black", "Graphite"],
    image: product3,
    description:
      "An IP44-rated lantern in powder-coated aluminium with clear tempered glass. Cast a warm pool of light beside a door or along a garden wall.",
    specs: [
      { label: "Height", value: "420 mm" },
      { label: "Rating", value: "IP44, marine-grade" },
      { label: "Bulb", value: "1 × E27, max 40W" },
      { label: "Material", value: "Aluminium, tempered glass" },
    ],
  },
  {
    slug: "nimbus-ceiling",
    name: "Nimbus Ceiling Lamp",
    collection: "kids",
    type: "Ceiling lamp",
    price: 178,
    finishes: ["Cloud white", "Soft blush"],
    image: product4,
    description:
      "A soft cloud-shaped flush mount with a dimmable LED panel tuned to a warm 2700K glow. Quiet, calm, child-safe.",
    specs: [
      { label: "Diameter", value: "440 mm" },
      { label: "Source", value: "Integrated LED, 18W, 2700K" },
      { label: "Dimming", value: "Phase-cut compatible" },
      { label: "Material", value: "Acrylic shade, steel base" },
    ],
  },
  {
    slug: "arpa-floor-lamp",
    name: "Arpa Floor Lamp",
    collection: "modern",
    type: "Floor lamp",
    price: 395,
    finishes: ["Matte black", "Ivory"],
    image: product5,
    description:
      "An adjustable reading lamp with a tilting linen drum and weighted iron base. Pulls forward over a chair, retracts against a wall.",
    specs: [
      { label: "Height", value: "1520 mm" },
      { label: "Base", value: "Ø 260 mm cast iron" },
      { label: "Bulb", value: "1 × E27, max 60W" },
      { label: "Switch", value: "Foot-operated" },
    ],
  },
  {
    slug: "amber-table-lamp",
    name: "Amber Table Lamp",
    collection: "classic",
    type: "Table lamp",
    price: 215,
    finishes: ["Amber glass / brass"],
    image: product6,
    description:
      "Ribbed amber glass cup on a turned brass stem. A small, warm light for a hallway console or a bedside table.",
    specs: [
      { label: "Height", value: "340 mm" },
      { label: "Bulb", value: "1 × E14, max 25W" },
      { label: "Cable", value: "2 m braided, in-line dimmer" },
      { label: "Material", value: "Hand-blown glass, brass" },
    ],
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const getProductsByCollection = (slug: string) =>
  products.filter((p) => p.collection === slug);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
