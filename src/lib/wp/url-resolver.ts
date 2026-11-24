import { routes } from "@/lib/routes"

export type ResolvedUrl = {
  href: string
  external: boolean
}

export type ConnectedMenuNode = {
  __typename?: string | null
  slug?: string | null
  uri?: string | null
}

type ResolveInput = {
  url?: string
  uri?: string
  path?: string
  journalSlugs?: Set<string>
  connected?: ConnectedMenuNode | null
}

const STATIC_PATHS = new Set([
  "/",
  "/destinazioni",
  "/tour",
  "/esperienze",
  "/diario",
  "/about",
  "/contact",
  "/tailor-made",
  "/faq",
  "/privacy",
  "/terms",
  "/payment-policy",
  "/cancellation-policy",
  "/travel-information",
])

const CONTENT_PREFIX: Record<string, (slug: string) => string> = {
  destinazione: routes.destination,
  destinazioni: routes.destination,
  destinations: routes.destination,
  esperienza: routes.experience,
  esperienze: routes.experience,
  experiences: routes.experience,
  tour: routes.tour,
  tours: routes.tour,
  diario: routes.article,
  blog: routes.article,
  "travel-journal": routes.article,
  category: routes.category,
  area: routes.area,
  "categoria-tour": routes.tourCategory,
  "gruppo-faq": routes.faqGroup,
}

const BLOCKED_PREFIXES = [
  "/wp-admin",
  "/wp-login.php",
  "/wp-json",
  "/xmlrpc.php",
  "/graphql",
  "/wp-content",
  "/wp-includes",
]

const reported = new Set<string>()

function reportUnmapped(value: string) {
  if (!value || reported.has(value)) return
  reported.add(value)
  console.warn(`URL di menu non mappato: ${value}`)
}

function internalHosts() {
  const hosts = new Set(["maragiaexpress.com", "www.maragiaexpress.com", "localhost", "127.0.0.1"])
  for (const name of ["NEXT_PUBLIC_SITE_URL", "WP_GRAPHQL_URL"]) {
    const raw = process.env[name]?.trim()
    if (!raw) continue
    try {
      hosts.add(new URL(raw).hostname.toLowerCase())
    } catch {
      continue
    }
  }
  return hosts
}

function cmsBasePath() {
  const raw = process.env.WP_GRAPHQL_URL?.trim()
  if (!raw) return ""
  try {
    return new URL(raw).pathname.replace(/\/graphql\/?$/, "") || ""
  } catch {
    return ""
  }
}

function safeSlug(value: string) {
  let slug = value
  try {
    slug = decodeURIComponent(value)
  } catch {
    return ""
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) return ""
  return slug
}

function safeSuffix(search: string, hash: string) {
  const query = /^\?[A-Za-z0-9._~%=&+-]*$/.test(search) ? search : ""
  const fragment = /^#[A-Za-z0-9._~%-]*$/.test(hash) ? hash : ""
  return `${query}${fragment}`
}

