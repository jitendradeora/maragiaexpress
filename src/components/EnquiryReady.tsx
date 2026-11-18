"use client"

import { useState } from "react"
import { siteConfig } from "@/lib/site-config"

export function enquiryMailto(subject: string, body: string) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function EnquiryReady({
  subject,
  body,
  onEdit,
}: {
  subject: string
  body: string
  onEdit: () => void
}) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  async function copyMessage() {
    const message = `A: ${siteConfig.email}\nOggetto: ${subject}\n\n${body}`
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopied(false)
      setCopyError(true)
    }
  }

  return (
    <div className="enquiry-ready" role="status">
      <p className="inner-eyebrow">Prossimo passo</p>
      <h3>La tua richiesta è pronta, ma non è ancora stata inviata.</h3>
      <p>
        Questa pagina non può inviare email autonomamente. Apri la tua app di
        posta e premi Invia, oppure copia il messaggio e invialo a{" "}
        {siteConfig.email}. Nessuna prenotazione è valida finché il team non
        la conferma con te.
      </p>
      <pre>{body}</pre>
      <div className="enquiry-ready-actions">
        <a href={enquiryMailto(subject, body)}>Apri l’app di posta</a>
        <button type="button" onClick={copyMessage}>
          {copied ? "Messaggio copiato" : "Copia messaggio"}
        </button>
        <button type="button" className="secondary" onClick={onEdit}>
          Modifica le risposte
        </button>
      </div>
      {copyError && (
        <p>La copia non è disponibile in questo browser. Usa “Apri l’app di posta”.</p>
      )}
    </div>
  )
}
