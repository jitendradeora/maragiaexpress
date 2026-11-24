import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { ToursPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { routes } from "@/lib/routes"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { readTourQuery, selectTours, tourCategoryOptions, tourListingHref } from "@/lib/tours"
import { getCatalog } from "@/lib/wp/content"

const fallback = getStaticPage(routes.tours)!

export const revalidate = 60

type ListingProps = {
  searchParams: Promise<{ categoria?: string | string[]; page?: string | string[] }>
}

export async function generateMetadata({ searchParams }: ListingProps): Promise<Metadata> {
  const query = readTourQuery(await searchParams)
  if (!query.category && query.page <= 1) {
    return createPageMetadata({
      title: fallback.title,
      description: fallback.description,
      path: fallback.path,
      image: fallback.image,
    })
  }
  const { tours } = await getCatalog()
  const category = tourCategoryOptions(tours).find((item) => item.slug === query.category)
  const title = category?.name || fallback.title
  return createPageMetadata({
    title: query.page > 1 ? `${title}, pagina ${query.page}` : title,
    description: fallback.description,
    path: tourListingHref(query.category, query.page),
    image: fallback.image,
    noIndex: true,
  })
}

export default async function Page({ searchParams }: ListingProps) {
  const query = readTourQuery(await searchParams)
  const { tours } = await getCatalog()
  const categories = tourCategoryOptions(tours)
  const activeCategory = categories.some((category) => category.slug === query.category)
    ? query.category
    : ""
  const selection = selectTours(tours, activeCategory, query.page)
  if (selection.outOfRange) notFound()
  if (activeCategory) redirect(tourListingHref(activeCategory, query.page))

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: fallback.title,
            description: fallback.description,
            path: fallback.path,
            type: "CollectionPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tour", path: routes.tours },
          ]),
        ]}
      />
      <ToursPage
        tours={selection.items}
        categories={categories}
        activeCategory={activeCategory}
        page={query.page}
        totalPages={selection.totalPages}
      />
    </>
  )
}
