import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "All you need to know about us",
}

export default function About() {
  return <div className="bg-gray-50 py-8 md:py-12"><div className="content-container">About Us</div></div>
}
