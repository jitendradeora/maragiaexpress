"use client"

import { FormEvent, useState } from "react"
import BackToTop from "./BackToTop"
import BrandMark from "./BrandMark"
import { enquiryMailto } from "./EnquiryReady"
import ProfileLinks from "./ProfileLinks"
import SiteImage from "./SiteImage"
import { homepageFaqs as faqs } from "@/data/faqs"
import { siteImages as images } from "@/data/site-images"
import { tours } from "@/data/tours"
import { siteConfig } from "@/lib/site-config"

const destinations = [
  {
    name: "Rajasthan",
    kicker: "Palazzi · deserto · patrimonio vivo",
    copy: "Dai laghi di Udaipur ai vicoli blu di Jodhpur, fino ai paesaggi del deserto.",
    image: images.jodhpur,
    className: "destination-large",
  },
  {
    name: "Ladakh",
    kicker: "Alto Himalaya",
    copy: "Strade di montagna, monasteri buddhisti e i vasti paesaggi del nord dell’India.",
    image: images.ladakh,
    className: "destination-tall",
  },
  {
    name: "India selvaggia",
    kicker: "Foreste · safari",
    copy: "Viaggi costruiti attorno alle straordinarie riserve naturali dell’India.",
    image: images.wildlife,
    className: "",
  },
]

const experiences = [
  {
    number: "01",
    title: "Viaggi su misura",
    copy: "Un viaggio costruito su date, interessi, ritmo preferito e stile di soggiorno.",
  },
  {
    number: "02",
    title: "Cultura e patrimonio",
    copy: "Città storiche, luoghi sacri, architettura, artigianato e tradizioni della vita quotidiana.",
  },
  {
    number: "03",
    title: "Avventura e bicicletta",
    copy: "In bicicletta nel Rajasthan, itinerari himalayani e modi attivi di esplorare il paesaggio.",
  },
  {
    number: "04",
    title: "Festival e celebrazioni",
    copy: "Viaggi ispirati a Holi, alla Fiera di Pushkar e agli altri festival proposti da Maragià Express.",
  },
]

