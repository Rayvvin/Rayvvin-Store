"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"

const CustomHero = ({images, sx, pag, }) => {
  return (
    <section className={`mt-8 px-6 ${sx}`}>
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          pauseOnHover: true,
          arrows: !true,
          pagination: pag || true,
          speed: 800,
        }}
        aria-label="Afriomarkets Carousel"
      >
        {images && images.map(img_url => <SplideSlide>
          <img
            src={img_url}
            alt="Market Scene 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </SplideSlide>)}
        
      </Splide>
    </section>
  )
}

export default CustomHero
