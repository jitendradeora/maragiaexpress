import type { Metadata } from "next"
import BackToTop from "@/components/BackToTop"
import {
  NotFoundPage,
  PageFooter,
  PageHeader,
} from "@/components/InnerPages"
import { createPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Pagina non trovata",
  description:
    "Questa pagina non è stata trovata. Torna su Maragià Express per continuare a scoprire i viaggi in India.",
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
