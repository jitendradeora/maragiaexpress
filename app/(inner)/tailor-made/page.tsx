import type { Metadata } from "next"
import { TailorMadePage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Tailor-made journeys",
}

export default function Page() {
  return <TailorMadePage />
}
