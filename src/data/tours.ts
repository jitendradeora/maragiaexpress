import { siteImages } from "./site-images"

export type Tour = {
  slug: string
  title: string
  category: string
  categorySlug: string
  image: string
  summary: string
}

export const tours: Tour[] = [
  {
    slug: "tour-of-india",
    title: "Tour dell’India",
    category: "Tour dell’India",
    categorySlug: "tour-of-india",
    image: siteImages.udaipur,
    summary:
      "Un punto di partenza per costruire insieme un viaggio personalizzato nella varietà culturale e geografica dell’India.",
  },
  {
    slug: "maharajas-tour",
    title: "Il tour del Maragià",
    category: "Lusso e Splendore",
    categorySlug: "luxury-and-splendor",
    image: siteImages.palace,
    summary:
      "Un viaggio raffinato in India, parte della collezione Lusso e Splendore di Maragià Express.",
  },
  {
    slug: "natural-kerala",
    title: "Kerala naturale",
    category: "Lusso e Splendore",
    categorySlug: "luxury-and-splendor",
    image: siteImages.sriLanka,
    summary:
      "Un viaggio nell’India del Sud dedicato ai paesaggi e all’atmosfera del Kerala.",
  },
  {
    slug: "three-cats-of-india",
    title: "I tre felini dell’India",
    category: "Lusso e Splendore",
    categorySlug: "luxury-and-splendor",
    image: siteImages.wildlife,
    summary:
      "Un viaggio dedicato alla fauna selvatica, inserito nella collezione Lusso e Splendore.",
  },
  {
    slug: "indian-festival-of-colors",
    title: "Festa dei colori India",
    category: "Tour dei Festival Indiani",
    categorySlug: "indian-festivals-tour",
    image: siteImages.craft,
    summary:
      "Un viaggio stagionale ispirato alla Festa dei colori indiana e al suo contesto culturale.",
  },
  {
    slug: "camel-fair",
    title: "Fiera dei cammelli",
    category: "Tour dei Festival Indiani",
    categorySlug: "indian-festivals-tour",
    image: siteImages.desert,
    summary:
      "Un viaggio in Rajasthan legato alla celebre Fiera dei cammelli di Pushkar.",
  },
  {
    slug: "hemis-feast-festival",
    title: "La festa di Hemis",
    category: "Tour dei Festival Indiani",
    categorySlug: "indian-festivals-tour",
    image: siteImages.ladakh,
    summary:
      "Un viaggio in Ladakh costruito attorno alle celebrazioni del festival di Hemis.",
  },
  {
    slug: "overland-himalaya-tour",
    title: "Himalaya on the road",
    category: "Avventure nel Mondo India",
    categorySlug: "adventures-in-the-world-india",
    image: siteImages.ladakh,
    summary:
      "Un viaggio via terra tra le montagne, parte della collezione di avventure in India.",
  },
  {
    slug: "rajasthan-on-bicycle",
    title: "Rajasthan in bicicletta",
    category: "Avventure nel Mondo India",
    categorySlug: "adventures-in-the-world-india",
    image: siteImages.cycle,
    summary:
      "Un viaggio attivo attraverso il Rajasthan, pensato per essere vissuto in bicicletta.",
  },
  {
    slug: "hemis-feast-adventure",
    title: "La festa di Hemis",
    category: "Avventure nel Mondo India",
    categorySlug: "adventures-in-the-world-india",
    image: siteImages.bhutan,
    summary:
      "Un viaggio in Ladakh in occasione del festival, inserito nella collezione di avventure in India.",
  },
  {
    slug: "classic-south-india",
    title: "Viaggio classico nell’India del Sud",
    category: "Tour Culturali dell’India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.sriLanka,
    summary:
      "Un’introduzione culturale a paesaggi e luoghi storici selezionati dell’India del Sud.",
  },
  {
    slug: "introduction-to-india",
    title: "Introduzione all’India",
    category: "Tour Culturali dell’India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.rajasthan,
    summary:
      "Un viaggio culturale introduttivo per chi inizia a scoprire l’India.",
  },
  {
    slug: "karnataka-and-goa",
    title: "Viaggio in Karnataka e Goa",
    category: "Tour Culturali dell’India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.palace,
    summary:
      "Un viaggio culturale che unisce destinazioni selezionate del Karnataka e di Goa.",
  },
  {
    slug: "bengal-and-sikkim",
    title: "Viaggio in Bengala e Sikkim",
    category: "Tour Culturali dell’India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.nepal,
    summary:
      "Un viaggio che collega l’anima culturale del Bengala allo scenario himalayano del Sikkim.",
  },
  {
    slug: "temples-and-tribes-of-orissa",
    title: "Templi e tribù dell’Orissa",
    category: "Tour Culturali dell’India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.craft,
    summary:
      "Un itinerario culturale in Odisha, proposto da Maragià Express con il suo titolo storico.",
  },
  {
    slug: "gujarat-trip",
    title: "Viaggio in Gujarat",
    category: "Tour Culturali dell’India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.desert,
    summary:
      "Un viaggio culturale tra esperienze storiche e paesaggistiche selezionate in Gujarat.",
  },
  {
    slug: "rural-rajasthan",
    title: "Rajasthan rurale",
    category: "Tour Culturali dell’India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.udaipur,
    summary:
      "Un viaggio in Rajasthan con particolare attenzione ai paesaggi rurali e al contesto locale.",
  },
]

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug)
}

export function getTourSlugs() {
  return tours.map((tour) => tour.slug)
}
