import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DestinationBySlug } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getDestination, getDestinationSlugs } from "@/data/destinations"
import { createPageMetadata } from "@/lib/seo/metadata"
import {
  breadcrumbSchema,
  touristAttractionSchema,
} from "@/lib/seo/schema"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestination(slug)
  if (!destination) {
    return createPageMetadata({
      title: "Destinazione non trovata",
      description: "Questa destinazione non è stata trovata.",
      path: `/destinations/${slug}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: destination.name,
    description: destination.intro,
    path: `/destinations/${destination.slug}`,
    image: destination.image,
    imageAlt: destination.name,
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const destination = getDestination(slug)
  if (!destination) notFound()

  return (
    <>
      <JsonLd
        data={[
          touristAttractionSchema({
            name: destination.name,
            description: destination.intro,
            path: `/destinations/${destination.slug}`,
            image: destination.image,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destinazioni", path: "/destinations" },
            {
              name: destination.name,
              path: `/destinations/${destination.slug}`,
            },
          ]),
        ]}
      />
      <DestinationBySlug slug={slug} />
    </>
  )
}

export const dynamicParams = false
