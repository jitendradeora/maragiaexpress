import type { Metadata } from "next"
import { PolicyPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Cancellation and refunds",
}

export default function Page() {
  return <PolicyPage type="cancellation" />
}
