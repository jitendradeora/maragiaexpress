import { cache } from "react"
import type {
  Article,
  CmsPage,
  Destination,
  Experience,
  FaqGroup,
  FaqItem,
  HomeExperiencesSection,
  HomeFaqSection,
  HomeHero,
  HomeHeroLink,
  HomeIntroduction,
  HomeJournalSection,
  HomeLinkSection,
  HomeNewsletter,
  HomePageContent,
  HomePoint,
  HomeProcess,
  HomePromo,
  HomeStep,
  HomeWhy,
  MenuColumn,
  MenuLink,
  SiteMenus,
  SiteProfile,
  Tour,
  YoastMeta,
} from "@/lib/content"
import { absoluteUrl } from "@/lib/seo/metadata"
import { siteConfig } from "@/lib/site-config"
import { routes } from "@/lib/routes"
import { siteImages } from "@/data/site-images"
import { wpQuery } from "./client"
import { resolveWordPressUrl, type ConnectedMenuNode } from "./url-resolver"
import {
  leadingParagraphs,
  paragraphsFromHtml,
  plainText,
  sanitizeHtml,
  sectionsFromHtml,
  imagesFromHtml,
  linkFromHtml,
} from "./html"

type ImageNode = { sourceUrl?: string | null; altText?: string | null } | null
type SeoNode = {
  title?: string | null
  metaDesc?: string | null
  focuskw?: string | null
  metaKeywords?: string | null
  canonical?: string | null
  metaRobotsNoindex?: string | null
  metaRobotsNofollow?: string | null
  opengraphTitle?: string | null
  opengraphDescription?: string | null
  opengraphImage?: { sourceUrl?: string | null; altText?: string | null } | null
  schema?: { raw?: string | null } | null
} | null

const seoSelection = `
  seo {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl altText }
  }
`

const pageSeoSelection = `
  seo {
    title
    metaDesc
    focuskw
    metaKeywords
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl altText }
    schema { raw }
  }
`

type DestinationNode = {
  slug?: string | null
  title?: string | null
  content?: string | null
  featuredImage?: { node?: ImageNode } | null
  destinationRegions?: {
    nodes?: {
      slug?: string | null
      name?: string | null
      parent?: { node?: { slug?: string | null; name?: string | null } | null } | null
    }[]
  } | null
  destinationFields?: {
    eyebrow?: string | null
    intro?: string | null
    highlights?: { text?: string | null }[] | null
  } | null
  modified?: string | null
  seo?: SeoNode
}

type TourNode = {
  slug?: string | null
  title?: string | null
  excerpt?: string | null
  featuredImage?: { node?: ImageNode } | null
  tourCategories?: { nodes?: { slug?: string | null; name?: string | null }[] } | null
  tourFields?: {
    price?: string | null
    duration?: string | null
    mapUrl?: string | null
    route?: { place?: string | null }[] | null
    gallery?: { imageUrl?: string | null }[] | null
    includes?: { item?: string | null }[] | null
    excludes?: { item?: string | null }[] | null
  } | null
  relatedDestination?: { slug?: string | null } | null
  modified?: string | null
  seo?: SeoNode
}

type ExperienceNode = {
  slug?: string | null
  title?: string | null
  content?: string | null
  featuredImage?: { node?: ImageNode } | null
  experienceFields?: {
    eyebrow?: string | null
    intro?: string | null
    bestFor?: string | null
  } | null
  relatedDestinations?: { slug?: string | null }[] | null
  modified?: string | null
  seo?: SeoNode
}

type PostNode = {
  slug?: string | null
  title?: string | null
  excerpt?: string | null
  content?: string | null
  date?: string | null
  featuredImage?: { node?: ImageNode } | null
  author?: { node?: { name?: string | null } | null } | null
  categories?: { nodes?: { name?: string | null; slug?: string | null }[] } | null
  modified?: string | null
  seo?: SeoNode
}

type FaqNode = {
  slug?: string | null
  title?: string | null
  content?: string | null
  faqGroups?: { nodes?: { name?: string | null; slug?: string | null }[] } | null
  faqFields?: {
    relatedUrl?: string | null
    relatedLabel?: string | null
  } | null
}

type MenuNode = {
  id?: string | null
  databaseId?: number | null
  parentId?: string | null
  parentDatabaseId?: number | null
  label?: string | null
  url?: string | null
  uri?: string | null
  path?: string | null
  target?: string | null
  order?: number | null
  cssClasses?: (string | null)[] | null
  connectedNode?: { node?: ConnectedMenuNode | null } | null
}

