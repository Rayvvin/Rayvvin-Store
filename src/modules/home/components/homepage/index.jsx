"use client"

import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedRegions from "@modules/home/components/featured-regions"
import FeaturedStates from "@modules/home/components/featured-states"
import FeaturedStatesMarkets from "@modules/home/components/featured-states-markets"
import ProductCarousel from "@modules/home/components/product-carousel"
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
import MarketplaceGrid from "@modules/home/components/marketplace-grid"
import FeaturedStores from "../featured-stores"
import RecommendedProducts from "@modules/home/components/recommended-products"

const HomePage = () => {
  const { stores, products, categories, loading, error } = useStoresProducts()
  // const [store, setStore] = useState(null)

  // useEffect(() => {
  //   if (stores.length) {
  //     setStore(stores[0])
  //   }
  // }, [stores])

  // useEffect(() => {
  //   if (products) {
  //     console.log(products)
  //   }
  // }, [products])

  return (
    <>
      <Hero />

      {/* <CustomHero />
      <CustomIntro /> */}
      {/* <MarketplaceGrid /> */}
      <ProductCarousel
        title={`Popular Products`}
        categories={categories}
        products={products}
        // store={store}
      />
      <RecommendedProducts
        // store={store}
        // users={users}
        products={products}
        categories={categories}
      />
      <FeaturedStatesMarkets />

      {/* <CustomDeals /> */}

      {/* <CategoriesCarousel title={"Shop Our Top Categories"} /> */}
      <ProductCarousel
        title={`Best Selling Products`}
        categories={categories}
        products={products}
        // store={store}
      />
      <FeaturedStates />

      <CategoriesHero />
      <FeaturedProducts
        // store={store}
        // users={users}
        products={products}
        categories={categories}
      />

      {/* <FeaturedStores /> */}
      <FeaturedRegions />

      <ServicesCarousel title=' ' />
      {/* <BrandsCarousel title={'Trending Product For You!'} /> */}
      {/* <Hero /> */}
      {/* <FeaturedProducts /> */}
      {/* <ProductCarousel title={'Hot Deals from Alaba Int’l'} /> */}
    </>
  )
}

export default HomePage
