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
import { Tab } from "@headlessui/react"
import clsx from "clsx"
import React from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

const ExploreProducts = (props) => {
  // const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState(null)
  const { stores, users, products: prods, categories: cat } = props
  const { data: products } = useFeaturedProductsQuery({
    limit: 12,
    category_id: cat ? [cat?.id].concat(cat?.category_children.map(ct => ct.id)) : [],
    // id: prods && prods.length && prods.map((p) => p.id),
    // expand: '* , variants'
    // store: store,
  })

  // const memoizedData = useMemo(() => data, [data])

  // const filterType = (category) => {
  //   setProducts(
  //     data?.filter((item) => {
  //       if (item && item.category && item.category.id) {
  //         return item.category.id === category
  //       } else {
  //         return false
  //       }
  //     })
  //   )
  // }

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

  // useEffect(() => {
  //   setProducts(data)
  // }, [data])

  useEffect(() => {
    if (products) {
      console.log(products)
    }
  }, [products])

  // useEffect(() => {
  //   setCategories([{ id: "All", name: "All" }].concat(cat))
  // }, [cat])

  // const tabs = [
  //   {
  //     label: "Top Rating",
  //     component: <ProductsTab products={products} />,
  //   },
  //   {
  //     label: "Best Selling",
  //     component: <ProductsTab products={products} />,
  //   },
  //   {
  //     label: "Featured",
  //     component: <ProductsTab products={products} />,
  //   },
  // ]
  const tabs = useMemo(() => {
    return [
      {
        label: "Top Rating",
        component: <ProductsTab products={products} />,
      },
      {
        label: "Best Selling",
        component: <ProductsTab products={products} />,
      },
      {
        label: "Featured",
        component: <ProductsTab products={products} />,
      },
    ]
  }, [products])

  return (
    <div className="py-12">
      <div className="content-container py-12">
        {/* <CustomHero images={["/rayvvin_pngs/Ad banner.png"]} sx={'px-2! mb-4'} pag={false}/> */}
        <div className="flex flex-row justify-center w-full flex-nowrap overflow-x-auto min-w-80 max-w-full">
          {/* <CustomDeals /> */}

          <div className="flex flex-col items-center mb-4">
            {/* <span className="text-base-regular text-gray-600 mb-0 ms-1 text-center lg:text-start">
              Discover
            </span> */}
            <p className="text-[22px] xs:text-[23px] sm:text-[24px] font-bold text-gray-900 max-w-lg mb-2 lg:whitespace-nowrap">
              EXPLORE OUR PRODUCTS
            </p>
          </div>
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
        <div className="flex flex-col mx-0 lg:mx-0 px-0 w-full gap-y-2">
          <Tab.Group>
            <Tab.List className="border-b border-gray-200 box-border flex flex-row justify-center pt-3 w-full bg-transparent rounded-t-none gap-x-2 overflow-x-auto overflow-y-clip">
              {tabs.map((tab, i) => {
                return (
                  <Tab
                    key={i}
                    className={({ selected }) =>
                      clsx(
                        "text-center text-[#595959] uppercase text-small-regular -mb-px pb-2 mx-4 border-b-2 border-gray-200 transition-color duration-150 ease-in-out whitespace-nowrap focus:",
                        {
                          "border-b-2 mb-0 !border-[#3D8B7A] text-black":
                            selected,
                        }
                      )
                    }
                  >
                    {tab.label}
                  </Tab>
                )
              })}
            </Tab.List>
            <Tab.Panels className="flex flex-col px-3 bg-transparent rounded-b-lg">
              {tabs.map((tab, j) => {
                return <div key={j}>{tab.component}</div>
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}

export default ExploreProducts

const ProductsTab = ({ products }) => {
  return (
    <Tab.Panel>
      <ul
        // className="grid grid-cols-2 small:grid-cols-6 gap-x-4 gap-y-8"
        className={` ${
          products && products.length > 0 ? "grid" : "grid"
        } grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6`}
      >
        {products && products.length > 0 ? (
          products.map((product) => (
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
          <Link href="/store">Visit Our Marketplace</Link>
          <span className="flex flex-row gap-x-0">
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      )}
    </Tab.Panel>
  )
}
