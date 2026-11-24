import BackToTop from "@/components/BackToTop"
import HashScroll from "@/components/HashScroll"
import { PageFooter, PageHeader } from "@/components/InnerPages"
import { getCatalog } from "@/lib/wp/content"

export const revalidate = 60

export default async function InnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { menus, site } = await getCatalog()
  return (
    <div className="inner-site">
      <PageHeader links={menus.primary} site={site} />
      <div id="main-content">{children}</div>
      <PageFooter columns={menus.footer} site={site} />
      <BackToTop />
      <HashScroll />
    </div>
  )
}
