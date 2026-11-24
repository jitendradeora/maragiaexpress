import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TailorMadePage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog, getCmsPage } from "@/lib/wp/content"
import { noteAfterSteps, stepsFromHtml } from "@/lib/wp/html"

const fallback = getStaticPage("/tailor-made")!

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("tailor-made")
  const metadata = createPageMetadata({
    title: page?.title ?? fallback.title,
    description: page?.description ?? fallback.description,
    path: "/tailor-made",
    image: page?.image || fallback.image,
    imageAlt: page?.imageAlt || page?.title,
  })
  return applyYoastSeo(metadata, page)
}

export default async function Page() {
  const [page, catalog] = await Promise.all([
    getCmsPage("tailor-made"),
    getCatalog(),
  ])
  if (!page) notFound()
  const process = page.sections[0]
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: page.title,
            description: page.description,
            path: "/tailor-made",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Su misura", path: "/tailor-made" },
          ]),
        ]}
      />
      <TailorMadePage
        title={page.title}
        intro={page.description}
        image={page.image}
        imageAlt={page.imageAlt}
        processHeading={process?.heading ?? ""}
        processCopy={process?.paragraphs[0] ?? ""}
        steps={stepsFromHtml(page.html)}
        benefits={page.sections.slice(1)}
        enquiryCopy={noteAfterSteps(page.html)}
        destinations={catalog.destinations}
        site={catalog.site}
      />
    </>
  )
}
