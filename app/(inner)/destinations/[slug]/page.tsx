"use client"

import { useParams } from "next/navigation"
import { DestinationBySlug } from "@/components/InnerPages"

export default function Page() {
  const params = useParams<{ slug: string }>()
  return <DestinationBySlug slug={params.slug} />
}
