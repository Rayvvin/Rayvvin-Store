import { getProductsList } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import { StoreGetProductsParams } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useCart } from "medusa-react"
import { useEffect, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import Link from "next/link"
import clsx from "clsx"

type InfiniteProductsType = {
  params: StoreGetProductsParams,
  store?: any,
  users?: any,
  products?: any,
  title?: any, 
  parent_category?: any, 
  category?: any
  setOpen?: any
}

const InfiniteProducts = ({ params, store, users, products, title, parent_category, category, setOpen }: InfiniteProductsType) => {
  const { cart } = useCart()

  const { ref, inView } = useInView()

  const queryParams = useMemo(() => {
    console.log(store, users, products)
    let p: StoreGetProductsParams = {}


    if(products){
      p.id = products.map(prd => prd.id)
    }
    console.log(p)

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params, products])
  
  // console.log(queryParams);
  
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => getProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

  const previews = usePreviews({ pages: data?.pages, region: cart?.region })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  return (
    <div className="flex-1 content-container shadow-sm flex flex-col h-full w-full p-4 m-2 mx-0 sm:mx-2 bg-white rounded-md">
      {/* <span className="text-2xl font-bold p-2 mb-4">{title ? title : "Products"}</span> */}
      <div className="flex flex-row mb-8 text-xl-semi md:text-2xl-semi gap-4">
        {category && category.parent_category && (
          <>
            <span className="text-gray-500">
              <Link
                className="mr-4 hover:text-black"
                href={`/${category.parent_category.handle}`}
              >
                {category.parent_category.name}
              </Link>
              /
            </span>
          </>
        )}
        <h1>{category?.name}</h1>
      </div>
      {category?.description && (
        <div className="mb-8 text-base-regular">
          <p>{category.description}</p>
        </div>
      )}
      <ul
        className={clsx(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 flex-1",
          {
            "!flex": previews.length === 0 && !isLoading && !isFetchingNextPage,
          }
        )}
      >
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {previews.length === 0 && !isLoading && !isFetchingNextPage && (
          <div className="flex flex-col items-center justify-center text-center w-full h-full">
            <span className="text-base-regular text-gray-500">
              No products found. Try a different search or visit our{" "}
              <Link href="/store">
                <span
                  className="text-lg-bold text-[#344F16] cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    // router.push("/store");
                  }}
                >
                  store
                </span>
              </Link>
              .
            </span>
          </div>
        )}
        {isLoading &&
          !previews.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  )
}

export default InfiniteProducts
