import { useEffect, useState } from "react"

function currentPath() {
  const path = window.location.pathname || "/"
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path
}

export function usePathname() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = (event.target as Element | null)?.closest("a")
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return
      }

      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      event.preventDefault()
      const pathname =
        url.pathname.length > 1 && url.pathname.endsWith("/")
          ? url.pathname.slice(0, -1)
          : url.pathname
      const next = `${pathname}${url.search}${url.hash}`
      const samePage = pathname === currentPath() && url.search === window.location.search

      if (!samePage) {
        window.history.pushState({}, "", next)
        setPath(currentPath())
      } else if (url.hash) {
        window.history.pushState({}, "", next)
      }

      if (url.hash) {
        window.requestAnimationFrame(() => {
          document.getElementById(url.hash.slice(1))?.scrollIntoView()
        })
      } else if (!samePage) {
        window.scrollTo(0, 0)
      }
    }

    function onPopState() {
      setPath(currentPath())
    }

    document.addEventListener("click", onClick)
    window.addEventListener("popstate", onPopState)
    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("popstate", onPopState)
    }
  }, [])

  return path
}
