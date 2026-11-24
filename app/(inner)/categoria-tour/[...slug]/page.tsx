import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ToursPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { routes } from "@/lib/routes"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { readTourQuery, selectTours, tourCategoryOptions } from "@/lib/tours"
import { findIndexedTerm, getCatalog, getContentIndex } from "@/lib/wp/content"

const fallback = getStaticPage(routes.tours)!

export const revalidate = 60
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string | string[] }>
}

async function load({ params, searchParams }: Props) {
  const { slug } = await params
  const query = readTourQuery(await searchParams)
  const path = `/categoria-tour/${slug.join("/")}`
  const [{ tours }, index] = await Promise.all([getCatalog(), getContentIndex()])
  const term = findIndexedTerm(index.tourCategories, path)
  return { query, tours, term, path }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { query, term, path } = await load(props)
  if (!term) {
    return createPageMetadata({
      title: "Categoria non trovata",
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
  const { query, tours, term } = await load(props)
  if (!term) notFound()
  const categories = tourCategoryOptions(tours)
  const selection = selectTours(tours, term.slug, query.page)
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
            { name: "Tour", path: routes.tours },
            { name: term.name, path },
          ]),
        ]}
      />
      <ToursPage
        tours={selection.items}
        categories={categories}
        activeCategory={term.slug}
        page={query.page}
        totalPages={selection.totalPages}
      />
    </>
  )
}
