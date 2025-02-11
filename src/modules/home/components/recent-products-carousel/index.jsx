"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

import { getProductsList } from "@lib/data"
import { useEffect, useState } from "react"

const RecentProductsCarousel = (props) => {
  const { title, categories, products: prods, store } = props
  const { data } = useFeaturedProductsQuery({
    limit: 8,
    // category_id: categories,
    id: prods && prods.length && prods.map((p) => p.id),
    // store: store,
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

        <div className="flex flex-row justify-between w-full min-w-80 max-w-full px-4">
          {/* Fliter Type */}
          {filters
            ? filters.map((filter, i) => {
                return (
                  <div className="flex" key={i}>
                    {/* <p className="text-xl font-bold text-gray-700 mb-3">
                      {title ? title : filter.title}
                    </p> */}
                    <div className="flex flex-row justify-between w-full min-w-80 max-w-full" >
                      <div className="flex flex-col items-center lg:items-start mb-1">
                        {/* <span className="text-base-regular text-gray-600 mb-0 ms-1 text-center lg:text-start">
                          Discover
                        </span> */}
                        <p className="text-[16px] xs:text-[20px] sm:text-[22px] md:text-[24px] font-bold text-gray-900 max-w-lg mb-1 text-center lg:text-start lg:whitespace-nowrap">
                          {title ? title : filter.title}
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex justfiy-around flex-nowrap mb-2 min-w-80 overflow-x-auto max-w-full">
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
        <div
          className={` ${
            products && products.length > 0 ? "inline-flex" : "flex"
          } gap-x-4 flex-auto justfiy-around flex-nowrap mb-4 min-w-80 overflow-x-auto max-w-full px-2`}
          style={{ scrollbarWidth: "none" }}
        >
          {products && products.length > 0 ? (
            products.map((product, i) => {
              return (
                <div
                  key={i}
                  className="min-w-[200px] sm:min-w-[200px] md:min-w-[200px] lg:min-w-[200px] xl:min-w-[200px]"
                >
                  <ProductPreview {...product} />
                </div>
              )
            })
          ) : products && products.length == 0 ? (
            <div className="flex w-full items-center justify-center">
              <p className="text-l font-semi-bold text-gray-700 mb-3">
                {"No Products Available"}
              </p>
            </div>
          ) : (
            Array.from(Array(8).keys()).map((i) => (
              <div
                key={i}
                className="min-w-[150px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[250px] xl:min-w-[350px]"
              >
                <SkeletonProductPreview />
              </div>
            ))
          )}
        </div>

        {/* <div className="w-full mt-4 relative flex justify-end items-center">
          <UnderlineLink href="/store">See More</UnderlineLink>
        </div> */}
      </div>
    </div>
  )
}

export default RecentProductsCarousel
