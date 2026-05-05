import { detectLanguage, includesAny } from "./language.js";

const notSpecified = {
  en: "Not specified",
  es: "No especificado",
};

const vagueDateSignals = [
  "next week",
  "next month",
  "this week",
  "próxima semana",
  "proxima semana",
  "mes que viene",
  "próximo mes",
  "proximo mes",
  "esta semana",
];

const eventTypeRules = [
  ["Conference / congress", ["conference", "congress", "auditorium", "keynote", "speakers", "conferencia", "congreso", "auditorio", "ponentes"]],
  ["Training / workshop", ["training", "workshop", "course", "seminar", "learning session", "formación", "taller", "curso", "seminario"]],
  ["Wedding", ["wedding", "bride", "groom", "ceremony", "boda", "novia", "novio", "ceremonia"]],
  ["Banquet", ["banquet", "gala dinner", "formal dinner", "banquete", "cena de gala", "cena formal"]],
  ["Family celebration", ["communion", "baptism", "anniversary", "birthday", "family", "comunión", "comunion", "bautizo", "aniversario", "cumpleaños", "familia"]],
  ["Social event", ["celebration", "party", "farewell", "welcome event", "celebración", "fiesta", "despedida", "bienvenida"]],
  ["Corporate meeting", ["meeting", "company", "corporate", "business", "team", "projector", "boardroom", "coffee break", "reunión", "empresa", "corporativo", "negocio", "equipo", "proyector"]],
];

const serviceRules = [
  ["meeting room", ["meeting room", "boardroom", "sala", "sala de reuniones"]],
  ["catering", ["catering"]],
  ["coffee break", ["coffee break", "café", "cafe"]],
  ["lunch", ["lunch", "comida", "almuerzo"]],
  ["dinner", ["dinner", "gala dinner", "formal dinner", "cena"]],
  ["audiovisual equipment", ["audiovisual", "av equipment", "equipo audiovisual"]],
  ["projector", ["projector", "proyector"]],
  ["garden access", ["garden", "outdoor area", "networking", "jardín", "jardin", "exterior"]],
  ["accommodation", ["accommodation", "rooms", "habitaciones", "alojamiento"]],
  ["parking", ["parking", "aparcamiento"]],
  ["decoration", ["decoration", "decoración", "decoracion", "floral"]],
  ["entertainment", ["entertainment", "música", "musica", "dj"]],
  ["photography", ["photography", "fotografía", "fotografia"]],
  ["video", ["video", "vídeo"]],
];

const eventTypeTranslations = {
  "Corporate meeting": "Reunión corporativa",
  "Conference / congress": "Conferencia / congreso",
  "Training / workshop": "Formación / taller",
  Wedding: "Boda",
  Banquet: "Banquete",
  "Family celebration": "Celebración familiar",
  "Social event": "Evento social",
  "Other / unclear": "Otro / poco claro",
};

const serviceTranslations = {
  "meeting room": "sala de reuniones",
  catering: "catering",
  "coffee break": "coffee break",
  lunch: "comida",
  dinner: "cena",
  "audiovisual equipment": "equipo audiovisual",
  projector: "proyector",
  "garden access": "acceso al jardín",
  accommodation: "alojamiento",
  parking: "parking",
  decoration: "decoración",
  entertainment: "entretenimiento",
  photography: "fotografía",
  video: "vídeo",
};

function translateEventType(type, lang) {
  return lang === "es" ? eventTypeTranslations[type] : type;
}

function translateService(service, lang) {
  return lang === "es" ? serviceTranslations[service] : service;
}

function classifyEventType(text) {
  const lower = text.toLowerCase();
  const matched = eventTypeRules.find(([, keywords]) => includesAny(lower, keywords));
  return matched ? matched[0] : "Other / unclear";
}

