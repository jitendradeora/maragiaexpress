import Link from "next/link"
import type { AnchorHTMLAttributes, ReactNode } from "react"

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children?: ReactNode
}

function isAppPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
}

export default function AppLink({ href, children, ...props }: AppLinkProps) {
  if (!isAppPath(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
