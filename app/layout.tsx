import type { Metadata } from "next"
import { organizationSchema, websiteSchema } from "@/lib/schema"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Tailor-Made Journeys Through India`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Discover tailor-made journeys through India's culture, heritage, landscapes and wildlife with Maragià Express in Udaipur, Rajasthan.",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schema = [organizationSchema(), websiteSchema()]

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  )
}
