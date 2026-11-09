import type { Metadata } from "next"
import { ToursPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Tours of India",
}

export default function Page() {
  return <ToursPage />
}
