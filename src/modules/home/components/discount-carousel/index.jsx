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

const DiscountCarousel = (props) => {
  const { title,  categories, products:prods, store,  } = props
  const { data } = useFeaturedProductsQuery({ limit: 5, category_id: categories, id: prods?.map((p) => p.id), store: store })
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
    console.log(data)
    setProducts(data)
  }, [data])

  return (
    <div className="py-6">
      <div className="content-container py-2">
        {/* <div className="flex flex-col items-center text-center mb-8">
          <span className="text-base-regular text-gray-600 mb-4">
            Latest products
          </span>
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-2">
            Our newest styles are here to help you look your best.
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row justify-between">
          {/* Fliter Type */}
          {filters
            ? filters.map((filter, i) => {
                return (
                  <div key={i}>
                    <p className="font-bold text-gray-700 mb-3">
                      {title ? title : filter.title}
                    </p>
                    <div className="inline-flex justfiy-around flex-nowrap mb-4 min-w-80 overflow-x-auto max-w-full">
                      {filter && filter.fields && filter.fields.length > 0
                        ? filter.fields.map((filterField, i) => {
                            if (filterField.name === "All") {
                              return (
                                <button
                                  key={i}
                                  onClick={() => setProducts(data)}
                                  className="m-1 mx-2 px-4 py-1 rounded-xl text-black font-medium bg-white text-sm hover:bg-[#52475D] hover:text-white"
                                  style={{
                                    border: "1px solid rgb(33, 43, 54)",
                                  }}
                                >
                                  {filterField.name}
                                </button>
                              )
                            } else {
                              return (
                                <button
                                  key={i}
                                  onClick={() => filterType(filterField.id)}
                                  className="m-1 mx-2 px-4 py-1 rounded-xl text-black font-medium bg-white text-sm hover:bg-[#52475D] hover:text-white"
                                  style={{
                                    border: "1px solid rgb(33, 43, 54)",
                                  }}
                                >
                                  {filterField.name}
                                </button>
                              )
                            }
                          })
                        : null}
                    </div>
                  </div>
                )
              })
            : null}
        </div>

        {/* <div 
        className="inline-flex gap-x-4 flex-auto justfiy-around flex-nowrap mb-4 min-w-80 w-full"
        > */}
        <Splide
          options={{
            rewind: true,
            arrows: false,
            perPage: 5,
            breakpoints: {
              560: {
                perPage: 1,
              },
              768: {
                perPage: 2,
              },
              960: {
                perPage: 3,
              },
              1280: {
                perPage: 4,
              },
              1440: {
                perPage: 5,
              },
            },
          }}
          aria-label="Discount Section"
          className="inline-flex gap-x-4 flex-auto justfiy-around flex-nowrap mb-4 min-w-80 w-full"
        >
          {discounts && discounts.length > 0 ? (
            discounts.map((product, i) => {
              return (
                <SplideSlide key={i}>
                  <div className="min-w-[240px] sm:min-w-[240px] md:min-w-[230px] lg:min-w-[230px] xl:min-w-[230px] m-2">
                    <div
                      class="max-w-sm rounded-lg shadow-card my-2"
                      style={{ background: discounts[i].bg_color }}
                    >
                      <div class="p-5">
                        <p class="mb-3 text-white font-normal ">Save</p>
                        <span className="inline-flex">
                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            $
                          </p>
                          <a href="#">
                            <h1 class="mb-2 text-5xl font-regular tracking-tight text-gray-800">
                              {product.price ? (
                                <>{discounts[i].price}</>
                              ) : (
                                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
                              )}
                            </h1>
                          </a>
                        </span>

                        <p class="mb-3 text-white text-sm font-normal ">
                          Enjoy amazing discount for every purchase you make
                        </p>
                        {/* <a
                          href="#"
                          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Read more
                          <svg
                            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </a> */}
                      </div>
                      <Thumbnail thumbnail={`/discounts${i+1}.png`} size="full" />
                    </div>
                  </div>
                </SplideSlide>
              )
            })
          ) : (
            <div className="inline-flex gap-x-4 flex-auto justfiy-start flex-nowrap mb-4 min-w-80 overflow-x-auto max-w-full">
              {Array.from(Array(8).keys()).map((i) => (
                <div
                  key={i}
                  className="min-w-[150px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[250px]"
                >
                  <SkeletonProductPreview />
                </div>
              ))}
            </div>
          )}
        </Splide>
        {/* </div> */}

        <div className="w-full mt-4 relative flex justify-end items-center">
          <UnderlineLink href="/store">See More</UnderlineLink>
        </div>
      </div>
    </div>
  )
}

export default DiscountCarousel
