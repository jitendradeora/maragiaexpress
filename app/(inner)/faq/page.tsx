import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { FaqPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog, getCmsPage } from "@/lib/wp/content"

const fallback = getStaticPage("/faq")!

export const revalidate = 60

type FaqProps = {
  searchParams: Promise<{ gruppo?: string | string[] }>
}

function readGroup(value?: string | string[]) {
  const group = Array.isArray(value) ? value[0] : value
  return group && /^[a-z0-9-]+$/.test(group) ? group : ""
}

export async function generateMetadata({ searchParams }: FaqProps): Promise<Metadata> {
  const page = await getCmsPage("faq")
  const group = readGroup((await searchParams).gruppo)
  const metadata = createPageMetadata({
    title: page?.title ?? fallback.title,
    description: page?.description ?? fallback.description,
    path: group ? routes.faqGroup(group) : "/faq",
    image: page?.image || fallback.image,
    imageAlt: page?.imageAlt || page?.title,
    noIndex: Boolean(group),
  })
  return applyYoastSeo(metadata, group ? null : page)
}

export default async function Page({ searchParams }: FaqProps) {
  const group = readGroup((await searchParams).gruppo)
  const [page, catalog] = await Promise.all([getCmsPage("faq"), getCatalog()])
  if (!page) notFound()
  const activeGroup = catalog.faqGroups.some((item) => item.slug === group) ? group : ""
  const visible = activeGroup
    ? catalog.faqGroups.filter((item) => item.slug === activeGroup)
    : catalog.faqGroups
  if (activeGroup) redirect(routes.faqGroup(activeGroup))
  const faqs = visible.flatMap((item) => item.items)
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: page.title,
            description: page.description,
            path: "/faq",
          }),
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: "/faq" },
          ]),
        ]}
      />
      <FaqPage
        title={page.title}
        groups={catalog.faqGroups}
        intro={page.description}
        activeGroup={activeGroup}
        site={catalog.site}
      />
    </>
  )
}
