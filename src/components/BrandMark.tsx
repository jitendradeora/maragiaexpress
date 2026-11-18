import Image from "next/image"

export default function BrandMark({
  priority = false,
}: {
  priority?: boolean
}) {
  return (
    <Image
      className="brand-logo"
      src="/mglogo.png"
      alt=""
      width={200}
      height={200}
      priority={priority}
    />
  )
}
