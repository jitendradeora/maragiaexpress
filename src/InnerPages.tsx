import { useEffect, useState } from "react"
import { EnquiryReady, FormGuide } from "./EnquiryReady"
import { siteConfig } from "./lib/site-config"

const images = {
  rajasthan:
    "https://images.unsplash.com/photo-1545321945-7edd9bf1331a?auto=format&fit=crop&w=1800&q=84",
  udaipur:
    "https://images.unsplash.com/photo-1591264247469-d072a1018915?auto=format&fit=crop&w=1800&q=84",
  ladakh:
    "https://images.unsplash.com/photo-1632648366997-a091f7075445?auto=format&fit=crop&w=1800&q=84",
  wildlife:
    "https://images.unsplash.com/photo-1598510343363-244a5ea24814?auto=format&fit=crop&w=1800&q=84",
  desert:
    "https://images.unsplash.com/photo-1668689723080-c50f6e823de5?auto=format&fit=crop&w=1800&q=84",
  craft:
    "https://images.unsplash.com/photo-1702742970125-d57f8ee68e89?auto=format&fit=crop&w=1600&q=84",
  palace:
    "https://images.unsplash.com/photo-1634316127530-4289556bad26?auto=format&fit=crop&w=1800&q=84",
  cycle:
    "https://images.unsplash.com/photo-1762696782497-2b39df0f4523?auto=format&fit=crop&w=1800&q=84",
  bhutan:
    "https://images.unsplash.com/photo-1584095434749-d1b975e1ca9c?auto=format&fit=crop&w=1800&q=84",
  nepal:
    "https://images.unsplash.com/photo-1648298470994-7065f521375c?auto=format&fit=crop&w=1800&q=84",
  sriLanka:
    "https://images.unsplash.com/photo-1544015759-237f87d55ef3?auto=format&fit=crop&w=1800&q=84",
}

type Destination = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  highlights: string[]
  paragraphs: string[]
}

const destinations: Destination[] = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    eyebrow: "Palaces · desert · living heritage",
    intro:
      "A journey through lake cities, desert strongholds, painted towns and the living traditions of India’s most storied state.",
    image: images.rajasthan,
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
    image: images.ladakh,
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
    image: images.wildlife,
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

