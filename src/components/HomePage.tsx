"use client"

import { FormEvent, useState } from "react"
import BackToTop from "./BackToTop"
import BrandMark from "./BrandMark"
import { EnquiryReady } from "./EnquiryReady"
import ProfileLinks from "./ProfileLinks"
import SiteImage from "./SiteImage"
import { homepageFaqs as faqs } from "@/data/faqs"
import { siteImages as images } from "@/data/site-images"
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
          Ti serve qualcosa di più specifico?{" "}
          <a href={`mailto:${siteConfig.email}`}>Scrivi al nostro team.</a>
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

function Planner() {
  const [ready, setReady] = useState<{ subject: string; body: string } | null>(
    null,
  )
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") || "")
    const email = String(data.get("email") || "")
    const country = String(data.get("country") || "")
    const destination = String(data.get("destination") || "")
    const dates = String(data.get("dates") || "")
    const travelers = String(data.get("travelers") || "")
    const interests = String(data.get("interests") || "")
    const message = String(data.get("message") || "")
    setReady({
      subject: `Richiesta di viaggio da ${name}`,
      body: `Nome: ${name}\nEmail: ${email}\nPaese: ${country}\nDestinazione: ${destination}\nDate indicative: ${dates}\nViaggiatori: ${travelers}\nInteressi: ${interests}\n\nIdee di viaggio:\n${message}`,
    })
  }

  return (
    <section className="planner" id="planner">
      <div className="planner-copy">
        <p className="eyebrow eyebrow-light">Inizia una conversazione</p>
        <h2>
          La tua storia in India
          <em>inizia qui.</em>
        </h2>
        <p>
          Dicci dove vuoi andare, quando puoi partire e che tipo di viaggio
          desideri. Questo modulo non costituisce una prenotazione. Ti
          risponderemo via email dopo aver letto le tue risposte.
        </p>
        <div className="planner-contact">
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
      {ready ? (
        <EnquiryReady
          subject={ready.subject}
          body={ready.body}
          onEdit={() => setReady(null)}
        />
      ) : (
      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <label>
            Nome e cognome *
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Il tuo nome"
            />
          </label>
          <label>
            Indirizzo email *
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nome@esempio.it"
            />
          </label>
        </div>
        <div className="field-row">
          <label>
            Paese di residenza
            <input
              name="country"
              type="text"
              autoComplete="country-name"
              placeholder="Il tuo Paese"
            />
          </label>
          <label>
            Destinazione preferita
            <select name="destination" defaultValue="">
              <option value="" disabled>
                Seleziona un’area
              </option>
              <option>Rajasthan</option>
              <option>India del Nord</option>
              <option>Ladakh e Himalaya</option>
              <option>Riserve naturali</option>
              <option>Bhutan, Nepal o Sri Lanka</option>
              <option>Sono aperto a proposte</option>
            </select>
          </label>
        </div>
        <div className="field-row">
          <label>
            Date indicative
            <input name="dates" type="text" placeholder="Mese o date" />
            <span className="field-hint">Se le date non sono definite, basta indicare il mese.</span>
          </label>
          <label>
            Numero di viaggiatori
            <input
              name="travelers"
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="2"
            />
          </label>
        </div>
        <label>
          Interessi di viaggio
          <input
            name="interests"
            type="text"
            placeholder="Cultura, architettura, bicicletta, natura..."
          />
        </label>
        <label>
          Messaggio *
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Chi viaggia, il ritmo che preferisci ed eventuali domande."
          />
          <span className="field-hint">
            Indica ritmo, interessi e tutto ciò che il team dovrebbe sapere prima di proporti un itinerario.
          </span>
        </label>
        <div className="form-foot">
          <button className="button button-gold" type="submit">
            Continua con l’email
          </button>
          <p>
            Potrai rivedere il messaggio prima di inviarlo. Nessun dato viene
            salvato su questo sito.
          </p>
        </div>
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
        <Experiences />
        <RajasthanFeature />
        <TailorMade />
        <WhyUs />
        <Journal />
        <Faq />
        <Planner />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