function extractAttendees(text, lang) {
  const patterns = [
    /(?:around|about|approximately|approx\.?|for|para|unas|unos|alrededor de|aproximadamente)\s+(\d{1,4})\s*(?:people|guests|attendees|personas|invitados|asistentes)?/i,
    /(\d{1,4})\s*(?:people|guests|attendees|personas|invitados|asistentes)/i,
  ];

  const match = patterns.map((pattern) => text.match(pattern)).find(Boolean);
  if (!match) return notSpecified[lang];

  return lang === "es" ? `Aproximadamente ${match[1]} personas` : `Approximately ${match[1]} people`;
}

function extractDateTime(text, lang) {
  const lower = text.toLowerCase();
  if (includesAny(lower, ["no tenemos fecha", "fecha cerrada"])) return notSpecified[lang];

  const signals = [
    "today",
    "tomorrow",
    "tonight",
    "hoy",
    "mañana",
    ...vagueDateSignals,
  ];
  const found = signals.find((signal) => lower.includes(signal));
  if (found) return found;

  const dateMatch = text.match(/\b(\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?|\d{1,2}\s+(?:january|february|march|april|may|june|july|august|september|october|november|december|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre))\b/i);
  return dateMatch ? dateMatch[0] : notSpecified[lang];
}

function hasVagueDate(text) {
  return includesAny(text.toLowerCase(), vagueDateSignals);
}

function hasEventTime(text) {
  const lower = text.toLowerCase();
  return (
    /\b\d{1,2}(:\d{2})?\s?(am|pm)\b/i.test(text) ||
    /\b\d{1,2}:\d{2}\b/.test(text) ||
    includesAny(lower, ["morning", "afternoon", "evening", "mañana", "tarde", "noche"])
  );
}

function extractServices(text, lang) {
  const lower = text.toLowerCase();
  const found = serviceRules.filter(([, keywords]) => includesAny(lower, keywords)).map(([service]) => service);
  return found.map((service) => translateService(service, lang));
}

function getUrgency(text, dateTime, lang) {
  const lower = text.toLowerCase();
  if (includesAny(lower, ["today", "tomorrow", "this week", "urgent", "asap", "as soon as possible", "hoy", "mañana", "esta semana", "urgente", "lo antes posible"])) {
    return lang === "es" ? "Alta" : "High";
  }
  if (includesAny(lower, ["next week", "next month", "próxima semana", "proxima semana", "mes que viene", "próximo mes", "proximo mes"])) {
    return lang === "es" ? "Media" : "Medium";
  }
  return dateTime === notSpecified[lang] ? (lang === "es" ? "Baja" : "Low") : lang === "es" ? "Media" : "Medium";
}

function getDepartment(eventType, lang) {
  if (["Corporate meeting", "Conference / congress", "Training / workshop"].includes(eventType)) {
    return lang === "es" ? "Eventos corporativos: alimara.reunions@cett.cat" : "Corporate events: alimara.reunions@cett.cat";
  }
  if (["Wedding", "Banquet", "Family celebration"].includes(eventType)) {
    return lang === "es" ? "Bodas y banquetes: alimara.banquets@cett.cat" : "Weddings and banquets: alimara.banquets@cett.cat";
  }
  return lang === "es" ? "Contacto general del hotel: +34 934 270 000" : "General hotel contact: +34 934 270 000";
}

