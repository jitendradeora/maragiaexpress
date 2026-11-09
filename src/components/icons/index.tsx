import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string
}

function baseProps({ title, ...props }: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : undefined,
    ...props,
  }
}

export function InstagramIcon(props: IconProps) {
  const { title, ...rest } = props
  return (
    <svg {...baseProps(props)} {...rest}>
      {title ? <title>{title}</title> : null}
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  const { title, ...rest } = props
  return (
    <svg {...baseProps(props)} {...rest}>
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M14.2 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4H17V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.4v2.8h2.7V21h3.1Z"
      />
    </svg>
  )
}

export function YouTubeIcon(props: IconProps) {
  const { title, ...rest } = props
  return (
    <svg {...baseProps(props)} {...rest}>
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.3 5.4 12 5.4 12 5.4s-6.3 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM10 15.2V9.2l5.2 3-5.2 3Z"
      />
    </svg>
  )
}

export function TrustpilotIcon(props: IconProps) {
  const { title, ...rest } = props
  return (
    <svg {...baseProps(props)} {...rest}>
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M12 1.8 14.9 8.6 22 9.2 16.6 14.1 18.4 21.2 12 17.4 5.6 21.2 7.4 14.1 2 9.2 9.1 8.6Z"
      />
    </svg>
  )
}

export function GoogleIcon(props: IconProps) {
  const { title, ...rest } = props
  return (
    <svg {...baseProps(props)} {...rest}>
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.17v2.73h5.51c-.24 1.4-1.65 4.12-5.51 4.12-3.32 0-6.03-2.75-6.03-6.13s2.71-6.13 6.03-6.13c1.89 0 3.16.8 3.88 1.49l2.64-2.55C17.18 3.15 14.87 2 12.18 2 6.98 2 2.76 6.22 2.76 11.42s4.22 9.42 9.42 9.42c5.5 0 9.13-3.86 9.13-9.3 0-.62-.07-1.1-.16-1.44Z"
      />
    </svg>
  )
}

export function ArrowUpIcon(props: IconProps) {
  const { title, ...rest } = props
  return (
    <svg {...baseProps(props)} {...rest}>
      {title ? <title>{title}</title> : null}
      <path
        d="M12 19V5M12 5 6 11M12 5l6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowOutIcon(props: IconProps) {
  const { title, ...rest } = props
  return (
    <svg {...baseProps(props)} {...rest}>
      {title ? <title>{title}</title> : null}
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  Trustpilot: TrustpilotIcon,
  Google: GoogleIcon,
} as const
