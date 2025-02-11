"use client"

import { StoreGetProductsParams } from "@medusajs/medusa"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useEffect, useState } from "react"
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react"
import Hero from "@modules/home/components/hero"
import MarketHero from "@modules/home/components/market-hero"
import SingleStoreInfiniteProducts from "@modules/products/components/single-store-infinite-products"
import TabbedView from "../components/tabbed-view"
import { AiOutlineBars, AiFillAppstore, AiFillInfoCircle } from "react-icons/ai"
import StateInfoCards from "@modules/home/components/state-info-cards"
import MarketInfoCards from "@modules/home/components/market-info-cards"
import ProductCarousel from "@modules/home/components/product-carousel"
import ServicesCarousel from "@modules/home/components/services-carousel"
import FeaturedProducts from "@modules/home/components/featured-products"
import DiscountCarousel from "@modules/home/components/discount-carousel"
import useStoreCategories from "@lib/hooks/use-store-categories"
import FeaturedStores from "@modules/home/components/featured-stores"



const SingleMarketTemplate = (props) => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  const { store, users, state, market } = props
  const [placement, setPlacement] = useState("top")
  const { storeCategories, storeCategoriesProds: products } =
    useStoreCategories(store)

  // useEffect(() => {
  //   if (storeCategories) {
  //     console.log(storeCategories)
  //   }
  // }, [storeCategories])

  return (
    <>
      <MarketHero />
      <div
        className="flex flex-col relative 
      top-[-90px] sm:top-[-95px] md:top-[-100px] lg:top-[-110px] xl:top-[-120px]
      small:flex-col py-6"
      >
        <MarketInfoCards
          store={state}
          users={users}
          products={products}
          storeCategories={storeCategories}
          market={market}
        />
      </div>
      <div className="flex flex-col px-1 py-4 relative top-[-100px] sm:top-[-105px] md:top-[-110px] lg:top-[-115px] xl:top-[-120px]">
        <FeaturedStores
          title={`Popular Stores in ${market?.market_name}, ${market?.stateName}`}
          state={state}
          market={market}
        />
      </div>
      {/* 
      <div
        className="flex flex-col px-4 py-4 
      relative 
      top-[-100px] sm:top-[-105px] md:top-[-110px] lg:top-[-115px] xl:top-[-120px]"
      >
        <div className="flex w-full flex-col">
          <TabbedView
            plcmnt={placement}
            tab_obj={[
              {
                key: "overview",
                title: (
                  <div className="flex items-center space-x-2">
                    <AiFillInfoCircle />
                    <span>Overview</span>
                  </div>
                ),
                child: (
                  <div className="flex flex-col small:flex-col py-6">
                    <ProductCarousel
                      title={`Weekly Popular Products from ${store?.name}`}
                      categories={storeCategories}
                      products={products}
                      store={store}
                    />
                    <DiscountCarousel
                      title={`Get Up To 70% Off from ${store?.name}`}
                      categories={storeCategories}
                      products={products}
                      store={store}
                    />
                    <FeaturedProducts
                      store={store}
                      users={users}
                      products={products}
                      categories={storeCategories}
                    />
                    <ServicesCarousel
                      store={store}
                      title={"Services To Help You Shop"}
                      categories={storeCategories}
                      products={products}
                    />
                  </div>
                ),
              },
              {
                key: "products",
                title: (
                  <div className="flex items-center space-x-2">
                    <AiFillAppstore />
                    <span>Products</span>
                  </div>
                ),
                child: (
                  <div className="flex flex-col small:flex-row small:items-start py-6">
                    <RefinementList
                      refinementList={params}
                      setRefinementList={setParams}
                      categories={storeCategories}
                    />
                    <SingleStoreInfiniteProducts
                      params={params}
                      store={store}
                      users={users}
                      products={products}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div> */}
      {/* <div className="flex flex-col small:flex-row small:items-start py-6">
        <RefinementList refinementList={params} setRefinementList={setParams} />
        <SingleStoreInfiniteProducts
          params={params}
          store={store}
          users={users}
          products={products}
        />
      </div> */}
    </>
  )
}

export default SingleMarketTemplate
