import type { Metadata } from "next"
import { PolicyPage } from "@/components/InnerPages"

export const metadata: Metadata = {
  title: "Terms and conditions",
}

export default function Page() {
  return <PolicyPage type="terms" />
}
