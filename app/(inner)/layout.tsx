import BackToTop from "@/components/BackToTop"
import HashScroll from "@/components/HashScroll"
import { PageFooter, PageHeader } from "@/components/InnerPages"

export default function InnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="inner-site">
      <PageHeader />
      <div id="main-content">{children}</div>
      <PageFooter />
      <BackToTop />
      <HashScroll />
    </div>
  )
}
