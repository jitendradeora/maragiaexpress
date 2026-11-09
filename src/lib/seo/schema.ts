import { siteConfig } from "@/lib/site-config"
import { siteImages } from "@/data/site-images"
import { absoluteUrl } from "./metadata"

const organizationId = `${siteConfig.url}/#organization`
const websiteId = `${siteConfig.url}/#website`

type BreadcrumbItem = {
  name: string
  path: string
}

type FaqItem = {
  question: string
  answer: string
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "Organization"],
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: siteImages.og,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icons/favicon.svg"),
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Bhutan" },
      { "@type": "Country", name: "Nepal" },
      { "@type": "Country", name: "Sri Lanka" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Udaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: "IN",
        availableLanguage: ["English", "Italian", "Hindi"],
      },
    ],
    sameAs: Object.values(siteConfig.socials),
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.seoDescription,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  }
}

export function webPageSchema({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string
  description: string
  path: string
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage"
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    inLanguage: "en",
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function touristTripSchema({
  name,
  description,
  path,
  image,
  category,
}: {
  name: string
  description: string
  path: string
  image: string
  category?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${absoluteUrl(path)}#trip`,
    name,
    description,
    url: absoluteUrl(path),
    image,
    touristType: category,
    provider: { "@id": organizationId },
    itinerary: {
      "@type": "ItemList",
      name: `${name} itinerary`,
    },
  }
}

export function touristAttractionSchema({
  name,
  description,
  path,
  image,
}: {
  name: string
  description: string
  path: string
  image: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${absoluteUrl(path)}#destination`,
    name,
    description,
    url: absoluteUrl(path),
    image,
    touristType: "Cultural and experiential travel",
  }
}

export function articleSchema({
  title,
  description,
  path,
  image,
  category,
}: {
  title: string
  description: string
  path: string
  image: string
  category?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    image,
    url: absoluteUrl(path),
    author: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icons/favicon.svg"),
      },
    },
    mainEntityOfPage: absoluteUrl(path),
    articleSection: category,
    inLanguage: "en",
  }
}

export function serviceSchema({
  name,
  description,
  path,
  image,
}: {
  name: string
  description: string
  path: string
  image: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    image,
    provider: { "@id": organizationId },
    areaServed: "India",
    serviceType: "Travel experience",
  }
}
