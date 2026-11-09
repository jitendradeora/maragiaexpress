import HomePage from "@/components/HomePage"
import JsonLd from "@/components/seo/JsonLd"
import { homepageFaqs } from "@/data/faqs"
import { faqPageSchema, webPageSchema } from "@/lib/seo/schema"
import { siteConfig } from "@/lib/site-config"

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: `${siteConfig.name} | Tailor-Made Journeys Through India`,
            description: siteConfig.seoDescription,
            path: "/",
          }),
          faqPageSchema([...homepageFaqs]),
        ]}
      />
      <HomePage />
    </>
  )
}
