"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

import { getProductsList } from "@lib/data"
import { useEffect, useMemo, useState } from "react"
import useStores from "@lib/hooks/use-stores"
import Image from "next/image"
import CustomHero from "@modules/home/components/custom-hero"
import CustomDeals from "../custom-deals"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

const FlashDealProducts = (props) => {
  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState([])
  const { store, users, products: prods, categories: cat } = props
  const { data } = useFeaturedProductsQuery({
    limit: 12,
    // category_id: categories,
    // id: prods && prods.length && prods.map((p) => p.id),
    // store: store,
  })

  const memoizedData = useMemo(() => data, [data])

  const filterType = (category) => {
    setProducts(
      data?.filter((item) => {
        if (item && item.category && item.category.id) {
          return item.category.id === category
        } else {
          return false
        }
      })
    )
  }

  // Define an array of colors
  const colors = ["#048630", "#861B04", "#043086", "#04865F", "#866204"]

  //filter Object
  const filters = [
    {
      title: "",
      slug: "",
      fields: [
        { id: "All", name: "All" },
        { id: "Shirts", name: "Shirts" },
        { id: "SweatShirts", name: "SweatShirts" },
        { id: "Trousers", name: "Trousers" },
        { id: "Hoodies", name: "Hoodies" },
      ],
    },
  ]

  // Function to pick a random color from the array
  const pickRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    setProducts(data)
  }, [data])

  useEffect(() => {
    setCategories([{ id: "All", name: "All" }].concat(cat))
  }, [cat])

  return (
    // <div className="py-12">
    <div className="content-container py-12">
      {/* <CustomHero images={["/rayvvin_pngs/Ad banner.png"]} sx={'px-2! mb-4'} pag={false}/> */}

      <div className="flex flex-row justify-center lg:justify-between xl:justify-between w-full flex-nowrap overflow-x-auto min-w-80 max-w-full">
        <CustomDeals />

        {/* <div className="flex flex-col items-center lg:items-start mb-4">
            <span className="text-base-regular text-gray-600 mb-0 ms-1 text-center lg:text-start">
              Discover
            </span>
            <p className="text-[23px] xs:text-[23px] sm:text-[26px] font-bold text-gray-900 max-w-lg mb-2 lg:whitespace-nowrap">
              What&apos;s New on {store ? store?.name : null}
            </p>
          </div> */}
      </div>

      <div className="flex flex-col lg:flex-row justify-between">
        {/* Fliter Type */}
        {/* {filters
            ? filters.map((filter, i) => {
                return (
                  <div key={i}>
                    <p className="text-sm font-bold text-gray-700 mb-3">
                      {filter.title}
                    </p>
                    <div
                      className="inline-flex justfiy-around flex-nowrap mb-4 min-w-80 overflow-x-auto max-w-full"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {categories && categories.length > 0
                        ? categories.map((filterField, i) => {
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
            : null} */}
      </div>

      <ul
        // className="grid grid-cols-2 small:grid-cols-6 gap-x-4 gap-y-8"
        className={` ${
          products && products.length > 0 ? "grid" : "grid"
        } grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8`}
      >
        {products && products.length > 0 ? (
          products
            .toReversed()
            // .slice(0, products.length - 2)
            .map((product) => (
              <li key={product.id}>
                <ProductPreview {...product} />
              </li>
            ))
        ) : products && products.length == 0 ? (
          <div className="flex w-full items-center justify-center">
            <p className="text-l font-semi-bold text-gray-700 mb-3">
              {"No Products Available"}
            </p>
          </div>
        ) : (
          Array.from(Array(8).keys()).map((i) => (
            <li key={i}>
              <SkeletonProductPreview />
            </li>
          ))
        )}
      </ul>
      {products && products.length > 0 && (
        <div className="w-full mt-8 relative flex flex-row justify-center items-center text-[#3D8B7A] text-sm gap-x-2">
          <Link href="/store">See More</Link>
          <span className="flex flex-row gap-x-0">
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      )}
    </div>
    // </div>
  )
}

export default FlashDealProducts
