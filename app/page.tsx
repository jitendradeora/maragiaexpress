import type { Metadata } from "next"
import HomePage from "@/components/HomePage"
import JsonLd from "@/components/seo/JsonLd"
import { siteImages } from "@/data/site-images"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { faqPageSchema, webPageSchema } from "@/lib/seo/schema"
import { siteConfig } from "@/lib/site-config"
import type { FaqItem } from "@/lib/content"
import { getCatalog, getHomepage, getPublishedPages } from "@/lib/wp/content"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPublishedPages()
  const home = pages.find((page) => page.isFrontPage) ?? pages.find((page) => page.path === "/")
  const title = `${siteConfig.name} | Viaggi su misura in India`
  const metadata = createPageMetadata({
    title,
    description: siteConfig.seoDescription,
    path: "/",
    image: siteImages.hero,
  })
  metadata.title = { absolute: title }
  if (metadata.openGraph) metadata.openGraph.title = title
  if (metadata.twitter) metadata.twitter.title = title
  return applyYoastSeo(metadata, home)
}

function bySlug<T extends { slug: string }>(items: T[], slugs: string[], fallback: T[]) {
  if (slugs.length === 0) return fallback
  const lookup = new Map(items.map((item) => [item.slug, item]))
  return slugs.flatMap((slug) => {
    const item = lookup.get(slug)
    return item ? [item] : []
  })
}

export default async function Page() {
  const [catalog, home] = await Promise.all([getCatalog(), getHomepage()])
  const allFaqs = catalog.faqGroups.flatMap((group) => group.items)
  const faqs: FaqItem[] = bySlug(allFaqs, home.faq.slugs, allFaqs.slice(0, 4))
  const destinations = bySlug(
    catalog.destinations,
    home.destinations.slugs,
    catalog.destinations.filter((item) => item.region === "india").slice(0, 3),
  )
  const tours = bySlug(catalog.tours, home.tours.slugs, catalog.tours.slice(0, 6))
  const experiences = bySlug(
    catalog.experiences,
    home.experiences.slugs,
    catalog.experiences.slice(0, 4),
  )
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: `${siteConfig.name} | Viaggi su misura in India`,
            description: siteConfig.seoDescription,
            path: "/",
          }),
          faqPageSchema(faqs),
        ]}
      />
      <HomePage
        links={catalog.menus.primary}
        footer={catalog.menus.footer}
        site={catalog.site}
        home={home}
        destinations={destinations}
        tours={tours}
        experiences={experiences}
        articles={catalog.articles}
        faqs={faqs}
      />
    </>
  )
}
