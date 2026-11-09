import type { Metadata } from "next"
import { AboutPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"

const page = getStaticPage("/about")!

export const metadata: Metadata = createPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: page.image,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: page.title,
            description: page.description,
            path: page.path,
            type: "AboutPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <AboutPage />
    </>
  )
}
