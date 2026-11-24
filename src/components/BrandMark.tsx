import { withBasePath } from "@/lib/base-path"

export default function BrandMark({
  priority = false,
}: {
  priority?: boolean
}) {
  return (
    <img
      className="brand-logo"
      src={withBasePath("/mglogo.png")}
      alt=""
      width={200}
      height={200}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  )
}
