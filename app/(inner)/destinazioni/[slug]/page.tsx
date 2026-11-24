import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DestinationPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, touristAttractionSchema } from "@/lib/seo/schema"
import { getCatalog } from "@/lib/wp/content"

type PageProps = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const { destinations } = await getCatalog()
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { destinations } = await getCatalog()
  const destination = destinations.find((item) => item.slug === slug)
  if (!destination) {
    return createPageMetadata({
      title: "Destinazione non trovata",
      description: "Questa destinazione non è stata trovata.",
      path: routes.destination(slug),
      noIndex: true,
    })
  }
  const metadata = createPageMetadata({
    title: destination.name,
    description: destination.seoDescription || destination.intro,
    path: routes.destination(destination.slug),
    image: destination.image,
    imageAlt: destination.imageAlt,
  })
  return applyYoastSeo(metadata, destination)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const { destinations, tours, experiences } = await getCatalog()
  const destination = destinations.find((item) => item.slug === slug)
  if (!destination) notFound()
  const relatedTours = tours.filter((tour) => tour.relatedDestinationSlug === destination.slug)
  const relatedExperiences = experiences.filter((experience) =>
    experience.relatedDestinationSlugs.includes(destination.slug),
  )

  return (
    <>
      <JsonLd
        data={[
          touristAttractionSchema({
            name: destination.name,
            description: destination.intro,
            path: routes.destination(destination.slug),
            image: destination.image,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destinazioni", path: routes.destinations },
            { name: destination.name, path: routes.destination(destination.slug) },
          ]),
        ]}
      />
      <DestinationPage
        destination={destination}
        relatedTours={relatedTours}
        relatedExperiences={relatedExperiences}
      />
    </>
  )
}
