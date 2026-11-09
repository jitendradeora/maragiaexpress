import { siteImages } from "./site-images"

export type Destination = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  highlights: string[]
  paragraphs: string[]
}

export const destinations: Destination[] = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    eyebrow: "Palaces · desert · living heritage",
    intro:
      "A journey through lake cities, desert strongholds, painted towns and the living traditions of India’s most storied state.",
    image: siteImages.rajasthan,
    highlights: ["Udaipur & Mewar", "Jaipur", "Jodhpur", "The Thar Desert"],
    paragraphs: [
      "Rajasthan brings together monumental architecture and intimate daily life. Forts rise above old cities, stepwells reveal a sophisticated relationship with water, and craft traditions remain part of the region’s visual language.",
      "Maragià Express is based in Udaipur, making Rajasthan a natural starting point for a personalized journey. Routes can be discussed around heritage, architecture, rural landscapes, festivals, cycling, or a slower exploration of selected cities.",
    ],
  },
  {
    slug: "ladakh",
    name: "Ladakh & the Himalaya",
    eyebrow: "Mountain roads · monasteries · open skies",
    intro:
      "High-altitude landscapes and Buddhist cultural traditions shape a very different experience of India.",
    image: siteImages.ladakh,
    highlights: [
      "Leh",
      "Buddhist monasteries",
      "Mountain routes",
      "Active travel",
    ],
    paragraphs: [
      "Ladakh’s scale asks travelers to slow down. Valleys, mountain passes and monasteries create journeys where acclimatization and thoughtful pacing matter as much as the route itself.",
      "The official Maragià Express website features Himalayan adventure, trekking and festival travel. Current access, route conditions and suitable activity levels should always be confirmed directly with the team.",
    ],
  },
  {
    slug: "wildlife-india",
    name: "Wild India",
    eyebrow: "Forests · reserves · wildlife",
    intro:
      "Add a carefully planned wildlife chapter to a wider cultural journey through India.",
    image: siteImages.wildlife,
    highlights: [
      "Wildlife reserves",
      "Safari planning",
      "Natural landscapes",
      "Seasonal travel",
    ],
    paragraphs: [
      "India’s wildlife regions add a compelling contrast to its cities and heritage landscapes. The experience depends on season, reserve rules, permits and the natural unpredictability of wildlife.",
      "Maragià Express references safari experiences on its official website. Specific reserves, accommodation and availability must be confirmed while planning; wildlife sightings can never be guaranteed.",
    ],
  },
]

export const beyondIndiaDestinations: Destination[] = [
  {
    slug: "bhutan",
    name: "Bhutan",
    eyebrow: "Himalayan kingdom · monasteries · valleys",
    intro:
      "A carefully paced journey through Bhutan’s mountain landscapes and Buddhist cultural heritage.",
    image: siteImages.bhutan,
    highlights: [
      "Himalayan landscapes",
      "Buddhist heritage",
      "Mountain valleys",
      "Seasonal travel",
    ],
    paragraphs: [
      "Bhutan is presented as a destination on the official Maragià Express website. Its mountain geography, monasteries and distinctive approach to tourism call for an itinerary planned around current entry rules and local arrangements.",
      "Specific routes, permits, accommodation and services should be confirmed directly with the team before travel is booked.",
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    eyebrow: "Heritage cities · Himalaya · living traditions",
    intro:
      "Explore Nepal through its cultural landmarks, mountain setting and historic communities.",
    image: siteImages.nepal,
    highlights: [
      "Kathmandu Valley",
      "Himalayan landscapes",
      "Cultural heritage",
      "Active travel",
    ],
    paragraphs: [
      "Nepal is one of the destinations listed beyond India by Maragià Express. Cultural sites and Himalayan landscapes can form part of a journey adapted to season, altitude and individual interests.",
      "The exact destinations, activity level and arrangements currently offered require confirmation with the travel team.",
    ],
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    eyebrow: "Heritage · highlands · tropical landscapes",
    intro:
      "A journey through Sri Lanka’s cultural landscapes, green highlands and varied natural settings.",
    image: siteImages.sriLanka,
    highlights: [
      "Cultural heritage",
      "Central highlands",
      "Tea landscapes",
      "Coastal regions",
    ],
    paragraphs: [
      "Sri Lanka appears among the destinations offered beyond India on the official Maragià Express website. Its compact geography brings together cultural sites, highland scenery and tropical landscapes.",
      "Current routes, accommodation and practical arrangements should be discussed directly with Maragià Express before making plans.",
    ],
  },
]

export const allDestinations = [...destinations, ...beyondIndiaDestinations]

export function getDestination(slug: string) {
  return allDestinations.find((destination) => destination.slug === slug)
}

export function getDestinationSlugs() {
  return allDestinations.map((destination) => destination.slug)
}
