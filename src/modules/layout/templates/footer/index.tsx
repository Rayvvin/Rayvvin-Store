import CustomDealsBlue from "@modules/home/components/custom-deals-blue"
import CustomDealsSubscribe from "@modules/home/components/custom-deals-subscribe"
import FooterCTA from "@modules/layout/components/footer-cta"
import FooterNav from "@modules/layout/components/footer-nav-new"
// import FooterNav from "@modules/layout/components/footer-nav"
import MedusaCTA from "@modules/layout/components/medusa-cta"

const Footer = () => {
  return (
    <footer className="bg-[#051614] w-full">
      {/* <footer className=""> */}
      {/* <FooterCTA /> */}
      <CustomDealsSubscribe />
      <FooterNav />
      {/* <MedusaCTA /> */}
    </footer>
  )
}

export default Footer
