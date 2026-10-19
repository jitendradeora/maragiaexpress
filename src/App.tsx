import { FormEvent, useMemo, useState } from "react"
import InnerPages from "./InnerPages"
import { organizationSchema, websiteSchema } from "./lib/schema"
import { siteConfig } from "./lib/site-config"

const images = {
  hero: "https://images.unsplash.com/photo-1575994532957-773da2f83eb1?auto=format&fit=crop&w=2200&q=84",
  udaipur:
    "https://images.unsplash.com/photo-1591264247469-d072a1018915?auto=format&fit=crop&w=1400&q=82",
  jodhpur:
    "https://images.unsplash.com/photo-1545321945-7edd9bf1331a?auto=format&fit=crop&w=1400&q=82",
  desert:
    "https://images.unsplash.com/photo-1668689723080-c50f6e823de5?auto=format&fit=crop&w=1400&q=82",
  ladakh:
    "https://images.unsplash.com/photo-1632648366997-a091f7075445?auto=format&fit=crop&w=1400&q=82",
  wildlife:
    "https://images.unsplash.com/photo-1598510343363-244a5ea24814?auto=format&fit=crop&w=1400&q=82",
  craft:
    "https://images.unsplash.com/photo-1702742970125-d57f8ee68e89?auto=format&fit=crop&w=1200&q=82",
  city: "https://images.unsplash.com/photo-1634316127530-4289556bad26?auto=format&fit=crop&w=1400&q=82",
}

const destinations = [
  {
    name: "Rajasthan",
    kicker: "Palaces · desert · living heritage",
    copy: "From Udaipur’s lakes to Jodhpur’s blue lanes and the desert landscapes beyond.",
    image: images.jodhpur,
    className: "destination-large",
  },
  {
    name: "Ladakh",
    kicker: "High Himalaya",
    copy: "Mountain roads, Buddhist monasteries and the expansive landscapes of India’s north.",
    image: images.ladakh,
    className: "destination-tall",
  },
  {
    name: "Wild India",
    kicker: "Forest · safari",
    copy: "Journeys shaped around India’s remarkable reserves and wildlife regions.",
    image: images.wildlife,
    className: "",
  },
]

const experiences = [
  {
    number: "01",
    title: "Tailor-made journeys",
    copy: "A journey shaped around your dates, interests, preferred pace and style of stay.",
  },
  {
    number: "02",
    title: "Culture & heritage",
    copy: "Historic cities, sacred places, architecture, crafts and the traditions of daily life.",
  },
  {
    number: "03",
    title: "Adventure & cycling",
    copy: "Cycling through Rajasthan, Himalayan routes and active ways to explore the landscape.",
  },
  {
    number: "04",
    title: "Festivals & gatherings",
    copy: "Travel inspired by Holi, the Pushkar Fair and other festivals featured by Maragià Express.",
  },
]

const faqs = [
  {
    question: "Can I request a customized itinerary?",
    answer:
      "Yes. Tailor-made planning is a core service. Share your dates, interests, preferred pace and accommodation style so the team can discuss suitable possibilities with you.",
  },
  {
    question: "Does Maragià Express organize group travel?",
    answer:
      "The official website presents organized and cultural tours. Contact the team with your group size and travel dates to confirm the options currently available.",
  },
  {
    question: "Which destinations are currently featured?",
    answer:
      "The official website currently features travel across India, including Rajasthan, North India and Ladakh, as well as selected journeys in Bhutan, Nepal and Sri Lanka.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Use the journey planner below, email mail@maragiaexpress.com, or call +91 97840 02880. A quotation is only provided after the team confirms your travel requirements.",
  },
]

