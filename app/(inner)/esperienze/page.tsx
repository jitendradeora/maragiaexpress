import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ExperiencesPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getStaticPage } from "@/data/pages"
import { experienceListingHref, readExperiencePage, selectExperiences } from "@/lib/experiences"
import { routes } from "@/lib/routes"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema"
import { getCatalog } from "@/lib/wp/content"

const fallback = getStaticPage(routes.experiences)!

export const revalidate = 60

type ListingProps = {
  searchParams: Promise<{ page?: string | string[] }>
}

export async function generateMetadata({ searchParams }: ListingProps): Promise<Metadata> {
  const page = readExperiencePage((await searchParams).page)
  if (page <= 1) {
    return createPageMetadata({
      title: fallback.title,
      description: fallback.description,
      path: fallback.path,
      image: fallback.image,
    })
  }
  return createPageMetadata({
    title: `${fallback.title}, pagina ${page}`,
    description: fallback.description,
    path: experienceListingHref(page),
    image: fallback.image,
    noIndex: true,
  })
}

export default async function Page({ searchParams }: ListingProps) {
  const page = readExperiencePage((await searchParams).page)
  const { experiences } = await getCatalog()
  const selection = selectExperiences(experiences, page)
  if (selection.outOfRange) notFound()

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: fallback.title,
            description: fallback.description,
            path: fallback.path,
            type: "CollectionPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Esperienze", path: routes.experiences },
          ]),
        ]}
      />
      <ExperiencesPage
        experiences={selection.items}
        page={page}
        totalPages={selection.totalPages}
      />
    </>
  )
}
