"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const target = document.getElementById(hash)
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname])

  return null
}
