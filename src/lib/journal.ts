import type { Article } from "@/lib/content"
import { routes } from "@/lib/routes"

export const JOURNAL_PAGE_SIZE = 6

export type JournalCategory = {
  slug: string
  name: string
}

export function journalCategoryOptions(articles: Article[]): JournalCategory[] {
  const categories = new Map<string, string>()
  for (const article of articles) {
    if (article.categorySlug && !categories.has(article.categorySlug)) {
      categories.set(article.categorySlug, article.category || article.categorySlug)
    }
  }
  return [...categories.entries()].map(([slug, name]) => ({ slug, name }))
}

export function journalListingHref(category = "", page = 1) {
  const base = category ? routes.category(category) : routes.journal
  return page > 1 ? `${base}?page=${page}` : base
}

export function readJournalQuery(input: {
  categoria?: string | string[]
  page?: string | string[]
}) {
  const categoryValue = Array.isArray(input.categoria) ? input.categoria[0] : input.categoria
  const pageValue = Array.isArray(input.page) ? input.page[0] : input.page
  const category = categoryValue && /^[a-z0-9-]+$/.test(categoryValue) ? categoryValue : ""
  const parsed = Number(pageValue)
  const page = Number.isInteger(parsed) && parsed > 1 ? parsed : 1
  return { category, page }
}

export function selectArticles(
  articles: Article[],
  category: string,
  page: number,
  pageSize = JOURNAL_PAGE_SIZE,
) {
  const filtered = category
    ? articles.filter((article) => article.categorySlug === category)
    : articles
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)
  const start = (page - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize),
    total,
    totalPages,
    outOfRange: total > 0 && page > totalPages,
  }
}

export function relatedArticles(articles: Article[], current: Article, limit = 3) {
  const others = articles.filter((article) => article.slug !== current.slug)
  const sameCategory = others.filter((article) => article.categorySlug === current.categorySlug)
  const rest = others.filter((article) => article.categorySlug !== current.categorySlug)
  return [...sameCategory, ...rest].slice(0, limit)
}

export function formatJournalDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) return ""
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}
