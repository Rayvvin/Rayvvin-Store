"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { getProductsList } from "@lib/data"
import { useEffect, useState } from "react"
import Thumbnail from "../../../products/components/thumbnail"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"
import { useProductCategories } from "medusa-react"
import Link from "next/link"
import clsx from "clsx"
import Image from "next/image"
import { slides } from "./data";


const CategoriesHero = (props) => {
  const { title, products: prods, store } = props
  const { product_categories:categories } = useProductCategories()
  const { data } = useFeaturedProductsQuery({
    limit: 5,
    category_id: categories,
    id: prods?.map((p) => p.id),
    store: store,
  })
  const [products, setProducts] = useState([])

  const filterType = (category) => {
    setProducts(
      data?.filter((item) => {
        return item.category === category
      })
    )
  }

  // Define an array of colors
  const colors = ["#048630", "#861B04", "#043086", "#04865F", "#866204"]

  //filter Object
  const filters = [
    {
      title: "Weekly Popular Products from Alaba Int’l",
      slug: "",
      // fields: [
      //   { id: "All", name: "All" },
      //   { id: "Shirts", name: "Shirts" },
      //   { id: "SweatShirts", name: "SweatShirts" },
      //   { id: "Trousers", name: "Trousers" },
      //   { id: "Hoodies", name: "Hoodies" },
      // ],
    },
  ]

  //Discount Object
  const discounts = [
    {
      price: "20",
      bg_color: "#5C5F6E",
    },
    {
      price: "120",
      bg_color: "#FF7583",
    },
    {
      price: "69",
      bg_color: "#D9A08A",
    },
    {
      price: "85",
      bg_color: "#5C5F6E",
    },
    {
      price: "10",
      bg_color: "#E09A55",
    },
  ]

  // Function to pick a random color from the array
  const pickRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    // console.log(data)
    setProducts(data)
  }, [data])

  useEffect(()=>{
    if(categories){
      console.log(categories)
    }
  },[categories])

  return (
    <div className="py-3">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-24 lg:py-24 px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 pb-2 md:pb-4 lg:pb-4 gap-4">
        {/* Categories Column */}
        <div className="w-full lg:w-1/4 flex flex-col space-y-4 order-last xs:order-last sm:order-last md:order-last lg:order-first xl:order-first">
          <h3 className="text-xl font-semibold">Categories</h3>
          <div className="flex flex-col space-y-2">
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Carousel */}
        <div className="w-full lg:w-3/4 mt-8 lg:mt-0 !rounded-md">
          <Splide
            options={{
              type: "loop",
              perPage: 1,
              autoplay: !true,
              interval: 3000,
              pagination: false,
              arrows: false,
              drag: "free",
              gap: "1rem",
            }}
          >
            {slides.map((slide, index) => (
              <SplideSlide key={index}>
                <div className="relative w-full h-64 lg:h-96">
                  <Image
                    // src={slide.image}
                    src='/hero2.png'
                    alt={slide.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center !rounded-md">
                    <div className="text-center">
                      <h2 className="text-white text-2xl lg:text-4xl font-bold mb-4">
                        {slide.title}
                      </h2>
                      <p className="text-white text-lg lg:text-xl">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  )
}

export default CategoriesHero
