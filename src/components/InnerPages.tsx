"use client"

import { useState } from "react"
import BrandMark from "./BrandMark"
import { EnquiryReady } from "./EnquiryReady"
import ProfileLinks from "./ProfileLinks"
import SiteImage from "./SiteImage"
import { ArrowOutIcon } from "./icons"
import { siteConfig } from "@/lib/site-config"
import { siteImages as images } from "@/data/site-images"
import {
  Destination,
  destinations,
  beyondIndiaDestinations,
  getDestination,
} from "@/data/destinations"
import { Experience, experiences, getExperience } from "@/data/experiences"
import { Tour, tours, getTour } from "@/data/tours"
import { articles, getArticle } from "@/data/articles"
import { faqGroups } from "@/data/faqs"

type TourDetails = {
  price: string
  duration: string
  route: string[]
  map?: string
  gallery?: string[]
  includes?: string[]
  excludes?: string[]
}

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

const defaultIncludes = [
  "Pernottamento nelle strutture confermate nel programma definitivo o similari",
  "Trasporto privato e assistenza locale come confermato nella proposta",
  "Guide, visite e ingressi espressamente indicati nel programma definitivo",
]

const defaultExcludes = [
  "Voli internazionali e tasse aeroportuali, salvo ove espressamente inclusi",
  "Assicurazione di viaggio, medica e di annullamento",
  "Costi del visto, mance, bevande, spese personali e attività facoltative",
  "Tutto ciò che non è espressamente indicato tra i servizi inclusi confermati",
]

