"use client"

import { StoreGetProductsParams } from "@medusajs/medusa"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useEffect, useState } from "react"

import Hero from "@modules/home/components/hero"
import FeaturedRegions from "@modules/home/components/featured-regions"
import CategoriesCarousel from "@modules/home/components/categories-carousel"
// import { useProductCategories, useProductTags, useCollections, useProductTypes, useProducts } from "medusa-react"

const StoreTemplate = (props) => {
  // const { product_categories } = useProductCategories()
  // const { collections } = useCollections()
  // const { product_types } = useProductTypes()
  // const { product_tags } = useProductTags()
  // const { products } = useProducts()
  const [params, setParams] = useState<StoreGetProductsParams>({
    // category_id: product_categories?.map((c) => c.id), collection_id: collections?.map((c) => c.id), type_id: product_types?.map((c) => c.id), tags: product_tags?.map((c) => c.value)
  })

  // useEffect(() => {
  //   // console.log(products, product_categories, collections, product_types, product_tags);
  //   // if(products){
  //   //   setParams({id: products ? products.map(prd => prd.id).filter((id): id is string => id !== undefined) : []})
  //   // }
  //   // if(product_categories){
  //   //   setParams({category_id: product_categories ? product_categories.map((c) => c.id) : []})
  //   // }
  //   // if(collections){
  //   //   setParams({collection_id: collections ? collections.map((c) => c.id) : []})
  //   // }
  //   // if(product_types){
  //   //   setParams({type_id: product_types ? product_types.map((c) => c.id) : []})
  //   // }
  //   // if(product_tags){
  //   //   setParams({tags: product_tags ? product_tags.map((c) => c.value) : []})
  //   // }


  //   // setParams({category_id: product_categories?.map((c) => c.id), collection_id: collections?.map((c) => c.id), type_id: product_types?.map((c) => c.id), tags: product_tags?.map((c) => c.value)})
  // },[products, product_categories, collections, product_types, product_tags])

  return (
    <div className="bg-[#FAFAFA]">
      {/* <Hero /> */}
      <CategoriesCarousel title={' '}  />
      <div className="flex flex-col small:flex-row small:items-start py-6 pt-2">
        <RefinementList refinementList={params} setRefinementList={setParams} />
        <InfiniteProducts params={params} />
      </div>
    </div>
  )
}

export default StoreTemplate
