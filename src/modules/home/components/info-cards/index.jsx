"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { BiPackage, BiCategory, BiTrendingUp, BiTrophy } from "react-icons/bi"
import { getProductsList } from "@lib/data"
import { useEffect, useState } from "react"
import Image from "next/image"
import InfoCard from "./infoCard"
import StarRatingComponent from "react-star-rating-component"

const InfoCards = (props) => {
  const { data } = useFeaturedProductsQuery({ limit: 4 })
  const [regions, setRegions] = useState([])
  const { store, users, products: prods, storeCategories } = props

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
      title: "Regional Markets",
      slug: "",
      fields: [
        { id: "All", name: "All" },
        { id: "Lagos", name: "Lagos" },
        { id: "Abia", name: "Abia" },
        { id: "Anambra", name: "Anambra" },
        { id: "Enugu", name: "Enugu" },
      ],
    },
  ]

  //Store Metrics
  const metrics = {
    title: "Store Metrics",
    slug: "",
    fields: [
      {
        id: "Avg. Delivery Time",
        name: "Avg. Del. Time",
        icon: BiPackage,
        value: "within 24 Hours",
      },
      {
        id: "Categories",
        name: "Categories",
        icon: BiCategory,
        value: storeCategories?.map((ct) => ct.name).join(", "),
      },
      {
        id: "Top-Selling Products",
        name: "Top-Selling",
        icon: BiTrendingUp,
        value: "",
      },
      {
        id: "Satisfaction Rate",
        name: "Satisfaction Rate",
        icon: BiTrophy,
        value: (
          <div className="text-base-regular px-2 mt-2 flex">
            <StarRatingComponent
              name="rate2"
              editing={false}
              starCount={5}
              value={3}
              renderStarIcon={() => (
                <i style={{ fontStyle: "normal", fontSize: "15px" }}>★</i>
              )}
              starColor={"rgb(34, 197, 94)"}
            />
          </div>
        ),
      },
    ],
  }

  // Function to pick a random color from the array
  const pickRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    console.log(regions)
    setRegions(data)
  }, [data])

  useEffect(() => {
    if (prods) {
      console.log(prods)
    }
  }, [prods])

  return (
    <div className="py-2">
      <div className="content-container py-2">
        <div className="flex w-full justify-start items-end">
          <div
            className="relative inline-flex items-center justify-center 
            min-w-[110px] sm:min-w-[120px] md:min-w-[130px] lg:min-w-[140px] xl:min-w-[150px]
            min-h-[110px] sm:min-h-[120px] md:min-h-[130px] lg:min-h-[140px] xl:min-h-[150px]  
            overflow-hidden rounded-full dark:bg-gray-600 m-1 dark:ring-gray-500 p-1 shadow-card"
            style={{ background: "white", boxShadow: "none" }}
          >
            <div
              className="relative inline-flex items-center justify-center 
              min-w-[100px] sm:min-w-[110px] md:min-w-[120px] lg:min-w-[130px] xl:min-w-[140px]
              min-h-[100px] sm:min-h-[110px] md:min-h-[120px] lg:min-h-[130px] xl:min-h-[140px]  
              overflow-hidden rounded-full dark:bg-gray-600 m-1 dark:ring-gray-500 p-1 shadow-card"
              style={{ background: pickRandomColor() }}
            >
              <Image
                src={
                  store?.logo ||
                  `/rayvvin_pngs/store_banners/${store?.name.toLowerCase()}.jpg`
                } // store?.logo
                // src={`/rayvvin_pngs/store_banners/${store?.name.toLowerCase()}.jpg`}
                alt={store?.name}
                // width={100}
                // height={100}
                fill
                // layout="fixed"
                // objectFit="contain"
              />
              {/* <span
                className="font-medium text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white"
                style={{ fontFamily: "Lemon, serif" }}
              >
                {store?.name.split("")[0]}
              </span> */}
            </div>
          </div>
          <div
            className="flex flex-col items-center text-startr mb-3 md:mb-5 lg:mb-3 xl:mb-3"
            style={{ fontFamily: "Lemon, serif" }}
          >
            <p className="text-xl lg:text-2xl-regular leading-4 xl:leading-6 lg:leading-6 text-gray-900 max-w-lg mb-1">
              {store?.name}
            </p>
            <div className="flex justify-start w-full">
              <span className="text-base-regular text-gray-600 mb-2">
                {store && store.metadata && store.metadata.market
                  ? store.metadata.market.state
                  : "Address"}{" "}
                -{" "}
                {store && store.metadata && store.metadata.market
                  ? store.metadata.market.market_name
                  : "City"}
              </span>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
          {metrics && metrics.fields && metrics.fields.length
            ? metrics.fields.map((metric) => (
                <li key={metric.id}>
                  <InfoCard region={metric} color={pickRandomColor()} />
                </li>
              ))
            : Array.from(Array(8).keys()).map((i) => (
                <li key={i}>
                  <div className="w-full h-24 animate-pulse bg-gray-100"></div>
                </li>
              ))}
        </ul>
        {/* <div className="w-full mt-4 relative flex justify-end items-center">
          <UnderlineLink href="/store">Explore regions</UnderlineLink>
        </div> */}
      </div>
    </div>
  )
}

export default InfoCards