const tourDetails: Record<string, TourDetails> = {
  "tour-of-india": {
    price: "Da 1.925 € a persona",
    duration: "12 notti · 13 giorni",
    route: [
      "Delhi",
      "Udaipur",
      "Deogarh",
      "Jodhpur",
      "Jaipur",
      "Agra",
      "Orchha",
      "Khajuraho",
      "Prayagraj",
      "Varanasi",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/08/map-itinerario-classico-Indiano-con-varanasi.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2023/08/sds.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/rajasthan_155_IMG_5545-1024x576-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/rajasthan_031_L1000889.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/08/IMG_2259-min.jpeg",
    ],
  },
  "maharajas-tour": {
    price: "3.640 € a persona",
    duration: "7 notti · 8 giorni",
    route: ["Delhi", "Agra", "Jaipur", "Jodhpur", "Udaipur", "Delhi"],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/08/Map-1-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/deep-joshi-lNQYnJMytZs-unsplash.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/rajasthan_155_IMG_5545-1024x576-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/INTRODUZIONE-ALLINDIA-1024x678.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/DSC_3706-Copy-1024x678.jpg",
    ],
    includes: [
      "Pernottamento nelle strutture indicate nel programma pubblicato o similari",
      "Prima colazione, guida parlante italiano, auto privata con autista",
      "Visite ai monumenti indicati, Taj Mahal, giro in barca sul lago Pichola e volo interno Udaipur–Delhi",
      "Assistenza in loco",
    ],
  },
  "natural-kerala": {
    price: "2.450 € a persona",
    duration: "9 notti · 10 giorni",
    route: ["Cochin", "Munnar", "Periyar", "Alleppey", "Mararikulam"],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/09/Map_0.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-cochin.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-in-Kerala.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-munnar-1024x544.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/Kerala-hotel-1024x561.jpg",
    ],
    includes: [
      "Pernottamento nelle strutture indicate nel programma pubblicato o similari",
      "Colazione e cena, guida parlante italiano, auto privata con autista",
      "Visite indicate, piantagioni di tè, crociera sul lago Periyar e pensione completa in houseboat",
      "Assistenza in loco",
    ],
  },
  "three-cats-of-india": {
    price: "Su richiesta",
    duration: "Confermata con la proposta",
    route: ["Jawai e le aree naturalistiche confermate per il tuo viaggio"],
  },
  "indian-festival-of-colors": {
    price: "Da 1.850 € a persona",
    duration: "10 notti · 11 giorni",
    route: [
      "Delhi",
      "Mandawa",
      "Bikaner",
      "Jaisalmer",
      "Dechu",
      "Jodhpur",
      "Jaipur",
      "Agra",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/09/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/DSC_4037-Copy.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/09/festa-del-holi-India-2.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/holi-india-children-594333-1024x768.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/fort-di-amer-Jaipur.jpg",
    ],
  },
  "camel-fair": {
    price: "Da 1.499 € a persona",
    duration: "11 notti · 12 giorni",
    route: [
      "Delhi",
      "Mandawa",
      "Bikaner",
      "Jaisalmer",
      "Jodhpur",
      "Udaipur",
      "Pushkar",
      "Jaipur",
      "Agra",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/07/Travel-map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Fiera-dei-cammelli-di-Pushkar-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Pushkar-camel-fair-2-1024x634.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Pushkar-camel-fair-1-1024x683.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/DSC_8286.jpg",
    ],
  },
  "hemis-feast-festival": {
    price: "Da 1.850 € a persona",
    duration: "9 notti · 10 giorni",
    route: ["Delhi", "Leh", "Ladakh", "Monastero di Hemis"],
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/10/09Ladakh131022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Festa-di-Hemis-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Ladakh04131022-min-1024x683.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Ladakh-leh-1024x683.jpg",
    ],
  },
  "overland-himalaya-tour": {
    price: "3.360 € a persona",
    duration: "14 notti · 15 giorni",
    route: [
      "Jammu",
      "Srinagar",
      "Kargil",
      "Ulley",
      "Leh",
      "Nubra",
      "Pangong",
      "Stok",
      "Delhi",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/10/Mappa-di-viaggio-di-Ladakh.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/10/09Ladakh131022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Festa-di-Hemis-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/08/festa-di-Hemis-min.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Ladakh04131022-min-1024x683.jpg",
    ],
  },
  "rajasthan-on-bicycle": {
    price: "2.150 € a persona",
    duration: "8 notti · 9 giorni",
    route: [
      "Delhi",
      "Udaipur",
      "Kumbhalgarh",
      "Ranakpur",
      "Jawai",
      "Jojawar",
      "Rohetgarh",
      "Jodhpur",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/08/Map.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/Cycling-Trip-053.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/Cycling-Trip-luni-1024x603-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/kumbhalgarh-fort-tour-1024x578-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/IMG_1101-1024x682.jpg",
    ],
    includes: [
      "Pernottamento, colazione e cena come indicato nel programma pubblicato",
      "Guide selezionate, trasporti in città, visite ai monumenti e assistenza locale",
      "Voli interni indicati, giro in barca sul lago Pichola e safari in jeep a Jawai",
      "Mountain bike a 21 velocità, casco, accompagnatore in bici e veicolo di supporto",
    ],
  },
  "hemis-feast-adventure": {
    price: "Da 1.850 € a persona",
    duration: "9 notti · 10 giorni",
    route: ["Delhi", "Leh", "Ladakh", "Monastero di Hemis"],
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/10/09Ladakh131022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/Festa-di-Hemis-2022.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/07/Ladakh-leh-1024x683.jpg",
    ],
  },
  "classic-south-india": {
    price: "Su richiesta",
    duration: "10 notti · 11 giorni",
    route: [
      "Chennai",
      "Pondicherry",
      "Tanjore",
      "Madurai",
      "Thekkady",
      "Kumarakom",
      "Alleppey",
      "Mararikulam",
    ],
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/09/viaggio-munnar.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Tanjore211022-1024x683.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/10/Kumarakom211022-1024x683.jpg",
    ],
  },
  "introduction-to-india": {
    price: "Su richiesta",
    duration: "12 notti · 13 giorni",
    route: [
      "Delhi",
      "Udaipur",
      "Jawai",
      "Jodhpur",
      "Dechu",
      "Jaisalmer",
      "Pushkar",
      "Jaipur",
      "Agra",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/09/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/viaggio-Taj-mahal.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2019/11/Jawai-people.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2019/11/leopardo-indiano-Jawai.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/06/DSC_3706-Copy-1024x678.jpg",
    ],
  },
  "karnataka-and-goa": {
    price: "Da 2.240 € a persona",
    duration: "10 notti · 11 giorni",
    route: [
      "Mysore",
      "Hassan",
      "Hampi",
      "Badami",
      "Vijayapura",
      "Kolhapur",
      "Goa",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/12/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/12/badami.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/12/Pattadakal.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/12/E618F2D7-5746-4A2A-8324-92902746F88B-1024x575.jpeg",
      "https://maragiaexpress.com/wp-content/uploads/2022/12/Goa-beach-1024x575.jpeg",
    ],
  },
  "bengal-and-sikkim": {
    price: "Su richiesta",
    duration: "8 notti · 9 giorni",
    route: ["Kolkata", "Kalimpong", "Darjeeling", "Pelling", "Gangtok"],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/10/mappa-di-north-east-India.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2023/10/new-bridge-Kolkata.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/10/tea-garden-Darjeeling.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/10/darjeeling-1024x695.jpg",
    ],
  },
  "temples-and-tribes-of-orissa": {
    price: "Su richiesta",
    duration: "12 notti · 13 giorni",
    route: [
      "Delhi",
      "Bhubaneswar",
      "Puri",
      "Chilika",
      "Gopalpur",
      "Taptapani",
      "Rayagada",
      "Jeypore",
      "Onukudelli",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2023/09/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2023/09/tempio-di-konark-min.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/09/viaggio-orissa-min.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2023/09/lago-di-chilka-min-1024x547.jpg",
    ],
  },
  "gujarat-trip": {
    price: "1.764 € a persona",
    duration: "9 notti · 10 giorni",
    route: [
      "Ahmedabad",
      "Dasada",
      "Bhuj",
      "Rajkot",
      "Sasan Gir",
      "Diu",
      "Palitana",
      "Vadodara",
    ],
    map: "https://maragiaexpress.com/wp-content/uploads/2022/08/Map-1.jpg",
    gallery: [
      "https://maragiaexpress.com/wp-content/uploads/2022/08/IMG_1726-1.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/IMG_5531.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/Viaggio-in-Dasada-1024x566.jpg",
      "https://maragiaexpress.com/wp-content/uploads/2022/08/viaggio-di-Gir-1024x667.jpg",
    ],
  },
  "rural-rajasthan": {
    price: "Da 2.080 € a persona",
    duration: "13 notti · 14 giorni",
    route: ["Itinerario nel Rajasthan rurale disponibile con la proposta aggiornata"],
  },
}

