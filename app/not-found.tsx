import type { Metadata } from "next"
import BackToTop from "@/components/BackToTop"
import {
  NotFoundPage,
  PageFooter,
  PageHeader,
} from "@/components/InnerPages"
import { createPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description:
    "This page could not be found. Return to Maragià Express to continue exploring India journeys.",
  path: "/404",
  noIndex: true,
})

export default function NotFound() {
  return (
    <div className="inner-site">
      <PageHeader />
      <div id="main-content">
        <NotFoundPage />
      </div>
      <PageFooter />
      <BackToTop />
    </div>
  )
}
