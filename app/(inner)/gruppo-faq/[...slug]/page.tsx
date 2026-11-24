import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FaqPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/seo/schema"
import { findIndexedTerm, getCatalog, getCmsPage, getContentIndex } from "@/lib/wp/content"

const fallback = getStaticPage(routes.faq)!

export const revalidate = 60
export const dynamicParams = true

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const path = `/gruppo-faq/${slug.join("/")}`
  const [page, index] = await Promise.all([getCmsPage("faq"), getContentIndex()])
  const term = findIndexedTerm(index.faqGroups, path)
  if (!term) {
    return createPageMetadata({
      title: "Gruppo non trovato",
      description: fallback.description,
      path,
      noIndex: true,
    })
  }
  return applyYoastSeo(
    createPageMetadata({
      title: term.name,
      description: page?.description ?? fallback.description,
      path: term.path,
      image: page?.image || fallback.image,
      imageAlt: page?.imageAlt || term.name,
    }),
    null,
  )
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const path = `/gruppo-faq/${slug.join("/")}`
  const [page, catalog, index] = await Promise.all([
    getCmsPage("faq"),
    getCatalog(),
    getContentIndex(),
  ])
  const term = findIndexedTerm(index.faqGroups, path)
  if (!page || !term) notFound()
  const visible = catalog.faqGroups.filter((group) => group.slug === term.slug)
  const faqs = visible.flatMap((group) => group.items)

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: term.name,
            description: page.description,
            path: term.path,
          }),
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: routes.faq },
            { name: term.name, path: term.path },
          ]),
        ]}
      />
      <FaqPage
        title={page.title}
        groups={catalog.faqGroups}
        intro={page.description}
        activeGroup={term.slug}
        site={catalog.site}
      />
    </>
  )
}
