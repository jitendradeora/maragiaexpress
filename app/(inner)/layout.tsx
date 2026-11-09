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
      {children}
      <PageFooter />
      <BackToTop />
      <HashScroll />
    </div>
  )
}
