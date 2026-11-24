import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { DestinationsPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import {
  destinationListingHref,
  destinationRegionOptions,
  readListingQuery,
  selectDestinations,
} from "@/lib/destinations"
import { leadingParagraphs } from "@/lib/wp/html"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, parseYoastSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog, getCmsPage } from "@/lib/wp/content"

export const revalidate = 60

type ListingProps = {
  searchParams: Promise<{ area?: string | string[]; page?: string | string[] }>
}

function pageCopy(html: string, description: string) {
  const paragraphs = leadingParagraphs(html)
  return {
    intro: paragraphs[0] || description,
    paragraphs: paragraphs.slice(1),
  }
}

export async function generateMetadata({ searchParams }: ListingProps): Promise<Metadata> {
  const query = readListingQuery(await searchParams)
  const page = await getCmsPage("destinazioni")
  if (!page) {
    return createPageMetadata({
      title: "Destinazioni",
      description: "Questa pagina non è stata trovata.",
      path: routes.destinations,
      noIndex: true,
    })
  }
  const title = query.page > 1 ? `${page.title}, pagina ${query.page}` : page.title
  return applyYoastSeo(
    createPageMetadata({
      title,
      description: page.seoDescription || page.description,
      path: query.area || query.page > 1 ? destinationListingHref(query.area, query.page) : page.path || routes.destinations,
      image: page.ogImage || page.image || undefined,
      imageAlt: page.ogImageAlt || page.imageAlt || page.title,
      noIndex: query.page > 1 || Boolean(query.area),
    }),
    query.page > 1 || query.area ? { ...page, seoTitle: title, canonical: "" } : page,
  )
}

export default async function Page({ searchParams }: ListingProps) {
  const query = readListingQuery(await searchParams)
  const [{ destinations }, cmsPage] = await Promise.all([
    getCatalog(),
    getCmsPage("destinazioni"),
  ])
  if (!cmsPage) notFound()
  const regions = destinationRegionOptions(destinations)
  const activeRegion = regions.some((region) => region.slug === query.area) ? query.area : ""
  const selection = selectDestinations(destinations, activeRegion, query.page)
  if (selection.outOfRange) notFound()
  if (activeRegion) redirect(destinationListingHref(activeRegion, query.page))

  const copy = pageCopy(cmsPage.html, cmsPage.description)
  const schema = parseYoastSchema(cmsPage.schemaRaw)
  const title = cmsPage.seoTitle || cmsPage.title
  const description = cmsPage.seoDescription || cmsPage.description

  return (
    <>
      <JsonLd
        data={
          schema
            ? [schema]
            : [
                webPageSchema({
                  title,
                  description,
                  path: routes.destinations,
                  type: "CollectionPage",
                }),
                breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: cmsPage.title, path: routes.destinations },
                ]),
              ]
        }
      />
      <DestinationsPage
        destinations={selection.items}
        regions={regions}
        activeRegion={activeRegion}
        page={query.page}
        totalPages={selection.totalPages}
        document={{
          eyebrow: cmsPage.excerpt,
          title: cmsPage.title,
          intro: copy.intro,
          paragraphs: copy.paragraphs,
          image: cmsPage.image,
          imageAlt: cmsPage.imageAlt || cmsPage.title,
        }}
      />
    </>
  )
}
