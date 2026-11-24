import type { MetadataRoute } from "next"
import { staticPages } from "@/data/pages"
import { routes } from "@/lib/routes"
import { siteConfig } from "@/lib/site-config"
import { getCatalog, getContentIndex } from "@/lib/wp/content"

export const revalidate = 60

function parsedDate(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function latestDate(values: string[]) {
  const times = values
    .map((value) => parsedDate(value)?.getTime())
    .filter((time): time is number => typeof time === "number")
  if (times.length === 0) return undefined
  return new Date(Math.max(...times))
}

function entry(
  path: string,
  lastModified: Date | undefined,
  changeFrequency: "weekly" | "monthly",
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ destinations, tours, experiences, articles }, index] = await Promise.all([
    getCatalog(),
    getContentIndex(),
  ])
  const pages = index.pages
  const pageDate = new Map(pages.filter((page) => !page.noIndex).map((page) => [page.path, page.modifiedAt]))

  const staticEntries = staticPages
    .filter((page) => page.path === "/" || !pages.some((item) => item.path === page.path && item.noIndex))
    .map((page) => {
      const sectionDates =
        page.path === "/destinazioni"
          ? destinations.map((item) => item.modifiedAt)
          : page.path === "/tour"
            ? tours.map((item) => item.modifiedAt)
            : page.path === "/esperienze"
              ? experiences.map((item) => item.modifiedAt)
              : page.path === "/diario"
                ? articles.map((item) => item.modifiedAt)
                : []
      return entry(
        page.path,
        parsedDate(pageDate.get(page.path)) ?? latestDate(sectionDates),
        page.path === "/" ? "weekly" : "monthly",
        page.path === "/" ? 1 : 0.8,
      )
    })

  const seen = new Set(staticEntries.map((item) => item.url))
  const extraPages = pages
    .filter((page) => !page.noIndex && page.path !== "/")
    .map((page) => entry(page.path, parsedDate(page.modifiedAt), "monthly", 0.6))
    .filter((item) => {
      if (seen.has(item.url)) return false
      seen.add(item.url)
      return true
    })
  const terms = [...index.categories, ...index.regions, ...index.tourCategories, ...index.faqGroups]
    .map((term) => entry(term.path, undefined, "weekly", 0.5))
    .filter((item) => {
      if (seen.has(item.url)) return false
      seen.add(item.url)
      return true
    })

  return [
    ...staticEntries,
    ...extraPages,
    ...terms,
    ...destinations
      .filter((item) => !item.noIndex)
      .map((item) => entry(routes.destination(item.slug), parsedDate(item.modifiedAt), "monthly", 0.7)),
    ...tours
      .filter((item) => !item.noIndex)
      .map((item) => entry(routes.tour(item.slug), parsedDate(item.modifiedAt), "monthly", 0.7)),
    ...experiences
      .filter((item) => !item.noIndex)
      .map((item) => entry(routes.experience(item.slug), parsedDate(item.modifiedAt), "monthly", 0.7)),
    ...articles
      .filter((item) => !item.noIndex)
      .map((item) => entry(routes.article(item.slug), parsedDate(item.modifiedAt), "monthly", 0.6)),
  ]
}
