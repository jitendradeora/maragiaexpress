import type { MetadataRoute } from "next"
import { articles } from "@/data/articles"
import { allDestinations } from "@/data/destinations"
import { experiences } from "@/data/experiences"
import { staticPages } from "@/data/pages"
import { tours } from "@/data/tours"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${siteConfig.url}${page.path === "/" ? "" : page.path}`,
    lastModified: now,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.8,
  }))

  const destinationEntries = allDestinations.map((destination) => ({
    url: `${siteConfig.url}/destinations/${destination.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const tourEntries = tours.map((tour) => ({
    url: `${siteConfig.url}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const experienceEntries = experiences.map((experience) => ({
    url: `${siteConfig.url}/experiences/${experience.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const articleEntries = articles.map((article) => ({
    url: `${siteConfig.url}/travel-journal/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...destinationEntries,
    ...tourEntries,
    ...experienceEntries,
    ...articleEntries,
  ]
}
