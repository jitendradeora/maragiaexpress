"use client"

import { Fragment, useState } from "react"
import { FooterLinks, SiteNav, useHeaderDismiss } from "./navigation/SiteNav"
import BrandMark from "./BrandMark"
import { EnquiryReady } from "./EnquiryReady"
import ProfileLinks from "./ProfileLinks"
import SiteImage from "./SiteImage"
import { ArrowOutIcon } from "./icons"
import type {
  Article,
  CmsPage,
  Destination,
  Experience,
  FaqGroup,
  MenuColumn,
  MenuLink,
  SiteProfile,
  Tour,
  TourDetails,
} from "@/lib/content"
import { routes } from "@/lib/routes"
import { destinationListingHref } from "@/lib/destinations"
import { formatJournalDate, journalListingHref } from "@/lib/journal"
import { tourListingHref } from "@/lib/tours"
import { siteImages as images } from "@/data/site-images"

type SampleItineraryDay = {
  day: number
  place: string
  title: string
  description: string
  overnight: string
  meals: string
}

function createSampleItinerary(details: TourDetails): SampleItineraryDay[] {
  const publishedDays = details.duration.match(/(\d+)\s+giorn[oi]/i)
  const dayCount = publishedDays
    ? Number(publishedDays[1])
    : Math.max(details.route.length, 5)
  const destinations = details.route
  const stayNotes = [
    "Mattinata con una guida locale, poi un pomeriggio più tranquillo nei dintorni.",
    "Tempo per esplorare il paesaggio circostante, con la serata libera in hotel.",
    "Passeggiata nel centro storico, visita a un mercato o a una bottega artigiana e cena in città.",
  ]

  return Array.from({ length: dayCount }, (_, index) => {
    const destinationIndex = Math.min(
      Math.floor((index * destinations.length) / dayCount),
      destinations.length - 1,
    )
    const destination = destinations[destinationIndex]
    const nextDestination =
      index < dayCount - 1
        ? destinations[
            Math.min(
              Math.floor(((index + 1) * destinations.length) / dayCount),
              destinations.length - 1,
            )
          ]
        : destination

    if (index === 0) {
      return {
        day: 1,
        place: destination,
        title: `Arrivo a ${destination}`,
        description:
          "Trasferimento privato all’arrivo e tempo per sistemarsi. In serata, un breve incontro illustra lo svolgimento dei giorni successivi. Contenuto indicativo fino alla conferma del programma.",
        overnight: destination,
        meals: "Cena",
      }
    }

    if (index === dayCount - 1) {
      return {
        day: dayCount,
        place: destination,
        title: `Partenza da ${destination}`,
        description:
          "Colazione, poi trasferimento privato in aeroporto o in stazione. L’orario di partenza segue i voli confermati.",
        overnight: "—",
        meals: "Colazione",
      }
    }

    if (nextDestination !== destination) {
      return {
        day: index + 1,
        place: `${destination} – ${nextDestination}`,
        title: `Trasferimento a ${nextDestination}`,
        description: `Partenza da ${destination} dopo colazione e viaggio con calma, con una sosta lungo il percorso prima del check-in a ${nextDestination}.`,
        overnight: nextDestination,
        meals: "Colazione, pranzo, cena",
      }
    }

    return {
      day: index + 1,
      place: destination,
      title: `Una giornata a ${destination}`,
      description: stayNotes[index % stayNotes.length],
      overnight: destination,
      meals: "Colazione, cena",
    }
  })
}

function groupItinerary(days: SampleItineraryDay[]) {
  const chapters: { place: string; days: SampleItineraryDay[] }[] = []
  for (const day of days) {
    const current = chapters[chapters.length - 1]
    const place =
      day.overnight !== "—" ? day.overnight : (current?.place ?? day.place)
    if (!current || current.place !== place) chapters.push({ place, days: [day] })
    else current.days.push(day)
  }
  return chapters
}

