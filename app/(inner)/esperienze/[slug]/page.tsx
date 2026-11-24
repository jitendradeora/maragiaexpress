import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ExperiencePage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema"
import { getCatalog } from "@/lib/wp/content"

type PageProps = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const { experiences } = await getCatalog()
  return experiences.map((experience) => ({ slug: experience.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { experiences } = await getCatalog()
  const experience = experiences.find((item) => item.slug === slug)
  if (!experience) {
    return createPageMetadata({
      title: "Esperienza non trovata",
      description: "Questa esperienza non è stata trovata.",
      path: routes.experience(slug),
      noIndex: true,
    })
  }
  const metadata = createPageMetadata({
    title: experience.name,
    description: experience.seoDescription || experience.intro,
    path: routes.experience(experience.slug),
    image: experience.image,
    imageAlt: experience.imageAlt,
  })
  return applyYoastSeo(metadata, experience)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const { experiences, destinations } = await getCatalog()
  const experience = experiences.find((item) => item.slug === slug)
  if (!experience) notFound()
  const relatedDestinations = experience.relatedDestinationSlugs.flatMap((destinationSlug) => {
    const destination = destinations.find((item) => item.slug === destinationSlug)
    return destination
      ? [{ href: routes.destination(destination.slug), label: destination.name }]
      : []
  })

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: experience.name,
            description: experience.intro,
            path: routes.experience(experience.slug),
            image: experience.image,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Esperienze", path: routes.experiences },
            { name: experience.name, path: routes.experience(experience.slug) },
          ]),
        ]}
      />
      <ExperiencePage experience={experience} relatedDestinations={relatedDestinations} />
    </>
  )
}
