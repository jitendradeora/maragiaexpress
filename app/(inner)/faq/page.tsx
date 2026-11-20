import type { Metadata } from "next"
import { FaqPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { faqPageItems } from "@/data/faqs"
import { getStaticPage } from "@/data/pages"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/seo/schema"

const page = getStaticPage("/faq")!

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
          faqPageSchema([...faqPageItems]),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Domande frequenti", path: "/faq" },
          ]),
        ]}
      />
      <FaqPage />
    </>
  )
}
