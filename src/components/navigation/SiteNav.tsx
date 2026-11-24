"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { usePathname } from "next/navigation"
import AppLink from "@/components/AppLink"
import type { MenuLink } from "@/lib/content"

export function useDismiss(
  open: boolean,
  close: () => void,
  ref: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close()
    }
    function onPointer(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) close()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onPointer)
    }
  }, [open, close, ref])
}

const ARCHIVE_PARENTS: Record<string, string> = {
  "/category": "/diario",
  "/area": "/destinazioni",
  "/categoria-tour": "/tour",
  "/gruppo-faq": "/faq",
}

function isCurrent(pathname: string, href: string) {
  if (!href || href.startsWith("#")) return false
  const path = href.split(/[?#]/)[0] || "/"
  if (pathname === path || (path !== "/" && pathname.startsWith(`${path}/`))) return true
  return Object.entries(ARCHIVE_PARENTS).some(
    ([prefix, parent]) =>
      path === parent && (pathname === prefix || pathname.startsWith(`${prefix}/`)),
  )
}

export function MenuAnchor({
  item,
  onNavigate,
  current,
}: {
  item: MenuLink
  onNavigate?: () => void
  current?: boolean
}) {
  if (!item.href) return <span>{item.label}</span>
  return (
    <AppLink
      href={item.href}
      aria-current={current ? "page" : undefined}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
    >
      {item.label}
    </AppLink>
  )
}

function MenuBranch({
  item,
  pathname,
  onNavigate,
}: {
  item: MenuLink
  pathname: string
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(false)
  const children = item.children ?? []
  const key = `${item.label}-${item.href}`
  return (
    <div className={`menu-item${open ? " is-open" : ""}`}>
      <div className="menu-item-row">
        <MenuAnchor item={item} onNavigate={onNavigate} current={isCurrent(pathname, item.href)} />
        {children.length > 0 && (
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-label={`${item.label}, sottomenu`}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        )}
      </div>
      {children.length > 0 && (
        <div className="menu-sub" role="group" aria-label={item.label}>
          {children.map((child) => (
            <MenuBranch
              key={`${key}-${child.label}-${child.href}`}
              item={child}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function SiteNav({
  items,
  onNavigate,
}: {
  items: MenuLink[]
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  return items.map((item) => (
    <MenuBranch
      key={`${item.label}-${item.href}`}
      item={item}
      pathname={pathname}
      onNavigate={onNavigate}
    />
  ))
}

export function FooterLinks({ links }: { links: MenuLink[] }) {
  const pathname = usePathname()
  return links.map((link) => (
    <span className="footer-link" key={`${link.label}-${link.href}`}>
      <MenuAnchor item={link} current={isCurrent(pathname, link.href)} />
      {link.children?.length ? <FooterLinks links={link.children} /> : null}
    </span>
  ))
}

export function useHeaderDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLElement>(null)
  useDismiss(open, close, ref)
  return ref
}
