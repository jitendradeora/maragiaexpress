export type MenuLink = {
  label: string
  href: string
  external?: boolean
  children?: MenuLink[]
}

export type MenuColumn = {
  title: string
  href?: string
  external?: boolean
  links: MenuLink[]
}

export type SiteMenus = {
  primary: MenuLink[]
  footer: MenuColumn[]
}

export type SiteSocials = {
  facebook: string
  instagram: string
  youtube: string
  trustpilot: string
  google: string
}

export type SiteProfile = {
  name: string
  shortName: string
  brandSuffix: string
  tagline: string
  email: string
  phone: string
  phoneDisplay: string
  phoneHref: string
  location: string
  copyrightNote: string
  headerCta: MenuLink
  socials: SiteSocials
}

export type YoastMeta = {
  seoTitle: string
  seoDescription: string
  focusKeyword: string
  keywords: string
  canonical: string
  noIndex: boolean
  noFollow: boolean
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageAlt: string
  schemaRaw: string
  modifiedAt: string
}

export type Destination = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  imageAlt: string
  highlights: string[]
  paragraphs: string[]
  region: string
  regionName: string
} & YoastMeta

export type TourDetails = {
  price: string
  duration: string
  route: string[]
  map: string
  gallery: string[]
  includes: string[]
  excludes: string[]
}

export type Tour = {
  slug: string
  title: string
  category: string
  categorySlug: string
  image: string
  imageAlt: string
  summary: string
  details: TourDetails
  relatedDestinationSlug: string
} & YoastMeta

export type Experience = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  imageAlt: string
  bestFor: string
  body: string[]
  relatedDestinationSlugs: string[]
} & YoastMeta

export type Article = {
  slug: string
  category: string
  categorySlug: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  contentHtml: string
  author: string
  publishedAt: string
} & YoastMeta

export type FaqItem = {
  slug: string
  question: string
  answer: string
  href?: string
  linkLabel?: string
}

export type FaqGroup = {
  slug: string
  title: string
  items: FaqItem[]
}

export type ContentSection = {
  heading: string
  paragraphs: string[]
  html: string
}

export type CmsPage = {
  slug: string
  path: string
  title: string
  excerpt: string
  description: string
  html: string
  sections: ContentSection[]
  image: string
  imageAlt: string
  contentImage: string
  contentImageAlt: string
  ancestors: { title: string; path: string }[]
  cta: { label: string; href: string } | null
} & YoastMeta

export type HomeHeroLink = {
  label: string
  href: string
}

export type HomeHero = {
  visible: boolean
  eyebrow: string
  title: string
  titleEmphasis: string
  copy: string
  image: string
  imageAlt: string
  primaryCta: HomeHeroLink | null
  secondaryCta: HomeHeroLink | null
  locationLabel: string
  scrollLabel: string
}

export type HomeLinkSection = {
  visible: boolean
  eyebrow: string
  title: string
  copy: string
  linkLabel: string
  linkHref: string
  slugs: string[]
}

export type HomeIntroduction = {
  visible: boolean
  eyebrow: string
  title: string
  titleEmphasis: string
  lead: string
  body: string
  image: string
  imageAlt: string
  imageCaption: string
  link: HomeHeroLink | null
}

export type HomeExperiencesSection = HomeLinkSection & {
  noteSmall: string
  note: string
  image: string
  imageAlt: string
}

export type HomePromo = {
  visible: boolean
  eyebrow: string
  title: string
  titleEmphasis: string
  copy: string
  button: HomeHeroLink | null
  image: string
  imageAlt: string
  label: string
}

export type HomeStep = {
  number: string
  title: string
  copy: string
}

export type HomePoint = {
  title: string
  copy: string
}

export type HomeProcess = {
  visible: boolean
  eyebrow: string
  title: string
  copy: string
  cta: HomeHeroLink | null
  steps: HomeStep[]
}

export type HomeWhy = {
  visible: boolean
  eyebrow: string
  title: string
  points: HomePoint[]
}

export type HomeJournalSection = {
  visible: boolean
  eyebrow: string
  title: string
  linkLabel: string
  linkHref: string
  featuredSlug: string
}

export type HomeFaqSection = {
  visible: boolean
  eyebrow: string
  title: string
  linkLabel: string
  linkHref: string
  slugs: string[]
}

export type HomeNewsletter = {
  visible: boolean
  eyebrow: string
  title: string
  titleEmphasis: string
  copy: string
}

export type HomePageContent = {
  hero: HomeHero
  introduction: HomeIntroduction
  destinations: HomeLinkSection
  tours: HomeLinkSection
  experiences: HomeExperiencesSection
  promo: HomePromo
  process: HomeProcess
  why: HomeWhy
  journal: HomeJournalSection
  faq: HomeFaqSection
  newsletter: HomeNewsletter
}
