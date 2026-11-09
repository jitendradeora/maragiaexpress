import { siteImages } from "./site-images"

export type Experience = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  bestFor: string
  body: string[]
}

export const experiences: Experience[] = [
  {
    slug: "tailor-made-journeys",
    name: "Tailor-made journeys",
    eyebrow: "Travel designed through conversation",
    intro:
      "Begin with your interests, dates and preferred pace, then shape a coherent route with the Maragià Express team.",
    image: siteImages.udaipur,
    bestFor:
      "Travelers who value flexibility and a journey shaped around personal interests.",
    body: [
      "Tailor-made travel is not about adding more to an itinerary. It is about choosing well: the regions that fit the season, the pace that leaves room to experience them, and arrangements that reflect how you want to travel.",
      "Share your approximate dates, group size, interests, accommodation preferences and budget context. The team can then discuss what is currently possible and refine a proposed journey with you.",
    ],
  },
  {
    slug: "culture-heritage",
    name: "Culture & heritage",
    eyebrow: "Architecture · sacred places · living traditions",
    intro:
      "Explore India through the places, histories, crafts and daily rituals that make each region distinctive.",
    image: siteImages.palace,
    bestFor:
      "Curious travelers drawn to architecture, history, local traditions and regional identity.",
    body: [
      "Cultural travel is most rewarding when monuments are placed in context. A fort, temple, market or workshop becomes more meaningful when there is time to understand the community and landscape around it.",
      "The official site features cultural routes across North India and Rajasthan. Exact visits and guiding arrangements should be confirmed for each itinerary.",
    ],
  },
  {
    slug: "adventure-cycling",
    name: "Adventure & cycling",
    eyebrow: "Active journeys across India",
    intro:
      "See the landscape at a different pace through cycling, trekking and selected mountain journeys.",
    image: siteImages.cycle,
    bestFor:
      "Active travelers prepared to discuss fitness, terrain and comfort expectations in detail.",
    body: [
      "Maragià Express publicly features Rajasthan cycling and Himalayan adventure. Active travel requires careful matching of terrain, distance, season and individual experience.",
      "Before confirming a route, discuss your activity level, equipment requirements and preferred balance between active days and cultural exploration.",
    ],
  },
  {
    slug: "festivals",
    name: "Festivals & gatherings",
    eyebrow: "Seasonal journeys with cultural context",
    intro:
      "Plan around the energy of Holi, Pushkar and other festivals currently featured by Maragià Express.",
    image: siteImages.craft,
    bestFor:
      "Travelers comfortable with crowds, fixed dates and the dynamic nature of public events.",
    body: [
      "Festivals can offer a vivid perspective on local traditions, but they also require responsible preparation. Dates, locations and conditions vary, and respectful participation matters.",
      "The official website features Holi, the Pushkar Fair and the Hemis Festival. Confirm current programs and arrangements directly before making travel plans.",
    ],
  },
  {
    slug: "luxury-travel",
    name: "Heritage & refined stays",
    eyebrow: "Considered comfort · remarkable settings",
    intro:
      "Combine India’s cultural depth with thoughtfully selected accommodation and a well-paced private journey.",
    image: siteImages.desert,
    bestFor:
      "Travelers seeking a higher level of comfort without losing a sense of place.",
    body: [
      "The official website presents luxury-oriented travel in India, including heritage settings and personalized arrangements. The meaning of luxury should be established around your own priorities—space, privacy, service, location or historical character.",
      "No individual hotels or partnerships are promised on this site. Current options and standards are confirmed as part of a specific proposal.",
    ],
  },
]

export function getExperience(slug: string) {
  return experiences.find((experience) => experience.slug === slug)
}

export function getExperienceSlugs() {
  return experiences.map((experience) => experience.slug)
}
