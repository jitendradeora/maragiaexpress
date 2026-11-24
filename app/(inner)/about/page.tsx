import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AboutPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { getCmsPage } from "@/lib/wp/content"

const fallback = getStaticPage("/about")!

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("about")
  const metadata = createPageMetadata({
    title: page?.title ?? fallback.title,
    description: page?.description ?? fallback.description,
    path: "/about",
    image: page?.image || fallback.image,
    imageAlt: page?.imageAlt || page?.title,
  })
  return applyYoastSeo(metadata, page)
}

export default async function Page() {
  const page = await getCmsPage("about")
  if (!page) notFound()
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: page.title,
            description: page.description,
            path: "/about",
            type: "AboutPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: "/about" },
          ]),
        ]}
      />
      <AboutPage page={page} />
    </>
  )
}
