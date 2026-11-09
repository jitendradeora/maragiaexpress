import { siteImages } from "./site-images"

export const staticPages = [
  {
    path: "/",
    title: "Tailor-Made Journeys Through India",
    description:
      "Discover tailor-made journeys through India's culture, heritage, landscapes and wildlife with Maragià Express in Udaipur, Rajasthan.",
    image: siteImages.hero,
  },
  {
    path: "/destinations",
    title: "Destinations",
    description:
      "Explore destinations across India and beyond, from Rajasthan and Ladakh to Bhutan, Nepal and Sri Lanka with Maragià Express.",
    image: siteImages.udaipur,
  },
  {
    path: "/tours",
    title: "Tours of India",
    description:
      "Browse cultural, festival, adventure and heritage tours of India designed with Maragià Express in Udaipur.",
    image: siteImages.palace,
  },
  {
    path: "/experiences",
    title: "Travel experiences",
    description:
      "Discover tailor-made, cultural, adventure, festival and refined travel experiences with Maragià Express.",
    image: siteImages.craft,
  },
  {
    path: "/tailor-made",
    title: "Tailor-made journeys",
    description:
      "Plan a personalized India journey around your dates, interests, pace and preferred style of travel.",
    image: siteImages.udaipur,
  },
  {
    path: "/about",
    title: "About",
    description:
      "Learn about Maragià Express, an Udaipur-based travel agency creating thoughtful journeys through India.",
    image: siteImages.udaipur,
  },
  {
    path: "/travel-journal",
    title: "Travel journal",
    description:
      "Notes on planning, heritage and slower travel through India from the Maragià Express journal.",
    image: siteImages.city,
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Contact Maragià Express in Udaipur to discuss destinations, tours and tailor-made India journeys.",
    image: siteImages.udaipur,
  },
  {
    path: "/travel-information",
    title: "Travel information",
    description:
      "Practical travel information to help you prepare for a journey through India with Maragià Express.",
    image: siteImages.desert,
  },
  {
    path: "/privacy",
    title: "Privacy notice",
    description:
      "Read the Maragià Express privacy notice covering how enquiry and website information is handled.",
    image: siteImages.og,
  },
  {
    path: "/terms",
    title: "Terms and conditions",
    description:
      "Review the Maragià Express terms and conditions for journey planning and travel arrangements.",
    image: siteImages.og,
  },
  {
    path: "/payment-policy",
    title: "Payment policy",
    description:
      "Understand Maragià Express payment expectations for confirmed travel proposals and bookings.",
    image: siteImages.og,
  },
  {
    path: "/cancellation-policy",
    title: "Cancellation and refunds",
    description:
      "Review Maragià Express cancellation and refund guidance before confirming travel arrangements.",
    image: siteImages.og,
  },
] as const

export function getStaticPage(path: string) {
  return staticPages.find((page) => page.path === path)
}