const beyondIndiaDestinations: Destination[] = [
  {
    slug: "bhutan",
    name: "Bhutan",
    eyebrow: "Himalayan kingdom · monasteries · valleys",
    intro:
      "A carefully paced journey through Bhutan’s mountain landscapes and Buddhist cultural heritage.",
    image: images.bhutan,
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
    image: images.nepal,
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
    image: images.sriLanka,
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

type Experience = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  bestFor: string
  body: string[]
}

const experiences: Experience[] = [
  {
    slug: "tailor-made-journeys",
    name: "Tailor-made journeys",
    eyebrow: "Travel designed through conversation",
    intro:
      "Begin with your interests, dates and preferred pace, then shape a coherent route with the Maragià Express team.",
    image: images.udaipur,
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
    image: images.palace,
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
    image: images.cycle,
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
    image: images.craft,
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
    image: images.desert,
    bestFor:
      "Travelers seeking a higher level of comfort without losing a sense of place.",
    body: [
      "The official website presents luxury-oriented travel in India, including heritage settings and personalized arrangements. The meaning of luxury should be established around your own priorities—space, privacy, service, location or historical character.",
      "No individual hotels or partnerships are promised on this site. Current options and standards are confirmed as part of a specific proposal.",
    ],
  },
]

type Tour = {
  slug: string
  title: string
  category: string
  categorySlug: string
  image: string
  summary: string
}

const tours: Tour[] = [
  {
    slug: "tour-of-india",
    title: "Tour of India",
    category: "Tour of India",
    categorySlug: "tour-of-india",
    image: images.udaipur,
    summary:
      "A starting point for discussing a personalized journey through India’s cultural and geographic diversity.",
  },
  {
    slug: "maharajas-tour",
    title: "The Maharaja’s Tour",
    category: "Luxury and Splendor",
    categorySlug: "luxury-and-splendor",
    image: images.palace,
    summary:
      "A refined India journey presented within Maragià Express’s Luxury and Splendor collection.",
  },
  {
    slug: "natural-kerala",
    title: "Natural Kerala",
    category: "Luxury and Splendor",
    categorySlug: "luxury-and-splendor",
    image: images.sriLanka,
    summary:
      "A southern India journey centered on the landscapes and character of Kerala.",
  },
  {
    slug: "three-cats-of-india",
    title: "The Three Cats of India",
    category: "Luxury and Splendor",
    categorySlug: "luxury-and-splendor",
    image: images.wildlife,
    summary:
      "A wildlife-focused journey listed in the Luxury and Splendor collection.",
  },
  {
    slug: "indian-festival-of-colors",
    title: "Indian Festival of Colors",
    category: "Indian Festivals Tour",
    categorySlug: "indian-festivals-tour",
    image: images.craft,
    summary:
      "A seasonal journey inspired by India’s Festival of Colors and its cultural setting.",
  },
  {
    slug: "camel-fair",
    title: "Camel Fair",
    category: "Indian Festivals Tour",
    categorySlug: "indian-festivals-tour",
    image: images.desert,
    summary:
      "A Rajasthan festival journey associated with the celebrated Pushkar Camel Fair.",
  },
  {
    slug: "hemis-feast-festival",
    title: "Hemis’s Feast",
    category: "Indian Festivals Tour",
    categorySlug: "indian-festivals-tour",
    image: images.ladakh,
    summary:
      "A festival-focused Ladakh journey presented around the Hemis celebration.",
  },
  {
    slug: "overland-himalaya-tour",
    title: "An Overland Himalaya Tour",
    category: "Adventures in the World India",
    categorySlug: "adventures-in-the-world-india",
    image: images.ladakh,
    summary:
      "An overland mountain journey presented within the India adventure collection.",
  },
  {
    slug: "rajasthan-on-bicycle",
    title: "Rajasthan on Bicycle",
    category: "Adventures in the World India",
    categorySlug: "adventures-in-the-world-india",
    image: images.cycle,
    summary:
      "An active journey through Rajasthan designed around travel by bicycle.",
  },
  {
    slug: "hemis-feast-adventure",
    title: "Hemis’s Feast",
    category: "Adventures in the World India",
    categorySlug: "adventures-in-the-world-india",
    image: images.bhutan,
    summary:
      "A Ladakh festival journey included in the India adventure collection.",
  },
  {
    slug: "classic-south-india",
    title: "Classic Trip to South India",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: images.sriLanka,
    summary:
      "A cultural introduction to selected landscapes and heritage destinations in South India.",
  },
  {
    slug: "introduction-to-india",
    title: "Introduction to India",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: images.rajasthan,
    summary:
      "An introductory cultural journey for travelers beginning their exploration of India.",
  },
  {
    slug: "karnataka-and-goa",
    title: "Trip to Karnataka and Goa",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: images.palace,
    summary:
      "A cultural journey bringing together selected destinations in Karnataka and Goa.",
  },
  {
    slug: "bengal-and-sikkim",
    title: "Trip to Bengal and Sikkim",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: images.nepal,
    summary:
      "A journey linking the cultural character of Bengal with the Himalayan setting of Sikkim.",
  },
  {
    slug: "temples-and-tribes-of-orissa",
    title: "Temples and Tribes of Orissa",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: images.craft,
    summary:
      "A cultural route in Odisha, listed by Maragià Express under its established tour title.",
  },
  {
    slug: "gujarat-trip",
    title: "Gujarat Trip",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: images.desert,
    summary:
      "A cultural journey through selected heritage and landscape experiences in Gujarat.",
  },
  {
    slug: "rural-rajasthan",
    title: "Rural Trip Rajasthan",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: images.udaipur,
    summary:
      "A Rajasthan journey with an emphasis on rural landscapes and local context.",
  },
]

type TourDetails = {
  price: string
  duration: string
  route: string[]
  map?: string
  gallery?: string[]
  includes?: string[]
  excludes?: string[]
}

type SampleItineraryDay = {
  day: number
  title: string
  description: string
}

function createSampleItinerary(details: TourDetails): SampleItineraryDay[] {
  const publishedDays = details.duration.match(/(\d+)\s+days?/i)
  const dayCount = publishedDays
    ? Number(publishedDays[1])
    : Math.max(details.route.length, 5)
  const destinations = details.route

  return Array.from({ length: dayCount }, (_, index) => {
    const destinationIndex = Math.min(
      Math.floor((index * destinations.length) / dayCount),
      destinations.length - 1,
    )
    const destination = destinations[destinationIndex]
    const nextDestination =
      index < dayCount - 1
        ? destinations[
            Math.min(
              Math.floor(((index + 1) * destinations.length) / dayCount),
              destinations.length - 1,
            )
          ]
        : destination

    if (index === 0) {
      return {
        day: 1,
        title: `Arrival in ${destination}`,
        description:
          "Arrival, welcome and time to settle in. The final program will confirm transfers, accommodation and any planned activities.",
      }
    }

    if (index === dayCount - 1) {
      return {
        day: dayCount,
        title: `Departure from ${destination}`,
        description:
          "Breakfast and onward departure arrangements according to the confirmed travel schedule.",
      }
    }

    if (nextDestination !== destination) {
      return {
        day: index + 1,
        title: `${destination} to ${nextDestination}`,
        description:
          "Continue to the next destination with stops and experiences tailored to the final route and journey pace.",
      }
    }

    return {
      day: index + 1,
      title: `Discover ${destination}`,
      description:
        "A day for locally relevant visits and experiences. Exact activities, guiding and meal arrangements will be detailed in the confirmed program.",
    }
  })
}

const defaultIncludes = [
  "Accommodation in the properties confirmed in the final program or similar",
  "Private transport and local assistance as confirmed in the proposal",
  "Guiding, visits and entrance fees specifically listed in the final program",
]

const defaultExcludes = [
  "International flights and airport taxes unless expressly included",
  "Travel, medical and cancellation insurance",
  "Visa fees, tips, drinks, personal expenses and optional activities",
  "Anything not expressly listed in the confirmed inclusions",
]

const tourDetails: Record<string, TourDetails> = {
  "tour-of-india": {
    price: "From €1,925 per person",
    duration: "12 nights · 13 days",
    route: [
      "Delhi",
      "Udaipur",
      "Deogarh",
      "Jodhpur",
      "Jaipur",
      "Agra",
      "Orchha",
      "Khajuraho",
      "Prayagraj",
      "Varanasi",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/08/map-itinerario-classico-Indiano-con-varanasi.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2023/08/sds.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/rajasthan_155_IMG_5545-1024x576-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/rajasthan_031_L1000889.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/08/IMG_2259-min.jpeg",
    ],
  },
  "maharajas-tour": {
    price: "€3,640 per person",
    duration: "7 nights · 8 days",
    route: ["Delhi", "Agra", "Jaipur", "Jodhpur", "Udaipur", "Delhi"],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/08/Map-1-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/deep-joshi-lNQYnJMytZs-unsplash.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/rajasthan_155_IMG_5545-1024x576-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/INTRODUZIONE-ALLINDIA-1024x678.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/DSC_3706-Copy-1024x678.jpg",
    ],
    includes: [
      "Accommodation listed in the published program or similar",
      "Breakfast, Italian-speaking guide, private vehicle and driver",
      "Published monument visits, Taj Mahal, Lake Pichola boat ride and domestic Udaipur–Delhi flight",
      "On-the-ground assistance",
    ],
  },
  "natural-kerala": {
    price: "€2,450 per person",
    duration: "9 nights · 10 days",
    route: ["Cochin", "Munnar", "Periyar", "Alleppey", "Mararikulam"],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/09/Map_0.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-cochin.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-in-Kerala.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-munnar-1024x544.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/Kerala-hotel-1024x561.jpg",
    ],
    includes: [
      "Accommodation listed in the published program or similar",
      "Breakfast and dinner, Italian-speaking guide, private vehicle and driver",
      "Published visits, tea plantations, Periyar lake cruise and full board on the houseboat",
      "On-the-ground assistance",
    ],
  },
  "three-cats-of-india": {
    price: "On request",
    duration: "Confirmed with proposal",
    route: ["Jawai and the wildlife regions confirmed for your journey"],
  },
  "indian-festival-of-colors": {
    price: "From €1,850 per person",
    duration: "10 nights · 11 days",
    route: [
      "Delhi",
      "Mandawa",
      "Bikaner",
      "Jaisalmer",
      "Dechu",
      "Jodhpur",
      "Jaipur",
      "Agra",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/09/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/DSC_4037-Copy.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/festa-del-holi-India-2.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/holi-india-children-594333-1024x768.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/fort-di-amer-Jaipur.jpg",
    ],
  },
  "camel-fair": {
    price: "From €1,499 per person",
    duration: "11 nights · 12 days",
    route: [
      "Delhi",
      "Mandawa",
      "Bikaner",
      "Jaisalmer",
      "Jodhpur",
      "Udaipur",
      "Pushkar",
      "Jaipur",
      "Agra",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/07/Travel-map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Fiera-dei-cammelli-di-Pushkar-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Pushkar-camel-fair-2-1024x634.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Pushkar-camel-fair-1-1024x683.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/DSC_8286.jpg",
    ],
  },
  "hemis-feast-festival": {
    price: "From €1,850 per person",
    duration: "9 nights · 10 days",
    route: ["Delhi", "Leh", "Ladakh", "Hemis Monastery"],
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/10/09Ladakh131022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Festa-di-Hemis-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Ladakh04131022-min-1024x683.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Ladakh-leh-1024x683.jpg",
    ],
  },
  "overland-himalaya-tour": {
    price: "€3,360 per person",
    duration: "14 nights · 15 days",
    route: [
      "Jammu",
      "Srinagar",
      "Kargil",
      "Ulley",
      "Leh",
      "Nubra",
      "Pangong",
      "Stok",
      "Delhi",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/10/Mappa-di-viaggio-di-Ladakh.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/10/09Ladakh131022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Festa-di-Hemis-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/08/festa-di-Hemis-min.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Ladakh04131022-min-1024x683.jpg",
    ],
  },
  "rajasthan-on-bicycle": {
    price: "€2,150 per person",
    duration: "8 nights · 9 days",
    route: [
      "Delhi",
      "Udaipur",
      "Kumbhalgarh",
      "Ranakpur",
      "Jawai",
      "Jojawar",
      "Rohetgarh",
      "Jodhpur",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/08/Map.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/Cycling-Trip-053.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/Cycling-Trip-luni-1024x603-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/kumbhalgarh-fort-tour-1024x578-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/IMG_1101-1024x682.jpg",
    ],
    includes: [
      "Accommodation, breakfast and dinner as listed in the published program",
      "Selected guiding, city transport, monument visits and local assistance",
      "Published domestic flights, Lake Pichola boat ride and Jawai jeep safari",
      "21-speed mountain bike, helmet, cycling escort and backup vehicle",
    ],
  },
  "hemis-feast-adventure": {
    price: "From €1,850 per person",
    duration: "9 nights · 10 days",
    route: ["Delhi", "Leh", "Ladakh", "Hemis Monastery"],
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/10/09Ladakh131022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Festa-di-Hemis-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Ladakh-leh-1024x683.jpg",
    ],
  },
  "classic-south-india": {
    price: "On request",
    duration: "10 nights · 11 days",
    route: [
      "Chennai",
      "Pondicherry",
      "Tanjore",
      "Madurai",
      "Thekkady",
      "Kumarakom",
      "Alleppey",
      "Mararikulam",
    ],
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-munnar.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Tanjore211022-1024x683.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Kumarakom211022-1024x683.jpg",
    ],
  },
  "introduction-to-india": {
    price: "On request",
    duration: "12 nights · 13 days",
    route: [
      "Delhi",
      "Udaipur",
      "Jawai",
      "Jodhpur",
      "Dechu",
      "Jaisalmer",
      "Pushkar",
      "Jaipur",
      "Agra",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/09/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/viaggio-Taj-mahal.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2019/11/Jawai-people.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2019/11/leopardo-indiano-Jawai.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/DSC_3706-Copy-1024x678.jpg",
    ],
  },
  "karnataka-and-goa": {
    price: "From €2,240 per person",
    duration: "10 nights · 11 days",
    route: [
      "Mysore",
      "Hassan",
      "Hampi",
      "Badami",
      "Vijayapura",
      "Kolhapur",
      "Goa",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/12/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/12/badami.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/12/Pattadakal.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/12/E618F2D7-5746-4A2A-8324-92902746F88B-1024x575.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/12/Goa-beach-1024x575.jpeg",
    ],
  },
  "bengal-and-sikkim": {
    price: "On request",
    duration: "8 nights · 9 days",
    route: ["Kolkata", "Kalimpong", "Darjeeling", "Pelling", "Gangtok"],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/10/mappa-di-north-east-India.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2023/10/new-bridge-Kolkata.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/10/tea-garden-Darjeeling.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/10/darjeeling-1024x695.jpg",
    ],
  },
  "temples-and-tribes-of-orissa": {
    price: "On request",
    duration: "12 nights · 13 days",
    route: [
      "Delhi",
      "Bhubaneswar",
      "Puri",
      "Chilika",
      "Gopalpur",
      "Taptapani",
      "Rayagada",
      "Jeypore",
      "Onukudelli",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/09/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2023/09/tempio-di-konark-min.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/09/viaggio-orissa-min.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/09/lago-di-chilka-min-1024x547.jpg",
    ],
  },
  "gujarat-trip": {
    price: "€1,764 per person",
    duration: "9 nights · 10 days",
    route: [
      "Ahmedabad",
      "Dasada",
      "Bhuj",
      "Rajkot",
      "Sasan Gir",
      "Diu",
      "Palitana",
      "Vadodara",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/08/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/IMG_1726-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/IMG_5531.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/Viaggio-in-Dasada-1024x566.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/viaggio-di-Gir-1024x667.jpg",
    ],
  },
  "rural-rajasthan": {
    price: "From €2,080 per person",
    duration: "13 nights · 14 days",
    route: ["Rajasthan rural itinerary available with the current proposal"],
  },
}

