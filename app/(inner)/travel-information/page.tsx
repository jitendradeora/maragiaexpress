import type { Metadata } from "next"
import { PolicyPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Travel information",
}

export default function Page() {
  return <PolicyPage type="information" />
}
