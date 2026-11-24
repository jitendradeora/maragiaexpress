import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DestinationsPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import {
  destinationRegionOptions,
  readListingQuery,
  selectDestinations,
} from "@/lib/destinations"
import { routes } from "@/lib/routes"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { findIndexedTerm, getCatalog, getContentIndex } from "@/lib/wp/content"

const fallback = getStaticPage(routes.destinations)!

export const revalidate = 60
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string | string[] }>
}

async function load({ params, searchParams }: Props) {
  const { slug } = await params
  const query = readListingQuery(await searchParams)
  const path = `/area/${slug.join("/")}`
  const [{ destinations }, index] = await Promise.all([getCatalog(), getContentIndex()])
  const term = findIndexedTerm(index.regions, path)
  return { query, destinations, term, path }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { query, term, path } = await load(props)
  if (!term) {
    return createPageMetadata({
      title: "Area non trovata",
      description: fallback.description,
      path,
      noIndex: true,
    })
  }
  return createPageMetadata({
    title: query.page > 1 ? `${term.name}, pagina ${query.page}` : term.name,
    description: fallback.description,
    path: query.page > 1 ? `${term.path}?page=${query.page}` : term.path,
    image: fallback.image,
    noIndex: query.page > 1,
  })
}

export default async function Page(props: Props) {
  const { query, destinations, term } = await load(props)
  if (!term) notFound()
  const regions = destinationRegionOptions(destinations)
  const selection = selectDestinations(destinations, term.slug, query.page)
  if (selection.outOfRange) notFound()
  const path = query.page > 1 ? `${term.path}?page=${query.page}` : term.path

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: term.name,
            description: fallback.description,
            path,
            type: "CollectionPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destinazioni", path: routes.destinations },
            { name: term.name, path },
          ]),
        ]}
      />
      <DestinationsPage
        destinations={selection.items}
        regions={regions}
        activeRegion={term.slug}
        page={query.page}
        totalPages={selection.totalPages}
      />
    </>
  )
}
