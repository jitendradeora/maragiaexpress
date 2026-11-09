"use client"

import { useParams } from "next/navigation"
import { ArticleBySlug } from "@/components/InnerPages"

export default function Page() {
  const params = useParams<{ slug: string }>()
  return <ArticleBySlug slug={params.slug} />
}
