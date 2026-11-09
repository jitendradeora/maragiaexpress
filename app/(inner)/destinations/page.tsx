import type { Metadata } from "next"
import { DestinationsPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Destinations",
}

export default function Page() {
  return <DestinationsPage />
}
