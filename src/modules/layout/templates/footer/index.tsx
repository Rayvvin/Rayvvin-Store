import CustomDealsBlue from "@modules/home/components/custom-deals-blue"
import CustomDealsSubscribe from "@modules/home/components/custom-deals-subscribe"
import FooterCTA from "@modules/layout/components/footer-cta"
import FooterNav from "@modules/layout/components/footer-nav-rayvvin"
import MedusaCTA from "@modules/layout/components/medusa-cta"

const Footer = () => {
  return (
    <footer className="bg-[#051614] bottom-0 w-full">
      {/* <footer className=""> */}
      {/* <FooterCTA /> */}
      <CustomDealsSubscribe />
      <FooterNav />
      {/* <MedusaCTA /> */}
    </footer>
  )
}

export default Footer
