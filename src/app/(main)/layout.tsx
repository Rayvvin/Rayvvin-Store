import Footer from "@modules/layout/templates/footer"
// import Nav from "@modules/layout/templates/nav"
import Nav from "@modules/layout/templates/nav-rayvvin"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative bg-[#FAFAFA]">
      <Nav />
      {children}
      <Footer />
    </main>
  )
}