type PageCrumb = {
  title?: string | null
  slug?: string | null
  uri?: string | null
  parent?: { node?: PageCrumb | null } | null
}

type PageNode = {
  title?: string | null
  slug?: string | null
  uri?: string | null
  excerpt?: string | null
  content?: string | null
  featuredImage?: { node?: ImageNode } | null
  modified?: string | null
  parent?: { node?: PageCrumb | null } | null
  seo?: SeoNode
}

type IndexedPageNode = {
  slug?: string | null
  uri?: string | null
  isFrontPage?: boolean | null
  modified?: string | null
  seo?: SeoNode
}

export type IndexedPage = YoastMeta & {
  path: string
  isFrontPage: boolean
}

type CatalogData = {
  destinations?: { nodes?: DestinationNode[] }
  tours?: { nodes?: TourNode[] }
  experiences?: { nodes?: ExperienceNode[] }
  posts?: { nodes?: PostNode[] }
  faqs?: { nodes?: FaqNode[] }
  primary?: { menuItems?: { nodes?: MenuNode[] } } | null
  footer?: { menuItems?: { nodes?: MenuNode[] } } | null
  maragiaSite?: {
    name?: string | null
    shortName?: string | null
    brandSuffix?: string | null
    tagline?: string | null
    email?: string | null
    phone?: string | null
    phoneDisplay?: string | null
    location?: string | null
    copyrightNote?: string | null
    headerCta?: { label?: string | null; url?: string | null } | null
    socials?: {
      facebook?: string | null
      instagram?: string | null
      youtube?: string | null
      trustpilot?: string | null
      google?: string | null
    } | null
  } | null
}

const menuItemSelection = `
  nodes {
    id
    databaseId
    parentId
    parentDatabaseId
    label
    url
    uri
    path
    target
    order
    cssClasses
    connectedNode {
      node {
        __typename
        ... on ContentNode { slug uri }
        ... on Category { slug uri }
        ... on DestinationRegion { slug uri }
        ... on TourCategory { slug uri }
        ... on FaqGroup { slug uri }
      }
    }
  }
`

const catalogQuery = `
  query Catalog {
    destinations(first: 100, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      nodes {
        slug
        title
        content
        featuredImage { node { sourceUrl altText } }
        destinationRegions { nodes { slug name parent { node { slug name } } } }
        modified
        destinationFields { eyebrow intro highlights { text } }
        ${seoSelection}
      }
    }
    tours(first: 100, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      nodes {
        slug
        title
        excerpt
        featuredImage { node { sourceUrl altText } }
        tourCategories { nodes { slug name } }
        tourFields {
          price
          duration
          mapUrl
          route { place }
          gallery { imageUrl }
          includes { item }
          excludes { item }
        }
        relatedDestination { slug }
        modified
        ${seoSelection}
      }
    }
    experiences(first: 50, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      nodes {
        slug
        title
        content
        featuredImage { node { sourceUrl altText } }
        experienceFields { eyebrow intro bestFor }
        relatedDestinations { slug }
        modified
        ${seoSelection}
      }
    }
    posts(first: 50, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        slug
        title
        excerpt
        content
        date
        featuredImage { node { sourceUrl altText } }
        author { node { name } }
        categories { nodes { name slug } }
        modified
        ${seoSelection}
      }
    }
    faqs(first: 50, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      nodes {
        slug
        title
        content
        faqGroups { nodes { name slug } }
        faqFields { relatedUrl relatedLabel }
      }
    }
    primary: menu(id: "PRIMARY", idType: LOCATION) {
      menuItems(first: 100) { ${menuItemSelection} }
    }
    footer: menu(id: "FOOTER", idType: LOCATION) {
      menuItems(first: 100) { ${menuItemSelection} }
    }
    maragiaSite {
      name
      shortName
      brandSuffix
      tagline
      email
      phone
      phoneDisplay
      location
      copyrightNote
      headerCta { label url }
      socials { facebook instagram youtube trustpilot google }
    }
  }
`

