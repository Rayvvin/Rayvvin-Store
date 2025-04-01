"use client"

import clsx from "clsx"
// import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"
import { useRef, useState } from "react"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"

// type ImageGalleryProps = {
//   images: MedusaImage[]
// }

const ImageGallery = ({ images }) => {
  const imageRefs = useRef([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleScrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  return (
    <div className="flex gap-x-3 sm:gap-x-2 items-start relative ">
      <div className="flex small:flex flex-col gap-y-4 sticky top-40 md:top-60">
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className={clsx("h-14 w-12 relative border shadow rounded-md", {
                "border-[#3D8B7A]": currentSlide === index,
              })}
              onClick={() => {
                // handleScrollTo(image.id)
                setCurrentSlide(index)
              }}
            >
              <span className="sr-only">Go to image {index + 1}</span>
              <Image
                src={image.url}
                className="absolute inset-0"
                alt="Thumbnail"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </button>
          )
        })}
      </div>

      {/* <Splide
        options={{ rewind: true, arrows: false }}
        aria-label="Image gallery Section"
      > */}
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        <div
          ref={(image) => imageRefs.current.push(image)}
          key={images && images[currentSlide] && images[currentSlide].url}
          className="relative aspect-[29/34] w-full"
          id={images && images[currentSlide] && images[currentSlide].url}
        >
          <Image
            src={images && images[currentSlide].url}
            priority={currentSlide <= 2 ? true : false}
            className="absolute inset-0"
            alt={`Product image ${currentSlide + 1}`}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
      {/* </Splide> */}
    </div>
  )
}

export default ImageGallery
