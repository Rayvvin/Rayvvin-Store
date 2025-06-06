"use client"

import usePreviews from "@lib/hooks/use-previews"
import { getProductsByCategoryHandle } from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import UnderlineLink from "@modules/common/components/underline-link"
import RefinementList from "@modules/store/components/refinement-list"
import InfiniteProducts from "@modules/products/components/infinite-products"
import { StoreGetProductsParams } from "@medusajs/medusa"
import CategoriesCarousel from "@modules/home/components/categories-carousel"

type CategoryTemplateProps = {
  category: {
    handle: string
    name: string
    id: string
    description?: string
    metadata?: {
      thumbnail?: any
    }
    category_children?: {
      name: string
      handle: string
      id: string
      metadata?: {
        thumbnail?: any
      }
    }[]
  }
  parent?: {
    handle: string
    name: string
  }
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  category,
  parent,
}) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()
  const [params, setParams] = useState<StoreGetProductsParams>({
    category_id: category.category_children?.map((c) => c.id).concat([category.id]),
    // category_id: product_categories?.map((c) => c.id), collection_id: collections?.map((c) => c.id), type_id: product_types?.map((c) => c.id), tags: product_tags?.map((c) => c.value)
  })

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [`get_category_products`, category.handle, cart?.id],
    ({ pageParam }) =>
      getProductsByCategoryHandle({
        pageParam,
        handle: category.handle,
        cartId: cart?.id,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  useEffect(() => {
    if (cart?.region_id) {
      refetch()
    }
  }, [cart?.region_id, refetch])

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  return (
    <div className="content-container py-6">
      {/* <div className="flex flex-row mb-8 text-2xl-semi gap-4">
        {parent && (
          <>
            <span className="text-gray-500">
              <Link
                className="mr-4 hover:text-black"
                href={`/${parent.handle}`}
              >
                {parent.name}
              </Link>
              /
            </span>
          </>
        )}
        <h1>{category.name}</h1>
      </div>
      {category.description && (
        <div className="mb-8 text-base-regular">
          <p>{category.description}</p>
        </div>
      )} */}
      {/* {category.category_children && (
        <div className="mb-8 text-base-large">
          <ul className="grid grid-cols-1 gap-2">
            {category.category_children?.map((c) => (
              <li key={c.id}>
                <UnderlineLink href={`/${c.handle}`}>{c.name}</UnderlineLink>
              </li>
            ))}
          </ul>
        </div>
      )} */}
      <ul className="grid grid-cols-2 small:grid-cols-4 medium:grid-cols-6 gap-x-4 gap-y-8">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(infiniteData?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <CategoriesCarousel
        title={" "}
        categories={category}
        parent_category={parent}
      />
      <div className="bg-[#FAFAFA]">
        <div className="flex flex-col small:flex-row small:items-start py-6 pt-2">
          <RefinementList
            refinementList={params}
            setRefinementList={setParams}
          />
          <InfiniteProducts
            params={params}
            parent_category={parent}
            category={category}
          />
        </div>
      </div>
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  )
}

export default CategoryTemplate
