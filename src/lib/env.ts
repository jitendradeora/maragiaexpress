function required(name: string) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Variabile d'ambiente mancante: ${name}`)
  }
  return value
}

export const env = {
  wpGraphqlUrl: required("WP_GRAPHQL_URL"),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://maragiaexpress.com",
}

export const contentRevalidate = 60
