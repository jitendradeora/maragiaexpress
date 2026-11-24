export type EnquiryFields = {
  name: string
  email: string
  country: string
  destination: string
  dates: string
  travelers: string
  interests: string
  message: string
}

export type EnquiryResult = {
  errors: Record<string, string>
  subject: string
  body: string
}

function clean(value: unknown, length: number) {
  if (typeof value !== "string") return ""
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, length)
}

function line(label: string, value: string) {
  return `${label}: ${value || ""}`
}

export function validateEnquiry(input: Record<string, unknown>): EnquiryResult {
  const fields: EnquiryFields = {
    name: clean(input.name, 80),
    email: clean(input.email, 120),
    country: clean(input.country, 80),
    destination: clean(input.destination, 80),
    dates: clean(input.dates, 80),
    travelers: clean(input.travelers, 3),
    interests: clean(input.interests, 160),
    message: clean(input.message, 2000),
  }
  const errors: Record<string, string> = {}
  if (fields.name.length < 2) errors.name = "Inserisci nome e cognome."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Inserisci un indirizzo email valido."
  }
  if (fields.message.length < 10) errors.message = "Scrivi un messaggio di almeno 10 caratteri."
  if (fields.travelers && !/^([1-9]|[1-9][0-9])$/.test(fields.travelers)) {
    errors.travelers = "Indica un numero di viaggiatori tra 1 e 99."
  }

  const body = [
    line("Nome", fields.name),
    line("Email", fields.email),
    line("Paese", fields.country),
    line("Destinazione", fields.destination),
    line("Date", fields.dates),
    line("Viaggiatori", fields.travelers),
    line("Interessi", fields.interests),
    line("Messaggio", fields.message),
  ].join("\n")

  return {
    errors,
    subject: `Richiesta di viaggio da ${fields.name || "un viaggiatore"}`,
    body,
  }
}
