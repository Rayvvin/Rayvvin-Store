"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import useStores from "@lib/hooks/use-stores"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

import { getProductsList, getStores } from "@lib/data"
import { useEffect, useState } from "react"
import Image from "next/image"
import RegionCard from "./regionCard"

const FeaturedRegions = () => {
  const { stores } = useStores()
  const { data } = useFeaturedProductsQuery({ limit: 4 })
  const [regions, setRegions] = useState([])

  const filterType = (category) => {
    setRegions(
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
      title: "Popular Stores",
      slug: "",
      fields: [
        // { id: "All", name: "All" },
        // { id: "Lagos", name: "Lagos" },
        // { id: "Abia", name: "Abia" },
        // { id: "Anambra", name: "Anambra" },
        // { id: "Enugu", name: "Enugu" },
      ],
    },
  ]

  // Function to pick a random color from the array
  const pickRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    console.log(stores)
    // setRegions(data)
  }, [stores])

  return (
    <div className="py-4">
      <div className="content-container py-2">
        {/* <div className="flex flex-col items-center text-center mb-8">
          <span className="text-base-regular text-gray-600 mb-4">
            Featured regions
          </span>
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-2">
            Our available regions are here to help you look your best.
          </p>
        </div> */}
        {/* Filter Row */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Fliter Type */}
          {filters
            ? filters.map((filter, i) => {
                return (
                  <div key={i}>
                    {/* <p className="font-bold text-gray-700 mb-3" style={{fontFamily: "Lemon, serif"}}>
                      {filter.title}
                    </p> */}
                    <div className="flex flex-row justify-center lg:justify-between xl:justify-between w-full flex-nowrap overflow-x-auto min-w-80 max-w-full">
                      <div className="flex flex-col items-center lg:items-start mb-1">
                        <span className="text-base-regular text-gray-600 mb-0 ms-1 text-center lg:text-start">
                          Discover
                        </span>
                        <p className="text-[23px] xs:text-[23px] sm:text-[26px] font-bold text-gray-900 max-w-lg mb-2 text-center lg:text-start lg:whitespace-nowrap">
                          {filter.title}
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
                                  onClick={() => setRegions(data)}
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
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-1">
          {stores
            ? stores.slice(0, 10).map((store) => (
                <li key={store.id}>
                  <RegionCard region={store} color={pickRandomColor()} />
                </li>
              ))
            : Array.from(Array(8).keys()).map((i) => (
                <li key={i}>
                  <div className="w-full h-24 animate-pulse bg-gray-100"></div>
                </li>
              ))}
        </ul>
        <div className="w-full mt-4 relative flex justify-end items-center">
          <UnderlineLink href="/stores">Explore Shops</UnderlineLink>
        </div>
      </div>
    </div>
  )
}

export default FeaturedRegions
