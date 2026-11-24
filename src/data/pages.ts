import { siteImages } from "./site-images"

export const staticPages = [
  {
    path: "/",
    title: "Viaggi su misura in India",
    description:
      "Scopri viaggi su misura tra cultura, patrimonio, paesaggi e natura dell’India con Maragià Express, agenzia con sede a Udaipur, in Rajasthan.",
    image: siteImages.hero,
  },
  {
    path: "/destinazioni",
    title: "Destinazioni",
    description:
      "Esplora le destinazioni in India e oltre, dal Rajasthan al Ladakh fino a Bhutan, Nepal e Sri Lanka, con Maragià Express.",
    image: siteImages.udaipur,
  },
  {
    path: "/tour",
    title: "Tour dell’India",
    description:
      "Scopri i tour culturali, dei festival, d’avventura e di lusso in India ideati da Maragià Express a Udaipur.",
    image: siteImages.palace,
  },
  {
    path: "/esperienze",
    title: "Esperienze di viaggio",
    description:
      "Scopri esperienze di viaggio su misura, culturali, d’avventura, legate ai festival e di lusso con Maragià Express.",
    image: siteImages.craft,
  },
  {
    path: "/tailor-made",
    title: "Viaggi su misura",
    description:
      "Organizza un viaggio personalizzato in India in base alle tue date, ai tuoi interessi, al ritmo e allo stile di viaggio che preferisci.",
    image: siteImages.udaipur,
  },
  {
    path: "/about",
    title: "Chi siamo",
    description:
      "Scopri Maragià Express, agenzia di viaggi con sede a Udaipur che crea viaggi curati in ogni dettaglio attraverso l’India.",
    image: siteImages.udaipur,
  },
  {
    path: "/diario",
    title: "Diario di viaggio",
    description:
      "Consigli di pianificazione, patrimonio culturale e viaggi lenti in India dal diario di Maragià Express.",
    image: siteImages.city,
  },
  {
    path: "/contact",
    title: "Contatti",
    description:
      "Contatta Maragià Express a Udaipur per parlare di destinazioni, tour e viaggi su misura in India.",
    image: siteImages.udaipur,
  },
  {
    path: "/faq",
    title: "Domande frequenti",
    description:
      "Risposte su itinerari su misura, prezzi, pagamenti e come inviare una richiesta a Maragià Express.",
    image: siteImages.og,
  },
  {
    path: "/travel-information",
    title: "Informazioni utili",
    description:
      "Informazioni pratiche per prepararti al meglio a un viaggio in India con Maragià Express.",
    image: siteImages.desert,
  },
  {
    path: "/privacy",
    title: "Informativa sulla privacy",
    description:
      "Leggi l’informativa sulla privacy di Maragià Express su come vengono gestite le richieste e i dati del sito.",
    image: siteImages.og,
  },
  {
    path: "/terms",
    title: "Termini e condizioni",
    description:
      "Consulta i termini e le condizioni di Maragià Express per la pianificazione e l’organizzazione dei viaggi.",
    image: siteImages.og,
  },
  {
    path: "/payment-policy",
    title: "Condizioni di pagamento",
    description:
      "Scopri le condizioni di pagamento di Maragià Express per proposte di viaggio confermate e prenotazioni.",
    image: siteImages.og,
  },
  {
    path: "/cancellation-policy",
    title: "Cancellazione e rimborso",
    description:
      "Consulta le condizioni di cancellazione e rimborso di Maragià Express prima di confermare il tuo viaggio.",
    image: siteImages.og,
  },
] as const

export function getStaticPage(path: string) {
  return staticPages.find((page) => page.path === path)
}