export function safeInternalPath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "") || "/"
  if (normalized === "/") return "/"
  if (normalized.includes("\\") || normalized.includes("..")) return ""
  const parts = normalized.split("/").filter(Boolean)
  if (parts.length === 0 || parts.length > 8) return ""
  if (!parts.every((part) => safeSlug(part))) return ""
  if (BLOCKED_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`))) {
    return ""
  }
  return `/${parts.join("/")}`
}

function knownPath(pathname: string, journalSlugs: Set<string>) {
  const normalized = pathname.replace(/\/+$/, "") || "/"
  if (STATIC_PATHS.has(normalized)) return normalized
  const parts = normalized.split("/").filter(Boolean)
  if (parts.length === 1 && journalSlugs.has(safeSlug(parts[0]))) {
    return routes.article(safeSlug(parts[0]))
  }
  if (parts.length !== 2) return ""
  const slug = safeSlug(parts[1])
  const map = CONTENT_PREFIX[parts[0].toLowerCase()]
  if (!slug || !map) return ""
  return map(slug)
}

function pathFromUri(uri: string | null | undefined, fallback: string) {
  const raw = uri?.trim() ?? ""
  if (raw.startsWith("/")) {
    const path = safeInternalPath(raw.split(/[?#]/)[0] || "/")
    if (path) return path
  }
  return fallback
}

function fromConnected(node: ConnectedMenuNode | null | undefined) {
  const slug = safeSlug(node?.slug ?? "")
  if (!slug) return ""
  switch (node?.__typename) {
    case "Destination":
      return routes.destination(slug)
    case "Tour":
      return routes.tour(slug)
    case "Experience":
      return routes.experience(slug)
    case "Post":
      return routes.article(slug)
    case "Page":
      return pathFromUri(node.uri, `/${slug}`)
    case "Category":
      return pathFromUri(node.uri, routes.category(slug))
    case "DestinationRegion":
      return pathFromUri(node.uri, routes.area(slug))
    case "TourCategory":
      return pathFromUri(node.uri, routes.tourCategory(slug))
    case "FaqGroup":
      return pathFromUri(node.uri, routes.faqGroup(slug))
    case "Faq":
      return routes.faq
    default:
      return pathFromUri(node?.uri, "")
  }
}

function stripCmsBase(pathname: string) {
  const base = cmsBasePath()
  if (base && base !== "/" && (pathname === base || pathname.startsWith(`${base}/`))) {
    const stripped = pathname.slice(base.length)
    return stripped.startsWith("/") ? stripped : `/${stripped}`
  }
  return pathname
}

export function resolveWordPressUrl(input: ResolveInput): ResolvedUrl | null {
  const raw = (input.url || input.uri || input.path || "").trim()
  const journalSlugs = input.journalSlugs ?? new Set<string>()
  if (!raw || /^\s*(javascript|data):/i.test(raw)) {
    if (raw) reportUnmapped(raw)
    return null
  }
  if (/^(mailto:|tel:)/i.test(raw)) return { href: raw, external: true }
  if (raw === "#") return { href: "#", external: false }

  let pathname = raw
  let search = ""
  let hash = ""
  let externalHost = false

  if (/^https?:\/\//i.test(raw)) {
    let parsed: URL
    try {
      parsed = new URL(raw)
    } catch {
      reportUnmapped(raw)
      return null
    }
    const host = parsed.hostname.toLowerCase()
    if (!internalHosts().has(host)) {
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null
      if (parsed.protocol === "http:" && host !== "localhost" && host !== "127.0.0.1") return null
      return { href: parsed.toString(), external: true }
    }
    externalHost = false
    pathname = parsed.pathname
    search = parsed.search
    hash = parsed.hash
  } else if (raw.startsWith("//")) {
    reportUnmapped(raw)
    return null
  } else if (!raw.startsWith("/")) {
    reportUnmapped(raw)
    return null
  } else {
    const hashIndex = raw.indexOf("#")
    const queryIndex = raw.indexOf("?")
    const cut = [hashIndex, queryIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0]
    pathname = cut === undefined ? raw : raw.slice(0, cut)
    const rest = cut === undefined ? "" : raw.slice(cut)
    const queryMatch = rest.match(/^(\?[^#]*)?(#.*)?$/)
    search = queryMatch?.[1] ?? ""
    hash = queryMatch?.[2] ?? ""
  }

  pathname = stripCmsBase(pathname)
  const mapped =
    fromConnected(input.connected) ||
    knownPath(pathname, journalSlugs) ||
    safeInternalPath(pathname)
  if (!mapped) {
    const blocked = BLOCKED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(prefix))
    if (!blocked) reportUnmapped(raw)
    return null
  }
  if (BLOCKED_PREFIXES.some((prefix) => mapped === prefix || mapped.startsWith(`${prefix}/`))) return null
  return { href: `${mapped}${safeSuffix(search, hash)}`, external: externalHost }
}
