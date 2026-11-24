import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JournalPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import {
  journalCategoryOptions,
  readJournalQuery,
  selectArticles,
} from "@/lib/journal"
import { routes } from "@/lib/routes"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { findIndexedTerm, getCatalog, getContentIndex } from "@/lib/wp/content"

const fallback = getStaticPage(routes.journal)!

export const revalidate = 60
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string | string[] }>
}

async function load({ params, searchParams }: Props) {
  const { slug } = await params
  const query = readJournalQuery(await searchParams)
  const path = `/category/${slug.join("/")}`
  const [{ articles }, index] = await Promise.all([getCatalog(), getContentIndex()])
  const term = findIndexedTerm(index.categories, path)
  return { query, articles, term, path }
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
  const title = query.page > 1 ? `${term.name}, pagina ${query.page}` : term.name
  return createPageMetadata({
    title,
    description: fallback.description,
    path: query.page > 1 ? `${term.path}?page=${query.page}` : term.path,
    image: fallback.image,
    noIndex: query.page > 1,
  })
}

export default async function Page(props: Props) {
  const { query, articles, term } = await load(props)
  if (!term) notFound()
  const categories = journalCategoryOptions(articles)
  const selection = selectArticles(articles, term.slug, query.page)
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
            { name: "Diario di viaggio", path: routes.journal },
            { name: term.name, path },
          ]),
        ]}
      />
      <JournalPage
        articles={selection.items}
        categories={categories}
        activeCategory={term.slug}
        page={query.page}
        totalPages={selection.totalPages}
      />
    </>
  )
}
