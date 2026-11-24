"use client"

import { socialIcons } from "./icons"
import type { SiteSocials } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

const icons = {
  Instagram: socialIcons.Instagram,
  Facebook: socialIcons.Facebook,
  YouTube: socialIcons.YouTube,
  Trustpilot: socialIcons.Trustpilot,
  Google: socialIcons.Google,
}

export default function ProfileLinks({ socials }: { socials?: SiteSocials }) {
  const links = socials ?? siteConfig.socials
  const profiles = [
    { name: "Instagram", href: links.instagram, Icon: icons.Instagram },
    { name: "Facebook", href: links.facebook, Icon: icons.Facebook },
    { name: "YouTube", href: links.youtube, Icon: icons.YouTube },
    { name: "Trustpilot", href: links.trustpilot, Icon: icons.Trustpilot },
    { name: "Google", href: links.google, Icon: icons.Google },
  ]
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