function Brand() {
  return (
    <a className="brand" href="/" aria-label="Maragià Express home">
      <span className="brand-mark" aria-hidden="true">
        M
      </span>
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
    ["Destinations", "/destinations"],
    ["Tours", "/tours"],
    ["Experiences", "/experiences"],
    ["Tailor-made", "/tailor-made"],
    ["About", "/about"],
    ["Journal", "/travel-journal"],
    ["Contact", "/contact"],
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav
          className={`nav ${open ? "nav-open" : ""}`}
          id="mobile-navigation"
          aria-label="Main navigation"
        >
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
            Plan your journey
          </a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
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
      <img
        src={images.hero}
        alt="Historic palace architecture reflected in water in Udaipur, Rajasthan"
        fetchPriority="high"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow eyebrow-light">
          Discover India · Travel beyond the ordinary
        </p>
        <h1>
          India, experienced
          <em>your way.</em>
        </h1>
        <p className="hero-copy">
          Extraordinary landscapes, living traditions and hidden gems—brought
          together in a journey thoughtfully shaped around you.
        </p>
        <div className="hero-actions">
          <a className="button button-ivory" href="/destinations">
            Explore destinations
          </a>
          <ArrowLink href="/tailor-made" light>
            Design your journey
          </ArrowLink>
        </div>
      </div>
      <div className="hero-foot">
        <span>Udaipur · Rajasthan · India</span>
        <a href="#about">
          Scroll to discover <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

function Introduction() {
  return (
    <section className="intro section" id="about">
      <div className="intro-title">
        <p className="eyebrow">Our way of travelling</p>
        <h2>
          More than a journey.
          <em>A deeper connection with India.</em>
        </h2>
      </div>
      <div className="intro-image">
        <img
          src={images.udaipur}
          alt="Ornate palace facade beside the lake in Udaipur"
          loading="lazy"
        />
        <span>Local perspective, thoughtfully planned</span>
      </div>
      <div className="intro-copy">
        <p className="lead">
          Maragià Express is an India-based travel specialist in Udaipur,
          creating personalized journeys through the country’s many landscapes
          and cultures.
        </p>
        <p>
          The approach begins with listening: understanding how you like to
          travel, what draws you to India, and the rhythm you want your journey
          to have. From heritage cities to Himalayan roads, each route is
          considered as a whole.
        </p>
        <ArrowLink href="/about">Discover Maragià Express</ArrowLink>
      </div>
    </section>
  )
}

function Destinations() {
  return (
    <section className="destinations section" id="destinations">
      <div className="heading-row">
        <SectionHeading
          eyebrow="Places to begin"
          title="Find the India that speaks to you."
          copy="A country of many worlds. Begin with a landscape, a story or a feeling."
        />
        <ArrowLink href="/destinations">Explore all destinations</ArrowLink>
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
            <img src={destination.image} alt="" loading="lazy" />
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
          alt="Rajasthani musician in traditional dress"
          loading="lazy"
        />
        <div className="image-note">
          <small>The meaningful details</small>
          <span>People, place, craft and culture</span>
        </div>
      </div>
      <div className="experience-content">
        <SectionHeading
          eyebrow="Ways to travel"
          title="Travel that feels personal."
          copy="Not a checklist of sights, but an itinerary with space to understand where you are."
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
        alt="Camel rider crossing Rajasthan's Thar Desert"
        loading="lazy"
      />
      <div className="rajasthan-overlay" />
      <div className="rajasthan-content">
        <p className="eyebrow eyebrow-light">A signature landscape</p>
        <h2>
          Rajasthan,
          <em>beyond the postcard.</em>
        </h2>
        <p>
          Discover the stories, architecture, traditions and encounters that
          make Rajasthan one of India’s most distinctive travel experiences.
        </p>
        <a className="button button-ivory" href="/destinations/rajasthan">
          Explore Rajasthan
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
      "Share your ideas",
      "Tell us about your dates, interests, travel style and preferences.",
    ],
    [
      "02",
      "Shape your journey",
      "Discuss a proposed route and refine it with the travel team.",
    ],
    [
      "03",
      "Experience India",
      "Travel with the arrangements and support confirmed for your itinerary.",
    ],
  ]
  return (
    <section className="tailor section" id="tailor-made">
      <SectionHeading
        eyebrow="Designed around you"
        title="Your interests. Your pace. Your India."
        copy="Every memorable journey begins with a conversation—not a pre-set package."
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
        Plan a custom trip
      </a>
    </section>
  )
}

function WhyUs() {
  const points = [
    ["Based in India", "On-the-ground perspective from Udaipur, Rajasthan."],
    [
      "Made personal",
      "Routes discussed and shaped around individual preferences.",
    ],
    [
      "Many ways to explore",
      "Cultural, festival, active and wildlife journeys.",
    ],
    [
      "One considered journey",
      "Travel arrangements brought together around a coherent route.",
    ],
  ]
  return (
    <section className="why section">
      <div className="why-title">
        <p className="eyebrow">Why Maragià Express</p>
        <h2>Local knowledge. A journey that is entirely yours.</h2>
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
          eyebrow="Notes for the curious"
          title="Stories from the journey."
        />
        <ArrowLink href="/travel-journal">Explore the travel journal</ArrowLink>
      </div>
      <div className="journal-grid">
        <article className="journal-feature">
          <img
            src={images.city}
            alt="Intricate balconies and windows on a Rajasthan palace facade"
            loading="lazy"
          />
          <p className="eyebrow">Architecture & heritage</p>
          <h3>Reading Rajasthan through its forts, palaces and old cities</h3>
          <p>
            Look beyond the facade and discover how architecture carries
            centuries of memory.
          </p>
        </article>
        <article>
          <span className="journal-number">FIELD NOTE · 01</span>
          <h3>Preparing for your first journey through India</h3>
          <p>
            A thoughtful starting point for pace, season, regions and
            expectations.
          </p>
        </article>
        <article>
          <span className="journal-number">FIELD NOTE · 02</span>
          <h3>Why Udaipur rewards a slower kind of travel</h3>
          <p>
            Lakes, havelis and everyday rituals in Maragià Express’s home city.
          </p>
        </article>
      </div>
    </section>
  )
}

function Faq() {
  const [active, setActive] = useState(0)
  return (
    <section className="faq section">
      <div className="faq-heading">
        <SectionHeading eyebrow="Good to know" title="Planning your journey." />
        <p>
          Need something more specific?{" "}
          <a href={`mailto:${siteConfig.email}`}>Write to our team.</a>
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
  const [status, setStatus] = useState("")
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
    const subject = encodeURIComponent(`Journey enquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCountry: ${country}\nDestination: ${destination}\nApproximate dates: ${dates}\nTravellers: ${travelers}\nInterests: ${interests}\n\nJourney ideas:\n${message}`,
    )
    setStatus(
      "Your email app is opening. Please send the prepared message to complete your enquiry.",
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="planner" id="planner">
      <div className="planner-copy">
        <p className="eyebrow eyebrow-light">Begin a conversation</p>
        <h2>
          Your India story
          <em>starts here.</em>
        </h2>
        <p>
          Tell us what inspires you, and let us help you explore the
          possibilities.
        </p>
        <div className="planner-contact">
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <label>
            Full name
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </label>
        </div>
        <div className="field-row">
          <label>
            Country of residence
            <input
              name="country"
              type="text"
              autoComplete="country-name"
              placeholder="Your country"
            />
          </label>
          <label>
            Preferred destination
            <select name="destination" defaultValue="">
              <option value="" disabled>
                Select an area
              </option>
              <option>Rajasthan</option>
              <option>North India</option>
              <option>Ladakh & Himalaya</option>
              <option>Wildlife regions</option>
              <option>Bhutan, Nepal or Sri Lanka</option>
              <option>I am open to ideas</option>
            </select>
          </label>
        </div>
        <div className="field-row">
          <label>
            Approximate dates
            <input name="dates" type="text" placeholder="Month or dates" />
          </label>
          <label>
            Number of travellers
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
          Travel interests
          <input
            name="interests"
            type="text"
            placeholder="Culture, architecture, cycling, wildlife..."
          />
        </label>
        <label>
          Additional message
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Interests, number of travellers, pace and accommodation preferences..."
          />
        </label>
        <div className="form-foot">
          <button className="button button-gold" type="submit">
            Send enquiry
          </button>
          <p>
            This opens a prepared email in your mail app. No information is
            stored on this website.
          </p>
        </div>
        {status && (
          <p className="form-status" role="status">
            {status}
          </p>
        )}
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Maragià Express — discover India, your way.</p>
          <span>{siteConfig.location}</span>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="/destinations">Destinations</a>
          <a href="/tours">Tours</a>
          <a href="/experiences">Experiences</a>
          <a href="/tailor-made">Tailor-made travel</a>
          <a href="/travel-journal">Travel journal</a>
        </div>
        <div>
          <h3>Established links</h3>
          <a href="https://maragiaexpress.com/tour-dellindia/">
            Tours of India
          </a>
          <a href="https://maragiaexpress.com/tour-dei-festival-indiani/">
            Festival tours
          </a>
          <a href="/terms">Terms & conditions</a>
          <a href="/payment-policy">Payment policy</a>
          <a href="/cancellation-policy">Cancellation & refund</a>
          <a href="https://maragiaexpress.com/informazione/">
            Travel information
          </a>
        </div>
        <div>
          <h3>Talk to us</h3>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <div className="socials">
            <a href={siteConfig.socials.instagram}>Instagram</a>
            <a href={siteConfig.socials.facebook}>Facebook</a>
            <a href={siteConfig.socials.youtube}>YouTube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Maragià Express</span>
        <span>Travel agency & tour operator · Udaipur, India</span>
      </div>
    </footer>
  )
}

export default function App() {
  const schema = useMemo(() => [organizationSchema(), websiteSchema()], [])
  if (window.location.pathname !== "/") {
    return <InnerPages pathname={window.location.pathname} />
  }
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <Header />
      <main>
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
    </>
  )
}
