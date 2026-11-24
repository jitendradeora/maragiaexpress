import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PolicyPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog, getCmsPage } from "@/lib/wp/content"

const path = "/terms"
const fallback = getStaticPage(path)!

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("terms")
  return applyYoastSeo(
    createPageMetadata({
      title: page?.title ?? fallback.title,
      description: page?.description ?? fallback.description,
      path,
      image: page?.image || fallback.image,
      imageAlt: page?.imageAlt || page?.title,
    }),
    page,
  )
}

export default async function Page() {
  const [page, catalog] = await Promise.all([getCmsPage("terms"), getCatalog()])
  if (!page) notFound()
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title: page.title, description: page.description, path }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path },
          ]),
        ]}
      />
      <PolicyPage page={page} site={catalog.site} />
    </>
  )
}