export function PageHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="inner-header">
      <a className="inner-brand" href="/" aria-label="Maragià Express, home page">
        <BrandMark priority />
        <b>
          MARAGIÀ <small>EXPRESS · INDIA</small>
        </b>
      </a>
      <nav
        className={open ? "inner-nav inner-nav-open" : "inner-nav"}
        aria-label="Navigazione principale"
      >
        <a
          className="mobile-nav-brand inner-brand"
          href="/"
          aria-label="Maragià Express, home page"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <b>
            MARAGIÀ <small>EXPRESS · INDIA</small>
          </b>
        </a>
        <a href="/destinations">Destinazioni</a>
        <a href="/tours">Tour</a>
        <a href="/experiences">Esperienze</a>
        <a href="/tailor-made">Su misura</a>
        <a href="/about">Chi siamo</a>
        <a href="/travel-journal">Diario</a>
        <a href="/contact">Contatti</a>
        <a className="inner-nav-cta" href="/tailor-made#enquiry">
          Organizza il tuo viaggio
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

export function PageFooter() {
  return (
    <footer className="inner-footer">
      <div>
        <a className="inner-brand" href="/">
          <BrandMark />
          <b>
            MARAGIÀ <small>EXPRESS · INDIA</small>
          </b>
        </a>
        <p>Scopri l’India, a modo tuo.</p>
        <ProfileLinks />
      </div>
      <div>
        <b>Esplora</b>
        <a href="/destinations">Destinazioni</a>
        <a href="/tours">Tour</a>
        <a href="/experiences">Esperienze</a>
        <a href="/tailor-made">Viaggi su misura</a>
        <a href="/travel-journal">Diario di viaggio</a>
      </div>
      <div>
        <b>Azienda</b>
        <a href="/about">Chi è Maragià Express</a>
        <a href="/contact">Contatti</a>
        <a href="/faq">Domande frequenti</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Termini e condizioni</a>
        <a href="/payment-policy">Condizioni di pagamento</a>
        <a href="/cancellation-policy">Cancellazione e rimborso</a>
      </div>
      <div>
        <b>Parla con noi</b>
        <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <span>{siteConfig.location}</span>
      </div>
    </footer>
  )
}

