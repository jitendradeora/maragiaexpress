import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ContactPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog, getCmsPage } from "@/lib/wp/content"

const fallback = getStaticPage("/contact")!

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("contact")
  const metadata = createPageMetadata({
    title: page?.title ?? fallback.title,
    description: page?.description ?? fallback.description,
    path: "/contact",
    image: page?.image || fallback.image,
    imageAlt: page?.imageAlt || page?.title,
  })
  return applyYoastSeo(metadata, page)
}

export default async function Page() {
  const [page, catalog] = await Promise.all([getCmsPage("contact"), getCatalog()])
  if (!page) notFound()
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: page.title,
            description: page.description,
            path: "/contact",
            type: "ContactPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: "/contact" },
          ]),
        ]}
      />
      <ContactPage
        title={page.title}
        intro={page.description}
        heading={page.sections[0]?.heading || "Ci trovi a Udaipur, in Rajasthan."}
        note={page.sections[0]?.paragraphs[0] ?? ""}
        image={page.image}
        imageAlt={page.imageAlt}
        destinations={catalog.destinations}
        site={catalog.site}
      />
    </>
  )
}
