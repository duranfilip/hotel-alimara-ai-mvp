export function detectLanguage(text) {
  const lower = text.toLowerCase();
  const spanishSignals = [
    "hola",
    "queremos",
    "necesitamos",
    "hay",
    "gratis",
    "puedo",
    "tienen",
    "cuanto",
    "cuánto",
    "horario",
    "desayuno",
    "habitación",
    "reserva",
    "comunión",
    "boda",
    "personas",
    "fecha",
    "mañana",
    "urgente",
  ];

  return spanishSignals.some((signal) => lower.includes(signal)) ? "es" : "en";
}

export function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}