function Breadcrumbs({
  current,
  parent,
}: {
  current: string
  parent?: [string, string]
}) {
  return (
    <nav className="breadcrumbs" aria-label="Percorso di navigazione">
      <a href="/">Home</a>
      <span>/</span>
      {parent && (
        <>
          <a href={parent[1]}>{parent[0]}</a>
          <span>/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  )
}

function InnerHero({
  eyebrow,
  title,
  intro,
  image,
  parent,
  className,
}: {
  eyebrow: string
  title: string
  intro: string
  image?: string
  parent?: [string, string]
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
          alt={title}
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
        <Breadcrumbs current={title} parent={parent} />
        <p className="inner-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="inner-intro">{intro}</p>
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

export function DestinationsPage() {
  return (
    <>
      <InnerHero
        eyebrow="In tutta l’India"
        title="Destinazioni dall’anima autentica."
        intro="Parti dal paesaggio che ti chiama, poi costruisci un viaggio attorno alla sua cultura, al suo ritmo e alle sue stagioni."
        image={images.udaipur}
      />
      <main className="inner-main">
        <div className="listing-intro">
          <p>
            L’India non è un’esperienza unica. Le sue regioni cambiano per
            lingua, clima, architettura, cucina e ritmo. Queste destinazioni
            rappresentano le aree proposte dal sito ufficiale di Maragià
            Express.
          </p>
        </div>
        <div className="listing-grid destination-listing">
          {destinations.map((item) => (
            <ListingCard
              key={item.slug}
              href={`/destinations/${item.slug}`}
              image={item.image}
              eyebrow={item.eyebrow}
              title={item.name}
              copy={item.intro}
            />
          ))}
        </div>
        <BeyondIndia />
      </main>
    </>
  )
}

function BeyondIndia() {
  return (
    <section className="beyond-destinations">
      <div className="beyond-heading">
        <p className="inner-eyebrow">Oltre l’India</p>
        <h2>Bhutan, Nepal e Sri Lanka.</h2>
        <p>
          Tre destinazioni oltre l’India attualmente proposte da Maragià
          Express. Verifica itinerari e servizi aggiornati direttamente con il
          team.
        </p>
      </div>
      <div className="beyond-grid">
        {beyondIndiaDestinations.map((item) => (
          <ListingCard
            key={item.slug}
            href={`/destinations/${item.slug}`}
            image={item.image}
            eyebrow="Oltre l’India"
            title={item.name}
            copy={item.intro}
          />
        ))}
      </div>
    </section>
  )
}

export function DestinationPage({ destination }: { destination: Destination }) {
  return (
    <>
      <InnerHero
        eyebrow={destination.eyebrow}
        title={destination.name}
        intro={destination.intro}
        image={destination.image}
        parent={["Destinazioni", "/destinations"]}
      />
      <main className="detail-main">
        <aside>
          <p>Temi del viaggio</p>
          {destination.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </aside>
        <article>
          <p className="detail-lead">{destination.paragraphs[0]}</p>
          <p>{destination.paragraphs[1]}</p>
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
      <RelatedCallout title={`Inizia a organizzare il viaggio: ${destination.name}`} />
    </>
  )
}

export function ExperiencesPage() {
  return (
    <>
      <InnerHero
        eyebrow="Modi di viaggiare"
        title="Esperienze che ti somigliano."
        intro="Scoperta culturale, viaggi attivi e comfort curato, riuniti attorno al modo in cui desideri vivere l’India."
        image={images.craft}
      />
      <main className="inner-main">
        <div className="listing-grid experience-listing">
          {experiences.map((item) => (
            <ListingCard
              key={item.slug}
              href={`/experiences/${item.slug}`}
              image={item.image}
              eyebrow={item.eyebrow}
              title={item.name}
              copy={item.intro}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export function ExperiencePage({ experience }: { experience: Experience }) {
  return (
    <>
      <InnerHero
        eyebrow={experience.eyebrow}
        title={experience.name}
        intro={experience.intro}
        image={experience.image}
        parent={["Esperienze", "/experiences"]}
      />
      <main className="detail-main">
        <aside>
          <p>Ideale per</p>
          <strong>{experience.bestFor}</strong>
        </aside>
        <article>
          <p className="detail-lead">{experience.body[0]}</p>
          <p>{experience.body[1]}</p>
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
      <RelatedCallout title={`Scopri: ${experience.name.toLowerCase()}`} />
    </>
  )
}

export function ToursPage() {
  const categories = Array.from(
    new Map(tours.map((tour) => [tour.categorySlug, tour.category])).entries(),
  )
  return (
    <>
      <InnerHero
        eyebrow="I viaggi di Maragià Express"
        title="Tour dell’India."
        intro="Esplora la collezione di tour per tema, poi contatta il team per itinerari, date, servizi inclusi e disponibilità aggiornati."
        image={images.rajasthan}
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
        {categories.map(([slug, category], categoryIndex) => {
          const categoryTours = tours.filter((tour) => tour.categorySlug === slug)
          return (
          <section className="tour-category" id={slug} key={slug}>
            <header>
              <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
              <div>
                <p className="inner-eyebrow">
                  {categoryTours.length === 1
                    ? "1 viaggio"
                    : `${categoryTours.length} viaggi`}
                </p>
                <h2>{category}</h2>
              </div>
            </header>
            <div className="tour-card-grid">
              {categoryTours.map((tour) => (
                  <a
                    className="tour-card"
                    href={`/tours/${tour.slug}`}
                    key={tour.slug}
                  >
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
        })}
      </main>
    </>
  )
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

function TourEnquiryForm({ tour }: { tour: Tour }) {
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
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
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

export function TourPage({ tour }: { tour: Tour }) {
  const details = tourDetails[tour.slug] ?? {
    price: "Su richiesta",
    duration: "Confermata con la proposta",
    route: ["Itinerario aggiornato disponibile su richiesta"],
  }
  const gallery = details.gallery ?? [
    tour.image,
    images.rajasthan,
    images.craft,
  ]
  const includes = details.includes ?? defaultIncludes
  const excludes = details.excludes ?? defaultExcludes
  const sampleItinerary = createSampleItinerary(details)
  const chapters = groupItinerary(sampleItinerary)
  const relatedTours = tours
    .filter(
      (item) =>
        item.categorySlug === tour.categorySlug && item.slug !== tour.slug,
    )
    .slice(0, 3)
  return (
    <>
      <InnerHero
        eyebrow={tour.category}
        title={tour.title}
        intro={tour.summary}
        image={tour.image}
        parent={["Tour", "/tours"]}
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
      <section className="tour-logistics">
        <div className="tour-inclusions">
          <div>
            <p className="inner-eyebrow">Dettagli pratici</p>
            <h2>Cosa include il viaggio.</h2>
          </div>
          <article>
            <h3>Incluso</h3>
            <ul>
              {includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Non incluso</h3>
            <ul>
              {excludes.map((item) => (
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
        <TourEnquiryForm tour={tour} />
      </section>
      {relatedTours.length > 0 && (
        <section className="related-tours">
          <div>
            <p className="inner-eyebrow">Nella stessa collezione</p>
            <h2>Continua a esplorare.</h2>
          </div>
          <div>
            {relatedTours.map((item) => (
              <a href={`/tours/${item.slug}`} key={item.slug}>
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

function RelatedCallout({ title }: { title: string }) {
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
      <a href="/tailor-made#enquiry">
        Organizza il tuo viaggio <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function EnquiryForm() {
  const [ready, setReady] = useState<{ subject: string; body: string } | null>(
    null,
  )
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const lines = [
      ["Nome", data.get("name")],
      ["Email", data.get("email")],
      ["Paese", data.get("country")],
      ["Destinazione", data.get("destination")],
      ["Date", data.get("dates")],
      ["Viaggiatori", data.get("travelers")],
      ["Interessi", data.get("interests")],
      ["Messaggio", data.get("message")],
    ]
      .map(([label, value]) => `${label}: ${value || ""}`)
      .join("\n")
    const name = String(data.get("name") || "un viaggiatore")
    setReady({ subject: `Richiesta di viaggio da ${name}`, body: lines })
  }
  if (ready) {
    return (
      <div id="enquiry">
        <EnquiryReady
          subject={ready.subject}
          body={ready.body}
          onEdit={() => setReady(null)}
        />
      </div>
    )
  }
  return (
    <form className="inner-form" onSubmit={submit} id="enquiry">
      <p className="inner-form-note">I campi con * sono obbligatori.</p>
      <fieldset>
        <legend>Chi viaggia</legend>
        <div className="inner-field-row">
          <label>
            Nome e cognome *
            <input name="name" required autoComplete="name" placeholder="Nome e cognome" />
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
                {destinations.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Oltre l’India">
                {beyondIndiaDestinations.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
          <label>
            Numero di viaggiatori
            <input name="travelers" type="number" min="1" inputMode="numeric" placeholder="Es. 2" />
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
          />
        </label>
      </fieldset>
      <button type="submit">
        Continua con l’email <span aria-hidden="true">↗</span>
      </button>
      <small>
        Nel passaggio successivo potrai rivedere il messaggio: è l’invio
        dell’email a raggiungere il team. Nessun dato viene salvato o prenotato
        su questa pagina.
      </small>
    </form>
  )
}

export function TailorMadePage() {
  return (
    <>
      <InnerHero
        eyebrow="Pensato per te"
        title="I tuoi interessi. Il tuo ritmo. La tua India."
        intro="Un itinerario ben pensato parte da ciò che conta per te, non da un pacchetto preconfezionato."
        image={images.desert}
      />
      <main className="tailor-page">
        <section className="process-intro">
          <p className="inner-eyebrow">Come pianifichiamo</p>
          <h2>Dalle prime idee a un viaggio coerente.</h2>
          <p>
            Usa il modulo per condividere un punto di partenza. Il team potrà
            poi valutare le opzioni disponibili e definire un itinerario in base
            a date, interessi e preferenze. Compilare il modulo non costituisce
            una prenotazione.
          </p>
        </section>
        <div className="inner-steps">
          <article>
            <span>01</span>
            <h3>Condividi le tue idee</h3>
            <p>
              Racconta al team date di viaggio, interessi, ritmo, composizione
              del gruppo e preferenze di alloggio.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Definisci il viaggio</h3>
            <p>
              Valuta l’itinerario proposto e perfeziona i dettagli pratici prima
              di qualsiasi conferma.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Viaggia con chiarezza</h3>
            <p>
              Ricevi servizi, inclusioni e assistenza confermati specificamente
              per il tuo itinerario.
            </p>
          </article>
        </div>
        <section className="enquiry-section">
          <div>
            <p className="inner-eyebrow">Inizia una conversazione</p>
            <h2>Raccontaci cosa ti ispira.</h2>
            <p>
              Indica date e interessi. Nel passaggio successivo aprirai un’email
              e premerai Invia: è quel messaggio che riceverà il team.
            </p>
          </div>
          <EnquiryForm />
        </section>
      </main>
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow="Maragià Express"
        title="L’India, vista dall’interno."
        intro="Agenzia di viaggi e tour operator con sede in India, che crea viaggi personalizzati da Udaipur, in Rajasthan."
        image={images.udaipur}
      />
      <main className="about-page">
        <section>
          <p className="inner-eyebrow">Il nostro approccio</p>
          <h2>Più di un percorso tra un luogo e l’altro.</h2>
          <p className="detail-lead">
            Maragià Express propone viaggi alla scoperta della cultura,
            dell’architettura, dei paesaggi, dei festival e delle esperienze
            attive dell’India.
          </p>
          <p>
            Tra le proposte dell’agenzia: viaggi organizzati e personalizzati,
            tour culturali, viaggi in occasione dei festival, cicloturismo,
            avventure himalayane, esperienze naturalistiche e una selezione di
            destinazioni oltre l’India.
          </p>
          <p>
            Ogni viaggio nasce dall’ascolto e da una conoscenza diretta del
            territorio, con il rispetto per i luoghi e per le persone che li
            abitano.
          </p>
        </section>
        <figure>
          <img
            src={images.craft}
            alt="Musicista del Rajasthan in abito tradizionale"
          />
          <figcaption>
            Viaggiare nel rispetto dei luoghi, delle persone e delle tradizioni vive.
          </figcaption>
        </figure>
      </main>
      <section className="values-band">
        <article>
          <span>01</span>
          <h3>Prima di tutto, ascoltare</h3>
          <p>Partire dal viaggiatore, non da un pacchetto fisso.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Rispettare il contesto</h3>
          <p>Raccontare la cultura come esperienza vissuta, non come decorazione.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Pianificare con onestà</h3>
          <p>Confermare ciò che è disponibile, senza promesse infondate.</p>
        </article>
      </section>
    </>
  )
}

export function JournalPage() {
  return (
    <>
      <InnerHero
        eyebrow="Diario di viaggio"
        title="Appunti per il viaggiatore curioso."
        intro="Consigli pratici di pianificazione e contesto culturale per un viaggio in India più consapevole."
        image={images.palace}
      />
      <main className="inner-main">
        <div className="journal-listing">
          {articles.map((article) => (
            <ListingCard
              key={article.slug}
              href={`/travel-journal/${article.slug}`}
              image={article.image}
              eyebrow={article.category}
              title={article.title}
              copy={article.excerpt}
            />
          ))}
        </div>
        {/* <div className="legacy-journal">
          <p>
            The existing Italian-language Maragià Express journal remains
            available during the content migration.
          </p>
          <a href="https://maragiaexpress.com/blog/">
            Visit the original journal ↗
          </a>
        </div> */}
      </main>
    </>
  )
}

export function ArticlePage({ article }: { article: typeof articles[number] }) {
  return (
    <>
      <InnerHero
        className="inner-hero-article"
        eyebrow={article.category}
        title={article.title}
        intro={article.excerpt}
        image={article.image}
        parent={["Diario di viaggio", "/travel-journal"]}
      />
      <main className="article-page">
        <header>
          <span>A cura della redazione di Maragià Express</span>
          <span>Consigli di viaggio</span>
        </header>
        <p className="detail-lead">
          L’India premia la preparazione, ma non un itinerario affollato di
          spostamenti continui. Parti dall’esperienza che desideri, piuttosto
          che da un elenco di tutti i luoghi di cui hai sentito parlare.
        </p>
        <h2>Parti dalla geografia e dalla stagione</h2>
        <p>
          L’India è immensa e le condizioni cambiano molto da una regione
          all’altra. Un itinerario sensato considera tempi di viaggio, clima,
          altitudine e durata di ogni spostamento, non solo la distanza sulla
          mappa.
        </p>
        <h2>Scegli la profondità, non la quantità</h2>
        <p>
          Fermarsi più a lungo in meno luoghi lascia spazio a scoperte
          impreviste e a una migliore comprensione del contesto locale. Riduce
          inoltre la stanchezza e rende il viaggio nel suo insieme più
          coerente.
        </p>
        <blockquote>
          Una buona pianificazione crea spazio: per il contesto, per il dialogo
          e per l’imprevisto.
        </blockquote>
        <h2>Parla dei dettagli pratici</h2>
        <p>
          Condividi i tuoi interessi, il livello di comfort desiderato,
          eventuali esigenze di mobilità, il numero di persone e un budget
          indicativo. Prima della partenza verifica sempre requisiti d’ingresso,
          indicazioni sanitarie e avvisi di viaggio presso le fonti ufficiali.
        </p>
      </main>
      <RelatedCallout title="Trasforma l’ispirazione in un itinerario ben pensato" />
    </>
  )
}

export function FaqPage() {
  const [active, setActive] = useState(0)
  const items = faqGroups.flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.title })),
  )

  return (
    <>
      <InnerHero
        eyebrow="Domande frequenti"
        title="Prima di scrivere, leggi qui."
        intro="Risposte brevi su itinerari, prezzi, pagamenti e su come inviare una richiesta. Per il tuo viaggio, il team conferma tutto per iscritto."
      />
      <main className="faq-page">
        {faqGroups.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            <div className="faq-list">
              {group.items.map((item) => {
                const index = items.findIndex(
                  (entry) => entry.question === item.question,
                )
                const open = active === index
                return (
                  <article
                    className={open ? "faq-open" : ""}
                    key={item.question}
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
                        {"href" in item && item.href ? (
                          <>
                            {" "}
                            <a href={item.href}>{item.linkLabel}</a>
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
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          {" "}o chiama il{" "}
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>.
        </p>
      </main>
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="Contatta Maragià Express"
        title="Parliamo di India."
        intro="Contatta direttamente il team a Udaipur o condividi il punto di partenza per il tuo prossimo viaggio."
        image={images.rajasthan}
      />
      <main className="contact-page">
        <section>
          <p className="inner-eyebrow">Contatto diretto</p>
          <h2>Ci trovi a Udaipur, in Rajasthan.</h2>
          <p>
            Scegli il modo più comodo. Il modulo prepara un’email: il team la
            riceve solo quando la invii.
          </p>
          <ul className="contact-list">
            <li>
              <span>Telefono</span>
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <span>Sede</span>
              <p>{siteConfig.location}</p>
            </li>
          </ul>
          <small>Ti rispondiamo dopo aver letto la richiesta.</small>
        </section>
        <EnquiryForm />
      </main>
    </>
  )
}

export function PolicyPage({
  type,
}: {
  type: "privacy" | "terms" | "payment" | "cancellation" | "information"
}) {
  const content = {
    privacy: {
      title: "Informativa sulla privacy",
      intro:
        "Come questo sito gestisce le informazioni inviate tramite i moduli di richiesta.",
      sections: [
        [
          "Funzionamento dei moduli",
          "I moduli di richiesta di questo sito non trasmettono né salvano dati su un server. Preparano un’email nell’applicazione di posta del visitatore.",
        ],
        [
          "Trattamento dei dati",
          "I dati che ci invii via email vengono utilizzati esclusivamente per rispondere alla tua richiesta e organizzare il viaggio. Puoi chiederne in qualsiasi momento la modifica o la cancellazione scrivendo al nostro indirizzo email.",
        ],
        [
          "Servizi esterni",
          "Alcune fotografie e i caratteri tipografici vengono caricati da fornitori esterni, che possono ricevere dati tecnici di navigazione come l’indirizzo IP.",
        ],
      ],
    },
    terms: {
      title: "Termini e condizioni",
      intro:
        "Principi di prenotazione da leggere insieme alla proposta scritta che riceverai.",
      sections: [
        [
          "Preventivi, prezzi e tassi di cambio",
          "I prezzi possono dipendere dalla disponibilità dei fornitori, dalle variazioni dei tassi di cambio, dagli aumenti dei fornitori e da modifiche fiscali. Ogni variazione deve essere comunicata prima della prenotazione; fa fede il prezzo indicato nella proposta scritta più recente.",
        ],
        [
          "Conferma dei servizi",
          "Un itinerario o un prezzo pubblicato sul sito non costituisce di per sé una prenotazione. Date, alloggi, trasporti, servizi inclusi e condizioni dei fornitori sono confermati solo nella proposta scritta e nei documenti di prenotazione emessi per il tuo viaggio.",
        ],
        [
          "Assicurazione e documenti di viaggio",
          "I viaggiatori devono verificare i requisiti relativi a passaporto, visto, assicurazione e salute applicabili alla propria situazione. Si raccomanda un’adeguata copertura medica, comprensiva di trasferimento d’emergenza o rimpatrio.",
        ],
      ],
    },
    payment: {
      title: "Condizioni di pagamento",
      intro:
        "Un riepilogo chiaro delle condizioni di pagamento applicate ai tour di Maragià Express.",
      sections: [
        [
          "Acconto e saldo",
          "È richiesto un acconto pari al 50% del totale 45 giorni prima della partenza; il saldo è dovuto 30 giorni prima della partenza. Chiedi al team di confermarti le scadenze applicabili alla tua prenotazione.",
        ],
        [
          "Modalità di pagamento e documenti",
          "I pagamenti si effettuano tramite bonifico bancario sul conto aziendale. Viene fornita una fattura con i dati per il pagamento, seguita da una ricevuta; voucher di viaggio e conferme di prenotazione vengono emessi dopo il ricevimento dell’intero importo.",
        ],
        [
          "Ritardo o mancato pagamento",
          "Il mancato pagamento dell’acconto o del saldo entro la scadenza può comportare la cancellazione automatica. Eventuali importi trattenuti o trasferiti su un’altra prenotazione sono regolati dalle condizioni scritte applicabili alla prenotazione.",
        ],
        [
          "Prenotazioni nel periodo festivo",
          "Per le prenotazioni nel periodo di Natale e Capodanno si applicano condizioni speciali non rimborsabili. Richiedi per iscritto le date esatte e le condizioni aggiornate prima di effettuare il pagamento.",
        ],
      ],
    },
    cancellation: {
      title: "Cancellazione e rimborso",
      intro:
        "Un riepilogo delle penali di cancellazione applicate da Maragià Express.",
      sections: [
        [
          "Come cancellare",
          "La cancellazione deve essere comunicata per iscritto via email. Il preavviso decorre dalla conferma della richiesta da parte del servizio clienti; le richieste inviate fuori dai giorni o dagli orari lavorativi vengono gestite il primo giorno lavorativo successivo.",
        ],
        [
          "Penali di cancellazione",
          "Si applicano le seguenti penali: 15% del costo del tour o del servizio per cancellazioni confermate 45 giorni prima della partenza; 50% per cancellazioni confermate 30 giorni prima della partenza; 100% da 15 giorni prima della partenza fino al giorno di partenza.",
        ],
        [
          "Condizioni dei fornitori e periodi festivi",
          "Possono applicarsi regole di cancellazione specifiche dei fornitori. Le prenotazioni dal 20 dicembre al 5 gennaio e i viaggi durante il Diwali non sono rimborsabili. Verifica le condizioni aggiornate nei documenti di prenotazione firmati.",
        ],
      ],
    },
    information: {
      title: "Informazioni utili",
      intro:
        "I dettagli pratici vanno verificati in base al tuo itinerario, alle date e alla tua situazione personale.",
      sections: [
        [
          "Requisiti d’ingresso e sanitari",
          "Consulta le fonti governative e ufficiali aggiornate per passaporti, visti, vaccinazioni, assicurazione e indicazioni sanitarie. I requisiti possono cambiare.",
        ],
        [
          "Stagione e condizioni",
          "Meteo, altitudine, date dei festival, accesso alle riserve e condizioni delle strade possono influire sull’itinerario. Verifica i dettagli aggiornati in fase di pianificazione.",
        ],
        [
          "Accessibilità ed esigenze personali",
          "Comunica per tempo eventuali esigenze di mobilità, alimentari, di salute o di altro tipo, così il team potrà valutare le soluzioni possibili.",
        ],
      ],
    },
  }[type]
  return (
    <>
      <InnerHero
        eyebrow="Informazioni importanti"
        title={content.title}
        intro={content.intro}
      />
      <main className="policy-page">
        {/* <p className="policy-notice">
          Draft website information · Requires business and legal review before
          production launch
        </p> */}
        {content.sections.map(([title, copy]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
          </section>
        ))}
        {type === "cancellation" && (
          <a href="/cancellation-policy">
            Consulta le condizioni pubblicate ↗
          </a>
        )}
        {type === "terms" && (
          <a href="/terms">
            Consulta i termini pubblicati ↗
          </a>
        )}
        <p>
          Per chiarimenti, scrivi a{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
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

export { getDestination } from "@/data/destinations"
export { getTour } from "@/data/tours"
export { getExperience } from "@/data/experiences"
export { getArticle } from "@/data/articles"

export function DestinationBySlug({ slug }: { slug: string }) {
  const destination = getDestination(slug)
  return destination ? (
    <DestinationPage destination={destination} />
  ) : (
    <NotFoundPage />
  )
}

export function TourBySlug({ slug }: { slug: string }) {
  const tour = getTour(slug)
  return tour ? <TourPage tour={tour} /> : <NotFoundPage />
}

export function ExperienceBySlug({ slug }: { slug: string }) {
  const experience = getExperience(slug)
  return experience ? (
    <ExperiencePage experience={experience} />
  ) : (
    <NotFoundPage />
  )
}

export function ArticleBySlug({ slug }: { slug: string }) {
  const article = getArticle(slug)
  return article ? <ArticlePage article={article} /> : <NotFoundPage />
}
