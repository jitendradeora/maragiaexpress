import type { Metadata } from "next"
import { PolicyPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Privacy notice",
}

export default function Page() {
  return <PolicyPage type="privacy" />
}
