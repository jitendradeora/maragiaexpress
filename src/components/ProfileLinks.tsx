"use client"

import { socialIcons } from "./icons"
import { siteConfig } from "@/lib/site-config"

const profiles = [
  {
    name: "Instagram",
    href: siteConfig.socials.instagram,
    Icon: socialIcons.Instagram,
  },
  {
    name: "Facebook",
    href: siteConfig.socials.facebook,
    Icon: socialIcons.Facebook,
  },
  {
    name: "YouTube",
    href: siteConfig.socials.youtube,
    Icon: socialIcons.YouTube,
  },
  {
    name: "Trustpilot",
    href: siteConfig.socials.trustpilot,
    Icon: socialIcons.Trustpilot,
  },
  {
    name: "Google",
    href: siteConfig.socials.google,
    Icon: socialIcons.Google,
  },
] as const

export default function ProfileLinks() {
  return (
    <div className="social-icons">
      {profiles.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}