function getMissingInfo(text, attendees, dateTime, services, lang) {
  const lower = text.toLowerCase();
  const vagueDate = hasVagueDate(text);
  const labels = {
    date: lang === "es" ? "fecha exacta" : "exact date",
    time: lang === "es" ? "hora del evento" : "event time",
    attendees: lang === "es" ? "número de asistentes" : "number of attendees",
    budget: lang === "es" ? "presupuesto" : "budget",
    layout: lang === "es" ? "preferencia de montaje" : "layout preference",
    catering: lang === "es" ? "necesidades de catering" : "catering needs",
    audiovisual: lang === "es" ? "necesidades audiovisuales" : "audiovisual needs",
    accommodation: lang === "es" ? "necesidades de alojamiento" : "accommodation needs",
    contact: lang === "es" ? "datos de contacto" : "contact details",
  };
  const missing = [];

  if (dateTime === notSpecified[lang] || vagueDate) missing.push(labels.date);
  if (!hasEventTime(lower) || vagueDate) missing.push(labels.time);
  if (attendees === notSpecified[lang]) missing.push(labels.attendees);
  if (!includesAny(lower, ["budget", "presupuesto", "eur", "€"])) missing.push(labels.budget);
  if (!includesAny(lower, ["theatre", "classroom", "u-shape", "banquet layout", "layout", "montaje", "escuela", "teatro", "imperial"])) missing.push(labels.layout);
  if (!services.some((service) => ["catering", "coffee break", "lunch", "dinner", "comida", "cena"].includes(service))) missing.push(labels.catering);
  if (!services.some((service) => ["audiovisual equipment", "projector", "equipo audiovisual", "proyector"].includes(service))) missing.push(labels.audiovisual);
  if (!services.some((service) => ["accommodation", "alojamiento"].includes(service))) missing.push(labels.accommodation);
  if (!includesAny(lower, ["@", "phone", "tel", "email", "correo", "teléfono", "telefono"])) missing.push(labels.contact);

  return missing.length ? missing : [lang === "es" ? "Información principal incluida" : "Main information included"];
}

function getConfidence(eventType, attendees, services, lang) {
  const hasType = eventType !== "Other / unclear";
  const hasAttendees = attendees !== notSpecified[lang];
  const hasServices = services.length > 0;

  if (hasType && hasAttendees && hasServices) return lang === "es" ? "Alta" : "High";
  if ([hasType, hasAttendees, hasServices].filter(Boolean).length >= 2) return lang === "es" ? "Media" : "Medium";
  return lang === "es" ? "Baja" : "Low";
}

function getReasoning(text, eventType, attendees, services, lang) {
  const lower = text.toLowerCase();
  const rule = eventTypeRules.find(([type]) => type === eventType);
  const detectedKeywords = rule ? rule[1].filter((keyword) => lower.includes(keyword)).slice(0, 4) : [];
  const serviceText = services.length ? services.join(", ") : lang === "es" ? "sin servicios claros" : "no clear services";

  if (lang === "es") {
    return `Clasificación basada en palabras clave detectadas (${detectedKeywords.join(", ") || "sin palabra clave fuerte"}), tamaño extraído (${attendees}) y servicios solicitados (${serviceText}).`;
  }
  return `Classification is based on detected keywords (${detectedKeywords.join(", ") || "no strong keyword"}), extracted size (${attendees}), and requested services (${serviceText}).`;
}

function getInternalNote(eventType, attendees, services, urgency, dateTime, missing, lang) {
  const largeEvent = /\d{3,4}/.test(attendees);
  const serviceText = services.length ? services.join(", ") : lang === "es" ? "servicios pendientes" : "services to clarify";
  const missingText = missing.filter((item) => !item.toLowerCase().includes("main information")).slice(0, 3).join(", ");

  if (lang === "es") {
    if (largeEvent) return `Solicitud grande (${attendees}) para ${translateEventType(eventType, "es").toLowerCase()}; priorizar capacidad, ${serviceText} y datos pendientes: ${missingText || "detalles finales"}.`;
    if (["Boda", "Banquete", "Celebración familiar"].includes(translateEventType(eventType, "es"))) return `Lead de ${translateEventType(eventType, "es").toLowerCase()} con ${attendees}; pedir ${missingText || "detalles pendientes"} antes de preparar propuesta.`;
    return `${urgency} prioridad para ${translateEventType(eventType, "es").toLowerCase()} (${dateTime}); revisar ${serviceText} y solicitar ${missingText || "detalles pendientes"}.`;
  }

  if (largeEvent) return `Large ${eventType.toLowerCase()} request (${attendees}); prioritize capacity, ${serviceText}, and missing details: ${missingText || "final details"}.`;
  if (["Wedding", "Banquet", "Family celebration"].includes(eventType)) return `${eventType} lead with ${attendees}; request ${missingText || "remaining details"} before preparing a proposal.`;
  return `${urgency} priority ${eventType.toLowerCase()} request (${dateTime}); review ${serviceText} and ask for ${missingText || "remaining details"}.`;
}

