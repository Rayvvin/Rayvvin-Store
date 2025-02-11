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

type InfiniteProductsType = {
  params: StoreGetProductsParams,
  store?: any,
  users?: any,
  products?: any
}

const SingleStoreInfiniteProducts = ({ params, store, users, products }: InfiniteProductsType) => {
  const { cart } = useCart()

  const { ref, inView } = useInView()

  const queryParams = useMemo(() => {
    // console.log(store, users, products.length)
    let p: StoreGetProductsParams = {}


    if(products){
      p.id = products.map(prd => prd.id)
    }
    // console.log(p)

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params, products])
  
  console.log(queryParams);
  
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
  queryParams && queryParams.id && queryParams.id.length ? 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => getProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )
: {data : {}, hasNextPage: false, fetchNextPage: (()=>{}), isLoading: false, isFetchingNextPage: false}

  const previews = usePreviews({ pages: data?.pages, region: cart?.region })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  return (
    <div className="flex-1 content-container">
      <ul className="grid grid-cols-2 small:grid-cols-4 medium:grid-cols-5 gap-x-4 gap-y-8 flex-1">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
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

export default SingleStoreInfiniteProducts
