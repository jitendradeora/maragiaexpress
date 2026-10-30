import { useState } from "react"
import { siteConfig } from "./lib/site-config"

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
    const message = `To: ${siteConfig.email}\nSubject: ${subject}\n\n${body}`
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
      <p className="inner-eyebrow">Next step</p>
      <h3>Your enquiry is ready. It has not been sent yet.</h3>
      <p>
        This page cannot deliver email on its own. Open your email app and
        press Send, or copy the message and send it to {siteConfig.email}.
        Nothing is booked until the team confirms it with you.
      </p>
      <pre>{body}</pre>
      <div className="enquiry-ready-actions">
        <a href={enquiryMailto(subject, body)}>Open email app</a>
        <button type="button" onClick={copyMessage}>
          {copied ? "Message copied" : "Copy message"}
        </button>
        <button type="button" className="secondary" onClick={onEdit}>
          Edit answers
        </button>
      </div>
      {copyError && (
        <p>Copy is unavailable in this browser. Use “Open email app” instead.</p>
      )}
    </div>
  )
}

export function FormGuide() {
  return (
    <ol className="form-guide">
      <li>Fill in the form. Fields with * are required.</li>
      <li>Choose “Continue to email” to prepare the message.</li>
      <li>Press Send in your email app. That is what reaches the team.</li>
    </ol>
  )
}
