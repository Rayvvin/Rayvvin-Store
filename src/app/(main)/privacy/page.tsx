import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "All you need to know about us",
}

export default function Privacy() {
  return <div className="bg-gray-50 py-8 md:py-12"><div className="content-container">Privacy Policy</div></div>
}