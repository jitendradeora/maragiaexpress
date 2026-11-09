import type { Metadata } from "next"
import { ExperiencesPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Travel experiences",
}

export default function Page() {
  return <ExperiencesPage />
}
