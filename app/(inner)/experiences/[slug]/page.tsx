"use client"

import { useParams } from "next/navigation"
import { ExperienceBySlug } from "@/components/InnerPages"

export default function Page() {
  const params = useParams<{ slug: string }>()
  return <ExperienceBySlug slug={params.slug} />
}
