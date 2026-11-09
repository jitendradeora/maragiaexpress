import type { Metadata } from "next"
import { PolicyPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"

const page = getStaticPage("/cancellation-policy")!

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
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cancellation policy", path: "/cancellation-policy" },
          ]),
        ]}
      />
      <PolicyPage type="cancellation" />
    </>
  )
}
