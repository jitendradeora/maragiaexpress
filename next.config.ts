import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "maragiaexpress.com" },
      { protocol: "https", hostname: "www.maragiaexpress.com" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/tour-dellindia",
        destination: "/tour",
        permanent: true,
      },
      {
        source: "/viaggi-di-lusso-in-india",
        destination: "/tour",
        permanent: true,
      },
      {
        source: "/tour-culturali-dell-india",
        destination: "/tour",
        permanent: true,
      },
      {
        source: "/avventure-nel-mondo-india",
        destination: "/tour",
        permanent: true,
      },
      {
        source: "/tour-dei-festival-indiani",
        destination: "/tour",
        permanent: true,
      },
      {
        source: "/festa-dei-colori-india",
        destination: "/tour/indian-festival-of-colors",
        permanent: true,
      },
      {
        source: "/fiera-di-pushkar",
        destination: "/tour/camel-fair",
        permanent: true,
      },
      {
        source: "/viaggio-in-bicicletta-in-rajasthan",
        destination: "/tour/rajasthan-on-bicycle",
        permanent: true,
      },
      {
        source: "/viaggio-organizzato-in-bhutan",
        destination: "/destinazioni/bhutan",
        permanent: true,
      },
      {
        source: "/viaggio-organizzato-in-nepal",
        destination: "/destinazioni/nepal",
        permanent: true,
      },
      {
        source: "/viaggio-organizzato-in-sri-lanka",
        destination: "/destinazioni/sri-lanka",
        permanent: true,
      },
      {
        source: "/oltre-lindia",
        destination: "/destinazioni",
        permanent: true,
      },
      {
        source: "/viaggio-di-lusso-in-india-2",
        destination: "/tour/maharajas-tour",
        permanent: true,
      },
      {
        source: "/holi-colorato-2023-fd",
        destination: "/tour/indian-festival-of-colors",
        permanent: true,
      },
      {
        source: "/agenzia-turismo-india",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/diario",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/diario/:slug",
        permanent: true,
      },
      {
        source: "/destinations",
        destination: "/destinazioni",
        permanent: true,
      },
      {
        source: "/destinations/:slug",
        destination: "/destinazioni/:slug",
        permanent: true,
      },
      {
        source: "/tours",
        destination: "/tour",
        permanent: true,
      },
      {
        source: "/tours/:slug",
        destination: "/tour/:slug",
        permanent: true,
      },
      {
        source: "/experiences",
        destination: "/esperienze",
        permanent: true,
      },
      {
        source: "/experiences/:slug",
        destination: "/esperienze/:slug",
        permanent: true,
      },
      {
        source: "/travel-journal",
        destination: "/diario",
        permanent: true,
      },
      {
        source: "/travel-journal/:slug",
        destination: "/diario/:slug",
        permanent: true,
      },
      {
        source: "/cancellazione-e-rimborso",
        destination: "/cancellation-policy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/informazione",
        destination: "/travel-information",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
