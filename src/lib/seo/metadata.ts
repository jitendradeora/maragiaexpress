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
  imageAlt = `${siteConfig.name} — tailor-made journeys through India`,
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
      locale: "en_IN",
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

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Tailor-Made Journeys Through India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  keywords: [
    "India travel",
    "tailor-made India tours",
    "Rajasthan journeys",
    "Maragià Express",
    "Udaipur travel agency",
    "cultural tours India",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} | Tailor-Made Journeys Through India`,
    description: siteConfig.seoDescription,
    siteName: siteConfig.name,
    locale: "en_IN",
    images: [
      {
        url: siteImages.og,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — tailor-made journeys through India`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Tailor-Made Journeys Through India`,
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
