const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export function withBasePath(href: string) {
  if (!basePath || !href.startsWith("/") || href.startsWith("//")) return href
  if (
    href === basePath ||
    href.startsWith(`${basePath}/`) ||
    href.startsWith(`${basePath}?`) ||
    href.startsWith(`${basePath}#`)
  ) {
    return href
  }
  return `${basePath}${href}`
}
