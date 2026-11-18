import { siteImages } from "./site-images"

export type Destination = {
  slug: string
  name: string
  eyebrow: string
  intro: string
  image: string
  highlights: string[]
  paragraphs: string[]
}

export const destinations: Destination[] = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    eyebrow: "Palazzi · deserto · patrimonio vivo",
    intro:
      "Un viaggio tra città sui laghi, fortezze nel deserto, borghi dipinti e le tradizioni vive dello stato più leggendario dell’India.",
    image: siteImages.rajasthan,
    highlights: ["Udaipur e Mewar", "Jaipur", "Jodhpur", "Il deserto del Thar"],
    paragraphs: [
      "Il Rajasthan unisce architettura monumentale e vita quotidiana intima. I forti dominano le città antiche, i pozzi a gradini rivelano un rapporto raffinato con l’acqua e le tradizioni artigiane restano parte del linguaggio visivo della regione.",
      "Maragià Express ha sede a Udaipur, il che rende il Rajasthan un punto di partenza naturale per un viaggio personalizzato. Gli itinerari possono essere costruiti attorno al patrimonio storico, all’architettura, ai paesaggi rurali, ai festival, al cicloturismo o a una scoperta più lenta di alcune città selezionate.",
    ],
  },
  {
    slug: "ladakh",
    name: "Ladakh e Himalaya",
    eyebrow: "Strade di montagna · monasteri · cieli aperti",
    intro:
      "Paesaggi d’alta quota e tradizioni culturali buddhiste danno forma a un’esperienza dell’India completamente diversa.",
    image: siteImages.ladakh,
    highlights: [
      "Leh",
      "Monasteri buddhisti",
      "Itinerari di montagna",
      "Viaggi attivi",
    ],
    paragraphs: [
      "La vastità del Ladakh invita il viaggiatore a rallentare. Valli, passi di montagna e monasteri creano viaggi in cui l’acclimatamento e un ritmo ben calibrato contano quanto l’itinerario stesso.",
      "Il sito ufficiale di Maragià Express propone avventure himalayane, trekking e viaggi in occasione dei festival. Accessibilità attuale, condizioni dei percorsi e livello di attività adeguato vanno sempre confermati direttamente con il team.",
    ],
  },
  {
    slug: "wildlife-india",
    name: "India selvaggia",
    eyebrow: "Foreste · riserve · fauna",
    intro:
      "Aggiungi un capitolo naturalistico, pianificato con cura, a un viaggio culturale più ampio attraverso l’India.",
    image: siteImages.wildlife,
    highlights: [
      "Riserve naturali",
      "Organizzazione dei safari",
      "Paesaggi naturali",
      "Viaggi stagionali",
    ],
    paragraphs: [
      "Le regioni naturalistiche dell’India offrono un contrasto affascinante con le città e i paesaggi storici. L’esperienza dipende dalla stagione, dalle regole delle riserve, dai permessi e dalla naturale imprevedibilità della fauna.",
      "Maragià Express propone esperienze di safari sul proprio sito ufficiale. Riserve specifiche, alloggi e disponibilità vanno confermati in fase di pianificazione; l’avvistamento degli animali non può mai essere garantito.",
    ],
  },
]

export const beyondIndiaDestinations: Destination[] = [
  {
    slug: "bhutan",
    name: "Bhutan",
    eyebrow: "Regno himalayano · monasteri · vallate",
    intro:
      "Un viaggio dal ritmo attento tra i paesaggi montani e il patrimonio culturale buddhista del Bhutan.",
    image: siteImages.bhutan,
    highlights: [
      "Paesaggi himalayani",
      "Patrimonio buddhista",
      "Vallate di montagna",
      "Viaggi stagionali",
    ],
    paragraphs: [
      "Il Bhutan è presentato come destinazione sul sito ufficiale di Maragià Express. La sua geografia montuosa, i monasteri e il particolare approccio al turismo richiedono un itinerario pianificato in base alle regole d’ingresso vigenti e all’organizzazione locale.",
      "Percorsi specifici, permessi, alloggi e servizi vanno confermati direttamente con il team prima di prenotare il viaggio.",
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    eyebrow: "Città storiche · Himalaya · tradizioni vive",
    intro:
      "Scopri il Nepal attraverso i suoi luoghi culturali, lo scenario montano e le sue comunità storiche.",
    image: siteImages.nepal,
    highlights: [
      "Valle di Kathmandu",
      "Paesaggi himalayani",
      "Patrimonio culturale",
      "Viaggi attivi",
    ],
    paragraphs: [
      "Il Nepal è una delle destinazioni oltre l’India proposte da Maragià Express. Siti culturali e paesaggi himalayani possono far parte di un viaggio adattato alla stagione, all’altitudine e agli interessi personali.",
      "Le destinazioni esatte, il livello di attività e i servizi attualmente offerti vanno confermati con il team di viaggio.",
    ],
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    eyebrow: "Patrimonio · altopiani · paesaggi tropicali",
    intro:
      "Un viaggio tra i paesaggi culturali dello Sri Lanka, i suoi verdi altopiani e la varietà dei suoi ambienti naturali.",
    image: siteImages.sriLanka,
    highlights: [
      "Patrimonio culturale",
      "Altopiani centrali",
      "Piantagioni di tè",
      "Regioni costiere",
    ],
    paragraphs: [
      "Lo Sri Lanka figura tra le destinazioni oltre l’India proposte sul sito ufficiale di Maragià Express. La sua geografia compatta riunisce siti culturali, paesaggi d’altura e scenari tropicali.",
      "Itinerari, alloggi e aspetti pratici attuali vanno discussi direttamente con Maragià Express prima di fare programmi.",
    ],
  },
]

export const allDestinations = [...destinations, ...beyondIndiaDestinations]

export function getDestination(slug: string) {
  return allDestinations.find((destination) => destination.slug === slug)
}

export function getDestinationSlugs() {
  return allDestinations.map((destination) => destination.slug)
}