const homepageQuery = `
  query HomepageSettings {
    maragiaHomepage {
      hero {
        visible
        eyebrow
        title
        titleEmphasis
        copy
        image { sourceUrl altText }
        primaryCta { label url }
        secondaryCta { label url }
        locationLabel
        scrollLabel
      }
      introduction {
        visible
        eyebrow
        title
        titleEmphasis
        lead
        body
        image { sourceUrl altText }
        imageCaption
        link { label url }
      }
      destinations { visible eyebrow title copy linkLabel linkUrl slugs }
      tours { visible eyebrow title copy linkLabel linkUrl slugs }
      experiences {
        visible
        eyebrow
        title
        copy
        linkLabel
        linkUrl
        noteSmall
        note
        image { sourceUrl altText }
        slugs
      }
      promo {
        visible
        eyebrow
        title
        titleEmphasis
        copy
        button { label url }
        image { sourceUrl altText }
        label
      }
      process {
        visible
        eyebrow
        title
        copy
        cta { label url }
        steps { number title copy }
      }
      why {
        visible
        eyebrow
        title
        points { title copy }
      }
      journal { visible eyebrow title linkLabel linkUrl featuredSlug }
      faq { visible eyebrow title linkLabel linkUrl slugs }
      newsletter { visible eyebrow title titleEmphasis copy }
    }
  }
`

const pageQuery = `
  query CmsPage($id: ID!) {
    page(id: $id, idType: URI) {
      title
      slug
      uri
      excerpt
      content
      featuredImage { node { sourceUrl altText } }
      modified
      parent {
        node {
          ... on Page {
            title
            slug
            uri
            parent {
              node {
                ... on Page {
                  title
                  slug
                  uri
                  parent {
                    node {
                      ... on Page { title slug uri }
                    }
                  }
                }
              }
            }
          }
        }
      }
      ${pageSeoSelection}
    }
  }
`

function text(value?: string | null) {
  return value?.trim() ?? ""
}

function publicCanonical(value?: string | null) {
  const raw = text(value)
  if (!raw) return ""
  const resolved = resolveWordPressUrl({ url: raw })
  if (!resolved || resolved.external || !resolved.href.startsWith("/")) return ""
  return absoluteUrl(resolved.href)
}

function yoastOf(seo?: SeoNode, modified?: string | null): YoastMeta {
  return {
    seoTitle: text(seo?.title),
    seoDescription: text(seo?.metaDesc),
    focusKeyword: text(seo?.focuskw),
    keywords: text(seo?.metaKeywords),
    canonical: publicCanonical(seo?.canonical),
    noIndex: text(seo?.metaRobotsNoindex).toLowerCase() === "noindex",
    noFollow: text(seo?.metaRobotsNofollow).toLowerCase() === "nofollow",
    ogTitle: text(seo?.opengraphTitle),
    ogDescription: text(seo?.opengraphDescription),
    ogImage: text(seo?.opengraphImage?.sourceUrl),
    ogImageAlt: text(seo?.opengraphImage?.altText),
    schemaRaw: text(seo?.schema?.raw),
    modifiedAt: text(modified),
  }
}

function imageOf(node?: ImageNode, fallback: string = siteImages.og) {
  return {
    src: text(node?.sourceUrl) || fallback,
    alt: text(node?.altText),
  }
}

function list(values?: { [key: string]: string | null | undefined }[] | null, key = "text") {
  return (values ?? []).map((item) => text(item[key])).filter(Boolean)
}

export function seoDescription(seo: SeoNode, fallback: string) {
  return text(seo?.metaDesc) || fallback
}

function menuItemHref(node: MenuNode, journalSlugs: Set<string>) {
  const resolved = resolveWordPressUrl({
    url: text(node.url),
    uri: text(node.uri),
    path: text(node.path),
    journalSlugs,
    connected: node.connectedNode?.node,
  })
  if (!resolved || resolved.href === "#") return null
  return {
    href: resolved.href,
    external: resolved.external || text(node.target) === "_blank",
  }
}

const HIDDEN_MENU_CLASSES = new Set(["hidden", "nav-hidden", "menu-hidden"])

function menuHidden(node: MenuNode) {
  return (node.cssClasses ?? []).some((name) => HIDDEN_MENU_CLASSES.has(text(name).toLowerCase()))
}

