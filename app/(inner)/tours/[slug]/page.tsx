"use client"

import { useParams } from "next/navigation"
import { TourBySlug } from "@/components/InnerPages"

export default function Page() {
  const params = useParams<{ slug: string }>()
  return <TourBySlug slug={params.slug} />
}
