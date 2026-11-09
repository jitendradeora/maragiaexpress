import BackToTop from "@/components/BackToTop"
import {
  NotFoundPage,
  PageFooter,
  PageHeader,
} from "@/components/InnerPages"

export default function NotFound() {
  return (
    <div className="inner-site">
      <PageHeader />
      <NotFoundPage />
      <PageFooter />
      <BackToTop />
    </div>
  )
}
