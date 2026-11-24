import type { Tour } from "@/lib/content"
import { routes } from "@/lib/routes"

export const TOUR_PAGE_SIZE = 9

export type TourCategory = {
  slug: string
  name: string
}

export function tourCategoryOptions(tours: Tour[]): TourCategory[] {
  const categories = new Map<string, string>()
  for (const tour of tours) {
    if (tour.categorySlug && !categories.has(tour.categorySlug)) {
      categories.set(tour.categorySlug, tour.category || tour.categorySlug)
    }
  }
  return [...categories.entries()].map(([slug, name]) => ({ slug, name }))
}

export function tourListingHref(category = "", page = 1) {
  const base = category ? routes.tourCategory(category) : routes.tours
  return page > 1 ? `${base}?page=${page}` : base
}

export function readTourQuery(input: {
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

export function selectTours(
  tours: Tour[],
  category: string,
  page: number,
  pageSize = TOUR_PAGE_SIZE,
) {
  const filtered = category
    ? tours.filter((tour) => tour.categorySlug === category)
    : tours
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
