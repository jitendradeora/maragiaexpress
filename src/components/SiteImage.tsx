import Image, { type ImageProps } from "next/image"

type SiteImageProps = Omit<ImageProps, "alt"> & {
  alt: string
}

export default function SiteImage({
  alt,
  sizes = "(max-width: 900px) 100vw, 1200px",
  style,
  ...props
}: SiteImageProps) {
  return (
    <Image
      alt={alt}
      sizes={sizes}
      style={{ width: "100%", height: "auto", ...style }}
      {...props}
    />
  )
}
