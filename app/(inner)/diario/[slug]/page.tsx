import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticlePage } from "@/components/InnerPages"
import JsonLd from "@/components/seo/JsonLd"
import { relatedArticles } from "@/lib/journal"
import { routes } from "@/lib/routes"
import { applyYoastSeo, createPageMetadata } from "@/lib/seo/metadata"
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema"
import { getCatalog } from "@/lib/wp/content"

type PageProps = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const { articles } = await getCatalog()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { articles } = await getCatalog()
  const article = articles.find((item) => item.slug === slug)
  if (!article) {
    return createPageMetadata({
      title: "Articolo non trovato",
      description: "Questo articolo del diario non è stato trovato.",
      path: routes.article(slug),
      noIndex: true,
    })
  }
  const metadata = createPageMetadata({
    title: article.title,
    description: article.seoDescription || article.excerpt,
    path: routes.article(article.slug),
    image: article.image,
    imageAlt: article.imageAlt,
    type: "article",
  })
  return applyYoastSeo(metadata, article)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const { articles } = await getCatalog()
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()

  const related = relatedArticles(articles, article)
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: article.title,
            description: article.seoDescription || article.excerpt,
            path: routes.article(article.slug),
            image: article.image,
            category: article.category,
            authorName: article.author,
            datePublished: article.publishedAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Diario di viaggio", path: routes.journal },
            { name: article.title, path: routes.article(article.slug) },
          ]),
        ]}
      />
      <ArticlePage article={article} related={related} />
    </>
  )
}
