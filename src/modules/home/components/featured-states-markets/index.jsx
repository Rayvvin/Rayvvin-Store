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
import useStateMarkets from "@lib/hooks/use-state-markets"

const FeaturedStatesMarkets = () => {
  const { stores } = useStores()
  const { data } = useFeaturedProductsQuery({ limit: 4 })
  const [regions, setRegions] = useState([])
  const [markets, setMarkets] = useState([])
  const [stateName, setStateName] = useState("All")
  const {
    stateInfo,
    statesAndMarkets: stateMarkets,
    loading,
    error,
  } = useStateMarkets()

  const filterType = (category) => {
    // console.log(category)
    setRegions(
      markets
        ?.filter((item) => {
          return item.stateName === category
        })
        .slice(0, 10)

      // data?.filter((item) => {
      //   return item.category === category
      // })
    )
  }

  // Define an array of colors
  const colors = ["#048630", "#861B04", "#043086", "#04865F", "#866204"]

  //filter Object
  const filters = [
    {
      title: "Popular States and their Markets",
      slug: "",
      fields: [{ id: "All", name: "All" }].concat(
        stateMarkets.map((state) => {
          const stateId = state.state
            .split(" ")[0]
            .toLowerCase()
            .replace(/\s/g, "-")
          return {
            id: state.state,
            name: state.state.split(" ")[0],
            markets: state.markets.map((mrkt) => {
              return {
                ...mrkt,
                id: mrkt.handle,
                name: mrkt.market_name,
                stateName: state.state,
                state_id: stateId,
              }
            }),
          }
        })
      ),
    },
  ]

  // Function to pick a random color from the array
  const pickRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    // console.log(markets)
    setRegions(markets.slice(0, 10))
  }, [markets])

  useEffect(() => {
    let all_markets = []
    stateMarkets.map((state) => {
      const stateId = state.state
        .split(" ")[0]
        .toLowerCase()
        .replace(/\s/g, "-")
      all_markets = all_markets.concat(
        state.markets.map((mrkt) => {
          return {
            ...mrkt,
            id: mrkt.handle,
            name: mrkt.market_name,
            stateName: state.state,
            state_id: stateId,
          }
        })
      )
    })

    setMarkets(all_markets)
  }, [stateMarkets])

  return (
    <div className="py-6 mb-8">
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
                  <div key={i} className="max-w-full overflow-x-auto">
                    {/* <p
                      className="font-bold text-gray-700 mb-3"
                      style={{ fontFamily: "Lemon, serif" }}
                    >
                      {filter.title}
                    </p> */}
                    <div className="flex flex-row justify-center lg:justify-between xl:justify-between w-full flex-nowrap min-w-80 max-w-full">
                      <div className="flex flex-col items-center lg:items-start mb-1">
                        <span className="text-base-regular text-gray-600 mb-0 ms-1 text-center lg:text-start">
                          Discover
                        </span>
                        <p className="text-[23px] xs:text-[23px] sm:text-[26px] font-bold text-gray-900 max-w-lg mb-2 text-center lg:text-start whitespace-wrap lg:whitespace-nowrap">
                          {filter.title}
                        </p>
                      </div>
                    </div>
                    <div
                      className="block whitespace-nowrap py-2 w-full justfiy-around flex-nowrap mb-2 overflow-x-auto min-w-80 max-w-full"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {filter && filter.fields && filter.fields.length > 0
                        ? filter.fields.map((filterField, i) => {
                            if (filterField.name === "All") {
                              return (
                                <button
                                  key={i}
                                  onClick={() => {
                                    let all_markets = []
                                    stateMarkets.map((state) => {
                                      const stateId = state.state
                                        .split(" ")[0]
                                        .toLowerCase()
                                        .replace(/\s/g, "-")
                                      all_markets = all_markets.concat(
                                        state.markets.map((mrkt) => {
                                          return {
                                            ...mrkt,
                                            id: mrkt.handle,
                                            name: mrkt.market_name,
                                            stateName: state.state,
                                            state_id: stateId,
                                          }
                                        })
                                      )
                                    })

                                    setRegions(all_markets.slice(0, 8))
                                    setStateName("All")
                                  }}
                                  className={`m-1 mx-2 px-4 py-1 rounded-xl font-medium ${
                                    filterField.name &&
                                    filterField.name === stateName
                                      ? "bg-[#52475D] text-white"
                                      : "bg-white text-black"
                                  } text-sm hover:bg-[#52475D] hover:text-white whitespace-nowrap`}
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
                                  onClick={() => {
                                    filterType(filterField.id)
                                    setStateName(filterField.name)
                                  }}
                                  className={`m-1 mx-2 px-4 py-1 rounded-xl font-medium ${
                                    filterField.name &&
                                    filterField.name === stateName
                                      ? "bg-[#52475D] text-white"
                                      : "bg-white text-black"
                                  } text-sm hover:bg-[#52475D] hover:text-white whitespace-nowrap`}
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
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xs:gap-2">
          {regions
            ? regions.map((store) => (
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
          <UnderlineLink href="/categories">Explore Markets</UnderlineLink>
        </div>
      </div>
    </div>
  )
}

export default FeaturedStatesMarkets
