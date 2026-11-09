import { siteImages } from "./site-images"

export type Article = {
  slug: string
  category: string
  title: string
  excerpt: string
  image: string
}

export const articles: Article[] = [
  {
    slug: "planning-first-visit-india",
    category: "Planning",
    title: "Planning a first journey through India",
    excerpt:
      "Start with season, geography and pace before deciding how many places belong in your itinerary.",
    image: siteImages.udaipur,
  },
  {
    slug: "rajasthan-heritage-cities",
    category: "Culture",
    title: "Reading Rajasthan through its heritage cities",
    excerpt:
      "Udaipur, Jodhpur and Jaipur each tell a different story through landscape, architecture and color.",
    image: siteImages.palace,
  },
  {
    slug: "travel-at-a-slower-pace",
    category: "Travel well",
    title: "Why a slower journey often reveals more",
    excerpt:
      "Fewer transitions can create more space for context, conversation and a genuine sense of place.",
    image: siteImages.desert,
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function getArticleSlugs() {
  return articles.map((article) => article.slug)
}
