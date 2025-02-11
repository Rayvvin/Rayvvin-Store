"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"

const StateHero = (props) => {
  const { state } = props
  return (
    <Splide
      options={{
        rewind: true,
        arrows: false,
        type: "loop",
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
      }}
      aria-label="Hero Section"
    >
      <SplideSlide>
        <div
          className="
        min-h-[18vh] sm:min-h-[20vh] md:min-h-[25vh] lg:min-h-[30vh] xl:min-h-[55vh] 
        w-full relative flex justify-around items-center flex-wrap"
        >
          <div className="text-transparent relative inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-10 mx-5 hidden lg:block xl:block w-[24rem]">
            {/* <h1 className="text-xl-semi mb-4 drop-shadow-md shadow-black">
          Introducing the Latest Summer Styles
        </h1>
        <p className="text-base-regular max-w-[24rem] mb-6 drop-shadow-md shadow-black">
          This season, our new summer collection embraces designs to provide
          comfort and style - ensuring you&apos;re well-prepared for whatever
          comes your way.
        </p>
        <UnderlineLink href="/store">Explore products</UnderlineLink> */}
          </div>

          <div
            className="text-white relative inset-0 z-10 my-14 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-10 py-10 px-5 mx-5 bg-[#884A22] rounded-md"
            style={{
              background: "rgba(255, 255, 255, 0.19)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(9.7px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
              Did you know?
            </h1>
            <p className="text-base-regular max-w-[24rem] mb-6 drop-shadow-md shadow-black">
              {state?.fun_fact}
            </p>
            {/* <UnderlineLink href="/store">Swipe for more</UnderlineLink> */}
          </div>

          <Image
            // src="/hero.webp"
            src="/african1.jpg"
            loading="eager"
            priority={true}
            quality={90}
            alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
            className="absolute inset-0"
            draggable="false"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </SplideSlide>
      <SplideSlide>
        <div
          className="
          min-h-[18vh] sm:min-h-[20vh] md:min-h-[25vh] lg:min-h-[30vh] xl:min-h-[55vh] 
        w-full relative flex justify-around lg:justify-start xl:justify-start items-center flex-wrap"
        >
          <div
            className="text-white relative inset-0 z-10 my-14 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-10 py-10 px-5 mx-5 bg-[#884A22] rounded-md"
            style={{
              background: "rgba(255, 255, 255, 0.19)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(9.7px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
              Did you know?
            </h1>
            <p className="text-base-regular max-w-[24rem] mb-6 drop-shadow-md shadow-black">
              {state?.fun_fact}
            </p>
            {/* <UnderlineLink href="/store">Swipe for more</UnderlineLink> */}
          </div>

          <Image
            src="/marrakesh.jpg"
            // src="/hero2.png"
            loading="eager"
            priority={true}
            quality={90}
            alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
            className="absolute inset-0"
            draggable="false"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div></div>
      </SplideSlide>
    </Splide>
  )
}

export default StateHero