function buildSuggestedReply(translatedEventType, attendees, dateTime, serviceOutput, department, missing, lang) {
  const missingText = missing.join(", ");
  const serviceText = serviceOutput.join(", ");
  const isMissingDate = dateTime === notSpecified[lang];
  const isVagueDate = hasVagueDate(dateTime);

  if (lang === "es") {
    const timingSentence = isMissingDate
      ? "Todavía no vemos una fecha ni hora exactas para el evento."
      : isVagueDate
        ? `Hemos anotado el periodo indicado (${dateTime}), aunque aún falta la fecha y hora exactas.`
        : `Hemos anotado la fecha/hora indicada (${dateTime}).`;
    return `Gracias por contactar con Hotel Alimara. Su solicitud para ${translatedEventType.toLowerCase()} (${attendees}) será revisada por ${department}. ${timingSentence} También hemos registrado estos servicios: ${serviceText}. El equipo revisará disponibilidad y detalles antes de confirmar cualquier opción. Para avanzar con una respuesta más precisa, ¿podría compartir: ${missingText}?`;
  }

  const timingSentence = isMissingDate
    ? "I do not see an exact event date or time yet."
    : isVagueDate
      ? `I have noted the general timing (${dateTime}), but the exact date and event time are still needed.`
      : `I have noted the date/time provided (${dateTime}).`;
  return `Thank you for contacting Hotel Alimara. Your request for a ${translatedEventType.toLowerCase()} (${attendees}) should be reviewed by ${department}. ${timingSentence} I have also noted the requested services: ${serviceText}. The team will review availability and details before confirming any option. To prepare a more accurate follow-up, could you also share: ${missingText}?`;
}

export function classifyRequest(request) {
  const trimmed = request.trim();
  const lang = detectLanguage(trimmed);

  if (!trimmed) {
    return {
      error: lang === "es" ? "Por favor, pega una solicitud de evento." : "Please paste an event request.",
    };
  }

  // Local AI-style logic: classify and extract event details with transparent rules, not an external AI API.
  const eventType = classifyEventType(trimmed);
  const attendees = extractAttendees(trimmed, lang);
  const dateTime = extractDateTime(trimmed, lang);
  const services = extractServices(trimmed, lang);
  const urgency = getUrgency(trimmed, dateTime, lang);
  const department = getDepartment(eventType, lang);
  const missing = getMissingInfo(trimmed, attendees, dateTime, services, lang);
  const translatedEventType = translateEventType(eventType, lang);
  const serviceOutput = services.length ? services : [notSpecified[lang]];
  const confidence = getConfidence(eventType, attendees, services, lang);

  return {
    summary:
      lang === "es"
        ? `Solicitud de ${translatedEventType.toLowerCase()} con tamaño estimado: ${attendees}. Fecha/hora: ${dateTime}.`
        : `Request for ${translatedEventType.toLowerCase()} with estimated size: ${attendees}. Date/time: ${dateTime}.`,
    eventType: translatedEventType,
    estimatedSize: attendees,
    dateTime,
    requestedServices: serviceOutput,
    urgency,
    department,
    missingInformation: missing,
    suggestedReply: buildSuggestedReply(translatedEventType, attendees, dateTime, serviceOutput, department, missing, lang),
    internalPriorityNote: getInternalNote(eventType, attendees, services, urgency, dateTime, missing, lang),
    confidence,
    reasoning: getReasoning(trimmed, eventType, attendees, services, lang),
  };
}
