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
    category: "Pianificazione",
    title: "Pianificare il primo viaggio in India",
    excerpt:
      "Parti da stagione, geografia e ritmo prima di decidere quante tappe inserire nel tuo itinerario.",
    image: siteImages.udaipur,
  },
  {
    slug: "rajasthan-heritage-cities",
    category: "Cultura",
    title: "Leggere il Rajasthan attraverso le sue città storiche",
    excerpt:
      "Udaipur, Jodhpur e Jaipur raccontano ciascuna una storia diversa attraverso paesaggio, architettura e colore.",
    image: siteImages.palace,
  },
  {
    slug: "travel-at-a-slower-pace",
    category: "Viaggiare bene",
    title: "Perché un viaggio più lento spesso rivela di più",
    excerpt:
      "Meno spostamenti lasciano più spazio al contesto, alle conversazioni e a un autentico senso del luogo.",
    image: siteImages.desert,
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function getArticleSlugs() {
  return articles.map((article) => article.slug)
}
