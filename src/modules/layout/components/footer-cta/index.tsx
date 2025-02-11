import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const FooterCTA = () => {
  return (
    <div className="bg-[#201e1e] w-full">
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
        <div>
          <h3 className="text-2xl-semi text-white" style={{fontFamily: 'Lemon'}}>About us</h3>
          <p className="text-l-regular text-white max-w-[34rem] mb-6 mt-4 drop-shadow-md shadow-black">
            We are a dynamic and forward-thinking entity, committed to driving
            innovation and leveraging technology to empower African local
            traders in their daily business operations, regardless of their size
            or capacity.
          </p>
          <div className="mt-6 text-white">
            <UnderlineLink href="/">Explore Afriomarkets</UnderlineLink>
          </div>
        </div>

        <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]">
          <Image
            src="/cta_three.jpg"
            alt=""
            className="absolute inset-0 rounded-md"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