function menuTree(nodes: MenuNode[] | undefined, journalSlugs: Set<string>): MenuLink[] {
  const items = [...(nodes ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const byKey = new Map<string, MenuNode>()
  for (const item of items) {
    if (item.id) byKey.set(item.id, item)
    if (item.databaseId) byKey.set(String(item.databaseId), item)
  }
  const children = new Map<string, MenuNode[]>()
  for (const item of items) {
    const parentKey = item.parentId || (item.parentDatabaseId ? String(item.parentDatabaseId) : "")
    const parent = parentKey ? byKey.get(parentKey) : undefined
    const key = parent?.id || ""
    const list = children.get(key) ?? []
    list.push(item)
    children.set(key, list)
  }
  const walk = (node: MenuNode): MenuLink | null => {
    if (menuHidden(node)) return null
    const nested = (children.get(node.id || "") ?? [])
      .map(walk)
      .filter((item): item is MenuLink => Boolean(item))
    const label = text(node.label)
    const resolved = menuItemHref(node, journalSlugs)
    if (!label || (!resolved && nested.length === 0)) return null
    return {
      label,
      href: resolved?.href ?? "",
      external: resolved?.external,
      children: nested.length > 0 ? nested : undefined,
    }
  }
  return (children.get("") ?? [])
    .map(walk)
    .filter((item): item is MenuLink => Boolean(item))
}

function menuColumns(nodes: MenuNode[] | undefined, journalSlugs: Set<string>): MenuColumn[] {
  return menuTree(nodes, journalSlugs)
    .map((item) => ({
      title: item.label,
      href: item.href || undefined,
      external: item.external,
      links: item.children ?? [],
    }))
    .filter((column) => column.title && (column.links.length > 0 || column.href))
}

function mapDestination(node: DestinationNode): Destination | null {
  const slug = text(node.slug)
  const name = text(node.title)
  if (!slug || !name) return null
  const image = imageOf(node.featuredImage?.node, siteImages.rajasthan)
  const paragraphs = paragraphsFromHtml(node.content ?? "")
  const region = rootRegion(node.destinationRegions?.nodes?.[0])
  return {
    slug,
    name,
    eyebrow: text(node.destinationFields?.eyebrow),
    intro: text(node.destinationFields?.intro) || paragraphs[0] || name,
    image: image.src,
    imageAlt: image.alt || name,
    highlights: list(node.destinationFields?.highlights, "text"),
    paragraphs,
    region: region.slug,
    regionName: region.name,
    ...yoastOf(node.seo, node.modified),
  }
}

function rootRegion(
  node:
    | {
        slug?: string | null
        name?: string | null
        parent?: { node?: { slug?: string | null; name?: string | null } | null } | null
      }
    | undefined,
) {
  const parent = node?.parent?.node
  const source = text(parent?.slug) ? parent : node
  return { slug: text(source?.slug), name: text(source?.name) }
}

function mapTour(node: TourNode): Tour | null {
  const slug = text(node.slug)
  const title = text(node.title)
  if (!slug || !title) return null
  const image = imageOf(node.featuredImage?.node, siteImages.palace)
  const fields = node.tourFields
  const category = node.tourCategories?.nodes?.[0]
  return {
    slug,
    title,
    category: text(category?.name) || "Tour",
    categorySlug: text(category?.slug) || "tour",
    image: image.src,
    imageAlt: image.alt || title,
    summary: plainText(node.excerpt ?? "") || title,
    details: {
      price: text(fields?.price) || "Su richiesta",
      duration: text(fields?.duration) || "Confermata con la proposta",
      route: list(fields?.route, "place"),
      map: text(fields?.mapUrl),
      gallery: (fields?.gallery ?? [])
        .map((item) => text(item.imageUrl))
        .filter(Boolean),
      includes: list(fields?.includes, "item"),
      excludes: list(fields?.excludes, "item"),
    },
    relatedDestinationSlug: text(node.relatedDestination?.slug),
    ...yoastOf(node.seo, node.modified),
  }
}

function mapExperience(node: ExperienceNode): Experience | null {
  const slug = text(node.slug)
  const name = text(node.title)
  if (!slug || !name) return null
  const image = imageOf(node.featuredImage?.node, siteImages.craft)
  const body = paragraphsFromHtml(node.content ?? "")
  return {
    slug,
    name,
    eyebrow: text(node.experienceFields?.eyebrow),
    intro: text(node.experienceFields?.intro) || body[0] || name,
    image: image.src,
    imageAlt: image.alt || name,
    bestFor: text(node.experienceFields?.bestFor),
    body,
    relatedDestinationSlugs: (node.relatedDestinations ?? [])
      .map((item) => text(item.slug))
      .filter(Boolean),
    ...yoastOf(node.seo, node.modified),
  }
}

function mapArticle(node: PostNode): Article | null {
  const slug = text(node.slug)
  const title = text(node.title)
  if (!slug || !title) return null
  const image = imageOf(node.featuredImage?.node, siteImages.city)
  const excerpt = plainText(node.excerpt ?? "") || paragraphsFromHtml(node.content ?? "")[0] || title
  const category = node.categories?.nodes?.[0]
  return {
    slug,
    title,
    category: text(category?.name) || "Diario",
    categorySlug: text(category?.slug) || "diario",
    excerpt,
    image: image.src,
    imageAlt: image.alt || title,
    contentHtml: sanitizeHtml(node.content ?? ""),
    author: text(node.author?.node?.name),
    publishedAt: text(node.date),
    ...yoastOf(node.seo, node.modified),
  }
}

function mapFaqs(nodes: FaqNode[] | undefined): FaqGroup[] {
  const groups = new Map<string, FaqGroup>()
  for (const node of nodes ?? []) {
    const question = text(node.title)
    const answer = paragraphsFromHtml(node.content ?? "").join(" ")
    if (!question || !answer) continue
    const group = node.faqGroups?.nodes?.[0]
    const title = text(group?.name) || "Domande"
    const key = text(group?.slug) || title
    const item: FaqItem = {
      slug: text(node.slug),
      question,
      answer,
      href: publicHref(text(node.faqFields?.relatedUrl)) || undefined,
      linkLabel: text(node.faqFields?.relatedLabel) || undefined,
    }
    const current = groups.get(key) ?? { slug: key, title, items: [] }
    current.items.push(item)
    groups.set(key, current)
  }
  return [...groups.values()]
}

function mapSite(node: CatalogData["maragiaSite"]): SiteProfile {
  if (!node) {
    throw new Error("WordPress non ha restituito le impostazioni del sito.")
  }
  const phone = text(node.phone) || siteConfig.phone
  const email = text(node.email) || siteConfig.email
  const ctaLabel = text(node.headerCta?.label) || "Organizza il tuo viaggio"
  const ctaHref = publicHref(text(node.headerCta?.url)) || "/tailor-made#enquiry"
  return {
    name: text(node.name) || siteConfig.name,
    shortName: text(node.shortName) || "MARAGIÀ",
    brandSuffix: text(node.brandSuffix) || "EXPRESS · INDIA",
    tagline: text(node.tagline) || "Maragià Express — scopri l’India a modo tuo.",
    email,
    phone,
    phoneDisplay: text(node.phoneDisplay) || siteConfig.phoneDisplay,
    phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
    location: text(node.location) || siteConfig.location,
    copyrightNote:
      text(node.copyrightNote) || "Agenzia di viaggi e tour operator · Udaipur, India",
    headerCta: { label: ctaLabel, href: ctaHref },
    socials: {
      facebook: text(node.socials?.facebook) || siteConfig.socials.facebook,
      instagram: text(node.socials?.instagram) || siteConfig.socials.instagram,
      youtube: text(node.socials?.youtube) || siteConfig.socials.youtube,
      trustpilot: text(node.socials?.trustpilot) || siteConfig.socials.trustpilot,
      google: text(node.socials?.google) || siteConfig.socials.google,
    },
  }
}

export type Catalog = {
  destinations: Destination[]
  tours: Tour[]
  experiences: Experience[]
  articles: Article[]
  faqGroups: FaqGroup[]
  menus: SiteMenus
  site: SiteProfile
}

export const getCatalog = cache(async (): Promise<Catalog> => {
  const data = await wpQuery<CatalogData>(catalogQuery)
  const destinations = (data.destinations?.nodes ?? [])
    .map(mapDestination)
    .filter((item): item is Destination => Boolean(item))
  const tours = (data.tours?.nodes ?? [])
    .map(mapTour)
    .filter((item): item is Tour => Boolean(item))
  const experiences = (data.experiences?.nodes ?? [])
    .map(mapExperience)
    .filter((item): item is Experience => Boolean(item))
  const articles = (data.posts?.nodes ?? [])
    .map(mapArticle)
    .filter((item): item is Article => Boolean(item))
  const journalSlugs = new Set(articles.map((article) => article.slug))
  return {
    destinations,
    tours,
    experiences,
    articles,
    faqGroups: mapFaqs(data.faqs?.nodes),
    menus: {
      primary: menuTree(data.primary?.menuItems?.nodes, journalSlugs),
      footer: menuColumns(data.footer?.menuItems?.nodes, journalSlugs),
    },
    site: mapSite(data.maragiaSite),
  }
})

type HeroLinkNode = { label?: string | null; url?: string | null } | null

type CopySectionNode = {
  visible?: boolean | null
  eyebrow?: string | null
  title?: string | null
  copy?: string | null
  linkLabel?: string | null
  linkUrl?: string | null
  slugs?: Array<string | null> | null
} | null

type HomepageData = {
  maragiaHomepage?: {
    hero?: HomepageHeroData["hero"]
    introduction?: {
      visible?: boolean | null
      eyebrow?: string | null
      title?: string | null
      titleEmphasis?: string | null
      lead?: string | null
      body?: string | null
      image?: ImageNode
      imageCaption?: string | null
      link?: HeroLinkNode
    } | null
    destinations?: CopySectionNode
    tours?: CopySectionNode
    experiences?: (CopySectionNode & {
      noteSmall?: string | null
      note?: string | null
      image?: ImageNode
    }) | null
    promo?: {
      visible?: boolean | null
      eyebrow?: string | null
      title?: string | null
      titleEmphasis?: string | null
      copy?: string | null
      button?: HeroLinkNode
      image?: ImageNode
      label?: string | null
    } | null
    process?: {
      visible?: boolean | null
      eyebrow?: string | null
      title?: string | null
      copy?: string | null
      cta?: HeroLinkNode
      steps?: Array<{ number?: string | null; title?: string | null; copy?: string | null } | null> | null
    } | null
    why?: {
      visible?: boolean | null
      eyebrow?: string | null
      title?: string | null
      points?: Array<{ title?: string | null; copy?: string | null } | null> | null
    } | null
    journal?: {
      visible?: boolean | null
      eyebrow?: string | null
      title?: string | null
      linkLabel?: string | null
      linkUrl?: string | null
      featuredSlug?: string | null
    } | null
    faq?: {
      visible?: boolean | null
      eyebrow?: string | null
      title?: string | null
      linkLabel?: string | null
      linkUrl?: string | null
      slugs?: Array<string | null> | null
    } | null
    newsletter?: {
      visible?: boolean | null
      eyebrow?: string | null
      title?: string | null
      titleEmphasis?: string | null
      copy?: string | null
    } | null
  } | null
}

type HomepageHeroData = {
  hero?: {
    visible?: boolean | null
    eyebrow?: string | null
    title?: string | null
    titleEmphasis?: string | null
    copy?: string | null
    image?: ImageNode
    primaryCta?: HeroLinkNode
    secondaryCta?: HeroLinkNode
    locationLabel?: string | null
    scrollLabel?: string | null
  } | null
}

function publicHref(url: string) {
  const resolved = resolveWordPressUrl({ url, uri: url })
  return resolved && resolved.href !== "#" ? resolved.href : ""
}

function heroLink(link?: HeroLinkNode): HomeHeroLink | null {
  const label = text(link?.label)
  const href = publicHref(text(link?.url))
  if (!label || !href) return null
  return { label, href }
}

function slugsOf(values?: Array<string | null> | null) {
  return (values ?? []).map((slug) => text(slug)).filter(Boolean)
}

function linkSection(section: CopySectionNode): HomeLinkSection {
  return {
    visible: section?.visible !== false,
    eyebrow: text(section?.eyebrow),
    title: text(section?.title),
    copy: text(section?.copy),
    linkLabel: text(section?.linkLabel),
    linkHref: publicHref(text(section?.linkUrl)),
    slugs: slugsOf(section?.slugs),
  }
}

export const getHomepage = cache(async (): Promise<HomePageContent> => {
  const data = await wpQuery<HomepageData>(homepageQuery)
  const page = data.maragiaHomepage
  const hero = page?.hero
  if (!hero) {
    throw new Error("WordPress non ha restituito i contenuti della homepage.")
  }
  const heroImage = imageOf(hero.image, siteImages.hero)
  const introduction = page?.introduction
  const introImage = imageOf(introduction?.image, siteImages.udaipur)
  const experiences = page?.experiences
  const experienceImage = imageOf(experiences?.image, siteImages.craft)
  const promo = page?.promo
  const promoImage = imageOf(promo?.image, siteImages.desert)
  const steps: HomeStep[] = (page?.process?.steps ?? []).flatMap((step) => {
    const title = text(step?.title)
    if (!title) return []
    return [{ number: text(step?.number), title, copy: text(step?.copy) }]
  })
  const points: HomePoint[] = (page?.why?.points ?? []).flatMap((point) => {
    const title = text(point?.title)
    if (!title) return []
    return [{ title, copy: text(point?.copy) }]
  })
  const experienceSection: HomeExperiencesSection = {
    ...linkSection(experiences ?? null),
    noteSmall: text(experiences?.noteSmall),
    note: text(experiences?.note),
    image: experienceImage.src,
    imageAlt: experienceImage.alt || "Musicista del Rajasthan in abito tradizionale",
  }
  const journal = page?.journal
  const faq = page?.faq
  const newsletter = page?.newsletter
  const why = page?.why
  const process = page?.process

  return {
    hero: {
      visible: hero.visible !== false,
      eyebrow: text(hero.eyebrow),
      title: text(hero.title),
      titleEmphasis: text(hero.titleEmphasis),
      copy: text(hero.copy),
      image: heroImage.src,
      imageAlt: heroImage.alt || "Architettura di un palazzo storico riflessa nell’acqua a Udaipur, Rajasthan",
      primaryCta: heroLink(hero.primaryCta),
      secondaryCta: heroLink(hero.secondaryCta),
      locationLabel: text(hero.locationLabel),
      scrollLabel: text(hero.scrollLabel),
    },
    introduction: {
      visible: introduction?.visible !== false,
      eyebrow: text(introduction?.eyebrow),
      title: text(introduction?.title),
      titleEmphasis: text(introduction?.titleEmphasis),
      lead: text(introduction?.lead),
      body: text(introduction?.body),
      image: introImage.src,
      imageAlt: introImage.alt || "Facciata decorata di un palazzo sul lago a Udaipur",
      imageCaption: text(introduction?.imageCaption),
      link: heroLink(introduction?.link),
    } satisfies HomeIntroduction,
    destinations: linkSection(page?.destinations ?? null),
    tours: linkSection(page?.tours ?? null),
    experiences: experienceSection,
    promo: {
      visible: promo?.visible !== false,
      eyebrow: text(promo?.eyebrow),
      title: text(promo?.title),
      titleEmphasis: text(promo?.titleEmphasis),
      copy: text(promo?.copy),
      button: heroLink(promo?.button),
      image: promoImage.src,
      imageAlt: promoImage.alt || "Cammelliere che attraversa il deserto del Thar, in Rajasthan",
      label: text(promo?.label),
    } satisfies HomePromo,
    process: {
      visible: process?.visible !== false,
      eyebrow: text(process?.eyebrow),
      title: text(process?.title),
      copy: text(process?.copy),
      cta: heroLink(process?.cta),
      steps,
    } satisfies HomeProcess,
    why: {
      visible: why?.visible !== false,
      eyebrow: text(why?.eyebrow),
      title: text(why?.title),
      points,
    } satisfies HomeWhy,
    journal: {
      visible: journal?.visible !== false,
      eyebrow: text(journal?.eyebrow),
      title: text(journal?.title),
      linkLabel: text(journal?.linkLabel),
      linkHref: publicHref(text(journal?.linkUrl)) || routes.journal,
      featuredSlug: text(journal?.featuredSlug),
    } satisfies HomeJournalSection,
    faq: {
      visible: faq?.visible !== false,
      eyebrow: text(faq?.eyebrow),
      title: text(faq?.title),
      linkLabel: text(faq?.linkLabel),
      linkHref: publicHref(text(faq?.linkUrl)) || "/faq",
      slugs: slugsOf(faq?.slugs),
    } satisfies HomeFaqSection,
    newsletter: {
      visible: newsletter?.visible !== false,
      eyebrow: text(newsletter?.eyebrow),
      title: text(newsletter?.title),
      titleEmphasis: text(newsletter?.titleEmphasis),
      copy: text(newsletter?.copy),
    } satisfies HomeNewsletter,
  }
})

export const getCmsPage = cache(async (slug: string): Promise<CmsPage | null> => {
  const data = await wpQuery<{ page?: PageNode | null }>(pageQuery, { id: slug })
  const page = data.page
  if (!page?.title) return null
  const content = page.content ?? ""
  const sections = sectionsFromHtml(content)
  const intro = leadingParagraphs(content)[0] ?? ""
  const description =
    text(page.seo?.metaDesc) || intro || sections[0]?.paragraphs[0] || plainText(content)
  const image = imageOf(page.featuredImage?.node, "")
  const contentImage = imagesFromHtml(content)[0]
  const link = linkFromHtml(content)
  const resolvedLink = link
    ? resolveWordPressUrl({ url: link.href })
    : null
  const path = pagePath(page, slug)
  return {
    slug: text(page.slug) || slug.split("/").filter(Boolean).at(-1) || slug,
    path,
    title: text(page.title),
    excerpt: plainText(page.excerpt ?? ""),
    description,
    html: sanitizeHtml(content),
    sections,
    image: image.src,
    imageAlt: image.alt,
    contentImage: contentImage?.src ?? "",
    contentImageAlt: contentImage?.alt ?? "",
    ancestors: pageAncestors(page.parent?.node),
    cta: link && resolvedLink ? { label: link.label, href: resolvedLink.href } : null,
    ...yoastOf(page.seo, page.modified),
  }
})

const pageIndexQuery = `
  query ContentIndex {
    pages(first: 100) {
      nodes {
        slug
        uri
        isFrontPage
        modified
        ${seoSelection}
      }
    }
    categories(first: 100) { nodes { slug name uri } }
    destinationRegions(first: 100) { nodes { slug name uri } }
    tourCategories(first: 100) { nodes { slug name uri } }
    faqGroups(first: 100) { nodes { slug name uri } }
  }
`

const LISTING_PATHS = new Set(["/", "/tour", "/esperienze", "/diario"])

export type IndexedTerm = {
  slug: string
  name: string
  path: string
}

export type ContentIndex = {
  pages: IndexedPage[]
  categories: IndexedTerm[]
  regions: IndexedTerm[]
  tourCategories: IndexedTerm[]
  faqGroups: IndexedTerm[]
}

type TermNode = { slug?: string | null; name?: string | null; uri?: string | null }

function pagePath(node: { slug?: string | null; uri?: string | null }, fallback: string) {
  const resolved = resolveWordPressUrl({
    uri: text(node.uri),
    connected: { __typename: "Page", slug: text(node.slug) || fallback, uri: node.uri },
  })
  if (resolved && !resolved.external && resolved.href.startsWith("/")) {
    return resolved.href.split(/[?#]/)[0] || "/"
  }
  const safe = fallback.replace(/^\/+|\/+$/g, "")
  return safe ? `/${safe}` : "/"
}

function pageAncestors(node?: PageCrumb | null): { title: string; path: string }[] {
  if (!node) return []
  const parents = pageAncestors(node.parent?.node)
  const title = text(node.title)
  const path = pagePath(node, text(node.slug))
  if (!title || !path || path === "/") return parents
  return [...parents, { title, path }]
}

function indexedPath(node: IndexedPageNode) {
  if (node.isFrontPage) return "/"
  const path = pagePath(node, text(node.slug))
  if (!path || path === "/" || path === "#") return ""
  if (LISTING_PATHS.has(path)) return ""
  return path
}

function indexedTerm(node: TermNode | null | undefined, typename: string): IndexedTerm | null {
  const slug = text(node?.slug)
  const name = text(node?.name)
  if (!slug || !name) return null
  const resolved = resolveWordPressUrl({
    uri: text(node?.uri),
    connected: { __typename: typename, slug, uri: node?.uri },
  })
  if (!resolved || resolved.external || !resolved.href.startsWith("/")) return null
  const path = resolved.href.split(/[?#]/)[0]
  if (!path || path === "/") return null
  return { slug, name, path }
}

export function findIndexedTerm(terms: IndexedTerm[], path: string) {
  return terms.find((term) => term.path === path) ?? null
}

export const getContentIndex = cache(async (): Promise<ContentIndex> => {
  const data = await wpQuery<{
    pages?: { nodes?: IndexedPageNode[] }
    categories?: { nodes?: TermNode[] }
    destinationRegions?: { nodes?: TermNode[] }
    tourCategories?: { nodes?: TermNode[] }
    faqGroups?: { nodes?: TermNode[] }
  }>(pageIndexQuery)
  const pages: IndexedPage[] = []
  for (const node of data.pages?.nodes ?? []) {
    const path = indexedPath(node)
    if (!path) continue
    pages.push({
      path,
      isFrontPage: Boolean(node.isFrontPage),
      ...yoastOf(node.seo, node.modified),
    })
  }
  const terms = (nodes: TermNode[] | undefined, typename: string) =>
    (nodes ?? []).map((node) => indexedTerm(node, typename)).filter((term): term is IndexedTerm => Boolean(term))
  return {
    pages,
    categories: terms(data.categories?.nodes, "Category"),
    regions: terms(data.destinationRegions?.nodes, "DestinationRegion"),
    tourCategories: terms(data.tourCategories?.nodes, "TourCategory"),
    faqGroups: terms(data.faqGroups?.nodes, "FaqGroup"),
  }
})

export const getPublishedPages = cache(async (): Promise<IndexedPage[]> => {
  return (await getContentIndex()).pages
})
