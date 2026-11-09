import type { Metadata } from "next"
import { DestinationsPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"

const page = getStaticPage("/destinations")!

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
            type: "CollectionPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
          ]),
        ]}
      />
      <DestinationsPage />
    </>
  )
}
