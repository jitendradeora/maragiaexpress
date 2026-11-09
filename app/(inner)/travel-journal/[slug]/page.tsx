import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleBySlug } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { getArticle, getArticleSlugs } from "@/data/articles"
import { createPageMetadata } from "@/lib/seo/metadata"
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) {
    return createPageMetadata({
      title: "Article not found",
      description: "This journal article could not be found.",
      path: `/travel-journal/${slug}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/travel-journal/${article.slug}`,
    image: article.image,
    imageAlt: article.title,
    type: "article",
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: article.title,
            description: article.excerpt,
            path: `/travel-journal/${article.slug}`,
            image: article.image,
            category: article.category,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Travel journal", path: "/travel-journal" },
            {
              name: article.title,
              path: `/travel-journal/${article.slug}`,
            },
          ]),
        ]}
      />
      <ArticleBySlug slug={slug} />
    </>
  )
}

export const dynamicParams = false
