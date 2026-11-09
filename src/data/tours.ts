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
    title: "Tour of India",
    category: "Tour of India",
    categorySlug: "tour-of-india",
    image: siteImages.udaipur,
    summary:
      "A starting point for discussing a personalized journey through India’s cultural and geographic diversity.",
  },
  {
    slug: "maharajas-tour",
    title: "The Maharaja’s Tour",
    category: "Luxury and Splendor",
    categorySlug: "luxury-and-splendor",
    image: siteImages.palace,
    summary:
      "A refined India journey presented within Maragià Express’s Luxury and Splendor collection.",
  },
  {
    slug: "natural-kerala",
    title: "Natural Kerala",
    category: "Luxury and Splendor",
    categorySlug: "luxury-and-splendor",
    image: siteImages.sriLanka,
    summary:
      "A southern India journey centered on the landscapes and character of Kerala.",
  },
  {
    slug: "three-cats-of-india",
    title: "The Three Cats of India",
    category: "Luxury and Splendor",
    categorySlug: "luxury-and-splendor",
    image: siteImages.wildlife,
    summary:
      "A wildlife-focused journey listed in the Luxury and Splendor collection.",
  },
  {
    slug: "indian-festival-of-colors",
    title: "Indian Festival of Colors",
    category: "Indian Festivals Tour",
    categorySlug: "indian-festivals-tour",
    image: siteImages.craft,
    summary:
      "A seasonal journey inspired by India’s Festival of Colors and its cultural setting.",
  },
  {
    slug: "camel-fair",
    title: "Camel Fair",
    category: "Indian Festivals Tour",
    categorySlug: "indian-festivals-tour",
    image: siteImages.desert,
    summary:
      "A Rajasthan festival journey associated with the celebrated Pushkar Camel Fair.",
  },
  {
    slug: "hemis-feast-festival",
    title: "Hemis’s Feast",
    category: "Indian Festivals Tour",
    categorySlug: "indian-festivals-tour",
    image: siteImages.ladakh,
    summary:
      "A festival-focused Ladakh journey presented around the Hemis celebration.",
  },
  {
    slug: "overland-himalaya-tour",
    title: "An Overland Himalaya Tour",
    category: "Adventures in the World India",
    categorySlug: "adventures-in-the-world-india",
    image: siteImages.ladakh,
    summary:
      "An overland mountain journey presented within the India adventure collection.",
  },
  {
    slug: "rajasthan-on-bicycle",
    title: "Rajasthan on Bicycle",
    category: "Adventures in the World India",
    categorySlug: "adventures-in-the-world-india",
    image: siteImages.cycle,
    summary:
      "An active journey through Rajasthan designed around travel by bicycle.",
  },
  {
    slug: "hemis-feast-adventure",
    title: "Hemis’s Feast",
    category: "Adventures in the World India",
    categorySlug: "adventures-in-the-world-india",
    image: siteImages.bhutan,
    summary:
      "A Ladakh festival journey included in the India adventure collection.",
  },
  {
    slug: "classic-south-india",
    title: "Classic Trip to South India",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.sriLanka,
    summary:
      "A cultural introduction to selected landscapes and heritage destinations in South India.",
  },
  {
    slug: "introduction-to-india",
    title: "Introduction to India",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.rajasthan,
    summary:
      "An introductory cultural journey for travelers beginning their exploration of India.",
  },
  {
    slug: "karnataka-and-goa",
    title: "Trip to Karnataka and Goa",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.palace,
    summary:
      "A cultural journey bringing together selected destinations in Karnataka and Goa.",
  },
  {
    slug: "bengal-and-sikkim",
    title: "Trip to Bengal and Sikkim",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.nepal,
    summary:
      "A journey linking the cultural character of Bengal with the Himalayan setting of Sikkim.",
  },
  {
    slug: "temples-and-tribes-of-orissa",
    title: "Temples and Tribes of Orissa",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.craft,
    summary:
      "A cultural route in Odisha, listed by Maragià Express under its established tour title.",
  },
  {
    slug: "gujarat-trip",
    title: "Gujarat Trip",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.desert,
    summary:
      "A cultural journey through selected heritage and landscape experiences in Gujarat.",
  },
  {
    slug: "rural-rajasthan",
    title: "Rural Trip Rajasthan",
    category: "Cultural Tours of India",
    categorySlug: "cultural-tours-of-india",
    image: siteImages.udaipur,
    summary:
      "A Rajasthan journey with an emphasis on rural landscapes and local context.",
  },
]

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug)
}

export function getTourSlugs() {
  return tours.map((tour) => tour.slug)
}
