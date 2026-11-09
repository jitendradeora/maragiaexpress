import type { Metadata } from "next"
import { PolicyPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Payment policy",
}

export default function Page() {
  return <PolicyPage type="payment" />
}
