"use client"

import { FormEvent, useState } from "react"
import { FooterLinks, SiteNav, useHeaderDismiss } from "./navigation/SiteNav"
import BackToTop from "./BackToTop"
import BrandMark from "./BrandMark"
import { enquiryMailto } from "./EnquiryReady"
import ProfileLinks from "./ProfileLinks"
import AppLink from "./AppLink"
import SiteImage from "./SiteImage"
import type {
  Article,
  Destination,
  Experience,
  FaqItem,
  HomeExperiencesSection,
  HomeFaqSection,
  HomeHero,
  HomeIntroduction,
  HomeJournalSection,
  HomeLinkSection,
  HomeNewsletter,
  HomePageContent,
  HomeProcess,
  HomePromo,
  HomeWhy,
  MenuColumn,
  MenuLink,
  SiteProfile,
  Tour,
} from "@/lib/content"
import { routes } from "@/lib/routes"

function Brand({ site, priority = false }: { site: SiteProfile; priority?: boolean }) {
  return (
    <AppLink className="brand" href="/" aria-label={`${site.name}, home page`}>
      <BrandMark priority={priority} />
      <span>
        <b>{site.shortName}</b>
        <small>{site.brandSuffix}</small>
      </span>
    </AppLink>
  )
}

function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <AppLink className={`arrow-link ${light ? "arrow-link-light" : ""}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </AppLink>
  )
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  )
}

function Header({ links, site }: { links: MenuLink[]; site: SiteProfile }) {
  const [open, setOpen] = useState(false)
  const headerRef = useHeaderDismiss(open, () => setOpen(false))

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Brand site={site} priority />
        <nav
          className={`nav ${open ? "nav-open" : ""}`}
          id="mobile-navigation"
          aria-label="Navigazione principale"
        >
          <AppLink
            className="mobile-nav-brand brand"
            href="/"
            aria-label={`${site.name}, home page`}
            onClick={() => setOpen(false)}
          >
            <BrandMark />
            <span>
              <b>{site.shortName}</b>
              <small>{site.brandSuffix}</small>
            </span>
          </AppLink>
          <SiteNav items={links} onNavigate={() => setOpen(false)} />
          <AppLink
            className="nav-cta"
            href={site.headerCta.href}
            onClick={() => setOpen(false)}
          >
            {site.headerCta.label}
          </AppLink>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero({ hero }: { hero: HomeHero }) {
  if (!hero.visible) return null
  return (
    <section className="hero" id="top">
      <SiteImage
        src={hero.image}
        alt={hero.imageAlt}
        width={2200}
        height={1400}
        priority
        sizes="100vw"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        {hero.eyebrow && <p className="eyebrow eyebrow-light">{hero.eyebrow}</p>}
        {(hero.title || hero.titleEmphasis) && (
          <h1>
            {hero.title}
            {hero.titleEmphasis && <em>{hero.titleEmphasis}</em>}
          </h1>
        )}
        {hero.copy && <p className="hero-copy">{hero.copy}</p>}
        {(hero.primaryCta || hero.secondaryCta) && (
          <div className="hero-actions">
            {hero.primaryCta && (
              <AppLink className="button button-ivory" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </AppLink>
            )}
            {hero.secondaryCta && (
              <ArrowLink href={hero.secondaryCta.href} light>
                {hero.secondaryCta.label}
              </ArrowLink>
            )}
          </div>
        )}
      </div>
      {(hero.locationLabel || hero.scrollLabel) && (
        <div className="hero-foot">
          {hero.locationLabel && <span>{hero.locationLabel}</span>}
          {hero.scrollLabel && (
            <AppLink href="#about">
              {hero.scrollLabel} <span aria-hidden="true">↓</span>
            </AppLink>
          )}
        </div>
      )}
    </section>
  )
}

function Introduction({ section }: { section: HomeIntroduction }) {
  if (!section.visible) return null
  return (
    <section className="intro section" id="about">
      <div className="intro-title">
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        {(section.title || section.titleEmphasis) && (
          <h2>
            {section.title}
            {section.titleEmphasis && <em>{section.titleEmphasis}</em>}
          </h2>
        )}
      </div>
      <div className="intro-image">
        <img src={section.image} alt={section.imageAlt} loading="lazy" />
        {section.imageCaption && <span>{section.imageCaption}</span>}
      </div>
      <div className="intro-copy">
        {section.lead && <p className="lead">{section.lead}</p>}
        {section.body && <p>{section.body}</p>}
        {section.link && <ArrowLink href={section.link.href}>{section.link.label}</ArrowLink>}
      </div>
    </section>
  )
}

function Destinations({
  section,
  destinations,
}: {
  section: HomeLinkSection
  destinations: Destination[]
}) {
  if (!section.visible) return null
  const frames = ["destination-large", "destination-tall", ""]
  return (
    <section className="destinations section" id="destinations">
      <div className="heading-row">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
        {section.linkLabel && section.linkHref && (
          <ArrowLink href={section.linkHref}>{section.linkLabel}</ArrowLink>
        )}
      </div>
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <AppLink
            className={`destination-card ${frames[index] ?? ""}`}
            href={routes.destination(destination.slug)}
            key={destination.slug}
          >
            <img
              src={destination.image}
              alt={destination.imageAlt || destination.name}
              loading="lazy"
            />
            <span className="image-shade" />
            <span className="destination-content">
              <small>{destination.eyebrow}</small>
              <strong>{destination.name}</strong>
              <span>{destination.intro}</span>
              <b aria-hidden="true">↗</b>
            </span>
          </AppLink>
        ))}
      </div>
    </section>
  )
}

function HomeTours({ section, tours }: { section: HomeLinkSection; tours: Tour[] }) {
  if (!section.visible) return null
  return (
    <section className="section home-tours" id="tours">
      <div className="heading-row">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
        {section.linkLabel && section.linkHref && (
          <ArrowLink href={section.linkHref}>{section.linkLabel}</ArrowLink>
        )}
      </div>
      <div className="tour-card-grid">
        {tours.map((tour) => (
          <AppLink className="tour-card" href={routes.tour(tour.slug)} key={tour.slug}>
            <div className="tour-card-media">
              <img src={tour.image} alt={tour.imageAlt || tour.title} loading="lazy" />
              <span className="tour-card-shade" />
              <small>{tour.category}</small>
            </div>
            <div className="tour-card-body">
              <h3>{tour.title}</h3>
              <p>{tour.summary}</p>
              <b>
                Scopri il tour <span aria-hidden="true">↗</span>
              </b>
            </div>
          </AppLink>
        ))}
      </div>
    </section>
  )
}

function Experiences({
  section,
  experiences,
}: {
  section: HomeExperiencesSection
  experiences: Experience[]
}) {
  if (!section.visible) return null
  return (
    <section className="experiences section" id="experiences">
      <div className="experience-image">
        <img src={section.image} alt={section.imageAlt} loading="lazy" />
        {(section.noteSmall || section.note) && (
          <div className="image-note">
            {section.noteSmall && <small>{section.noteSmall}</small>}
            {section.note && <span>{section.note}</span>}
          </div>
        )}
      </div>
      <div className="experience-content">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <AppLink
              href={routes.experience(experience.slug)}
              className="experience-row"
              key={experience.slug}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{experience.name}</h3>
                <p>{experience.intro}</p>
              </div>
              <b aria-hidden="true">↗</b>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function RajasthanFeature({ section }: { section: HomePromo }) {
  if (!section.visible) return null
  return (
    <section className="rajasthan">
      <img src={section.image} alt={section.imageAlt} loading="lazy" />
      <div className="rajasthan-overlay" />
      <div className="rajasthan-content">
        {section.eyebrow && <p className="eyebrow eyebrow-light">{section.eyebrow}</p>}
        {(section.title || section.titleEmphasis) && (
          <h2>
            {section.title}
            {section.titleEmphasis && <em>{section.titleEmphasis}</em>}
          </h2>
        )}
        {section.copy && <p>{section.copy}</p>}
        {section.button && (
          <AppLink className="button button-ivory" href={section.button.href}>
            {section.button.label}
          </AppLink>
        )}
      </div>
      {section.label && <div className="rajasthan-label">{section.label}</div>}
    </section>
  )
}

function TailorMade({ section }: { section: HomeProcess }) {
  if (!section.visible) return null
  return (
    <section className="tailor section" id="tailor-made">
      <SectionHeading eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
      <div className="steps">
        {section.steps.map((step) => (
          <article key={`${step.number}-${step.title}`}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
      {section.cta && (
        <AppLink className="button button-green" href={section.cta.href}>
          {section.cta.label}
        </AppLink>
      )}
    </section>
  )
}

function WhyUs({ section }: { section: HomeWhy }) {
  if (!section.visible) return null
  return (
    <section className="why section">
      <div className="why-title">
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        {section.title && <h2>{section.title}</h2>}
      </div>
      <div className="why-grid">
        {section.points.map((point, index) => (
          <article key={point.title}>
            <span className="why-icon" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{point.title}</h3>
            <p>{point.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Journal({
  section,
  articles,
}: {
  section: HomeJournalSection
  articles: Article[]
}) {
  if (!section.visible) return null
  const feature =
    articles.find((article) => article.slug === section.featuredSlug) ?? articles[0]
  const notes = articles.filter((article) => article.slug !== feature?.slug).slice(0, 2)
  if (!feature) return null
  return (
    <section className="journal section" id="journal">
      <div className="heading-row">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        {section.linkLabel && section.linkHref && (
          <ArrowLink href={section.linkHref}>{section.linkLabel}</ArrowLink>
        )}
      </div>
      <div className="journal-grid">
        <AppLink className="journal-feature" href={routes.article(feature.slug)}>
          <img
            src={feature.image}
            alt={feature.imageAlt || feature.title}
            loading="lazy"
          />
          <p className="eyebrow">{feature.category}</p>
          <h3>{feature.title}</h3>
          <p>{feature.excerpt}</p>
        </AppLink>
        {notes.map((article, index) => (
          <AppLink href={routes.article(article.slug)} key={article.slug}>
            <span className="journal-number">APPUNTI · {String(index + 1).padStart(2, "0")}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
          </AppLink>
        ))}
      </div>
    </section>
  )
}

function Faq({
  section,
  faqs,
  email,
}: {
  section: HomeFaqSection
  faqs: FaqItem[]
  email: string
}) {
  const [active, setActive] = useState(0)
  if (!section.visible) return null
  return (
    <section className="faq section">
      <div className="faq-heading">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        <p>
          {section.linkLabel && section.linkHref && (
            <AppLink href={section.linkHref}>{section.linkLabel}</AppLink>
          )}
          {section.linkLabel && " oppure "}
          <AppLink href={`mailto:${email}`}>scrivi al nostro team.</AppLink>
        </p>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <article
            className={active === index ? "faq-open" : ""}
            key={item.question}
          >
            <button
              type="button"
              aria-expanded={active === index}
              onClick={() => setActive(active === index ? -1 : index)}
            >
              <span>{item.question}</span>
              <b aria-hidden="true">{active === index ? "−" : "+"}</b>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Newsletter({ section, email: contactEmail }: { section: HomeNewsletter; email: string }) {
  const [email, setEmail] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setEmail(String(data.get("email") || ""))
  }

  const subject = "Iscrizione alla newsletter"
  const body = email
    ? `Vorrei iscrivermi alla newsletter di Maragià Express.\n\nEmail: ${email}`
    : ""

  if (!section.visible) return null

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-copy">
        {section.eyebrow && <p className="eyebrow eyebrow-light">{section.eyebrow}</p>}
        {(section.title || section.titleEmphasis) && (
          <h2 id="newsletter-title">
            {section.title}
            {section.titleEmphasis && <em>{section.titleEmphasis}</em>}
          </h2>
        )}
        {section.copy && <p>{section.copy}</p>}
      </div>
      {email ? (
        <div className="newsletter-ready" role="status">
          <p>
            L’iscrizione di <strong>{email}</strong> non è ancora partita. Apri
            la posta e invia il messaggio a {contactEmail}.
          </p>
          <div className="newsletter-actions">
            <AppLink className="button button-gold" href={enquiryMailto(subject, body, contactEmail)}>
              Apri l’app di posta
            </AppLink>
            <button type="button" onClick={() => setEmail(null)}>
              Cambia email
            </button>
          </div>
        </div>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label>
            Indirizzo email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nome@esempio.it"
            />
          </label>
          <button className="button button-gold" type="submit">
            Iscriviti
          </button>
          <p>
            Nessun dato viene salvato su questo sito. L’iscrizione parte solo
            quando invii l’email.
          </p>
        </form>
      )}
    </section>
  )
}

function Footer({ columns, site }: { columns: MenuColumn[]; site: SiteProfile }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand site={site} />
          <p>{site.tagline}</p>
          <span>{site.location}</span>
          <ProfileLinks socials={site.socials} />
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3>
              {column.href ? (
                <AppLink
                  href={column.href}
                  target={column.external ? "_blank" : undefined}
                  rel={column.external ? "noopener noreferrer" : undefined}
                >
                  {column.title}
                </AppLink>
              ) : (
                column.title
              )}
            </h3>
            <FooterLinks links={column.links} />
          </div>
        ))}
        <div>
          <h3>Parla con noi</h3>
          <AppLink href={site.phoneHref}>{site.phoneDisplay}</AppLink>
          <AppLink href={`mailto:${site.email}`}>{site.email}</AppLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.copyrightNote}</span>
      </div>
    </footer>
  )
}

type HomePageProps = {
  links: MenuLink[]
  footer: MenuColumn[]
  site: SiteProfile
  home: HomePageContent
  destinations: Destination[]
  tours: Tour[]
  experiences: Experience[]
  articles: Article[]
  faqs: FaqItem[]
}

export default function HomePage({
  links,
  footer,
  site,
  home,
  destinations,
  tours,
  experiences,
  articles,
  faqs,
}: HomePageProps) {
  return (
    <>
      <Header links={links} site={site} />
      <main id="main-content">
        <Hero hero={home.hero} />
        <Introduction section={home.introduction} />
        <Destinations section={home.destinations} destinations={destinations} />
        <HomeTours section={home.tours} tours={tours} />
        <Experiences section={home.experiences} experiences={experiences} />
        <RajasthanFeature section={home.promo} />
        <TailorMade section={home.process} />
        <WhyUs section={home.why} />
        <Journal section={home.journal} articles={articles} />
        <Faq section={home.faq} faqs={faqs} email={site.email} />
        <Newsletter section={home.newsletter} email={site.email} />
      </main>
      <Footer columns={footer} site={site} />
      <BackToTop />
    </>
  )
}
