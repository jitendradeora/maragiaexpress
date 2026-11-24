import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { CmsDocumentPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog, getCmsPage, getContentIndex } from "@/lib/wp/content"
import { resolveWordPressUrl } from "@/lib/wp/url-resolver"

export const revalidate = 60
export const dynamicParams = true

const EXACT_ROUTES = new Set([
  "about",
  "contact",
  "tailor-made",
  "faq",
  "privacy",
  "terms",
  "payment-policy",
  "cancellation-policy",
  "travel-information",
])

const TREE_ROUTES = new Set([
  "destinazioni",
  "tour",
  "esperienze",
  "diario",
  "category",
  "area",
  "categoria-tour",
  "gruppo-faq",
])

type Props = { params: Promise<{ slug: string[] }> }

function owned(slug: string[]) {
  if (slug.length === 1 && EXACT_ROUTES.has(slug[0])) return true
  return TREE_ROUTES.has(slug[0])
}

export async function generateStaticParams() {
  const { pages } = await getContentIndex()
  return pages
    .map((page) => page.path.split("/").filter(Boolean))
    .filter((slug) => slug.length > 0 && !owned(slug))
    .map((slug) => ({ slug }))
}

async function load(slug: string[]) {
  if (owned(slug)) return null
  const path = `/${slug.join("/")}`
  const resolved = resolveWordPressUrl({ path })
  if (!resolved || resolved.external || resolved.href.split(/[?#]/)[0] !== path) return null
  return getCmsPage(slug.join("/"))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const path = `/${slug.join("/")}`
  const page = await load(slug)
  if (!page) {
    return createPageMetadata({
      title: "Pagina non trovata",
      description: "Questa pagina non è stata trovata.",
      path,
      noIndex: true,
    })
  }
  return applyYoastSeo(
    createPageMetadata({
      title: page.title,
      description: page.description,
      path: page.path,
      image: page.image || undefined,
      imageAlt: page.imageAlt || page.title,
    }),
    page,
  )
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug
  const page = await load(slug)
  if (!page) {
    if (slug.length === 1) {
      const { articles, destinations, tours, experiences } = await getCatalog()
      const key = slug[0]
      if (articles.some((item) => item.slug === key)) redirect(routes.article(key))
      if (destinations.some((item) => item.slug === key)) redirect(routes.destination(key))
      if (tours.some((item) => item.slug === key)) redirect(routes.tour(key))
      if (experiences.some((item) => item.slug === key)) redirect(routes.experience(key))
    }
    notFound()
  }

  const crumbs = [
    { name: "Home", path: "/" },
    ...page.ancestors.map((item) => ({ name: item.title, path: item.path })),
    { name: page.title, path: page.path },
  ]

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: page.title,
            description: page.description,
            path: page.path,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
      <CmsDocumentPage page={page} />
    </>
  )
}
