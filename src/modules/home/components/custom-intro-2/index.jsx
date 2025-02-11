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

const CustomIntro2 = () => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  return (
    <main className="container mx-auto mt-8">
      <section className="text-center">
        <h2 className="text-4xl font-heading text-primary mb-4">
          ...where culture meets technology
        </h2>
        <p className="text-xl font-body text-accent mb-8">
          Explore the vibrant markets and stores across Africa from the comfort
          of your home.
        </p>
        <button className="bg-secondary text-white py-2 px-6 rounded-lg hover:bg-primary transition-all">
          Explore Now
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mx-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/marrakesh.jpg"
            alt="Market 1"
            width={500}
            height={300}
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-2xl font-heading text-primary">Market 1</h3>
            <p className="text-accent font-body">
              Discover the best products in Market 1.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/marrakesh.jpg"
            alt="Market 2"
            width={500}
            height={300}
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-2xl font-heading text-primary">Market 2</h3>
            <p className="text-accent font-body">
              A fusion of culture and modernity at Market 2.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/marrakesh.jpg"
            alt="Market 3"
            width={500}
            height={300}
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-2xl font-heading text-primary">Market 3</h3>
            <p className="text-accent font-body">
              Experience the richness of African markets at Market 3.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CustomIntro2
