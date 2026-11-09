import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ExperienceBySlug } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getExperience, getExperienceSlugs } from "@/data/experiences"
import { createPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const experience = getExperience(slug)
  if (!experience) {
    return createPageMetadata({
      title: "Experience not found",
      description: "This experience could not be found.",
      path: `/experiences/${slug}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: experience.name,
    description: experience.intro,
    path: `/experiences/${experience.slug}`,
    image: experience.image,
    imageAlt: experience.name,
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const experience = getExperience(slug)
  if (!experience) notFound()

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: experience.name,
            description: experience.intro,
            path: `/experiences/${experience.slug}`,
            image: experience.image,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Experiences", path: "/experiences" },
            {
              name: experience.name,
              path: `/experiences/${experience.slug}`,
            },
          ]),
        ]}
      />
      <ExperienceBySlug slug={slug} />
    </>
  )
}

export const dynamicParams = false
