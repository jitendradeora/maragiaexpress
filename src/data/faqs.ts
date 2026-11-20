export const homepageFaqs = [
  {
    question: "Posso richiedere un itinerario personalizzato?",
    answer:
      "Sì. La progettazione su misura è uno dei nostri servizi principali. Indicaci date, interessi, ritmo preferito e tipo di alloggio, così il team potrà valutare con te le soluzioni più adatte.",
  },
  {
    question: "Maragià Express organizza viaggi di gruppo?",
    answer:
      "Il sito ufficiale presenta tour organizzati e culturali. Contatta il team indicando il numero di partecipanti e le date di viaggio per conoscere le opzioni attualmente disponibili.",
  },
  {
    question: "Quali destinazioni proponete attualmente?",
    answer:
      "Il sito ufficiale propone attualmente viaggi in tutta l’India, tra cui Rajasthan, India del Nord e Ladakh, oltre a una selezione di viaggi in Bhutan, Nepal e Sri Lanka.",
  },
  {
    question: "Come posso richiedere un preventivo?",
    answer:
      "Scrivi a mail@maragiaexpress.com, chiama il +91 97840 02880 oppure usa la pagina Su misura. Il preventivo viene fornito solo dopo che il team ha verificato le tue esigenze di viaggio.",
  },
] as const

export const faqGroups = [
  {
    title: "Il viaggio",
    items: [
      homepageFaqs[0],
      homepageFaqs[1],
      homepageFaqs[2],
    ],
  },
  {
    title: "Preventivi e prezzi",
    items: [
      homepageFaqs[3],
      {
        question: "Il modulo sul sito invia la richiesta da solo?",
        answer:
          "No. I moduli preparano un’email nella tua app di posta. La richiesta parte solo quando premi Invia, e nessun dato viene salvato su questo sito.",
      },
      {
        question: "I prezzi pubblicati sono definitivi?",
        answer:
          "No. I prezzi sul sito sono indicativi. Itinerario, prezzo e disponibilità vengono confermati nella proposta scritta, prima di qualsiasi prenotazione.",
      },
    ],
  },
  {
    title: "Pagamenti e documenti",
    items: [
      {
        question: "Come funziona il pagamento?",
        answer:
          "Per i tour confermati è previsto un acconto del 50% 45 giorni prima della partenza e il saldo 30 giorni prima, tramite bonifico. Le scadenze del tuo viaggio vanno confermate con il team.",
        href: "/payment-policy",
        linkLabel: "Condizioni di pagamento",
      },
      {
        question: "Come si cancella un viaggio?",
        answer:
          "La cancellazione va chiesta per iscritto via email. Le penali dipendono da quanti giorni mancano alla partenza e dalle condizioni dei fornitori. Fanno fede i documenti di prenotazione.",
        href: "/cancellation-policy",
        linkLabel: "Cancellazione e rimborso",
      },
      {
        question: "Chi si occupa di visto e assicurazione?",
        answer:
          "Passaporto, visto, assicurazione e indicazioni sanitarie restano a carico del viaggiatore. Verifica sempre le fonti ufficiali aggiornate per la tua situazione.",
        href: "/travel-information",
        linkLabel: "Informazioni utili",
      },
    ],
  },
] as const

export const faqPageItems = faqGroups.flatMap((group) => group.items)
