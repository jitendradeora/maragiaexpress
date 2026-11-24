import type { Destination } from "@/lib/content"
import { routes } from "@/lib/routes"

export const DESTINATION_PAGE_SIZE = 6

export type DestinationRegion = {
  slug: string
  name: string
}

export function destinationRegionOptions(destinations: Destination[]): DestinationRegion[] {
  const regions = new Map<string, string>()
  for (const destination of destinations) {
    if (destination.region && !regions.has(destination.region)) {
      regions.set(destination.region, destination.regionName || destination.region)
    }
  }
  return [...regions.entries()].map(([slug, name]) => ({ slug, name }))
}

export function destinationListingHref(area = "", page = 1) {
  const base = area ? routes.area(area) : routes.destinations
  return page > 1 ? `${base}?page=${page}` : base
}

export function readListingQuery(input: {
  area?: string | string[]
  page?: string | string[]
}) {
  const areaValue = Array.isArray(input.area) ? input.area[0] : input.area
  const pageValue = Array.isArray(input.page) ? input.page[0] : input.page
  const area = areaValue && /^[a-z0-9-]+$/.test(areaValue) ? areaValue : ""
  const parsed = Number(pageValue)
  const page = Number.isInteger(parsed) && parsed > 1 ? parsed : 1
  return { area, page }
}

export function selectDestinations(
  destinations: Destination[],
  area: string,
  page: number,
  pageSize = DESTINATION_PAGE_SIZE,
) {
  const filtered = area
    ? destinations.filter((destination) => destination.region === area)
    : destinations
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
