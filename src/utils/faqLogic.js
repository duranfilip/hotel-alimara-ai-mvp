import { hotelKnowledge } from "../data/hotelKnowledge.js";
import { detectLanguage, includesAny } from "./language.js";

const blockedUnsupportedTopics = [
  "pool",
  "swimming",
  "piscina",
  "spa",
  "promotion",
  "promo",
  "discount",
  "descuento",
  "oferta",
  "room price",
  "habitacion precio",
  "availability",
  "available tonight",
  "disponibilidad",
  "menu",
  "menú",
];

const faqRoutes = [
  {
    key: "checkin",
    keywords: ["check-in", "check in", "entrada", "early check", "early"],
  },
  {
    key: "checkout",
    keywords: ["check-out", "check out", "salida", "late check", "late"],
  },
  {
    key: "parking",
    keywords: ["park", "parking", "charge", "charging", "electric", "carga", "eléctrica"],
  },
  {
    key: "breakfast",
    keywords: ["breakfast", "desayuno", "sunday", "domingo", "weekend", "holiday", "buffet", "discount", "discounts", "price", "prices", "precio", "precios", "descuento"],
  },
  {
    key: "restaurant",
    keywords: ["restaurant", "summum", "lunch", "dinner", "restaurante", "almuerzo", "comida", "cena"],
  },
  { key: "bar", keywords: ["bar", "drink", "bebida"] },
  {
    key: "events",
    keywords: [
      "event",
      "meeting",
      "conference",
      "corporate",
      "company",
      "wedding",
      "banquet",
      "sala",
      "evento",
      "reunión",
      "empresa",
      "boda",
      "banquete",
      "celebración",
      "congreso",
    ],
  },
  {
    key: "rooms",
    keywords: ["room", "rooms", "habitacion", "habitación", "superior", "double", "doble", "smoke", "fumar"],
  },
  {
    key: "contact",
    keywords: ["contact", "phone", "email", "reservation", "reserve", "teléfono", "correo", "reserva"],
  },
  {
    key: "location",
    keywords: ["where", "address", "location", "ubicación", "dirección", "dónde", "donde"],
  },
  {
    key: "reception",
    keywords: ["reception", "24", "language", "languages", "recepción", "idioma", "idiomas"],
  },
  { key: "laundry", keywords: ["laundry", "lavandería", "lavanderia"] },
  { key: "massage", keywords: ["massage", "masaje"] },
  {
    key: "sustainability",
    keywords: ["sustainability", "sustainable", "emas", "iso", "sostenibilidad", "ambiental"],
  },
  { key: "pets", keywords: ["pet", "pets", "dog", "cat", "mascota", "mascotas", "perro", "gato", "assistance dog", "perro de asistencia"] },
  { key: "wifi", keywords: ["wi-fi", "wifi", "internet", "high-speed", "alta velocidad"] },
  { key: "airport", keywords: ["airport", "el prat", "transfer", "taxi", "public transport", "aeropuerto", "traslado", "transporte público"] },
  { key: "cityCenter", keywords: ["city center", "centre", "center", "downtown", "metro", "bus", "centro", "centro de barcelona", "autobús"] },
  { key: "accessibility", keywords: ["accessibility", "accessible", "adapted", "reduced mobility", "wheelchair", "accesibilidad", "adaptada", "adaptadas", "movilidad reducida", "silla de ruedas"] },
  { key: "families", keywords: ["family", "families", "children", "kids", "crib", "cribs", "familia", "familias", "niños", "cuna", "cunas"] },
  { key: "gym", keywords: ["gym", "fitness", "gimnasio"] },
  { key: "luggage", keywords: ["luggage", "baggage", "storage", "suitcase", "equipaje", "maleta", "consigna"] },
  { key: "payment", keywords: ["payment", "pay", "credit card", "debit card", "cash", "guarantee", "pago", "pagar", "tarjeta", "efectivo", "garantizar"] },
  {
    key: "hotel",
    keywords: ["hotel alimara", "identity", "what is", "qué es", "que es"],
  },
];

const priorityFaqRoutes = [
  "pets",
  "wifi",
  "airport",
  "cityCenter",
  "accessibility",
  "families",
  "gym",
  "luggage",
  "payment",
];

export function answerFaq(question) {
  const trimmed = question.trim();
  const lang = detectLanguage(trimmed);

  if (!trimmed) return hotelKnowledge.emptyQuestion[lang];

  const text = trimmed.toLowerCase();

  // Local AI-style logic: route the question to a verified knowledge-base answer by matching known intent keywords.
  if (includesAny(text, blockedUnsupportedTopics)) return hotelKnowledge.unsupported[lang];

  const priorityRoute = faqRoutes.find(
    (item) => priorityFaqRoutes.includes(item.key) && includesAny(text, item.keywords)
  );
  if (priorityRoute) return hotelKnowledge[priorityRoute.key][lang];

  if (includesAny(text, faqRoutes[0].keywords) && includesAny(text, faqRoutes[1].keywords)) {
    return `${hotelKnowledge.checkin[lang]} ${hotelKnowledge.checkout[lang]}`;
  }

  const route = faqRoutes.find((item) => includesAny(text, item.keywords));
  return route ? hotelKnowledge[route.key][lang] : hotelKnowledge.unsupported[lang];
}