const articles = [
  {
    slug: "planning-first-visit-india",
    category: "Planning",
    title: "Planning a first journey through India",
    excerpt:
      "Start with season, geography and pace before deciding how many places belong in your itinerary.",
    image: images.udaipur,
  },
  {
    slug: "rajasthan-heritage-cities",
    category: "Culture",
    title: "Reading Rajasthan through its heritage cities",
    excerpt:
      "Udaipur, Jodhpur and Jaipur each tell a different story through landscape, architecture and color.",
    image: images.palace,
  },
  {
    slug: "travel-at-a-slower-pace",
    category: "Travel well",
    title: "Why a slower journey often reveals more",
    excerpt:
      "Fewer transitions can create more space for context, conversation and a genuine sense of place.",
    image: images.desert,
  },
]

const routeAliases: Record<string, string> = {
  "/tour-dellindia": "/tours",
  "/viaggi-di-lusso-in-india": "/tours",
  "/tour-culturali-dell-india": "/tours",
  "/avventure-nel-mondo-india": "/tours",
  "/tour-dei-festival-indiani": "/tours",
  "/festa-dei-colori-india": "/tours/indian-festival-of-colors",
  "/fiera-di-pushkar": "/tours/camel-fair",
  "/viaggio-in-bicicletta-in-rajasthan": "/tours/rajasthan-on-bicycle",
  "/viaggio-organizzato-in-bhutan": "/destinations/bhutan",
  "/viaggio-organizzato-in-nepal": "/destinations/nepal",
  "/viaggio-organizzato-in-sri-lanka": "/destinations/sri-lanka",
  "/oltre-lindia": "/destinations",
  "/viaggio-di-lusso-in-india-2": "/tours/maharajas-tour",
  "/holi-colorato-2023-fd": "/tours/indian-festival-of-colors",
  "/agenzia-turismo-india": "/contact",
  "/blog": "/travel-journal",
  "/cancellazione-e-rimborso": "/cancellation-policy",
  "/terms-and-conditions": "/terms",
  "/informazione": "/travel-information",
}

function normalizePath(path: string) {
  const trimmed = path.length > 1 ? path.replace(/\/$/, "") : path
  return routeAliases[trimmed] || trimmed
}

function PageHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="inner-header">
      <a className="inner-brand" href="/" aria-label="Maragià Express home">
        <span aria-hidden="true">M</span>
        <b>
          MARAGIÀ <small>EXPRESS · INDIA</small>
        </b>
      </a>
      <nav
        className={open ? "inner-nav inner-nav-open" : "inner-nav"}
        aria-label="Main navigation"
      >
        <a href="/destinations">Destinations</a>
        <a href="/tours">Tours</a>
        <a href="/experiences">Experiences</a>
        <a href="/tailor-made">Tailor-made</a>
        <a href="/about">About</a>
        <a href="/travel-journal">Journal</a>
        <a href="/contact">Contact</a>
        <a className="inner-nav-cta" href="/tailor-made#enquiry">
          Plan your journey
        </a>
      </nav>
      <button
        className="inner-menu"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}

function PageFooter() {
  return (
    <footer className="inner-footer">
      <div>
        <a className="inner-brand" href="/">
          <span aria-hidden="true">M</span>
          <b>
            MARAGIÀ <small>EXPRESS · INDIA</small>
          </b>
        </a>
        <p>Discover India, your way.</p>
      </div>
      <div>
        <b>Explore</b>
        <a href="/destinations">Destinations</a>
        <a href="/tours">Tours</a>
        <a href="/experiences">Experiences</a>
        <a href="/tailor-made">Tailor-made travel</a>
        <a href="/travel-journal">Travel journal</a>
      </div>
      <div>
        <b>Company</b>
        <a href="/about">About Maragià Express</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/payment-policy">Payment policy</a>
        <a href="/cancellation-policy">Cancellation & refund</a>
      </div>
      <div>
        <b>Talk to us</b>
        <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <span>{siteConfig.location}</span>
        <div className="inner-socials">
          <a href="https://www.facebook.com/maragiaexpress/">Facebook</a>
          <a href="https://www.youtube.com/@maragiaexpress">YouTube</a>
          <a href="https://www.instagram.com/maragia_express">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

function Breadcrumbs({
  current,
  parent,
}: {
  current: string
  parent?: [string, string]
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span>/</span>
      {parent && (
        <>
          <a href={parent[1]}>{parent[0]}</a>
          <span>/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  )
}

function InnerHero({
  eyebrow,
  title,
  intro,
  image,
  parent,
}: {
  eyebrow: string
  title: string
  intro: string
  image?: string
  parent?: [string, string]
}) {
  return (
    <section className={`inner-hero ${image ? "inner-hero-image" : ""}`}>
      {image && <img src={image} alt="" />}
      {image && <span className="inner-hero-shade" />}
      <div>
        <Breadcrumbs current={title} parent={parent} />
        <p className="inner-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="inner-intro">{intro}</p>
      </div>
    </section>
  )
}

function ListingCard({
  href,
  image,
  eyebrow,
  title,
  copy,
}: {
  href: string
  image: string
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <a className="listing-card" href={href}>
      <div>
        <img src={image} alt="" loading="lazy" />
        <span />
      </div>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{copy}</span>
      <b>
        Explore <i aria-hidden="true">↗</i>
      </b>
    </a>
  )
}

function DestinationsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Across India"
        title="Destinations with a sense of place."
        intro="Begin with the landscape that calls to you, then shape a journey around its culture, rhythm and seasonal possibilities."
        image={images.udaipur}
      />
      <main className="inner-main">
        <div className="listing-intro">
          <p>
            India is not a single experience. Its regions differ in language,
            climate, architecture, cuisine and pace. These destination starting
            points reflect areas supported by the official Maragià Express
            website.
          </p>
        </div>
        <div className="listing-grid">
          {destinations.map((item) => (
            <ListingCard
              key={item.slug}
              href={`/destinations/${item.slug}`}
              image={item.image}
              eyebrow={item.eyebrow}
              title={item.name}
              copy={item.intro}
            />
          ))}
        </div>
        <BeyondIndia />
      </main>
    </>
  )
}

function BeyondIndia() {
  return (
    <section className="beyond-destinations">
      <div className="beyond-heading">
        <p className="inner-eyebrow">Beyond India</p>
        <h2>Bhutan, Nepal & Sri Lanka.</h2>
        <p>
          Three destinations currently presented beyond India by Maragià
          Express. Confirm current routes and services directly with the team.
        </p>
      </div>
      <div className="beyond-grid">
        {beyondIndiaDestinations.map((item) => (
          <ListingCard
            key={item.slug}
            href={`/destinations/${item.slug}`}
            image={item.image}
            eyebrow="Beyond India"
            title={item.name}
            copy={item.intro}
          />
        ))}
      </div>
    </section>
  )
}

function DestinationPage({ destination }: { destination: Destination }) {
  return (
    <>
      <InnerHero
        eyebrow={destination.eyebrow}
        title={destination.name}
        intro={destination.intro}
        image={destination.image}
        parent={["Destinations", "/destinations"]}
      />
      <main className="detail-main">
        <aside>
          <p>Journey themes</p>
          {destination.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </aside>
        <article>
          <p className="detail-lead">{destination.paragraphs[0]}</p>
          <p>{destination.paragraphs[1]}</p>
          <blockquote>
            “The right route leaves space not only to see India, but to
            understand where you are.”
          </blockquote>
          <h2>A journey shaped around you</h2>
          <p>
            Every itinerary is subject to current availability, season and local
            conditions. Tell the team what interests you and how you prefer to
            travel; they can discuss a route that makes sense as a complete
            journey.
          </p>
        </article>
      </main>
      <RelatedCallout title={`Begin planning ${destination.name}`} />
    </>
  )
}

function ExperiencesPage() {
  return (
    <>
      <InnerHero
        eyebrow="Ways to travel"
        title="Experiences that feel personal."
        intro="Cultural discovery, active journeys and thoughtful comfort—brought together around how you want to experience India."
        image={images.craft}
      />
      <main className="inner-main">
        <div className="listing-grid experience-listing">
          {experiences.map((item) => (
            <ListingCard
              key={item.slug}
              href={`/experiences/${item.slug}`}
              image={item.image}
              eyebrow={item.eyebrow}
              title={item.name}
              copy={item.intro}
            />
          ))}
        </div>
      </main>
    </>
  )
}

function ExperiencePage({ experience }: { experience: Experience }) {
  return (
    <>
      <InnerHero
        eyebrow={experience.eyebrow}
        title={experience.name}
        intro={experience.intro}
        image={experience.image}
        parent={["Experiences", "/experiences"]}
      />
      <main className="detail-main">
        <aside>
          <p>Best suited to</p>
          <strong>{experience.bestFor}</strong>
        </aside>
        <article>
          <p className="detail-lead">{experience.body[0]}</p>
          <p>{experience.body[1]}</p>
          <div className="fact-panel">
            <h2>Before you enquire</h2>
            <p>
              Include your preferred travel dates, group size, interests,
              approximate pace and accommodation preferences. No price,
              departure or inclusion is confirmed until you receive a specific
              proposal.
            </p>
          </div>
        </article>
      </main>
      <RelatedCallout title={`Explore ${experience.name.toLowerCase()}`} />
    </>
  )
}

function ToursPage() {
  const categories = Array.from(
    new Map(tours.map((tour) => [tour.categorySlug, tour.category])).entries(),
  )
  return (
    <>
      <InnerHero
        eyebrow="Maragià Express journeys"
        title="Tours of India."
        intro="Explore the established tour collection by theme, then contact the team for current itineraries, dates, inclusions and availability."
        image={images.rajasthan}
      />
      <main className="tours-page">
        <div className="tour-directory-intro">
          <p className="inner-eyebrow">The collection</p>
          <h2>Choose a journey to begin the conversation.</h2>
          <p>
            These tour names were supplied for the Maragià Express collection.
            Published prices and routes are shown where the official source
            provides a valid value, but every detail must be reconfirmed before
            booking.
          </p>
        </div>
        {categories.map(([slug, category], categoryIndex) => (
          <section className="tour-category" id={slug} key={slug}>
            <header>
              <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
              <div>
                <p className="inner-eyebrow">Tour collection</p>
                <h2>{category}</h2>
              </div>
            </header>
            <div className="tour-card-grid">
              {tours
                .filter((tour) => tour.categorySlug === slug)
                .map((tour) => (
                  <a
                    className="tour-card"
                    href={`/tours/${tour.slug}`}
                    key={tour.slug}
                  >
                    <div>
                      <img src={tour.image} alt="" loading="lazy" />
                      <span />
                    </div>
                    <small>{tour.category}</small>
                    <h3>{tour.title}</h3>
                    <p>{tour.summary}</p>
                    <b>
                      View tour <span aria-hidden="true">↗</span>
                    </b>
                  </a>
                ))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}

function TourGallery({ gallery, title }: { gallery: string[]; title: string }) {
  const [active, setActive] = useState(0)
  return (
    <section className="tour-gallery" aria-label={`${title} image gallery`}>
      <div className="tour-gallery-main">
        <img
          src={gallery[active]}
          alt={`${title} gallery view ${active + 1}`}
        />
        <div className="tour-gallery-controls">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setActive((current) =>
                current === 0 ? gallery.length - 1 : current - 1,
              )
            }
          >
            ←
          </button>
          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(gallery.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Next image"
            onClick={() =>
              setActive((current) =>
                current === gallery.length - 1 ? 0 : current + 1,
              )
            }
          >
            →
          </button>
        </div>
      </div>
      <div className="tour-gallery-thumbs">
        {gallery.map((image, index) => (
          <button
            type="button"
            className={active === index ? "tour-thumb-active" : ""}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            key={image}
          >
            <img src={image} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  )
}

function TourEnquiryForm({ tour }: { tour: Tour }) {
  const [ready, setReady] = useState<{ subject: string; body: string } | null>(
    null,
  )
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fields = [
      ["Tour", tour.title],
      ["Name", data.get("name")],
      ["Email", data.get("email")],
      ["Phone", data.get("phone")],
      ["Country", data.get("country")],
      ["Preferred dates", data.get("dates")],
      ["Travelers", data.get("travelers")],
      ["Accommodation", data.get("accommodation")],
      ["Message", data.get("message")],
    ]
    const body = fields
      .map(([label, value]) => `${label}: ${value || ""}`)
      .join("\n")
    setReady({ subject: `Tour enquiry: ${tour.title}`, body })
  }
  if (ready) {
    return (
      <div id="tour-enquiry">
        <EnquiryReady
          subject={ready.subject}
          body={ready.body}
          onEdit={() => setReady(null)}
        />
      </div>
    )
  }
  return (
    <form className="tour-enquiry-form" onSubmit={submit} id="tour-enquiry">
      <div className="tour-form-heading">
        <p className="inner-eyebrow">Ask about this journey</p>
        <h2>Enquire about {tour.title}</h2>
        <p>
          Tell us your dates and how you like to travel. We will reply with the
          current itinerary, price and availability. This does not book the tour.
        </p>
      </div>
      <FormGuide />
      <label className="tour-field-wide">
        Selected tour
        <input value={tour.title} readOnly aria-readonly="true" />
      </label>
      <div className="tour-form-row">
        <label>
          Full name *
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
          />
        </label>
        <label>
          Email address *
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <div className="tour-form-row">
        <label>
          Phone or WhatsApp
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+00 000 000 000"
          />
        </label>
        <label>
          Country of residence
          <input
            name="country"
            autoComplete="country-name"
            placeholder="Your country"
          />
        </label>
      </div>
      <div className="tour-form-row tour-form-three">
        <label>
          Preferred dates *
          <input name="dates" required placeholder="Month or dates" />
          <span className="field-hint">A month is enough if your dates are not fixed.</span>
        </label>
        <label>
          Travelers *
          <input
            name="travelers"
            required
            type="number"
            min="1"
            placeholder="2"
          />
        </label>
        <label>
          Accommodation
          <select name="accommodation" defaultValue="">
            <option value="" disabled>
              Select preference
            </option>
            <option>Comfortable</option>
            <option>Heritage</option>
            <option>Luxury</option>
            <option>Open to advice</option>
          </select>
        </label>
      </div>
      <label className="tour-field-wide">
        What should we know about this trip? *
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Pace, interests, who is travelling, and any questions."
        />
        <span className="field-hint">
          Mention accessibility, dietary needs, or the kind of stay you prefer.
        </span>
      </label>
      <label className="tour-consent">
        <input type="checkbox" required />
        <span>
          I understand I still need to send the email, and that this does not
          book the tour.
        </span>
      </label>
      <div className="tour-form-submit">
        <button type="submit">
          Continue to email <span aria-hidden="true">↗</span>
        </button>
        <small>
          Prefer to speak directly?{" "}
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        </small>
      </div>
    </form>
  )
}

function TourPage({ tour }: { tour: Tour }) {
  const details = tourDetails[tour.slug] ?? {
    price: "On request",
    duration: "Confirmed with proposal",
    route: ["Current itinerary available on enquiry"],
  }
  const gallery = details.gallery ?? [
    tour.image,
    images.rajasthan,
    images.craft,
  ]
  const includes = details.includes ?? defaultIncludes
  const excludes = details.excludes ?? defaultExcludes
  const sampleItinerary = createSampleItinerary(details)
  const relatedTours = tours
    .filter(
      (item) =>
        item.categorySlug === tour.categorySlug && item.slug !== tour.slug,
    )
    .slice(0, 3)
  return (
    <>
      <InnerHero
        eyebrow={tour.category}
        title={tour.title}
        intro={tour.summary}
        image={tour.image}
        parent={["Tours", "/tours"]}
      />
      <main className="tour-detail">
        <aside>
          <p className="inner-eyebrow">Tour information</p>
          <dl>
            <div>
              <dt>Published price</dt>
              <dd className="tour-price">{details.price}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{details.duration}</dd>
            </div>
            <div>
              <dt>Collection</dt>
              <dd>{tour.category}</dd>
            </div>
          </dl>
          <p className="tour-price-note">
            Published source price where available. Reconfirm the current price,
            currency basis, dates and availability before booking.
          </p>
          <a href="#tour-enquiry">Enquire about this tour</a>
        </aside>
        <article>
          <p className="detail-lead">{tour.summary}</p>
          <p>
            This tour is part of the established Maragià Express collection. The
            exact route, accommodation, transport, inclusions and support
            available may change, so they are only confirmed in a specific
            proposal from the travel team.
          </p>
          <h2>Destinations on this journey</h2>
          <p>
            Follow the published route through these destinations. The sequence
            may be refined in your confirmed proposal.
          </p>
          <ol className="tour-route">
            {details.route.map((stop, index) => (
              <li key={`${stop}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{stop}</b>
              </li>
            ))}
          </ol>
          <div className="tour-caution">
            <b>Itinerary note</b>
            <p>
              This is the route summary published by Maragià Express, not a
              promise of current operation. Request the current day-by-day
              program before arranging flights.
            </p>
          </div>
        </article>
      </main>
      <section className="tour-itinerary">
        <div className="tour-itinerary-heading">
          <div>
            <p className="inner-eyebrow">Tour itinerary</p>
            <h2>Day by day.</h2>
          </div>
          <p>
            Sample placeholder content based on the published route. Request
            the current detailed program before arranging travel.
          </p>
        </div>
        <ol className="tour-itinerary-days">
          {sampleItinerary.map((item) => (
            <li key={item.day}>
              <div className="tour-day-number">
                <span>Day</span>
                <b>{String(item.day).padStart(2, "0")}</b>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="tour-itinerary-disclaimer">
          Placeholder itinerary — not a confirmed or published day-by-day
          program.
        </p>
      </section>
      <TourGallery gallery={gallery} title={tour.title} />
      <section className="tour-logistics">
        <div className="tour-inclusions">
          <div>
            <p className="inner-eyebrow">Practical details</p>
            <h2>What the journey includes.</h2>
          </div>
          <article>
            <h3>Included</h3>
            <ul>
              {includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Not included</h3>
            <ul>
              {excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="tour-inclusion-note">
          The signed proposal and booking documents always take precedence over
          this website summary.
        </p>
      </section>
      <section className="tour-map">
        <div>
          <p className="inner-eyebrow">The route</p>
          <h2>Journey map.</h2>
          <p>
            Use this published route image as an overview only. The final route
            is confirmed in your proposal.
          </p>
          <ul className="tour-map-destinations" aria-label="Tour destinations">
            {details.route.map((stop, index) => (
              <li key={`${stop}-map-${index}`}>{stop}</li>
            ))}
          </ul>
        </div>
        {details.map ? (
          <figure>
            <img
              src={details.map}
              alt={`Published route map for ${tour.title}`}
              loading="lazy"
            />
            <figcaption>
              Published by Maragià Express on the existing tour page.
            </figcaption>
          </figure>
        ) : (
          <div className="tour-map-pending">
            <span aria-hidden="true">M</span>
            <p>
              The current route map is supplied with the confirmed itinerary.
            </p>
          </div>
        )}
      </section>
      <nav className="tour-policy-links" aria-label="Tour policies">
        <a href="/terms">
          <span>Terms & conditions</span>
          <b aria-hidden="true">↗</b>
        </a>
        <a href="/payment-policy">
          <span>Payment policy</span>
          <b aria-hidden="true">↗</b>
        </a>
        <a href="/cancellation-policy">
          <span>Cancellation & refund</span>
          <b aria-hidden="true">↗</b>
        </a>
      </nav>
      <section className="tour-enquiry-section">
        <TourEnquiryForm tour={tour} />
      </section>
      {relatedTours.length > 0 && (
        <section className="related-tours">
          <div>
            <p className="inner-eyebrow">In the same collection</p>
            <h2>Continue exploring.</h2>
          </div>
          <div>
            {relatedTours.map((item) => (
              <a href={`/tours/${item.slug}`} key={item.slug}>
                <span>{item.title}</span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function RelatedCallout({ title }: { title: string }) {
  return (
    <section className="related-callout">
      <div>
        <p className="inner-eyebrow">Your journey</p>
        <h2>{title}</h2>
      </div>
      <p>
        Share a few ideas with the Maragià Express team and start a conversation
        about what is currently possible.
      </p>
      <a href="/tailor-made#enquiry">
        Plan your journey <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function EnquiryForm() {
  const [ready, setReady] = useState<{ subject: string; body: string } | null>(
    null,
  )
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const lines = [
      ["Name", data.get("name")],
      ["Email", data.get("email")],
      ["Country", data.get("country")],
      ["Destination", data.get("destination")],
      ["Dates", data.get("dates")],
      ["Travelers", data.get("travelers")],
      ["Interests", data.get("interests")],
      ["Message", data.get("message")],
    ]
      .map(([label, value]) => `${label}: ${value || ""}`)
      .join("\n")
    const name = String(data.get("name") || "a traveller")
    setReady({ subject: `Journey enquiry from ${name}`, body: lines })
  }
  if (ready) {
    return (
      <div id="enquiry">
        <EnquiryReady
          subject={ready.subject}
          body={ready.body}
          onEdit={() => setReady(null)}
        />
      </div>
    )
  }
  return (
    <form className="inner-form" onSubmit={submit} id="enquiry">
      <FormGuide />
      <div className="inner-field-row">
        <label>
          Full name *
          <input name="name" required autoComplete="name" placeholder="Your full name" />
        </label>
        <label>
          Email address *
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
          <span className="field-hint">We reply to this address.</span>
        </label>
      </div>
      <div className="inner-field-row">
        <label>
          Country of residence
          <input name="country" autoComplete="country-name" placeholder="Your country" />
        </label>
        <label>
          Preferred destination
          <input name="destination" placeholder="Rajasthan, Ladakh, or not sure yet" />
        </label>
      </div>
      <div className="inner-field-row">
        <label>
          Approximate dates
          <input name="dates" placeholder="Month or dates" />
          <span className="field-hint">A month is enough if your dates are not fixed.</span>
        </label>
        <label>
          Number of travelers
          <input name="travelers" type="number" min="1" placeholder="2" />
        </label>
      </div>
      <label>
        Travel interests
        <input
          name="interests"
          placeholder="Culture, wildlife, cycling, architecture..."
        />
      </label>
      <label>
        What should we know? *
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Pace, who is travelling, and any questions."
        />
      </label>
      <button type="submit">
        Continue to email <span aria-hidden="true">↗</span>
      </button>
      <small>
        You review the message next. Sending the email is what reaches the
        team. Nothing is stored or booked on this page.
      </small>
    </form>
  )
}

function TailorMadePage() {
  return (
    <>
      <InnerHero
        eyebrow="Designed around you"
        title="Your interests. Your pace. Your India."
        intro="A thoughtful itinerary begins with what matters to you—not with a pre-set package."
        image={images.desert}
      />
      <main className="tailor-page">
        <section className="process-intro">
          <p className="inner-eyebrow">The planning process</p>
          <h2>From first ideas to a journey that feels coherent.</h2>
          <p>
            Use the form to share a starting point. The team can then discuss
            current options and refine a route around your dates, interests and
            preferences. Filling in the form does not reserve a trip.
          </p>
        </section>
        <div className="inner-steps">
          <article>
            <span>01</span>
            <h3>Share your ideas</h3>
            <p>
              Tell the team about your travel dates, interests, pace, group and
              accommodation preferences.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Shape the journey</h3>
            <p>
              Discuss a proposed route and refine the practical details before
              anything is confirmed.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Travel with clarity</h3>
            <p>
              Receive the arrangements, inclusions and support specifically
              confirmed for your itinerary.
            </p>
          </article>
        </div>
        <section className="enquiry-section">
          <div>
            <p className="inner-eyebrow">Begin a conversation</p>
            <h2>Tell us what inspires you.</h2>
            <p>
              Share your dates and interests. On the next step you open an
              email and press Send. That message is what the team receives.
            </p>
          </div>
          <EnquiryForm />
        </section>
      </main>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow="Maragià Express"
        title="India, understood from within."
        intro="An India-based travel agency and tour operator creating personalized journeys from Udaipur, Rajasthan."
        image={images.udaipur}
      />
      <main className="about-page">
        <section>
          <p className="inner-eyebrow">Our approach</p>
          <h2>More than a route between places.</h2>
          <p className="detail-lead">
            Maragià Express presents travel through India’s culture,
            architecture, landscapes, festivals and active experiences.
          </p>
          <p>
            The company’s public website features organized and personalized
            travel, cultural tours, festival journeys, cycling, Himalayan
            adventure, wildlife experiences and selected destinations beyond
            India.
          </p>
          <p>
            This redesign does not invent a founding story, team biography,
            award or special-access claim. Those details should only be added
            after owner review.
          </p>
        </section>
        <figure>
          <img
            src={images.craft}
            alt="Rajasthani musician wearing traditional dress"
          />
          <figcaption>
            Travel with respect for place, people and living traditions.
          </figcaption>
        </figure>
      </main>
      <section className="values-band">
        <article>
          <span>01</span>
          <h3>Listen first</h3>
          <p>Begin with the traveler, not a fixed package.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Honor context</h3>
          <p>Present culture as lived experience, not decoration.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Plan honestly</h3>
          <p>Confirm what is available without unsupported promises.</p>
        </article>
      </section>
    </>
  )
}

function JournalPage() {
  return (
    <>
      <InnerHero
        eyebrow="Travel journal"
        title="Notes for the curious traveler."
        intro="Practical planning perspectives and cultural context for a more considered journey through India."
        image={images.palace}
      />
      <main className="inner-main">
        <div className="journal-listing">
          {articles.map((article) => (
            <ListingCard
              key={article.slug}
              href={`/travel-journal/${article.slug}`}
              image={article.image}
              eyebrow={article.category}
              title={article.title}
              copy={article.excerpt}
            />
          ))}
        </div>
        <div className="legacy-journal">
          <p>
            The existing Italian-language Maragià Express journal remains
            available during the content migration.
          </p>
          <a href="https://maragiaexpress.com/blog/">
            Visit the original journal ↗
          </a>
        </div>
      </main>
    </>
  )
}

function ArticlePage({ article }: { article: typeof articles[number] }) {
  return (
    <>
      <InnerHero
        eyebrow={article.category}
        title={article.title}
        intro={article.excerpt}
        image={article.image}
        parent={["Travel journal", "/travel-journal"]}
      />
      <main className="article-page">
        <header>
          <span>By Maragià Express editorial team</span>
          <span>Planning perspective</span>
        </header>
        <p className="detail-lead">
          India rewards preparation, but not an itinerary crowded with constant
          movement. Begin with the experience you want rather than a list of
          every place you have heard about.
        </p>
        <h2>Start with geography and season</h2>
        <p>
          India is vast, and conditions differ significantly between regions. A
          sensible route considers travel time, climate, altitude and how long
          each transition takes—not only the distance on a map.
        </p>
        <h2>Choose depth over volume</h2>
        <p>
          Staying longer in fewer places creates room for unplanned discoveries
          and a better understanding of local context. It can also reduce
          fatigue and make the overall journey feel more coherent.
        </p>
        <blockquote>
          Good travel planning creates space: for context, for conversation and
          for the unexpected.
        </blockquote>
        <h2>Discuss the practical details</h2>
        <p>
          Share your interests, preferred comfort level, mobility
          considerations, group size and approximate budget context. Always
          confirm current entry requirements, health advice and official travel
          guidance with authoritative sources before departure.
        </p>
      </main>
      <RelatedCallout title="Turn inspiration into a considered route" />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="Contact Maragià Express"
        title="Let’s talk about India."
        intro="Reach the team in Udaipur directly or share the starting point for a future journey."
        image={images.rajasthan}
      />
      <main className="contact-page">
        <section>
          <p className="inner-eyebrow">Direct contact</p>
          <h2>We are based in Udaipur, Rajasthan.</h2>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <p>{siteConfig.location}</p>
          <small>
            Business hours and response times are not published until confirmed
            by the owner.
          </small>
        </section>
        <EnquiryForm />
      </main>
    </>
  )
}

function PolicyPage({
  type,
}: {
  type: "privacy" | "terms" | "payment" | "cancellation" | "information"
}) {
  const content = {
    privacy: {
      title: "Privacy notice",
      intro:
        "How this preview handles information and what must be confirmed before production launch.",
      sections: [
        [
          "Current form behavior",
          "The enquiry forms on this preview do not transmit to or store data on a website server. They prepare an email in the visitor’s own email application.",
        ],
        [
          "Production requirements",
          "Before connecting a CRM or email provider, Maragià Express must publish a reviewed privacy notice covering the data collected, purpose, legal basis, retention, processors and applicable user rights.",
        ],
        [
          "External services",
          "Photography and font resources currently load from external providers. Production deployment should document or replace these resources as appropriate.",
        ],
      ],
    },
    terms: {
      title: "Terms and conditions",
      intro:
        "Published booking principles that must be read with your specific written proposal.",
      sections: [
        [
          "Quotes, prices and exchange rates",
          "The existing published terms explain that prices may depend on supplier availability, exchange-rate movements, supplier increases and tax changes. Any change must be communicated before the booking transaction; the current written proposal is the authoritative price.",
        ],
        [
          "Confirmation of services",
          "A website itinerary or price does not itself confirm a booking. Dates, accommodation, transport, inclusions and supplier terms are confirmed only in the written proposal and booking documents issued for your journey.",
        ],
        [
          "Insurance and travel documents",
          "Travelers should confirm passport, visa, insurance and health requirements applicable to their circumstances. The published terms recommend suitable medical cover, including emergency transfer or repatriation.",
        ],
      ],
    },
    payment: {
      title: "Payment policy",
      intro:
        "A plain-language summary of the payment terms currently published on Maragià Express tour pages.",
      sections: [
        [
          "Deposit and balance",
          "The existing tour pages state that a deposit equal to 50% of the total is required 45 days before departure, with the remaining balance due 30 days before departure. Ask the team to confirm the schedule applying to your specific booking.",
        ],
        [
          "Payment method and documents",
          "The published policy states that payments are made by bank transfer to the company account. An invoice with payment details is supplied, followed by a receipt; travel vouchers and booking confirmations are issued after the full amount is received.",
        ],
        [
          "Late or missed payment",
          "The published policy states that failure to pay the deposit or balance by its deadline may result in automatic cancellation. Any amount retained or transferred to another booking is governed by the written terms applying to the reservation.",
        ],
        [
          "Festive-period bookings",
          "The existing policy contains special non-refundable conditions for Christmas and New Year bookings. Obtain the exact dates and current conditions in writing before paying.",
        ],
      ],
    },
    cancellation: {
      title: "Cancellation and refunds",
      intro:
        "A summary of the cancellation scale currently published by Maragià Express.",
      sections: [
        [
          "How to cancel",
          "The published policy requires cancellation to be communicated in writing by email. The notice period begins when the request is confirmed by customer service; requests sent outside working days or office hours are handled on the next working day.",
        ],
        [
          "Published cancellation scale",
          "The existing tour pages publish the following scale: 15% of the tour or service cost when confirmed 45 days before departure; 50% when confirmed 30 days before departure; and 100% from 15 days before departure through the departure date.",
        ],
        [
          "Supplier and festive-period conditions",
          "Separate supplier cancellation rules may apply. The published policy also states that bookings from 20 December to 5 January and travel during Diwali are non-refundable. Confirm the current conditions in the signed booking documents.",
        ],
      ],
    },
    information: {
      title: "Travel information",
      intro:
        "Practical details should be checked for your route, dates and individual circumstances.",
      sections: [
        [
          "Entry and health requirements",
          "Use current government and authoritative sources for passports, visas, vaccinations, insurance and health guidance. Requirements can change.",
        ],
        [
          "Season and conditions",
          "Weather, altitude, festival dates, reserve access and road conditions can affect an itinerary. Confirm current details when planning.",
        ],
        [
          "Accessibility and individual needs",
          "Share mobility, dietary, health or other relevant requirements early so the team can discuss what arrangements may be possible.",
        ],
      ],
    },
  }[type]
  return (
    <>
      <InnerHero
        eyebrow="Important information"
        title={content.title}
        intro={content.intro}
      />
      <main className="policy-page">
        <p className="policy-notice">
          Draft website information · Requires business and legal review before
          production launch
        </p>
        {content.sections.map(([title, copy]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
          </section>
        ))}
        {type === "cancellation" && (
          <a href="https://maragiaexpress.com/cancellazione-e-rimborso/">
            View the existing published policy ↗
          </a>
        )}
        {type === "terms" && (
          <a href="https://maragiaexpress.com/terms-and-conditions/">
            View the existing published terms ↗
          </a>
        )}
        <p>
          For clarification, contact{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </main>
    </>
  )
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="inner-eyebrow">404 · Journey interrupted</p>
      <h1>This path does not lead anywhere—yet.</h1>
      <p>
        Return to the homepage or continue exploring destinations supported by
        Maragià Express.
      </p>
      <a href="/">Return home</a>
    </main>
  )
}

export default function InnerPages({ pathname }: { pathname: string }) {
  const path = normalizePath(pathname)
  let content: React.ReactNode
  let title = "Maragià Express"

  if (path === "/destinations") {
    content = <DestinationsPage />
    title = "Destinations"
  } else if (path.startsWith("/destinations/")) {
    const item = [...destinations, ...beyondIndiaDestinations].find(
      (destination) => `/destinations/${destination.slug}` === path,
    )
    content = item ? <DestinationPage destination={item} /> : <NotFoundPage />
    title = item?.name || "Page not found"
  } else if (path === "/tours") {
    content = <ToursPage />
    title = "Tours of India"
  } else if (path.startsWith("/tours/")) {
    const item = tours.find((tour) => `/tours/${tour.slug}` === path)
    content = item ? <TourPage tour={item} /> : <NotFoundPage />
    title = item?.title || "Page not found"
  } else if (path === "/experiences") {
    content = <ExperiencesPage />
    title = "Travel experiences"
  } else if (path.startsWith("/experiences/")) {
    const item = experiences.find(
      (experience) => `/experiences/${experience.slug}` === path,
    )
    content = item ? <ExperiencePage experience={item} /> : <NotFoundPage />
    title = item?.name || "Page not found"
  } else if (path === "/tailor-made") {
    content = <TailorMadePage />
    title = "Tailor-made journeys"
  } else if (path === "/about") {
    content = <AboutPage />
    title = "About"
  } else if (path === "/travel-journal") {
    content = <JournalPage />
    title = "Travel journal"
  } else if (path.startsWith("/travel-journal/")) {
    const item = articles.find(
      (article) => `/travel-journal/${article.slug}` === path,
    )
    content = item ? <ArticlePage article={item} /> : <NotFoundPage />
    title = item?.title || "Page not found"
  } else if (path === "/contact") {
    content = <ContactPage />
    title = "Contact"
  } else if (path === "/privacy") {
    content = <PolicyPage type="privacy" />
    title = "Privacy notice"
  } else if (path === "/terms") {
    content = <PolicyPage type="terms" />
    title = "Terms and conditions"
  } else if (path === "/payment-policy") {
    content = <PolicyPage type="payment" />
    title = "Payment policy"
  } else if (path === "/cancellation-policy") {
    content = <PolicyPage type="cancellation" />
    title = "Cancellation and refunds"
  } else if (path === "/travel-information") {
    content = <PolicyPage type="information" />
    title = "Travel information"
  } else {
    content = <NotFoundPage />
    title = "Page not found"
  }

  useEffect(() => {
    document.title = `${title} | Maragià Express`
    const hash = window.location.hash.slice(1)
    const target = hash ? document.getElementById(hash) : null
    if (target) {
      target.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, title])

  return (
    <div className="inner-site">
      <PageHeader />
      {content}
      {path !== "/404" && <PageFooter />}
    </div>
  )
}
