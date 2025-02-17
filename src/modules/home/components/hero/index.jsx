"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import { useEffect } from "react"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"

const Hero = () => {
  // useEffect(() => {
  //   fetch(
  //     "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
  //     // "https://jsonplaceholder.typicode.com/todos/1"
  //   )
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  // }, [])

  return (
    <Splide
      options={{ rewind: true, arrows: false, autoPlay: true }}
      aria-label="Hero Section"
    >
      <SplideSlide>
        <div
          className="min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] 
        w-full relative flex justify-center lg:justify-end xl:justify-end items-center flex-wrap lg:px-6"
        >
          <div
            className="text-white relative inset-0 z-10 flex flex-col justify-between items-center  justify-center  mx-5 bg-[#f3f0c8] min-h-[215px] sm:min-h-[230px] md:min-h-[250px] lg:min-h-[280px] xl:min-h-[300px] py-4"
            style={{
              background: "rgba(243, 240, 200, 0.69)",
              // borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(1.7px)",
              border: "1px solid rgba(243, 240, 200, 0.3)",
            }}
          >
            <div className="flex p-2 w-full mb-6 bg-cover bg-[url('/afriomarket_pngs/afrio_market_-_brand_pattern_new.png')]"></div>
            <Image
              src="/afriomarket_pngs/afrio market - logo with tagline.png"
              alt={"logo"}
              // width={300}
              // height={55}
              quality={100}
              fill
              className={"!relative object-cover mx-16 max-w-64 !w-[300px] sm:!w-[330px] md:!w-[350px] lg:!w-[3800px] xl:!w-[400px]"}
            />
            <div className="flex p-2 w-full bg-cover mt-6 bg-[url('/afriomarket_pngs/afrio_market_-_brand_pattern_new.png')]"></div>
          </div>

          <Image
            // src="/hero.webp"
            // src="/hero2.png"
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
          className="min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] 
        w-full relative flex justify-around lg:justify-start xl:justify-start items-center flex-wrap"
        >
          <div
            className="text-white relative inset-0 z-10 flex flex-col justify-center items-center text-center lg:pl-5 small:text-left small:justify-end small:items-start small:p-10 py-10 px-5 mx-5 w-[24rem] lg:w-[36rem] xl:w-[36rem]"
            style={{
              background: "rgba(255, 255, 255, 0.19)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(9.7px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <p
              className="text-xs-semi mb-0 drop-shadow-md shadow-black"
              style={{ fontSize: "12px", fontStyle: "italic" }}
            >
              Welcome to
            </p>
            <h1
              className="text-2xl-semi mb-0 drop-shadow-md shadow-black"
              style={{ fontFamily: "Lemon" }}
            >
              Afriomarkets:
            </h1>
            <h2
              className="text-lg-semi mb-4 drop-shadow-md shadow-black"
              style={{ fontFamily: "Lemon" }}
            >
              Africa&apos;s frontline Market Explorer
            </h2>
            <p className="text-base-regular max-w-[24rem] mb-6 drop-shadow-md shadow-black">
              We Envision The Africa where technology marries culture in all its
              diversity, A Tech-Culture fusion across diverse African trades.
            </p>
            <UnderlineLink href="/store">Begin your journey</UnderlineLink>
          </div>

          <Image
            src="/marrakesh.jpg"
            // src="/hero2.jpeg"
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

export default Hero
