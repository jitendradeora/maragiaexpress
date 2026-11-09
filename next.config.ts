import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "maragiaexpress.com" },
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
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/viaggi-di-lusso-in-india",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/tour-culturali-dell-india",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/avventure-nel-mondo-india",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/tour-dei-festival-indiani",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/festa-dei-colori-india",
        destination: "/tours/indian-festival-of-colors",
        permanent: true,
      },
      {
        source: "/fiera-di-pushkar",
        destination: "/tours/camel-fair",
        permanent: true,
      },
      {
        source: "/viaggio-in-bicicletta-in-rajasthan",
        destination: "/tours/rajasthan-on-bicycle",
        permanent: true,
      },
      {
        source: "/viaggio-organizzato-in-bhutan",
        destination: "/destinations/bhutan",
        permanent: true,
      },
      {
        source: "/viaggio-organizzato-in-nepal",
        destination: "/destinations/nepal",
        permanent: true,
      },
      {
        source: "/viaggio-organizzato-in-sri-lanka",
        destination: "/destinations/sri-lanka",
        permanent: true,
      },
      {
        source: "/oltre-lindia",
        destination: "/destinations",
        permanent: true,
      },
      {
        source: "/viaggio-di-lusso-in-india-2",
        destination: "/tours/maharajas-tour",
        permanent: true,
      },
      {
        source: "/holi-colorato-2023-fd",
        destination: "/tours/indian-festival-of-colors",
        permanent: true,
      },
      {
        source: "/agenzia-turismo-india",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/travel-journal",
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
