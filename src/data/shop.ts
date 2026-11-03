export type ShopCategory = "cars" | "clothes" | "maps";

export type ShopBadge = "hot" | "new" | "limited";

export type ShopProduct = {
  id: string;
  category: ShopCategory;
  badge?: ShopBadge;
  featured?: boolean;
  name: { ar: string; en: string };
  blurb: { ar: string; en: string };
  price: string;
  image: string;
  meta: { ar: string; en: string };
};

export const shopCategories: ShopCategory[] = ["cars", "clothes", "maps"];

export const shopProducts: ShopProduct[] = [
  {
    id: "sultan-dynasty",
    category: "cars",
    badge: "hot",
    featured: true,
    name: { ar: "Sultan Dynasty", en: "Sultan Dynasty" },
    blurb: {
      ar: "سيدان بنفسجي معدّل بالكامل — صوت، عجلات، وإضاءة جاهزة للشارع.",
      en: "Full purple custom sedan — tuned audio, wheels, and street-ready lights.",
    },
    price: "$35",
    image: "/shop/shop-sultan.jpg",
    meta: { ar: "Vehicle Pack · Handling", en: "Vehicle Pack · Handling" },
  },
  {
    id: "buffalo-night",
    category: "cars",
    badge: "new",
    name: { ar: "Buffalo Night Runner", en: "Buffalo Night Runner" },
    blurb: {
      ar: "ماسكل كار ليلي بلمسات كروم وبنفسجي — حضور يوقف الشارع.",
      en: "Night muscle with chrome and violet — presence that stops the block.",
    },
    price: "$40",
    image: "/shop/shop-buffalo.jpg",
    meta: { ar: "Muscle · Addon", en: "Muscle · Addon" },
  },
  {
    id: "elegy-drift",
    category: "cars",
    badge: "limited",
    name: { ar: "Elegy Drift King", en: "Elegy Drift King" },
    blurb: {
      ar: "كوبيه تيونر بوايد بودي وأندر جلو بنفسجي — للدرفت والحروب.",
      en: "Widebody tuner coupe with violet underglow — built for drift and wars.",
    },
    price: "$45",
    image: "/shop/shop-elegy.jpg",
    meta: { ar: "Tuner · Drift", en: "Tuner · Drift" },
  },
  {
    id: "bandana-pack",
    category: "clothes",
    badge: "hot",
    name: { ar: "Ballas Bandana Pack", en: "Ballas Bandana Pack" },
    blurb: {
      ar: "بانداينات، سلاسل، وإكسسوارات بنفسجية جاهزة لرولبلاي العصابة.",
      en: "Bandanas, chains, and purple accessories ready for set RP.",
    },
    price: "$15",
    image: "/shop/shop-bandana.jpg",
    meta: { ar: "Props · Accessories", en: "Props · Accessories" },
  },
  {
    id: "crown-streetwear",
    category: "clothes",
    badge: "new",
    featured: true,
    name: { ar: "Purple Crown Streetwear", en: "Purple Crown Streetwear" },
    blurb: {
      ar: "هودي، جاكيت، وسبور بنفسجي أوفرسايز — لوك شارع كامل.",
      en: "Oversized purple hoodie, jacket, and kicks — full street look.",
    },
    price: "$22",
    image: "/shop/shop-streetwear.jpg",
    meta: { ar: "Clothing · Male/Female", en: "Clothing · Male/Female" },
  },
  {
    id: "davis-fit",
    category: "clothes",
    name: { ar: "Davis Block Fit", en: "Davis Block Fit" },
    blurb: {
      ar: "طقم عصابة كامل من الرأس للقدم — بانداينا، جاكيت، وبنطلون واسع.",
      en: "Full set fit head to toe — bandana, jacket, and baggy pants.",
    },
    price: "$28",
    image: "/shop/shop-outfit.jpg",
    meta: { ar: "Full Outfit", en: "Full Outfit" },
  },
  {
    id: "clubhouse-mlo",
    category: "maps",
    badge: "hot",
    featured: true,
    name: { ar: "Ballas Clubhouse MLO", en: "Ballas Clubhouse MLO" },
    blurb: {
      ar: "نادي داخلي بإضاءة بنفسجية، جلسات، وطاولة بلياردو — مقر العصابة.",
      en: "Purple-lit clubhouse with lounges and pool table — the set HQ.",
    },
    price: "$60",
    image: "/shop/shop-clubhouse.jpg",
    meta: { ar: "Interior MLO", en: "Interior MLO" },
  },
  {
    id: "trap-davis",
    category: "maps",
    badge: "new",
    name: { ar: "Davis Trap House", en: "Davis Trap House" },
    blurb: {
      ar: "مبنى خارجي ليلي في ديفيس مع جرافيتي وسياج — جو شارع حقيقي.",
      en: "Night exterior in Davis with graffiti and fence — real street energy.",
    },
    price: "$48",
    image: "/shop/shop-traphouse.jpg",
    meta: { ar: "Exterior · Shell", en: "Exterior · Shell" },
  },
  {
    id: "garage-chamberlain",
    category: "maps",
    badge: "limited",
    name: { ar: "Chamberlain Garage", en: "Chamberlain Garage" },
    blurb: {
      ar: "كراج تحت الأرض بإضاءة LED بنفسجية ورافعات — لتخزين الأسطول.",
      en: "Underground garage with violet LEDs and lifts — stash the fleet.",
    },
    price: "$55",
    image: "/shop/shop-garage.jpg",
    meta: { ar: "Garage MLO", en: "Garage MLO" },
  },
];