function Brand({ priority = false }: { priority?: boolean }) {
  return (
    <a className="brand" href="/" aria-label="Maragià Express, home page">
      <BrandMark priority={priority} />
      <span>
        <b>MARAGIÀ</b>
        <small>EXPRESS · INDIA</small>
      </span>
    </a>
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
    <a className={`arrow-link ${light ? "arrow-link-light" : ""}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
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

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ["Destinazioni", "/destinations"],
    ["Tour", "/tours"],
    ["Esperienze", "/experiences"],
    ["Su misura", "/tailor-made"],
    ["Chi siamo", "/about"],
    ["Diario", "/travel-journal"],
    ["Contatti", "/contact"],
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand priority />
        <nav
          className={`nav ${open ? "nav-open" : ""}`}
          id="mobile-navigation"
          aria-label="Navigazione principale"
        >
          <a
            className="mobile-nav-brand brand"
            href="/"
            aria-label="Maragià Express, home page"
            onClick={() => setOpen(false)}
          >
            <BrandMark />
            <span>
              <b>MARAGIÀ</b>
              <small>EXPRESS · INDIA</small>
            </span>
          </a>
          {links.map(([label, href]) => (
            <a href={href} key={label} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-cta"
            href="/tailor-made#enquiry"
            onClick={() => setOpen(false)}
          >
            Organizza il tuo viaggio
          </a>
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

function Hero() {
  return (
    <section className="hero" id="top">
      <SiteImage
        src={images.hero}
        alt="Architettura di un palazzo storico riflessa nell’acqua a Udaipur, Rajasthan"
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
        <p className="eyebrow eyebrow-light">
          Scopri l’India · Viaggia oltre l’ordinario
        </p>
        <h1>
          L’India, vissuta
          <em>a modo tuo.</em>
        </h1>
        <p className="hero-copy">
          Paesaggi straordinari, tradizioni vive e tesori nascosti, riuniti in
          un viaggio pensato con cura attorno a te.
        </p>
        <div className="hero-actions">
          <a className="button button-ivory" href="/destinations">
            Esplora le destinazioni
          </a>
          <ArrowLink href="/tailor-made" light>
            Progetta il tuo viaggio
          </ArrowLink>
        </div>
      </div>
      <div className="hero-foot">
        <span>Udaipur · Rajasthan · India</span>
        <a href="#about">
          Scorri per scoprire <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

function Introduction() {
  return (
    <section className="intro section" id="about">
      <div className="intro-title">
        <p className="eyebrow">Il nostro modo di viaggiare</p>
        <h2>
          Più di un viaggio.
          <em>Un legame più profondo con l’India.</em>
        </h2>
      </div>
      <div className="intro-image">
        <img
          src={images.udaipur}
          alt="Facciata decorata di un palazzo sul lago a Udaipur"
          loading="lazy"
        />
        <span>Sguardo locale, pianificazione accurata</span>
      </div>
      <div className="intro-copy">
        <p className="lead">
          Maragià Express è uno specialista di viaggi con sede a Udaipur, in
          India, che crea viaggi personalizzati attraverso i tanti paesaggi e
          le tante culture del Paese.
        </p>
        <p>
          Il nostro approccio inizia dall’ascolto: capire come ami viaggiare,
          cosa ti attrae dell’India e quale ritmo desideri per il tuo viaggio.
          Dalle città storiche alle strade himalayane, ogni itinerario è
          pensato nel suo insieme.
        </p>
        <ArrowLink href="/about">Scopri Maragià Express</ArrowLink>
      </div>
    </section>
  )
}

function Destinations() {
  return (
    <section className="destinations section" id="destinations">
      <div className="heading-row">
        <SectionHeading
          eyebrow="Da dove iniziare"
          title="Trova l’India che parla di te."
          copy="Un Paese di tanti mondi. Inizia da un paesaggio, una storia o un’emozione."
        />
        <ArrowLink href="/destinations">Esplora tutte le destinazioni</ArrowLink>
      </div>
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <a
            className={`destination-card ${destination.className}`}
            href={
              [
                "/destinations/rajasthan",
                "/destinations/ladakh",
                "/destinations/wildlife-india",
              ][index]
            }
            key={destination.name}
          >
            <img
              src={destination.image}
              alt={`${destination.name} — ${destination.kicker}`}
              loading="lazy"
            />
            <span className="image-shade" />
            <span className="destination-content">
              <small>{destination.kicker}</small>
              <strong>{destination.name}</strong>
              <span>{destination.copy}</span>
              <b aria-hidden="true">↗</b>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

const featuredTourSlugs = [
  "tour-of-india",
  "maharajas-tour",
  "rajasthan-on-bicycle",
  "indian-festival-of-colors",
  "introduction-to-india",
  "three-cats-of-india",
]

function HomeTours() {
  const featured = featuredTourSlugs
    .map((slug) => tours.find((tour) => tour.slug === slug))
    .filter((tour): tour is (typeof tours)[number] => Boolean(tour))

  return (
    <section className="section home-tours" id="tours">
      <div className="heading-row">
        <SectionHeading
          eyebrow="La collezione"
          title="Tour da cui partire."
          copy="Sei itinerari della collezione Maragià Express. Date, ritmo e servizi si definiscono insieme, prima di prenotare."
        />
        <ArrowLink href="/tours">Vedi tutti i tour</ArrowLink>
      </div>
      <div className="tour-card-grid">
        {featured.map((tour) => (
          <a className="tour-card" href={`/tours/${tour.slug}`} key={tour.slug}>
            <div className="tour-card-media">
              <img src={tour.image} alt={tour.title} loading="lazy" />
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
          </a>
        ))}
      </div>
    </section>
  )
}

function Experiences() {
  return (
    <section className="experiences section" id="experiences">
      <div className="experience-image">
        <img
          src={images.craft}
          alt="Musicista del Rajasthan in abito tradizionale"
          loading="lazy"
        />
        <div className="image-note">
          <small>I dettagli che contano</small>
          <span>Persone, luoghi, artigianato e cultura</span>
        </div>
      </div>
      <div className="experience-content">
        <SectionHeading
          eyebrow="Modi di viaggiare"
          title="Viaggi che ti somigliano."
          copy="Non un elenco di luoghi da spuntare, ma un itinerario che lascia spazio per capire dove ti trovi."
        />
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <a
              href={
                [
                  "/experiences/tailor-made-journeys",
                  "/experiences/culture-heritage",
                  "/experiences/adventure-cycling",
                  "/experiences/festivals",
                ][index]
              }
              className="experience-row"
              key={experience.title}
            >
              <span>{experience.number}</span>
              <div>
                <h3>{experience.title}</h3>
                <p>{experience.copy}</p>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function RajasthanFeature() {
  return (
    <section className="rajasthan">
      <img
        src={images.desert}
        alt="Cammelliere che attraversa il deserto del Thar, in Rajasthan"
        loading="lazy"
      />
      <div className="rajasthan-overlay" />
      <div className="rajasthan-content">
        <p className="eyebrow eyebrow-light">Un paesaggio simbolo</p>
        <h2>
          Rajasthan,
          <em>oltre la cartolina.</em>
        </h2>
        <p>
          Scopri le storie, l’architettura, le tradizioni e gli incontri che
          rendono il Rajasthan una delle esperienze di viaggio più uniche
          dell’India.
        </p>
        <a className="button button-ivory" href="/destinations/rajasthan">
          Esplora il Rajasthan
        </a>
      </div>
      <div className="rajasthan-label">26.9124° N · 75.7873° E</div>
    </section>
  )
}

function TailorMade() {
  const steps = [
    [
      "01",
      "Condividi le tue idee",
      "Raccontaci date, interessi, stile di viaggio e preferenze.",
    ],
    [
      "02",
      "Definisci il tuo viaggio",
      "Valuta l’itinerario proposto e perfezionalo con il team di viaggio.",
    ],
    [
      "03",
      "Vivi l’India",
      "Viaggia con i servizi e l’assistenza confermati per il tuo itinerario.",
    ],
  ]
  return (
    <section className="tailor section" id="tailor-made">
      <SectionHeading
        eyebrow="Pensato per te"
        title="I tuoi interessi. Il tuo ritmo. La tua India."
        copy="Ogni viaggio memorabile inizia da una conversazione, non da un pacchetto preconfezionato."
      />
      <div className="steps">
        {steps.map(([number, title, copy]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <a className="button button-green" href="/tailor-made#enquiry">
        Organizza un viaggio su misura
      </a>
    </section>
  )
}

function WhyUs() {
  const points = [
    ["Con sede in India", "Conoscenza diretta del territorio, da Udaipur, Rajasthan."],
    [
      "Su misura per te",
      "Itinerari discussi e costruiti sulle preferenze di ciascuno.",
    ],
    [
      "Tanti modi di esplorare",
      "Viaggi culturali, festival, viaggi attivi e naturalistici.",
    ],
    [
      "Un unico viaggio coerente",
      "Tutti i servizi riuniti attorno a un itinerario ben costruito.",
    ],
  ]
  return (
    <section className="why section">
      <div className="why-title">
        <p className="eyebrow">Perché Maragià Express</p>
        <h2>Conoscenza locale. Un viaggio che è soltanto tuo.</h2>
      </div>
      <div className="why-grid">
        {points.map(([title, copy], index) => (
          <article key={title}>
            <span className="why-icon" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Journal() {
  return (
    <section className="journal section" id="journal">
      <div className="heading-row">
        <SectionHeading
          eyebrow="Appunti per curiosi"
          title="Storie di viaggio."
        />
        <ArrowLink href="/travel-journal">Esplora il diario di viaggio</ArrowLink>
      </div>
      <div className="journal-grid">
        <a
          className="journal-feature"
          href="/travel-journal/rajasthan-heritage-cities"
        >
          <img
            src={images.city}
            alt="Balconi e finestre finemente lavorati sulla facciata di un palazzo del Rajasthan"
            loading="lazy"
          />
          <p className="eyebrow">Architettura e patrimonio</p>
          <h3>Leggere il Rajasthan attraverso le sue città storiche</h3>
          <p>
            Guarda oltre la facciata e scopri come l’architettura custodisce
            secoli di memoria.
          </p>
        </a>
        <a href="/travel-journal/planning-first-visit-india">
          <span className="journal-number">APPUNTI · 01</span>
          <h3>Pianificare il primo viaggio in India</h3>
          <p>
            Un punto di partenza ragionato su ritmo, stagione, regioni e
            aspettative.
          </p>
        </a>
        <a href="/travel-journal/travel-at-a-slower-pace">
          <span className="journal-number">APPUNTI · 02</span>
          <h3>Perché un viaggio più lento spesso rivela di più</h3>
          <p>
            Laghi, haveli e riti quotidiani nella città che ospita Maragià Express.
          </p>
        </a>
      </div>
    </section>
  )
}

function Faq() {
  const [active, setActive] = useState(0)
  return (
    <section className="faq section">
      <div className="faq-heading">
        <SectionHeading eyebrow="Buono a sapersi" title="Organizzare il tuo viaggio." />
        <p>
          <a href="/faq">Leggi tutte le domande frequenti</a>
          {" "}oppure{" "}
          <a href={`mailto:${siteConfig.email}`}>scrivi al nostro team.</a>
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

function Newsletter() {
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

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-copy">
        <p className="eyebrow eyebrow-light">Lettere dall’India</p>
        <h2 id="newsletter-title">
          Notizie di viaggio,
          <em>con calma.</em>
        </h2>
        <p>
          Festival, itinerari e appunti dal Rajasthan. Qualche messaggio
          all’anno, niente rumore.
        </p>
      </div>
      {email ? (
        <div className="newsletter-ready" role="status">
          <p>
            L’iscrizione di <strong>{email}</strong> non è ancora partita. Apri
            la posta e invia il messaggio a {siteConfig.email}.
          </p>
          <div className="newsletter-actions">
            <a className="button button-gold" href={enquiryMailto(subject, body)}>
              Apri l’app di posta
            </a>
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

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Maragià Express — scopri l’India a modo tuo.</p>
          <span>{siteConfig.location}</span>
          <ProfileLinks />
        </div>
        <div>
          <h3>Esplora</h3>
          <a href="/destinations">Destinazioni</a>
          <a href="/tours">Tour</a>
          <a href="/experiences">Esperienze</a>
          <a href="/tailor-made">Viaggi su misura</a>
          <a href="/travel-journal">Diario di viaggio</a>
        </div>
        <div>
          <h3>Informazioni</h3>
          <a href="/tours">Tour dell’India</a>
          <a href="/experiences/festivals">Tour dei festival</a>
          <a href="/terms">Termini e condizioni</a>
          <a href="/payment-policy">Condizioni di pagamento</a>
          <a href="/cancellation-policy">Cancellazione e rimborso</a>
          <a href="/faq">Domande frequenti</a>
          <a href="/travel-information">Informazioni utili</a>
        </div>
        <div>
          <h3>Parla con noi</h3>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Maragià Express</span>
        <span>Agenzia di viaggi e tour operator · Udaipur, India</span>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Introduction />
        <Destinations />
        <HomeTours />
        <Experiences />
        <RajasthanFeature />
        <TailorMade />
        <WhyUs />
        <Journal />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