export function PageHeader({ links, site }: { links: MenuLink[]; site: SiteProfile }) {
  const [open, setOpen] = useState(false)
  const headerRef = useHeaderDismiss(open, () => setOpen(false))
  return (
    <header className="inner-header" ref={headerRef}>
      <a className="inner-brand" href="/" aria-label={`${site.name}, home page`}>
        <BrandMark priority />
        <b>
          {site.shortName} <small>{site.brandSuffix}</small>
        </b>
      </a>
      <nav
        className={open ? "inner-nav inner-nav-open" : "inner-nav"}
        aria-label="Navigazione principale"
      >
        <a
          className="mobile-nav-brand inner-brand"
          href="/"
          aria-label={`${site.name}, home page`}
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <b>
            {site.shortName} <small>{site.brandSuffix}</small>
          </b>
        </a>
        <SiteNav items={links} onNavigate={() => setOpen(false)} />
        <a className="inner-nav-cta" href={site.headerCta.href}>
          {site.headerCta.label}
        </a>
      </nav>
      <button
        className="inner-menu"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Chiudi il menu" : "Apri il menu"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}

export function PageFooter({
  columns,
  site,
}: {
  columns: MenuColumn[]
  site: SiteProfile
}) {
  return (
    <footer className="inner-footer">
      <div>
        <a className="inner-brand" href="/" aria-label={`${site.name}, home page`}>
          <BrandMark />
          <b>
            {site.shortName} <small>{site.brandSuffix}</small>
          </b>
        </a>
        <p>{site.tagline}</p>
        <ProfileLinks socials={site.socials} />
      </div>
      {columns.map((column) => (
        <div key={column.title}>
          <b>
            {column.href ? (
              <a
                href={column.href}
                target={column.external ? "_blank" : undefined}
                rel={column.external ? "noopener noreferrer" : undefined}
              >
                {column.title}
              </a>
            ) : (
              column.title
            )}
          </b>
          <FooterLinks links={column.links} />
        </div>
      ))}
      <div>
        <b>Parla con noi</b>
        <a href={site.phoneHref}>{site.phoneDisplay}</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>{site.location}</span>
      </div>
    </footer>
  )
}

function Breadcrumbs({
  current,
  parent,
  trail,
}: {
  current: string
  parent?: [string, string]
  trail?: { name: string; href: string }[]
}) {
  const crumbs = trail ?? (parent ? [{ name: parent[0], href: parent[1] }] : [])
  return (
    <nav className="breadcrumbs" aria-label="Percorso di navigazione">
      <a href="/">Home</a>
      {crumbs.map((crumb) => (
        <Fragment key={`${crumb.href}-${crumb.name}`}>
          <span>/</span>
          <a href={crumb.href}>{crumb.name}</a>
        </Fragment>
      ))}
      <span>/</span>
      <span aria-current="page">{current}</span>
    </nav>
  )
}

function InnerHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  parent,
  trail,
  className,
}: {
  eyebrow: string
  title: string
  intro: string
  image?: string
  imageAlt?: string
  parent?: [string, string]
  trail?: { name: string; href: string }[]
  className?: string
}) {
  return (
    <section
      className={["inner-hero", image ? "inner-hero-image" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {image && (
        <SiteImage
          src={image}
          alt={imageAlt || title}
          width={1800}
          height={1200}
          priority
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {image && <span className="inner-hero-shade" />}
      <div>
        <Breadcrumbs current={title} parent={parent} trail={trail} />
        {eyebrow ? <p className="inner-eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {intro ? <p className="inner-intro">{intro}</p> : null}
      </div>
    </section>
  )
}

function ListingCard({
  href,
  image,
  eyebrow,
  title,
  copy,
}: {
  href: string
  image: string
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <a className="listing-card" href={href}>
      <div>
        <img src={image} alt={title} loading="lazy" />
        <span />
      </div>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{copy}</span>
      <b>
        Scopri <i aria-hidden="true"><ArrowOutIcon /></i>
      </b>
    </a>
  )
}

export function DestinationsPage({
  destinations,
  regions,
  activeRegion,
  page,
  totalPages,
  document,
}: {
  destinations: Destination[]
  regions: { slug: string; name: string }[]
  activeRegion: string
  page: number
  totalPages: number
  document?: {
    eyebrow: string
    title: string
    intro: string
    paragraphs: string[]
    image: string
    imageAlt: string
  }
}) {
  const india = destinations.filter((item) => item.region === "india")
  const beyond = destinations.filter((item) => item.region !== "india")
  const beyondTitle =
    beyond.length > 1
      ? `${beyond
          .slice(0, -1)
          .map((item) => item.name)
          .join(", ")} e ${beyond[beyond.length - 1]?.name}.`
      : beyond[0]?.name
  const beyondEyebrow =
    new Set(beyond.map((item) => item.regionName).filter(Boolean)).size === 1
      ? beyond[0]?.regionName
      : "Oltre l’India"
  const regionName = regions.find((region) => region.slug === activeRegion)?.name
  const fromPage = Boolean(document) && !regionName
  const empty = india.length === 0 && beyond.length === 0
  return (
    <>
      <InnerHero
        eyebrow={fromPage ? document?.eyebrow || "" : regionName ? "Destinazioni" : "In tutta l’India"}
        title={fromPage ? document?.title || "" : regionName || "Destinazioni dall’anima autentica."}
        intro={
          fromPage
            ? document?.intro || ""
            : "Parti dal paesaggio che ti chiama, poi costruisci un viaggio attorno alla sua cultura, al suo ritmo e alle sue stagioni."
        }
        image={fromPage ? document?.image || undefined : images.udaipur}
        imageAlt={fromPage ? document?.imageAlt : undefined}
        parent={regionName ? ["Destinazioni", routes.destinations] : undefined}
      />
      <main className="inner-main">
        {fromPage ? (
          document?.paragraphs.length ? (
            <div className="listing-intro">
              {document.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null
        ) : (
          <div className="listing-intro">
            <p>
              L’India non è un’esperienza unica. Le sue regioni cambiano per
              lingua, clima, architettura, cucina e ritmo. Queste destinazioni
              rappresentano le aree proposte dal sito ufficiale di Maragià
              Express.
            </p>
          </div>
        )}
        {regions.length > 0 && (
          <nav className="listing-filters" aria-label="Filtra per area">
            <a
              href={routes.destinations}
              aria-current={activeRegion ? undefined : "page"}
            >
              Tutte
            </a>
            {regions.map((region) => (
              <a
                href={routes.area(region.slug)}
                aria-current={activeRegion === region.slug ? "page" : undefined}
                key={region.slug}
              >
                {region.name}
              </a>
            ))}
          </nav>
        )}
        {empty && (
          <p className="listing-empty">
            Nessuna destinazione corrisponde a questa selezione.
          </p>
        )}
        {india.length > 0 && (
          <div className="listing-grid destination-listing">
            {india.map((item) => (
              <ListingCard
                key={item.slug}
                href={routes.destination(item.slug)}
                image={item.image}
                eyebrow={item.eyebrow}
                title={item.name}
                copy={item.intro}
              />
            ))}
          </div>
        )}
        {beyond.length > 0 && (
          <section className={india.length > 0 ? "beyond-destinations" : "beyond-destinations is-first"}>
            <div className="beyond-heading">
              <p className="inner-eyebrow">{beyondEyebrow}</p>
              <h2>{beyondTitle}</h2>
              <p>
                Destinazioni oltre l’India attualmente proposte da Maragià
                Express. Verifica itinerari e servizi aggiornati direttamente con
                il team.
              </p>
            </div>
            <div className="beyond-grid">
              {beyond.map((item) => (
                <ListingCard
                  key={item.slug}
                  href={routes.destination(item.slug)}
                  image={item.image}
                  eyebrow={item.region === "oltre-india" ? "Oltre l’India" : item.eyebrow || item.regionName}
                  title={item.name}
                  copy={item.intro}
                />
              ))}
            </div>
          </section>
        )}
        {totalPages > 1 && (
          <nav className="listing-pager" aria-label="Pagine delle destinazioni">
            {page > 1 ? (
              <a href={listingHref(activeRegion, page - 1)}>Precedente</a>
            ) : (
              <span>Precedente</span>
            )}
            <span>
              Pagina {page} di {totalPages}
            </span>
            {page < totalPages ? (
              <a href={listingHref(activeRegion, page + 1)}>Successiva</a>
            ) : (
              <span>Successiva</span>
            )}
          </nav>
        )}
      </main>
    </>
  )
}

function listingHref(area: string, page: number) {
  return destinationListingHref(area, page)
}

export function DestinationPage({
  destination,
  relatedTours,
  relatedExperiences,
}: {
  destination: Destination
  relatedTours: Tour[]
  relatedExperiences: Experience[]
}) {
  const [lead, ...rest] = destination.paragraphs
  return (
    <>
      <InnerHero
        eyebrow={destination.eyebrow}
        title={destination.name}
        intro={destination.intro}
        image={destination.image}
        parent={["Destinazioni", routes.destinations]}
      />
      <main className="detail-main">
        <aside>
          {destination.regionName && (
            <>
              <p>Area</p>
              <span>{destination.regionName}</span>
            </>
          )}
          {destination.highlights.length > 0 && <p>Temi del viaggio</p>}
          {destination.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </aside>
        <article>
          {lead && <p className="detail-lead">{lead}</p>}
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <blockquote>
            “L’itinerario giusto lascia spazio non solo per vedere l’India, ma
            per capire dove ti trovi.”
          </blockquote>
          <h2>Un viaggio costruito su di te</h2>
          <p>
            Ogni itinerario dipende dalla disponibilità, dalla stagione e dalle
            condizioni locali del momento. Racconta al team cosa ti interessa e
            come preferisci viaggiare: insieme definirete un itinerario che
            abbia senso come viaggio completo.
          </p>
        </article>
      </main>
      <RelatedLinks
        eyebrow="Tour collegati"
        title="Itinerari da questa destinazione."
        links={relatedTours.map((tour) => ({
          href: routes.tour(tour.slug),
          label: tour.title,
        }))}
      />
      <RelatedLinks
        eyebrow="Esperienze collegate"
        title="Modi di viaggiare da abbinare."
        links={relatedExperiences.map((experience) => ({
          href: routes.experience(experience.slug),
          label: experience.name,
        }))}
      />
      <RelatedCallout title={`Inizia a organizzare il viaggio: ${destination.name}`} />
    </>
  )
}

function RelatedLinks({
  eyebrow,
  title,
  links,
}: {
  eyebrow: string
  title: string
  links: { href: string; label: string }[]
}) {
  if (links.length === 0) return null
  return (
    <section className="related-tours">
      <div>
        <p className="inner-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div>
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            <span>{link.label}</span>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </section>
  )
}

export function ExperiencesPage({
  experiences,
  page,
  totalPages,
}: {
  experiences: Experience[]
  page: number
  totalPages: number
}) {
  return (
    <>
      <InnerHero
        eyebrow="Modi di viaggiare"
        title="Esperienze che ti somigliano."
        intro="Scoperta culturale, viaggi attivi e comfort curato, riuniti attorno al modo in cui desideri vivere l’India."
        image={images.craft}
      />
      <main className="inner-main">
        {experiences.length === 0 ? (
          <p className="listing-empty">Nessuna esperienza è pubblicata in questo momento.</p>
        ) : (
          <div className="listing-grid experience-listing">
            {experiences.map((item) => (
              <ListingCard
                key={item.slug}
                href={routes.experience(item.slug)}
                image={item.image}
                eyebrow={item.eyebrow}
                title={item.name}
                copy={item.intro}
              />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <nav className="listing-pager" aria-label="Pagine delle esperienze">
            {page > 1 ? (
              <a href={page > 2 ? `${routes.experiences}?page=${page - 1}` : routes.experiences}>
                Precedente
              </a>
            ) : (
              <span>Precedente</span>
            )}
            <span>
              Pagina {page} di {totalPages}
            </span>
            {page < totalPages ? (
              <a href={`${routes.experiences}?page=${page + 1}`}>Successiva</a>
            ) : (
              <span>Successiva</span>
            )}
          </nav>
        )}
      </main>
    </>
  )
}

export function ExperiencePage({
  experience,
  relatedDestinations,
}: {
  experience: Experience
  relatedDestinations: { href: string; label: string }[]
}) {
  const [lead, ...rest] = experience.body
  return (
    <>
      <InnerHero
        eyebrow={experience.eyebrow}
        title={experience.name}
        intro={experience.intro}
        image={experience.image}
        parent={["Esperienze", routes.experiences]}
      />
      <main className="detail-main">
        <aside>
          <p>Ideale per</p>
          {experience.bestFor && <strong>{experience.bestFor}</strong>}
        </aside>
        <article>
          {lead && <p className="detail-lead">{lead}</p>}
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="fact-panel">
            <h2>Prima di inviare la richiesta</h2>
            <p>
              Indica le date di viaggio preferite, il numero di persone, gli
              interessi, il ritmo indicativo e le preferenze di alloggio. Prezzi,
              partenze e servizi inclusi sono confermati solo con una proposta
              specifica.
            </p>
          </div>
        </article>
      </main>
      <RelatedLinks
        eyebrow="Destinazioni collegate"
        title="Dove vive questa esperienza."
        links={relatedDestinations}
      />
      <RelatedCallout title={`Scopri: ${experience.name.toLowerCase()}`} />
    </>
  )
}

export function ToursPage({
  tours,
  categories,
  activeCategory,
  page,
  totalPages,
}: {
  tours: Tour[]
  categories: { slug: string; name: string }[]
  activeCategory: string
  page: number
  totalPages: number
}) {
  const visibleCategories = categories.filter((category) =>
    tours.some((tour) => tour.categorySlug === category.slug),
  )
  const categoryName = categories.find((category) => category.slug === activeCategory)?.name
  return (
    <>
      <InnerHero
        eyebrow="I viaggi di Maragià Express"
        title={categoryName || "Tour dell’India."}
        intro="Esplora la collezione di tour per tema, poi contatta il team per itinerari, date, servizi inclusi e disponibilità aggiornati."
        image={images.rajasthan}
        parent={categoryName ? ["Tour", routes.tours] : undefined}
      />
      <main className="tours-page">
        <div className="tour-directory-intro">
          <p className="inner-eyebrow">La collezione</p>
          <h2>Scegli un viaggio per iniziare la conversazione.</h2>
          <p>
            Questi sono i tour della collezione Maragià Express. Prezzi e
            itinerari pubblicati sono indicati quando la fonte ufficiale fornisce
            un valore valido, ma ogni dettaglio va riconfermato prima della
            prenotazione.
          </p>
        </div>
        {categories.length > 0 && (
          <nav className="tour-filters" aria-label="Filtra per categoria">
            <a href={routes.tours} aria-current={activeCategory ? undefined : "page"}>
              Tutte
            </a>
            {categories.map((category) => (
              <a
                href={routes.tourCategory(category.slug)}
                aria-current={activeCategory === category.slug ? "page" : undefined}
                key={category.slug}
              >
                {category.name}
              </a>
            ))}
          </nav>
        )}
        {visibleCategories.length === 0 && (
          <p className="tour-empty">Nessun tour corrisponde a questa selezione.</p>
        )}
        {categories.map((category, categoryIndex) => {
          const categoryTours = tours.filter((tour) => tour.categorySlug === category.slug)
          if (categoryTours.length === 0) return null
          return (
            <section className="tour-category" id={category.slug} key={category.slug}>
              <header>
                <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
                <div>
                  <p className="inner-eyebrow">
                    {categoryTours.length === 1
                      ? "1 viaggio"
                      : `${categoryTours.length} viaggi`}
                  </p>
                  <h2>{category.name}</h2>
                </div>
              </header>
              <div className="tour-card-grid">
                {categoryTours.map((tour) => (
                  <a className="tour-card" href={routes.tour(tour.slug)} key={tour.slug}>
                    <div className="tour-card-media">
                      <img src={tour.image} alt={tour.title} loading="lazy" />
                      <span className="tour-card-shade" />
                      <small>{tour.category}</small>
                    </div>
                    <div className="tour-card-body">
                      <h3>{tour.title}</h3>
                      <span className="tour-card-meta">
                        {tour.details.duration}
                        <span aria-hidden="true"> · </span>
                        {tour.details.price}
                      </span>
                      <p>{tour.summary}</p>
                      <b>
                        Scopri il tour <span aria-hidden="true">↗</span>
                      </b>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )
        })}
        {totalPages > 1 && (
          <nav className="listing-pager" aria-label="Pagine dei tour">
            {page > 1 ? (
              <a href={tourPageHref(activeCategory, page - 1)}>Precedente</a>
            ) : (
              <span>Precedente</span>
            )}
            <span>
              Pagina {page} di {totalPages}
            </span>
            {page < totalPages ? (
              <a href={tourPageHref(activeCategory, page + 1)}>Successiva</a>
            ) : (
              <span>Successiva</span>
            )}
          </nav>
        )}
      </main>
    </>
  )
}

function tourPageHref(category: string, page: number) {
  return tourListingHref(category, page)
}

function TourGallery({ gallery, title }: { gallery: string[]; title: string }) {
  const [active, setActive] = useState(0)
  return (
    <section className="tour-gallery" aria-label={`Galleria fotografica: ${title}`}>
      <div className="tour-gallery-main">
        <img
          src={gallery[active]}
          alt={`${title}, immagine ${active + 1}`}
        />
        <div className="tour-gallery-controls">
          <button
            type="button"
            aria-label="Immagine precedente"
            onClick={() =>
              setActive((current) =>
                current === 0 ? gallery.length - 1 : current - 1,
              )
            }
          >
            ←
          </button>
          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(gallery.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Immagine successiva"
            onClick={() =>
              setActive((current) =>
                current === gallery.length - 1 ? 0 : current + 1,
              )
            }
          >
            →
          </button>
        </div>
      </div>
      <div className="tour-gallery-thumbs">
        {gallery.map((image, index) => (
          <button
            type="button"
            className={active === index ? "tour-thumb-active" : ""}
            aria-label={`Mostra immagine ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            key={image}
          >
            <img src={image} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  )
}

function TourEnquiryForm({ tour, site }: { tour: Tour; site: SiteProfile }) {
  const [ready, setReady] = useState<{ subject: string; body: string } | null>(
    null,
  )
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fields = [
      ["Tour", tour.title],
      ["Nome", data.get("name")],
      ["Email", data.get("email")],
      ["Telefono", data.get("phone")],
      ["Paese", data.get("country")],
      ["Date preferite", data.get("dates")],
      ["Viaggiatori", data.get("travelers")],
      ["Alloggio", data.get("accommodation")],
      ["Messaggio", data.get("message")],
    ]
    const body = fields
      .map(([label, value]) => `${label}: ${value || ""}`)
      .join("\n")
    setReady({ subject: `Richiesta tour: ${tour.title}`, body })
  }
  if (ready) {
    return (
      <div id="tour-enquiry">
        <EnquiryReady
          subject={ready.subject}
          body={ready.body}
          email={site.email}
          onEdit={() => setReady(null)}
        />
      </div>
    )
  }
  return (
    <form className="inner-form tour-enquiry-form" onSubmit={submit} id="tour-enquiry">
      <div className="tour-form-heading">
        <p className="inner-eyebrow">Informazioni su questo viaggio</p>
        <h2>Richiedi informazioni: {tour.title}</h2>
        <p>
          Indicaci le date e come ami viaggiare. Ti risponderemo con itinerario,
          prezzo e disponibilità aggiornati. Questa richiesta non prenota il tour.
        </p>
      </div>
      <p className="inner-form-note">I campi con * sono obbligatori.</p>
      <fieldset>
        <legend>Questo viaggio</legend>
        <label>
          Tour selezionato
          <input value={tour.title} readOnly aria-readonly="true" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Chi viaggia</legend>
        <div className="inner-field-row">
          <label>
            Nome e cognome *
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Nome e cognome"
            />
          </label>
          <label>
            Indirizzo email *
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              placeholder="nome@esempio.it"
            />
            <span className="field-hint">Ti risponderemo a questo indirizzo.</span>
          </label>
        </div>
        <div className="inner-field-row">
          <label>
            Telefono o WhatsApp
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+00 000 000 000"
            />
          </label>
          <label>
            Paese di residenza
            <input
              name="country"
              autoComplete="country-name"
              placeholder="Il tuo Paese"
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Il viaggio</legend>
        <div className="inner-field-row">
          <label>
            Date preferite *
            <input name="dates" required placeholder="Mese o date" />
            <span className="field-hint">Se le date non sono definite, basta indicare il mese.</span>
          </label>
          <label>
            Viaggiatori *
            <input
              name="travelers"
              required
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="Es. 2"
            />
          </label>
        </div>
        <label>
          Alloggio
          <select name="accommodation" defaultValue="">
            <option value="">Nessuna preferenza</option>
            <option>Confortevole</option>
            <option>Dimora storica</option>
            <option>Lusso</option>
            <option>Aperto a consigli</option>
          </select>
        </label>
      </fieldset>
      <fieldset>
        <legend>Il messaggio</legend>
        <label>
          Cosa dovremmo sapere su questo viaggio? *
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Ritmo, interessi, chi viaggia ed eventuali domande."
          />
          <span className="field-hint">
            Segnala esigenze di accessibilità, alimentari o il tipo di soggiorno che preferisci.
          </span>
        </label>
        <label className="tour-consent">
          <input type="checkbox" required />
          <span>
            Ho capito che devo ancora inviare l’email e che questa richiesta non
            prenota il tour.
          </span>
        </label>
      </fieldset>
      <div className="tour-form-submit">
        <button type="submit">
          Continua con l’email <span aria-hidden="true">↗</span>
        </button>
        <small>
          Preferisci parlarci direttamente?{" "}
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
        </small>
      </div>
    </form>
  )
}

function TourPrice({ price }: { price: string }) {
  const perPerson = price.match(/^(.*)\s+a persona$/i)
  if (!perPerson) return <p className="tour-price">{price}</p>
  return (
    <p className="tour-price">
      {perPerson[1]}
      <span>a persona</span>
    </p>
  )
}

export function TourPage({
  tour,
  relatedTours,
  relatedDestination,
  site,
}: {
  tour: Tour
  relatedTours: Tour[]
  relatedDestination: { slug: string; name: string } | null
  site: SiteProfile
}) {
  const details = {
    ...tour.details,
    route: tour.details.route.length
      ? tour.details.route
      : ["Itinerario aggiornato disponibile su richiesta"],
  }
  const gallery = details.gallery.length ? details.gallery : [tour.image]
  const sampleItinerary = createSampleItinerary(details)
  const chapters = groupItinerary(sampleItinerary)
  return (
    <>
      <InnerHero
        eyebrow={tour.category}
        title={tour.title}
        intro={tour.summary}
        image={tour.image}
        parent={["Tour", routes.tours]}
      />
      <section className="tour-sheet">
        <div className="tour-facts">
          <aside className="tour-price-card">
            <p className="tour-price-kicker">Prezzo indicativo</p>
            <TourPrice price={details.price} />
            <p className="tour-price-note">
              {details.price === "Su richiesta"
                ? "Il prezzo viene indicato nella proposta, in base a date, gruppo e alloggio."
                : "Il prezzo definitivo arriva con la proposta, prima di qualsiasi prenotazione."}
            </p>
            <a href="#tour-enquiry">Richiedi info</a>
          </aside>
          <div className="tour-facts-side">
            <dl>
              <div>
                <dt>Durata</dt>
                <dd>{details.duration}</dd>
              </div>
              <div>
                <dt>Località</dt>
                <dd>
                  {details.route.length}{" "}
                  {details.route.length === 1 ? "tappa" : "tappe"}
                </dd>
              </div>
              <div>
                <dt>Itinerario</dt>
                <dd>
                  {details.route[0]}
                  {details.route.length > 1
                    ? ` – ${details.route[details.route.length - 1]}`
                    : ""}
                </dd>
              </div>
            </dl>
            <p className="tour-facts-note">
              Panoramica indicativa. La tua proposta conferma itinerario, prezzo e
              disponibilità aggiornati prima che tu prenoti i voli.
            </p>
          </div>
        </div>
        <div className="tour-program" id="itinerary">
          <div className="tour-program-heading">
            <div>
              <p className="inner-eyebrow">Giorno per giorno</p>
              <h2>Dove soggiornerai.</h2>
            </div>
            <p>
              Le giornate sono raggruppate per luogo di pernottamento. Si tratta
              di giornate indicative, non di un programma confermato.
            </p>
          </div>
          {chapters.map((chapter, chapterIndex) => {
            const nights = chapter.days.filter(
              (day) => day.overnight === chapter.place,
            ).length
            const stay =
              nights === 0
                ? "Partenza"
                : nights === 1
                  ? "1 notte"
                  : `${nights} notti`
            return (
              <article
                className="tour-chapter"
                key={`${chapter.place}-${chapterIndex}`}
              >
                <header>
                  <h3>{chapter.place}</h3>
                  <span>{stay}</span>
                </header>
                <ol>
                  {chapter.days.map((item) => (
                    <li key={item.day}>
                      <div className="tour-day-number">
                        <span className="tour-day-label">Giorno</span>
                        <b>{String(item.day).padStart(2, "0")}</b>
                      </div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <dl className="tour-day-meta">
                          {item.overnight !== "—" && (
                            <div>
                              <dt>Pernottamento</dt>
                              <dd>{item.overnight}</dd>
                            </div>
                          )}
                          <div>
                            <dt>Pasti</dt>
                            <dd>{item.meals}</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            )
          })}
        </div>
      </section>
      <TourGallery gallery={gallery} title={tour.title} />
      <section className="tour-map">
        <div>
          <p className="inner-eyebrow">Percorso</p>
          <h2>La mappa del viaggio.</h2>
          <p>Le tappe pubblicate per questo itinerario. La proposta conferma il percorso definitivo.</p>
          <ul className="tour-map-destinations">
            {details.route.map((place, index) => (
              <li key={`${place}-${index}`}>{place}</li>
            ))}
          </ul>
        </div>
        {details.map ? (
          <figure>
            <img src={details.map} alt={`Mappa del percorso: ${tour.title}`} />
            <figcaption>Mappa indicativa</figcaption>
          </figure>
        ) : (
          <div className="tour-map-pending">
            <span>M</span>
            <p>La mappa viene confermata nella proposta scritta.</p>
          </div>
        )}
      </section>
      <section className="tour-logistics">
        <div className="tour-inclusions">
          <div>
            <p className="inner-eyebrow">Dettagli pratici</p>
            <h2>Cosa include il viaggio.</h2>
          </div>
          <article>
            <h3>Incluso</h3>
            <ul>
              {(details.includes.length ? details.includes : ["Confermato nella proposta."]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Non incluso</h3>
            <ul>
              {(details.excludes.length ? details.excludes : ["Confermato nella proposta."]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="tour-inclusion-note">
          La proposta firmata e i documenti di prenotazione prevalgono sempre su
          questo riepilogo.
        </p>
      </section>
      <nav className="tour-policy-links pt-4" aria-label="Condizioni del tour">
        <a href="/terms">
          <span>Termini e condizioni</span>
          <b aria-hidden="true">↗</b>
        </a>
        <a href="/payment-policy">
          <span>Condizioni di pagamento</span>
          <b aria-hidden="true">↗</b>
        </a>
        <a href="/cancellation-policy">
          <span>Cancellazione e rimborso</span>
          <b aria-hidden="true">↗</b>
        </a>
      </nav>
      <section className="tour-enquiry-section">
        <TourEnquiryForm tour={tour} site={site} />
      </section>
      {relatedDestination && (
        <section className="related-tours">
          <div>
            <p className="inner-eyebrow">Destinazione collegata</p>
            <h2>Il viaggio parte da qui.</h2>
          </div>
          <div>
            <a href={routes.destination(relatedDestination.slug)}>
              <span>{relatedDestination.name}</span>
              <b aria-hidden="true">↗</b>
            </a>
          </div>
        </section>
      )}
      {relatedTours.length > 0 && (
        <section className="related-tours">
          <div>
            <p className="inner-eyebrow">Nella stessa collezione</p>
            <h2>Continua a esplorare.</h2>
          </div>
          <div>
            {relatedTours.map((item) => (
              <a href={routes.tour(item.slug)} key={item.slug}>
                <span>{item.title}</span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function RelatedCallout({
  title,
  href = "/tailor-made#enquiry",
  label = "Organizza il tuo viaggio",
}: {
  title: string
  href?: string
  label?: string
}) {
  return (
    <section className="related-callout">
      <div>
        <p className="inner-eyebrow">Il tuo viaggio</p>
        <h2>{title}</h2>
      </div>
      <p>
        Condividi qualche idea con il team di Maragià Express e inizia a parlare
        di ciò che è possibile realizzare.
      </p>
      <a href={href}>
        {label} <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function EnquiryForm({
  destinations,
  site,
}: {
  destinations: Destination[]
  site: SiteProfile
}) {
  const india = destinations.filter((item) => item.region === "india")
  const beyond = destinations.filter((item) => item.region !== "india")
  const [ready, setReady] = useState<{ subject: string; body: string } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")
  const [pending, setPending] = useState(false)
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setPending(true)
    setFormError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const payload = (await response.json()) as {
        subject?: string
        body?: string
        error?: string
        errors?: Record<string, string>
      }
      if (!response.ok || !payload.subject || !payload.body) {
        setErrors(payload.errors ?? {})
        setFormError(payload.error || "Controlla i campi evidenziati.")
        return
      }
      setErrors({})
      setReady({ subject: payload.subject, body: payload.body })
    } catch {
      setFormError("Non riusciamo a controllare la richiesta. Riprova tra poco.")
    } finally {
      setPending(false)
    }
  }
  if (ready) {
    return (
      <div id="enquiry">
        <EnquiryReady
          subject={ready.subject}
          body={ready.body}
          email={site.email}
          onEdit={() => setReady(null)}
        />
      </div>
    )
  }
  return (
    <form className="inner-form" onSubmit={submit} id="enquiry" noValidate>
      <p className="inner-form-note">I campi con * sono obbligatori.</p>
      {formError && <p className="form-error" role="alert">{formError}</p>}
      <div className="hp-field" aria-hidden="true">
        <label>
          Sito web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset>
        <legend>Chi viaggia</legend>
        <div className="inner-field-row">
          <label>
            Nome e cognome *
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Nome e cognome"
              aria-invalid={errors.name ? true : undefined}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label>
            Indirizzo email *
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              placeholder="nome@esempio.it"
              aria-invalid={errors.email ? true : undefined}
            />
            <span className="field-hint">Ti risponderemo a questo indirizzo.</span>
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>
        </div>
        <label>
          Paese di residenza
          <input name="country" autoComplete="country-name" placeholder="Il tuo Paese" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Il viaggio</legend>
        <div className="inner-field-row">
          <label>
            Destinazione preferita
            <select name="destination" defaultValue="">
              <option value="">Nessuna preferenza</option>
              <optgroup label="India">
                {india.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Oltre l’India">
                {beyond.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
          <label>
            Numero di viaggiatori
            <input
              name="travelers"
              type="number"
              min="1"
              max="99"
              inputMode="numeric"
              placeholder="Es. 2"
              aria-invalid={errors.travelers ? true : undefined}
            />
            {errors.travelers && <span className="field-error">{errors.travelers}</span>}
          </label>
        </div>
        <div className="inner-field-row">
          <label>
            Date indicative
            <input name="dates" placeholder="Mese o date" />
            <span className="field-hint">Se le date non sono definite, basta indicare il mese.</span>
          </label>
          <label>
            Interessi
            <input
              name="interests"
              placeholder="Cultura, natura, bicicletta..."
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Il messaggio</legend>
        <label>
          Cosa dovremmo sapere? *
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Ritmo, chi viaggia ed eventuali domande."
            aria-invalid={errors.message ? true : undefined}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </label>
      </fieldset>
      <button type="submit" disabled={pending}>
        {pending ? "Controllo in corso" : "Continua con l’email"} <span aria-hidden="true">↗</span>
      </button>
      <small>
        Nel passaggio successivo potrai rivedere il messaggio: è l’invio
        dell’email a raggiungere il team. Nessun dato viene salvato o prenotato
        su questa pagina.
      </small>
    </form>
  )
}

export function TailorMadePage({
  title,
  intro,
  image,
  imageAlt,
  processHeading,
  processCopy,
  steps,
  benefits,
  enquiryCopy,
  destinations,
  site,
}: {
  title: string
  intro: string
  image?: string
  imageAlt?: string
  processHeading: string
  processCopy: string
  steps: { number: string; title: string; copy: string }[]
  benefits: { heading: string; paragraphs: string[] }[]
  enquiryCopy: string
  destinations: Destination[]
  site: SiteProfile
}) {
  return (
    <>
      <InnerHero
        eyebrow="Pensato per te"
        title={title}
        intro={intro}
        image={image || images.desert}
        imageAlt={imageAlt}
      />
      <main className="tailor-page">
        <section className="process-intro">
          <p className="inner-eyebrow">Come pianifichiamo</p>
          {processHeading && <h2>{processHeading}</h2>}
          {processCopy && <p>{processCopy}</p>}
        </section>
        <div className="inner-steps">
          {steps.map((step) => (
            <article key={step.title}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
        {benefits.length > 0 && (
          <section className="process-intro">
            <p className="inner-eyebrow">Perché su misura</p>
            <div className="inner-steps">
              {benefits.map((benefit) => (
                <article key={benefit.heading}>
                  <h3>{benefit.heading}</h3>
                  <p>{benefit.paragraphs[0]}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        <section className="enquiry-section">
          <div>
            <p className="inner-eyebrow">Inizia una conversazione</p>
            <h2>Raccontaci cosa ti ispira.</h2>
            <p>
              {enquiryCopy ||
                "Indica date e interessi. Nel passaggio successivo aprirai un’email e premerai Invia: è quel messaggio che riceverà il team."}
            </p>
          </div>
          <EnquiryForm destinations={destinations} site={site} />
        </section>
      </main>
    </>
  )
}

export function AboutPage({ page }: { page: CmsPage }) {
  const values = page.sections.length >= 4 ? page.sections.slice(-3) : []
  const narrative =
    page.sections.length >= 4 ? page.sections.slice(0, -3) : page.sections
  const story = narrative[0]
  const [lead, ...rest] = story?.paragraphs ?? []
  const figure = page.contentImage || images.craft
  const figureAlt =
    page.contentImageAlt || "Musicista del Rajasthan in abito tradizionale"
  const figureCaption = page.contentImageAlt
    || "Viaggiare nel rispetto dei luoghi, delle persone e delle tradizioni vive."
  return (
    <>
      <InnerHero
        eyebrow="Maragià Express"
        title={page.title}
        intro={page.description}
        image={page.image || images.udaipur}
        imageAlt={page.imageAlt || page.title}
      />
      <main className="about-page">
        <section>
          <p className="inner-eyebrow">Il nostro approccio</p>
          {story?.heading && <h2>{story.heading}</h2>}
          {lead && <p className="detail-lead">{lead}</p>}
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <figure>
          <img src={figure} alt={figureAlt} />
          <figcaption>{figureCaption}</figcaption>
        </figure>
      </main>
      {values.length > 0 && (
        <section className="values-band">
          {values.map((value, index) => (
            <article key={value.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{value.heading}</h3>
              <p>{value.paragraphs[0]}</p>
            </article>
          ))}
        </section>
      )}
      {page.cta && (
        <RelatedCallout title={page.cta.label} href={page.cta.href} label={page.cta.label} />
      )}
    </>
  )
}

export function JournalPage({
  articles,
  categories,
  activeCategory,
  page,
  totalPages,
}: {
  articles: Article[]
  categories: { slug: string; name: string }[]
  activeCategory: string
  page: number
  totalPages: number
}) {
  const categoryName = categories.find((category) => category.slug === activeCategory)?.name
  return (
    <>
      <InnerHero
        eyebrow="Diario di viaggio"
        title={categoryName || "Appunti per il viaggiatore curioso."}
        intro="Consigli pratici di pianificazione e contesto culturale per un viaggio in India più consapevole."
        image={images.palace}
        parent={categoryName ? ["Diario di viaggio", routes.journal] : undefined}
      />
      <main className="inner-main">
        {categories.length > 0 && (
          <nav className="journal-filters" aria-label="Filtra per categoria">
            <a href={routes.journal} aria-current={activeCategory ? undefined : "page"}>
              Tutti
            </a>
            {categories.map((category) => (
              <a
                href={routes.category(category.slug)}
                aria-current={activeCategory === category.slug ? "page" : undefined}
                key={category.slug}
              >
                {category.name}
              </a>
            ))}
          </nav>
        )}
        {articles.length === 0 ? (
          <p className="listing-empty">Nessun articolo corrisponde a questa selezione.</p>
        ) : (
          <div className="journal-listing">
            {articles.map((article) => (
              <ListingCard
                key={article.slug}
                href={routes.article(article.slug)}
                image={article.image}
                eyebrow={article.category}
                title={article.title}
                copy={article.excerpt}
              />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <nav className="listing-pager" aria-label="Pagine del diario">
            {page > 1 ? (
              <a href={journalPageHref(activeCategory, page - 1)}>Precedente</a>
            ) : (
              <span>Precedente</span>
            )}
            <span>
              Pagina {page} di {totalPages}
            </span>
            {page < totalPages ? (
              <a href={journalPageHref(activeCategory, page + 1)}>Successiva</a>
            ) : (
              <span>Successiva</span>
            )}
          </nav>
        )}
      </main>
    </>
  )
}

function journalPageHref(category: string, page: number) {
  return journalListingHref(category, page)
}

export function ArticlePage({
  article,
  related,
}: {
  article: Article
  related: Article[]
}) {
  const published = formatJournalDate(article.publishedAt)
  return (
    <>
      <InnerHero
        className="inner-hero-article"
        eyebrow={article.category}
        title={article.title}
        intro={article.excerpt}
        image={article.image}
        parent={["Diario di viaggio", routes.journal]}
      />
      <main className="article-page">
        <header>
          <span>
            {article.author
              ? `A cura di ${article.author}`
              : "A cura della redazione di Maragià Express"}
          </span>
          {published && <time dateTime={article.publishedAt.slice(0, 10)}>{published}</time>}
        </header>
        <div
          className="cms-content"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </main>
      <RelatedLinks
        eyebrow="Dal diario"
        title="Continua a leggere."
        links={related.map((item) => ({
          href: routes.article(item.slug),
          label: item.title,
        }))}
      />
      <RelatedCallout title="Trasforma l’ispirazione in un itinerario ben pensato" />
    </>
  )
}

export function FaqPage({
  title,
  groups,
  intro,
  activeGroup,
  site,
}: {
  title: string
  groups: FaqGroup[]
  intro: string
  activeGroup: string
  site: SiteProfile
}) {
  const [active, setActive] = useState(0)
  const visible = activeGroup
    ? groups.filter((group) => group.slug === activeGroup)
    : groups
  const groupTitle = groups.find((group) => group.slug === activeGroup)?.title
  const items = visible.flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.title })),
  )

  return (
    <>
      <InnerHero
        eyebrow="Domande frequenti"
        title={groupTitle || title}
        intro={intro}
        parent={groupTitle ? [title, routes.faq] : undefined}
      />
      <main className="faq-page">
        {groups.length > 0 && (
          <nav className="faq-filters" aria-label="Filtra per gruppo">
            <a href="/faq" aria-current={activeGroup ? undefined : "page"}>
              Tutte
            </a>
            {groups.map((group) => (
              <a
                href={routes.faqGroup(group.slug)}
                aria-current={activeGroup === group.slug ? "page" : undefined}
                key={group.slug}
              >
                {group.title}
              </a>
            ))}
          </nav>
        )}
        {visible.length === 0 && (
          <p className="faq-page-note">Nessuna domanda corrisponde a questa selezione.</p>
        )}
        {visible.map((group) => (
          <section key={group.slug}>
            <h2>{group.title}</h2>
            <div className="faq-list">
              {group.items.map((item) => {
                const index = items.findIndex((entry) => entry.slug === item.slug)
                const open = active === index
                return (
                  <article
                    className={open ? "faq-open" : ""}
                    key={item.slug || item.question}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setActive(open ? -1 : index)}
                    >
                      <span>{item.question}</span>
                      <b aria-hidden="true">{open ? "−" : "+"}</b>
                    </button>
                    <div className="faq-answer">
                      <p>
                        {item.answer}
                        {item.href ? (
                          <>
                            {" "}
                            <a href={item.href}>{item.linkLabel || "Approfondisci"}</a>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
        <p className="faq-page-note">
          Non trovi la risposta? Scrivi a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {" "}o chiama il{" "}
          <a href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
      </main>
    </>
  )
}

export function ContactPage({
  title,
  intro,
  heading,
  note,
  image,
  imageAlt,
  destinations,
  site,
}: {
  title: string
  intro: string
  heading: string
  note: string
  image?: string
  imageAlt?: string
  destinations: Destination[]
  site: SiteProfile
}) {
  return (
    <>
      <InnerHero
        eyebrow="Contatta Maragià Express"
        title={title}
        intro={intro}
        image={image || images.rajasthan}
        imageAlt={imageAlt}
      />
      <main className="contact-page">
        <section>
          <p className="inner-eyebrow">Contatto diretto</p>
          <h2>{heading}</h2>
          <p>
            {note ||
              "Scegli il modo più comodo. Il modulo prepara un’email: il team la riceve solo quando la invii."}
          </p>
          <ul className="contact-list">
            <li>
              <span>Telefono</span>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span>Sede</span>
              <p>{site.location}</p>
            </li>
          </ul>
          <ProfileLinks socials={site.socials} />
        </section>
        <EnquiryForm destinations={destinations} site={site} />
      </main>
    </>
  )
}

export function PolicyPage({ page, site }: { page: CmsPage; site: SiteProfile }) {
  return (
    <>
      <InnerHero
        eyebrow="Informazioni importanti"
        title={page.title}
        intro={page.description}
      />
      <main className="policy-page">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.html ? (
              <div className="cms-content" dangerouslySetInnerHTML={{ __html: section.html }} />
            ) : (
              section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            )}
          </section>
        ))}
        {page.sections.length === 0 && page.html && (
          <div className="cms-content" dangerouslySetInnerHTML={{ __html: page.html }} />
        )}
        {page.sections.length === 0 && !page.html && (
          <p>Il testo di questa pagina non è ancora stato pubblicato.</p>
        )}
        {!page.html.includes("mailto:") && (
          <p>
            Per chiarimenti, scrivi a{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </main>
    </>
  )
}

export function CmsDocumentPage({ page }: { page: CmsPage }) {
  const trail = page.ancestors.map((item) => ({ name: item.title, href: item.path }))
  return (
    <>
      <InnerHero
        eyebrow="Maragià Express"
        title={page.title}
        intro={page.description}
        image={page.image || undefined}
        imageAlt={page.imageAlt || page.title}
        trail={trail}
      />
      <main className="policy-page">
        {page.sections.map((section) => (
          <section key={section.heading || section.paragraphs[0]}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.html ? (
              <div className="cms-content" dangerouslySetInnerHTML={{ __html: section.html }} />
            ) : (
              section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            )}
          </section>
        ))}
        {page.sections.length === 0 && page.html && (
          <div className="cms-content" dangerouslySetInnerHTML={{ __html: page.html }} />
        )}
        {page.sections.length === 0 && !page.html && (
          <p>Il testo di questa pagina non è ancora stato pubblicato.</p>
        )}
        {page.cta && (
          <p>
            <a href={page.cta.href}>{page.cta.label}</a>
          </p>
        )}
      </main>
    </>
  )
}

export function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="inner-eyebrow">404 · Viaggio interrotto</p>
      <h1>Questa strada non porta da nessuna parte, per ora.</h1>
      <p>
        Torna alla home page o continua a esplorare le destinazioni proposte da
        Maragià Express.
      </p>
      <a href="/">Torna alla home</a>
    </main>
  )
}
