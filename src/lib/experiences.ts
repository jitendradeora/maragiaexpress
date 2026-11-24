import type { Experience } from "@/lib/content"
import { routes } from "@/lib/routes"

export const EXPERIENCE_PAGE_SIZE = 6

export function experienceListingHref(page = 1) {
  return page > 1 ? `${routes.experiences}?page=${page}` : routes.experiences
}

export function readExperiencePage(value?: string | string[]) {
  const pageValue = Array.isArray(value) ? value[0] : value
  const parsed = Number(pageValue)
  return Number.isInteger(parsed) && parsed > 1 ? parsed : 1
}

export function selectExperiences(
  experiences: Experience[],
  page: number,
  pageSize = EXPERIENCE_PAGE_SIZE,
) {
  const total = experiences.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)
  const start = (page - 1) * pageSize
  return {
    items: experiences.slice(start, start + pageSize),
    total,
    totalPages,
    outOfRange: total > 0 && page > totalPages,
  }
}
