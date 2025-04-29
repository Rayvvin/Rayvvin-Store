"use client"

import FeaturedProducts from "@modules/home/components/featured-products"
import FlashDealProducts from "@modules/home/components/flash-deals-products"
import ExploreProducts from "@modules/home/components/explore-products"
import FeaturedRegions from "@modules/home/components/featured-regions"
import FeaturedStates from "@modules/home/components/featured-states"
import FeaturedStatesMarkets from "@modules/home/components/featured-states-markets"
import ProductCarousel from "@modules/home/components/product-carousel"
import RecentProductsCarousel from "@modules/home/components/recent-products-carousel"
import DiscountCarousel from "@modules/home/components/discount-carousel"
import CategoriesCarousel from "@modules/home/components/categories-carousel"
import ServicesCarousel from "@modules/home/components/services-carousel"
import BrandsCarousel from "@modules/home/components/brands-carousel"
import Hero from "@modules/home/components/hero"
import CustomHero from "@modules/home/components/custom-hero"
import CustomIntro from "@modules/home/components/custom-intro"
import { Metadata } from "next"
import useStoresProducts from "@lib/hooks/use-stores-products"
import { useEffect, useState } from "react"
import useStoreCategories from "@lib/hooks/use-store-categories"
import CategoriesHero from "@modules/home/components/categories-hero"
import CustomDeals from "@modules/home/components/custom-deals"
import CustomDealsBlue from "@modules/home/components/custom-deals-blue"
import MarketplaceGrid from "@modules/home/components/marketplace-grid"
import FeaturedStores from "../featured-stores"
import RecommendedProducts from "@modules/home/components/recommended-products"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import {
  faCoffee,
  faUser,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CustomDealsSubscribe from "@modules/home/components/custom-deals-subscribe"
import CustomDealsStats from "@modules/home/components/custom-deals-stats"
import { useProductCategories } from "medusa-react"

const HomePage = (props) => {
  const { category } = props
  const { stores, products, categories, loading, error } = useStoresProducts()
  // const { product_categories } = useProductCategories({
  //   expand: "products",
  // })

  // useEffect(() => {
  //   if (product_categories) {
  //     console.log(product_categories)
  //   }
  // }, [product_categories])

  return (
    <div>
      {/* <Hero /> */}
      <div className="lg:container mx-auto box-border xl:px-32 lg:px-24 md:px-4">
        <CustomHero
          images={[
            "/rayvvin_pngs/Ad banner.png",
            "/rayvvin_pngs/Ad banner2.png",
            "/rayvvin_pngs/banner3.jpg",
            "/rayvvin_pngs/banner5.png",
            "/rayvvin_pngs/banner6.png",
          ]}
          sx={"mb-8"}
        />
        <CategoriesCarousel
          title={"Shop Groceries by categories"}
          categories={category}
        />
        <FlashDealProducts
          // store={store}
          // users={users}
          products={products}
          categories={categories}
        />
        <CustomHero
          images={[
            "/rayvvin_pngs/Component 2.png",
            "/rayvvin_pngs/banner4.jpg",
            "/rayvvin_pngs/banner7.png",
          ]}
        />
        <ExploreProducts
          // store={store}
          // users={users}
          products={products}
          categories={categories}
        />
      </div>

      {/* <div className="lg:container mx-auto box-border xl:px-20 lg:px-24 md:px-4">
        <ProductCarousel
          title={`Best Selling Products`}
          categories={categories}
          products={products}
          // store={store}
        />
        <FeaturedStates />
      </div> */}
      <CustomDealsStats />
      <RecentProductsCarousel
        // title={`Popular Products from ${store?.name}`}
        title={`Recently Viewed`}
        categories={categories}
        products={products}
        // store={store}
      />
      <CustomDealsBlue />
    </div>
  )
}

export default HomePage
