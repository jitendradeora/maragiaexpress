import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { JournalPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import {
  journalCategoryOptions,
  journalListingHref,
  readJournalQuery,
  selectArticles,
} from "@/lib/journal"
import { routes } from "@/lib/routes"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog } from "@/lib/wp/content"

const fallback = getStaticPage(routes.journal)!

export const revalidate = 60

type ListingProps = {
  searchParams: Promise<{ categoria?: string | string[]; page?: string | string[] }>
}

export async function generateMetadata({ searchParams }: ListingProps): Promise<Metadata> {
  const query = readJournalQuery(await searchParams)
  if (!query.category && query.page <= 1) {
    return createPageMetadata({
      title: fallback.title,
      description: fallback.description,
      path: fallback.path,
      image: fallback.image,
    })
  }
  const { articles } = await getCatalog()
  const category = journalCategoryOptions(articles).find((item) => item.slug === query.category)
  const title = category?.name || fallback.title
  return createPageMetadata({
    title: query.page > 1 ? `${title}, pagina ${query.page}` : title,
    description: fallback.description,
    path: journalListingHref(query.category, query.page),
    image: fallback.image,
    noIndex: true,
  })
}

export default async function Page({ searchParams }: ListingProps) {
  const query = readJournalQuery(await searchParams)
  const { articles } = await getCatalog()
  const categories = journalCategoryOptions(articles)
  const activeCategory = categories.some((category) => category.slug === query.category)
    ? query.category
    : ""
  const selection = selectArticles(articles, activeCategory, query.page)
  if (selection.outOfRange) notFound()
  if (activeCategory) redirect(journalListingHref(activeCategory, query.page))

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
            { name: "Diario di viaggio", path: routes.journal },
          ]),
        ]}
      />
      <JournalPage
        articles={selection.items}
        categories={categories}
        activeCategory={activeCategory}
        page={query.page}
        totalPages={selection.totalPages}
      />
    </>
  )
}
