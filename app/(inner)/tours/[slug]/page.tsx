import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TourBySlug } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getTour, getTourSlugs } from "@/data/tours"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, touristTripSchema } from "@/lib/seo/schema"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getTourSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = getTour(slug)
  if (!tour) {
    return createPageMetadata({
      title: "Tour not found",
      description: "This tour could not be found.",
      path: `/tours/${slug}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: tour.title,
    description: tour.summary,
    path: `/tours/${tour.slug}`,
    image: tour.image,
    imageAlt: tour.title,
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const tour = getTour(slug)
  if (!tour) notFound()

  return (
    <>
      <JsonLd
        data={[
          touristTripSchema({
            name: tour.title,
            description: tour.summary,
            path: `/tours/${tour.slug}`,
            image: tour.image,
            category: tour.category,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/tours" },
            { name: tour.title, path: `/tours/${tour.slug}` },
          ]),
        ]}
      />
      <TourBySlug slug={slug} />
    </>
  )
}

export const dynamicParams = false
