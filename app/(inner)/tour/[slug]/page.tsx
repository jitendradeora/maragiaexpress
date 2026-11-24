import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TourPage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, touristTripSchema } from "@/lib/seo/schema"
import { getCatalog } from "@/lib/wp/content"

type PageProps = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const { tours } = await getCatalog()
  return tours.map((tour) => ({ slug: tour.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { tours } = await getCatalog()
  const tour = tours.find((item) => item.slug === slug)
  if (!tour) {
    return createPageMetadata({
      title: "Tour non trovato",
      description: "Questo tour non è stato trovato.",
      path: routes.tour(slug),
      noIndex: true,
    })
  }
  const metadata = createPageMetadata({
    title: tour.title,
    description: tour.seoDescription || tour.summary,
    path: routes.tour(tour.slug),
    image: tour.image,
    imageAlt: tour.imageAlt,
  })
  return applyYoastSeo(metadata, tour)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const { tours, destinations, site } = await getCatalog()
  const tour = tours.find((item) => item.slug === slug)
  if (!tour) notFound()
  const relatedTours = tours
    .filter((item) => item.categorySlug === tour.categorySlug && item.slug !== tour.slug)
    .slice(0, 3)
  const destination = destinations.find((item) => item.slug === tour.relatedDestinationSlug)
  const relatedDestination = destination
    ? { slug: destination.slug, name: destination.name }
    : null

  return (
    <>
      <JsonLd
        data={[
          touristTripSchema({
            name: tour.title,
            description: tour.summary,
            path: routes.tour(tour.slug),
            image: tour.image,
            category: tour.category,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tour", path: routes.tours },
            { name: tour.title, path: routes.tour(tour.slug) },
          ]),
        ]}
      />
      <TourPage
        tour={tour}
        relatedTours={relatedTours}
        relatedDestination={relatedDestination}
        site={site}
      />
    </>
  )
}
