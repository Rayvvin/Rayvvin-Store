

import FeaturedProducts from "@modules/home/components/featured-products"
import HomePage from "@modules/home/components/homepage-rayvvin"
import FeaturedRegions from "@modules/home/components/featured-regions"
import FeaturedStates from "@modules/home/components/featured-states"
import FeaturedStatesMarkets from "@modules/home/components/featured-states-markets"
import ProductCarousel from "@modules/home/components/product-carousel"
import DiscountCarousel from "@modules/home/components/discount-carousel"
import CategoriesCarousel from "@modules/home/components/categories-carousel"
import ServicesCarousel from "@modules/home/components/services-carousel"
import BrandsCarousel from "@modules/home/components/brands-carousel"
import Hero from "@modules/home/components/hero"
import { Metadata } from "next"
import useStoresProducts from "@lib/hooks/use-stores-products"
import { useEffect, useState } from "react"
import useStoreCategories from "@lib/hooks/use-store-categories"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shop all available models only at the Afriomarkets. Worldwide Shipping. Secure Payment.",
}



const Home = () => {
  return (
    <HomePage/>
  )
}

export default Home
