import type { Metadata } from "next"
import { JournalPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Travel journal",
}

export default function Page() {
  return <JournalPage />
}
