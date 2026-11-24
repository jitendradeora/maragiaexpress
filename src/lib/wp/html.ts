import type { ContentSection } from "@/lib/content"
import { withBasePath } from "@/lib/base-path"

const allowedTags = new Set([
  "p",
  "br",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
  "strong",
  "em",
  "blockquote",
])

export function decodeEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

export function plainText(html: string) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
}

export function paragraphsFromHtml(html: string) {
  const matches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
  const paragraphs = matches
    .map((match) => plainText(match[1] ?? ""))
    .filter(Boolean)
  if (paragraphs.length > 0) return paragraphs
  const text = plainText(html)
  return text ? [text] : []
}

function safeHref(value: string) {
  const href = decodeEntities(value).trim()
  if (
    href.startsWith("/") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("https://") ||
    href.startsWith("http://")
  ) {
    return href
  }
  return ""
}

export function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (tag, name: string, rawAttrs: string) => {
      const tagName = name.toLowerCase()
      if (!allowedTags.has(tagName)) return ""
      if (tag.startsWith("</")) return `</${tagName}>`
      if (tagName !== "a") return `<${tagName}>`
      const hrefMatch = rawAttrs.match(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)')/i)
      const href = safeHref(hrefMatch?.[1] || hrefMatch?.[2] || "")
      if (!href) return "<a>"
      const external = href.startsWith("http")
      const rel = external ? ' rel="noopener noreferrer"' : ""
      const target = external ? ' target="_blank"' : ""
      const path = external ? href : withBasePath(href)
      return `<a href="${path.replace(/"/g, "&quot;")}"${target}${rel}>`
    })
    .trim()
}

export function leadingParagraphs(html: string) {
  const clean = sanitizeHtml(html)
  const beforeHeading = clean.split(/<h2>/i)[0] ?? ""
  return paragraphsFromHtml(beforeHeading)
}

export function sectionsFromHtml(html: string): ContentSection[] {
  const clean = sanitizeHtml(html)
  const chunks = clean.split(/<h2>/i)
  const sections: ContentSection[] = []
  chunks.forEach((chunk, index) => {
    if (index === 0) return
    const [headingHtml, ...rest] = chunk.split(/<\/h2>/i)
    const body = rest.join("</h2>")
    sections.push({
      heading: plainText(headingHtml ?? ""),
      paragraphs: paragraphsFromHtml(body),
      html: sanitizeHtml(body).trim(),
    })
  })
  return sections.filter((section) => section.heading || section.paragraphs.length)
}

export function imagesFromHtml(html: string) {
  return [...html.matchAll(/<img\b[^>]*>/gi)].flatMap((match) => {
    const tag = match[0]
    const src = tag.match(/\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i)
    const alt = tag.match(/\salt\s*=\s*(?:"([^"]*)"|'([^']*)')/i)
    const url = decodeEntities(src?.[1] || src?.[2] || "").trim()
    if (!url.startsWith("/") && !url.startsWith("http://") && !url.startsWith("https://")) return []
    return [{ src: url, alt: decodeEntities(alt?.[1] || alt?.[2] || "").trim() }]
  })
}

export function linkFromHtml(html: string) {
  const matches = [
    ...html.matchAll(/<a\b[^>]*href\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>([\s\S]*?)<\/a>/gi),
  ]
  const last = matches.at(-1)
  if (!last) return null
  const href = decodeEntities(last[1] || last[2] || "").trim()
  const label = plainText(last[3] ?? "")
  if (!label) return null
  if (
    !href.startsWith("/") &&
    !href.startsWith("http://") &&
    !href.startsWith("https://") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  ) {
    return null
  }
  return { label, href }
}

export function stepsFromHtml(html: string) {
  const clean = sanitizeHtml(html)
  return clean
    .split(/<h3>/i)
    .slice(1)
    .map((part) => {
      const [titleHtml, ...rest] = part.split(/<\/h3>/i)
      const rawTitle = plainText(titleHtml ?? "")
      return {
        number: rawTitle.match(/^(\d+)/)?.[1] ?? "",
        title: rawTitle.replace(/^\d+\s*[·.-]\s*/, ""),
        copy: paragraphsFromHtml(rest.join("</h3>"))[0] ?? "",
      }
    })
    .filter((step) => step.title)
}

export function noteAfterSteps(html: string) {
  const clean = sanitizeHtml(html)
  const parts = clean.split(/<h3>/i)
  const last = parts.at(-1) ?? ""
  const body = last.split(/<\/h3>/i).slice(1).join("</h3>")
  const paragraphs = paragraphsFromHtml(body)
  return paragraphs.length > 1 ? paragraphs[paragraphs.length - 1] ?? "" : ""
}
