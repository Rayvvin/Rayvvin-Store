import {
  getProductsList,
  getCollectionsList,
  getUsers,
  getStores,
  getProductsListSupabase,
} from "@lib/data"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Product, ProductCollection, Region } from "@medusajs/medusa"
import { PricedVariant } from "@medusajs/medusa/dist/types/pricing"
import { useQuery } from "@tanstack/react-query"
import { formatAmount, useCart } from "medusa-react"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"

type LayoutCollection = {
  handle: string
  title: string
}

type PricedProduct = Omit<Partial<Product>, "variants"> & {
  variants: PricedVariant[]
  product_category?: any
  store_id?: string
}

type PricedProductArray = PricedProduct[]

// Define type for props
type LimitProp = {
  limit: number
}

const fetchCollectionData = async (): Promise<LayoutCollection[]> => {
  let collections: ProductCollection[] = []
  let offset = 0
  let count = 1

  do {
    await getCollectionsList(offset)
      .then((res) => res)
      .then(({ collections: newCollections, count: newCount }) => {
        collections = [...collections, ...newCollections]
        count = newCount
        offset = collections.length
      })
      .catch((_) => {
        count = 0
      })
  } while (collections.length < count)

  return collections.map((c) => ({
    handle: c.handle,
    title: c.title,
  }))
}

export const useNavigationCollections = () => {
  const queryResults = useQuery({
    queryFn: fetchCollectionData,
    queryKey: ["navigation_collections"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return queryResults
}

const fetchFeaturedProducts = async (
  cartId: string,
  region: Region,
  limit: number | undefined,
  category_id?: string[],
  id?: string | string[],
  store?: any,
  expand?: any
): Promise<ProductPreviewType[]> => {
  // console.log(id);
  const products: PricedProduct[] = await getProductsList({
    pageParam: 0,
    queryParams: {
      limit: limit ? limit : 8,
      cart_id: cartId,
      region_id: region.id,
      // category_id: category_id,
      // id: id,
    },
    // expand: expand
  })
    .then((res) => res.response)
    .then(async ({ products }) => {
      // let { stores } = await getStores()
      // console.log("Showing products", products)
      return products
    })
    .catch((_) => [] as PricedProduct[])

  return products
    .filter((p) => !!p.variants)
    .map((p) => {
      if (
        p.variants.filter(
          (pv) => pv.id === "variant_01HPESM324K2TRXDD3QG8SR7VT"
        ).length > 0
      ) {
        // console.log(p.variants)
      }

      const variants = p.variants as unknown as CalculatedVariant[]

      const cheapestVariant = variants.reduce((acc, curr) => {
        if (acc.calculated_price > curr.calculated_price) {
          return curr
        }
        return acc
      }, variants[0])

      return {
        id: p.id!,
        store_id: p.store_id,
        category: p.product_category,
        title: p.title!,
        handle: p.handle!,
        thumbnail: p.thumbnail!,
        price: cheapestVariant
          ? {
              calculated_price: formatAmount({
                amount: cheapestVariant.calculated_price,
                region: region,
                includeTaxes: false,
              }),
              original_price: formatAmount({
                amount: cheapestVariant.original_price,
                region: region,
                includeTaxes: false,
              }),
              difference: getPercentageDiff(
                cheapestVariant.original_price,
                cheapestVariant.calculated_price
              ),
              price_type: cheapestVariant.calculated_price_type,
            }
          : {
              calculated_price: "N/A",
              original_price: "N/A",
              difference: "N/A",
              price_type: "default",
            },
      }
    })
}

export const useFeaturedProductsQuery = (props?) => {
  const { cart } = useCart()
  const { limit, categories, id, store, expand } = props
  // const _LimitProp = props;
  const queryResults = useQuery(
    [
      "layout_featured_products",
      cart?.id,
      cart?.region,
      limit,
      categories,
      id,
      store,
      expand,
    ],
    () =>
      fetchFeaturedProducts(
        cart?.id!,
        cart?.region!,
        limit,
        categories,
        id,
        store,
        expand
      ),
    {
      enabled: !!cart?.id && !!cart?.region,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  return queryResults
}
