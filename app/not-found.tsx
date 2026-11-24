import type { Metadata } from "next"
import BackToTop from "@/components/BackToTop"
import { NotFoundPage, PageFooter, PageHeader } from "@/components/InnerPages"
import { createPageMetadata } from "@/lib/seo/metadata"
import { getCatalog } from "@/lib/wp/content"

export const metadata: Metadata = createPageMetadata({
  title: "Pagina non trovata",
  description:
    "Questa pagina non è stata trovata. Torna su Maragià Express per continuare a scoprire i viaggi in India.",
  path: "/404",
  noIndex: true,
})

export const revalidate = 60

export default async function NotFound() {
  const { menus, site } = await getCatalog()
  return (
    <div className="inner-site">
      <PageHeader links={menus.primary} site={site} />
      <div id="main-content">
        <NotFoundPage />
      </div>
      <PageFooter columns={menus.footer} site={site} />
      <BackToTop />
    </div>
  )
}
