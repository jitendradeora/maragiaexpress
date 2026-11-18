import { siteImages } from "./site-images"

export type Experience = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  bestFor: string
  body: string[]
}

export const experiences: Experience[] = [
  {
    slug: "tailor-made-journeys",
    name: "Viaggi su misura",
    eyebrow: "Un viaggio costruito dialogando",
    intro:
      "Parti dai tuoi interessi, dalle date e dal ritmo che preferisci, poi definisci un itinerario coerente insieme al team di Maragià Express.",
    image: siteImages.udaipur,
    bestFor:
      "Viaggiatori che apprezzano la flessibilità e un viaggio costruito sui propri interessi.",
    body: [
      "Viaggiare su misura non significa aggiungere sempre più tappe a un itinerario. Significa scegliere bene: le regioni adatte alla stagione, un ritmo che lasci il tempo di viverle e servizi che rispecchino il tuo modo di viaggiare.",
      "Indicaci le date approssimative, il numero di persone, gli interessi, le preferenze di alloggio e il budget indicativo. Il team potrà così valutare cosa è attualmente possibile e perfezionare con te una proposta di viaggio.",
    ],
  },
  {
    slug: "culture-heritage",
    name: "Cultura e patrimonio",
    eyebrow: "Architettura · luoghi sacri · tradizioni vive",
    intro:
      "Scopri l’India attraverso i luoghi, le storie, l’artigianato e i riti quotidiani che rendono unica ogni regione.",
    image: siteImages.palace,
    bestFor:
      "Viaggiatori curiosi, attratti da architettura, storia, tradizioni locali e identità regionali.",
    body: [
      "Il viaggio culturale è più appagante quando i monumenti vengono inseriti nel loro contesto. Un forte, un tempio, un mercato o una bottega acquistano più significato quando c’è il tempo di comprendere la comunità e il paesaggio che li circondano.",
      "Il sito ufficiale propone itinerari culturali nell’India del Nord e in Rajasthan. Visite precise e servizi di guida vanno confermati per ogni itinerario.",
    ],
  },
  {
    slug: "adventure-cycling",
    name: "Avventura e bicicletta",
    eyebrow: "Viaggi attivi attraverso l’India",
    intro:
      "Osserva il paesaggio con un ritmo diverso, tra cicloturismo, trekking e itinerari di montagna selezionati.",
    image: siteImages.cycle,
    bestFor:
      "Viaggiatori attivi, disposti a parlare nel dettaglio di preparazione fisica, terreno e livello di comfort.",
    body: [
      "Maragià Express propone il cicloturismo in Rajasthan e le avventure himalayane. Il viaggio attivo richiede un attento equilibrio tra terreno, distanze, stagione ed esperienza personale.",
      "Prima di confermare un itinerario, parla con noi del tuo livello di attività, dell’attrezzatura necessaria e dell’equilibrio che preferisci tra giornate attive e scoperta culturale.",
    ],
  },
  {
    slug: "festivals",
    name: "Festival e celebrazioni",
    eyebrow: "Viaggi stagionali nel loro contesto culturale",
    intro:
      "Organizza il viaggio attorno all’energia di Holi, di Pushkar e degli altri festival attualmente proposti da Maragià Express.",
    image: siteImages.craft,
    bestFor:
      "Viaggiatori a proprio agio con la folla, le date fisse e la natura dinamica degli eventi pubblici.",
    body: [
      "I festival offrono uno sguardo intenso sulle tradizioni locali, ma richiedono anche una preparazione responsabile. Date, luoghi e condizioni variano, e partecipare con rispetto è fondamentale.",
      "Il sito ufficiale propone Holi, la Fiera di Pushkar e il Festival di Hemis. Verifica direttamente programmi e servizi attuali prima di organizzare il viaggio.",
    ],
  },
  {
    slug: "luxury-travel",
    name: "Dimore storiche e soggiorni raffinati",
    eyebrow: "Comfort curato · luoghi straordinari",
    intro:
      "Unisci la profondità culturale dell’India ad alloggi scelti con cura e a un viaggio privato dal ritmo ben calibrato.",
    image: siteImages.desert,
    bestFor:
      "Viaggiatori che cercano un livello di comfort superiore senza perdere il senso del luogo.",
    body: [
      "Il sito ufficiale presenta viaggi di lusso in India, con dimore storiche e servizi personalizzati. Il significato di lusso va definito in base alle tue priorità: spazio, privacy, servizio, posizione o carattere storico.",
      "Questo sito non promette singoli hotel o partnership. Opzioni e standard attuali vengono confermati all’interno di una proposta specifica.",
    ],
  },
]

export function getExperience(slug: string) {
  return experiences.find((experience) => experience.slug === slug)
}

export function getExperienceSlugs() {
  return experiences.map((experience) => experience.slug)
}
