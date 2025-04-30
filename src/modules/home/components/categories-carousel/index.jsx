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

const CategoriesCarousel = (props) => {
  const { title, categories, products: prods, store } = props
  const { product_categories } = useProductCategories({expand: 'metadata'})
  const { data } = useFeaturedProductsQuery({
    limit: 5,
    category_id: categories,
    id: prods?.map((p) => p.id),
    store: store,
  })
  const [products, setProducts] = useState([])

  // const filterType = (category) => {
  //   setProducts(
  //     data?.filter((item) => {
  //       return item.category === category
  //     })
  //   )
  // }

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

  const category_names = [
    {
      name: "Vegetables",
      image: "cat_1.png",
    },
    {
      name: "Essentials",
      image: "cat_2.png",
    },
    {
      name: "Swallow",
      image: "cat_3.png",
    },
    {
      name: "Meat&Fish",
      image: "cat_4.png",
    },
    {
      name: "Beverages",
      image: "cat_5.png",
    },
    {
      name: "Fruits",
      image: "cat_6.png",
    },
  ]

  // Function to pick a random color from the array
  const pickRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    console.log(product_categories)
    // setProducts(data)
  }, [product_categories])

  return (
    <div className="mt-0">
      {categories &&
        categories.category_children &&
        categories.category_children.length > 0 && (
          <div className="content-container py-2 max-w-full px-6">
            {/* <div className="flex flex-col items-center text-center mb-8">
          <span className="text-base-regular text-gray-600 mb-4">
            Latest products
          </span>
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-2">
            Our newest styles are here to help you look your best.
          </p>
        </div> */}

            <div className="flex flex-col lg:flex-row">
              {/* Fliter Type */}
              {filters
                ? filters.map((filter, i) => {
                    return (
                      <div key={i}>
                        <p
                          className="font-bold text-gray-700 mb-6 text-lg sm:text-lg md:text-lg lg:text-lg xl:text-xl"
                          // style={{ fontFamily: "Lemon, serif" }}
                        >
                          {categories ? `Shop ${categories?.name} by categories` : `Shop Rayvvin by categories`}
                        </p>
                      </div>
                    )
                  })
                : null}
            </div>

            <div
              className={` ${
                category_names && category_names.length > 0 ? "grid" : "flex"
              } w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-x-4 gap-y-0`}
            >
              {categories &&
              categories.category_children &&
              categories.category_children.length > 0
                ? categories.category_children?.slice(0, 6).map((c, i) => {
                    // if (c.parent_category) {
                    //   return
                    // }

                    // const children = c.category_children?.map((child) => ({
                    //   name: child.name,
                    //   handle: child.handle,
                    //   id: child.id,
                    // }))

                    return (
                      <Link
                        href={c.category_children && c.category_children.length ? `/${c.handle}` : `/${c.handle}/products`}
                        className="flex flex-col justify-center items-center"
                        key={i}
                      >
                        <div
                          class="flex flex-col max-w-full w-[78px] sm:w-[120px] aspect-[1/1]  rounded-full shadow-sm px-4 py-3 border-1 hover:border-[#008ECC] justify-center items-center"
                          // style={{ background: discounts[i].bg_color }}
                          style={{ background: "#F5F5F5" }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              position: "relative",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Image
                              src={`/rayvvin_pngs/categories/${category_names[i].image}`}
                              alt="Thumbnail"
                              className="absolute inset-0"
                              draggable={false}
                              fill
                              sizes="100vw"
                              style={{
                                objectFit: "contain",
                                objectPosition: "center",
                                borderRadius: "9px",
                              }}
                            />
                          </div>

                          {/* <Thumbnail
                      thumbnail={`/category${i + 1}.png`}
                      size="full"
                      classNamez="rounded-lg!"
                    /> */}
                        </div>
                        <span className="inline-flex py-2 px-2 justify-center items-center w-full">
                          <p
                            className={
                              "text-small-semi mb-3 font-normal text-[#737373]"
                            }
                          >
                            <li className="flex flex-col gap-2" key={c.name}>
                              {c.name}
                            </li>
                          </p>
                        </span>
                      </Link>
                    )
                  })
                : // <div className="inline-flex gap-x-4 flex-auto justfiy-center items-center flex-nowrap mb-4 min-w-80 overflow-x-hidden max-w-full w-full">
                  //   {Array.from(Array(5).keys()).map((i) => (
                  //     <div
                  //       key={i}
                  //       className="min-w-[150px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[250px]"
                  //     >
                  //       <SkeletonProductPreview />
                  //     </div>
                  //   ))}
                  // </div>
                  null}
            </div>

            <div className="w-full mt-4 relative flex justify-end items-center"></div>
          </div>
        )}
      {!categories && product_categories && (
        <div className="content-container py-2 max-w-full px-6">
          {/* <div className="flex flex-col items-center text-center mb-8">
          <span className="text-base-regular text-gray-600 mb-4">
            Latest products
          </span>
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-2">
            Our newest styles are here to help you look your best.
          </p>
        </div> */}

          <div className="flex flex-col lg:flex-row">
            {/* Fliter Type */}
            {filters
              ? filters.map((filter, i) => {
                  return (
                    <div key={i}>
                      <p
                        className="font-bold text-gray-700 mb-6 text-lg sm:text-lg md:text-lg lg:text-lg xl:text-xl"
                        // style={{ fontFamily: "Lemon, serif" }}
                      >
                        
                        {categories ? `Shop ${categories?.name} by categories` : ``}
                      </p>
                    </div>
                  )
                })
              : null}
          </div>

          <div
            className={` ${
              category_names && category_names.length > 0 ? "grid" : "flex"
            } w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-x-4 gap-y-0`}
          >
            {product_categories &&
              product_categories.filter((cat) => {
                return !cat.parent_category_id
              }).length &&
              product_categories
                .filter((cat) => {
                  return !cat.parent_category_id
                })
                .slice(0, 6)
                .map((c, i) => {
                  // if (c.parent_category) {
                  //   return
                  // }

                  // const children = c.category_children?.map((child) => ({
                  //   name: child.name,
                  //   handle: child.handle,
                  //   id: child.id,
                  // }))

                  return (
                    <Link
                      href={`/${c.handle}`}
                      className="flex flex-col justify-center items-center"
                      key={i}
                    >
                      <div
                        class="flex flex-col max-w-full w-[78px] sm:w-[120px] aspect-[1/1]  rounded-full shadow-sm px-4 py-3 border-1 hover:border-[#008ECC] justify-center items-center"
                        // style={{ background: discounts[i].bg_color }}
                        style={{ background: "#F5F5F5" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Image
                            src={`/rayvvin_pngs/categories/${category_names[i].image}`}
                            alt="Thumbnail"
                            className="absolute inset-0"
                            draggable={false}
                            fill
                            sizes="100vw"
                            style={{
                              objectFit: "contain",
                              objectPosition: "center",
                              borderRadius: "9px",
                            }}
                          />
                        </div>

                        {/* <Thumbnail
                      thumbnail={`/category${i + 1}.png`}
                      size="full"
                      classNamez="rounded-lg!"
                    /> */}
                      </div>
                      <span className="inline-flex py-2 px-2 justify-center items-center w-full">
                        <p
                          className={
                            "text-small-semi mb-3 font-normal text-[#737373]"
                          }
                        >
                          <li className="flex flex-col gap-2" key={c.name}>
                            {c.name}
                          </li>
                        </p>
                      </span>
                    </Link>
                  )
                })}
          </div>

          <div className="w-full mt-4 relative flex justify-end items-center"></div>
        </div>
      )}
    </div>
  )
}

export default CategoriesCarousel
