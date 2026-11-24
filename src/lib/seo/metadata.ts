import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { siteImages } from "@/data/site-images"

export type PageSeoInput = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  noIndex?: boolean
  keywords?: string[]
}

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return new URL(normalized, siteConfig.url).toString()
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteImages.og,
  imageAlt = `${siteConfig.name} — viaggi su misura in India`,
  type = "website",
  noIndex = false,
  keywords,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: "it_IT",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
  }
}

export type YoastMetadata = {
  seoTitle?: string
  focusKeyword?: string
  keywords?: string
  canonical?: string
  noIndex?: boolean
  noFollow?: boolean
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  schemaRaw?: string
}

function robotFlag(robots: Metadata["robots"], key: "index" | "follow") {
  if (!robots || typeof robots === "string") return true
  const value = robots[key]
  return value !== false
}

export function applyYoastSeo(metadata: Metadata, seo?: YoastMetadata | null) {
  if (!seo) return metadata
  const title = seo.seoTitle?.trim()
  const socialTitle = seo.ogTitle?.trim() || title
  if (title) metadata.title = { absolute: title }
  if (socialTitle) {
    if (metadata.openGraph) metadata.openGraph.title = socialTitle
    if (metadata.twitter) metadata.twitter.title = socialTitle
  }
  const socialDescription = seo.ogDescription?.trim()
  if (socialDescription) {
    if (metadata.openGraph) metadata.openGraph.description = socialDescription
    if (metadata.twitter) metadata.twitter.description = socialDescription
  }
  if (seo.ogImage) {
    if (metadata.openGraph) {
      metadata.openGraph.images = [{ url: seo.ogImage, alt: seo.ogImageAlt || socialTitle || "" }]
    }
    if (metadata.twitter) metadata.twitter.images = [seo.ogImage]
  }
  if (seo.canonical) {
    metadata.alternates = { ...metadata.alternates, canonical: seo.canonical }
    if (metadata.openGraph) metadata.openGraph.url = seo.canonical
  }
  const keywords = [seo.focusKeyword, seo.keywords]
    .flatMap((value) => (value ?? "").split(","))
    .map((value) => value.trim())
    .filter(Boolean)
  if (keywords.length > 0) metadata.keywords = [...new Set(keywords)]
  if (seo.noIndex || seo.noFollow) {
    metadata.robots = {
      index: robotFlag(metadata.robots, "index") && !seo.noIndex,
      follow: robotFlag(metadata.robots, "follow") && !seo.noFollow,
    }
  }
  return metadata
}

export function applySeoTitle(metadata: Metadata, seoTitle?: string) {
  return applyYoastSeo(metadata, { seoTitle })
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Viaggi su misura in India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  keywords: [
    "viaggi in India",
    "viaggi su misura India",
    "tour Rajasthan",
    "Maragià Express",
    "agenzia di viaggi Udaipur",
    "tour culturali India",
    "viaggi organizzati India",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} | Viaggi su misura in India`,
    description: siteConfig.seoDescription,
    siteName: siteConfig.name,
    locale: "it_IT",
    images: [
      {
        url: siteImages.og,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — viaggi su misura in India`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Viaggi su misura in India`,
    description: siteConfig.seoDescription,
    images: [siteImages.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/favicon.svg" }],
  },
  verification: {},
}
