import medusaRequest from "../medusa-fetch"
import { StoreGetProductsParams } from "@medusajs/medusa"
import supabaseRequest from "../supabase-fetch"

/**
 * This file contains functions for fetching products and collections from the Medusa API or the Medusa Product Module,
 * depending on the feature flag. By default, the standard Medusa API is used. To use the Medusa Product Module, set the feature flag to true.
 */

// The feature flag is set in the store.config.json file. Restart the server after changing the flag for the changes to take effect.
const PRODUCT_MODULE_ENABLED =
  process.env.FEATURE_PRODUCTMODULE_ENABLED || false

// The API_BASE_URL is set in the .env file. It is the base URL of your Next.js app.
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

const DEBUG = false

/**
 * Fetches a product by handle, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param handle (string) - The handle of the product to retrieve
 * @returns (array) - An array of products (should only be one)
 */
export async function getProductByHandle(handle: string) {
  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const data = await fetch(`${API_BASE_URL}/api/products/${handle}`, {
      next: {
        tags: ["products, variants"],
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })

    // console.log("Right here dummy 1", data)
    return data
  }

  DEBUG && console.log("PRODUCT_MODULE_DISABLED")
  const { products } = await medusaRequest("GET", "/products", {
    query: {
      handle,
    },
  })
    .then((res) => res.body)
    .catch((err) => {
      throw err
    })

  // console.log("Right here dummy 2", products)

  return {
    products,
  }
}

/**
 * Fetches a list of products, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param pageParam (number) - The offset of the products to retrieve
 * @param queryParams (object) - The query parameters to pass to the API
 * @returns 'response' (object) - An object containing the products and the next page offset
 * @returns 'nextPage' (number) - The offset of the next page of products
 */
export async function getProductsList({
  pageParam = 0,
  queryParams,
  expand = "*",
}: {
  pageParam?: number
  queryParams: StoreGetProductsParams
  expand?: string
}) {
  const limit = 10

  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const params = new URLSearchParams(queryParams as Record<string, string>)

    const { products, count, nextPage } = await fetch(
      `${API_BASE_URL}/api/products?limit=${limit}&offset=${pageParam}&${params.toString()}`,
      {
        next: {
          tags: ["products"],
        },
      }
    ).then((res) => res.json())

    console.log(products)

    return {
      response: { products, count },
      nextPage,
    }
  } else {
    DEBUG && console.log("PRODUCT_MODULE_DISABLED")
    const { products, count, nextPage } = await medusaRequest(
      "GET",
      "/products",
      {
        query: {
          limit,
          offset: pageParam,
          ...queryParams,
        },
      }
    )
      .then((res) => res.body)
      .catch((err) => {
        throw err
      })

    // console.log(products)

    return {
      response: { products, count },
      nextPage,
    }
  }
}

/**
 * Fetches a list of products, using the Supabase API.
 * @param pageParam (number) - The offset of the products to retrieve
 * @param queryParams (object) - The query parameters to pass to the API
 * @returns 'response' (object) - An object containing the products and the next page offset
 * @returns 'nextPage' (number) - The offset of the next page of products
 */
export async function getProductsListSupabase({
  pageParam = 0,
  queryParams,
  expand = "*",
}: {
  pageParam?: number
  queryParams: StoreGetProductsParams
  expand?: string
}) {
  const limit = 10

  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const params = new URLSearchParams(queryParams as Record<string, string>)

    const { products, count, nextPage } = await fetch(
      `${API_BASE_URL}/api/products?limit=${limit}&offset=${pageParam}&${params.toString()}`,
      {
        next: {
          tags: ["products"],
        },
      }
    ).then((res) => res.json())

    // console.log(products)

    return {
      response: { products, count },
      nextPage,
    }
  } else {
    DEBUG && console.log("PRODUCT_MODULE_DISABLED")

    // Build filters array based on query parameters
    const filters = [] as any[]

    // Handle ID filtering
    if (queryParams.id) {
      filters.push({
        column: "id",
        operator: "in",
        value: Array.isArray(queryParams.id)
          ? queryParams.id
          : [queryParams.id],
      })
    }

    // Handle collection filtering
    if (queryParams.collection_id) {
      filters.push({
        column: "collection_id",
        operator: "in",
        value: Array.isArray(queryParams.collection_id)
          ? queryParams.collection_id
          : [queryParams.collection_id],
      })
    }

    // Handle category filtering
    if (queryParams.category_id) {
      filters.push({
        column: "category_id",
        operator: "in",
        value: Array.isArray(queryParams.category_id)
          ? queryParams.category_id
          : [queryParams.category_id],
      })
    }

    // Handle tags filtering
    if (queryParams.tags) {
      filters.push({
        column: "tags",
        operator: "overlaps",
        value: Array.isArray(queryParams.tags)
          ? queryParams.tags
          : [queryParams.tags],
      })
    }

    // Handle title search
    if (queryParams.title) {
      filters.push({
        column: "title",
        operator: "ilike",
        value: `%${queryParams.title}%`,
      })
    }

    // Handle gift card filter
    if (queryParams.is_giftcard !== undefined) {
      filters.push({
        column: "is_giftcard",
        operator: "eq",
        value: queryParams.is_giftcard,
      })
    }

    const { data: products, error } = await supabaseRequest("read", "product", {
      filters,
      rangeStart: pageParam,
      limit: limit,
      select: expand,
    })

    if (error) throw new Error(error)

    // Fetch variants for each product
    const productIds = products.map((product) => product.id)
    const { data: variants, error: variantsError } = await supabaseRequest(
      "read",
      "product_variant",
      {
        filters: [{ column: "product_id", operator: "in", value: productIds }],
      }
    )

    if (variantsError) throw new Error(variantsError)

    // Fetch prices for each variant
    const variantIds = variants.map((variant) => variant.id)
    const { data: variantMoneyAmounts, error: variantMoneyAmountsError } =
      await supabaseRequest("read", "product_variant_money_amount", {
        filters: [{ column: "variant_id", operator: "in", value: variantIds }],
      })

    if (variantMoneyAmountsError) throw new Error(variantMoneyAmountsError)

    const moneyAmountIds = variantMoneyAmounts.map((vma) => vma.money_amount_id)
    const { data: moneyAmounts, error: moneyAmountsError } =
      await supabaseRequest("read", "money_amount", {
        filters: [{ column: "id", operator: "in", value: moneyAmountIds }],
      })

    if (moneyAmountsError) throw new Error(moneyAmountsError)

    // Map prices to their respective variants
    const variantsWithPrices = variants.map((variant) => ({
      ...variant,
      prices: variantMoneyAmounts
        .filter((vma) => vma.variant_id === variant.id)
        .map((vma) => moneyAmounts.find((ma) => ma.id === vma.money_amount_id)),
    }))

    // Map variants to their respective products
    const productsWithVariants = products.map((product) => ({
      ...product,
      variants: variantsWithPrices.filter(
        (variant) => variant.product_id === product.id
      ),
    }))

    // Get total count for pagination
    const { count, error: countError } = await supabaseRequest(
      "count",
      "product",
      {
        filters,
      }
    )

    if (countError) throw new Error(countError)

    const nextPage = count > pageParam + limit ? pageParam + limit : null

    // console.log(productsWithVariants, nextPage, count, pageParam);

    return {
      response: { products: productsWithVariants, count },
      nextPage,
    }
  }
}

/**
 * Fetches a list of collections, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param offset (number) - The offset of the collections to retrieve (default: 0
 * @returns collections (array) - An array of collections
 * @returns count (number) - The total number of collections
 */
export async function getCollectionsList(offset: number = 0) {
  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const { collections, count } = await fetch(
      `${API_BASE_URL}/api/collections?offset=${offset}`,
      {
        next: {
          tags: ["collections"],
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })

    return {
      collections,
      count,
    }
  }

  DEBUG && console.log("PRODUCT_MODULE_DISABLED")
  const { collections, count } = await medusaRequest("GET", "/collections", {
    query: {
      offset,
    },
  })
    .then((res) => res.body)
    .catch((err) => {
      throw err
    })

  return {
    collections,
    count,
  }
}

/**
 * Fetches a collection by handle, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param handle  (string) - The handle of the collection to retrieve
 * @returns collections (array) - An array of collections (should only be one)
 * @returns response (object) - An object containing the products and the number of products in the collection
 * @returns nextPage (number) - The offset of the next page of products
 */
export async function getCollectionByHandle(handle: string) {
  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const data = await fetch(`${API_BASE_URL}/api/collections/${handle}`)
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })

    return data
  }

  DEBUG && console.log("PRODUCT_MODULE_DISABLED")
  const data = await medusaRequest("GET", "/collections", {
    query: {
      handle: [handle],
    },
  })
    .then((res) => res.body)
    .catch((err) => {
      throw err
    })

  return data
}

/**
 * Fetches a list of products in a collection, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param pageParam (number) - The offset of the products to retrieve
 * @param handle (string) - The handle of the collection to retrieve
 * @param cartId (string) - The ID of the cart
 * @returns response (object) - An object containing the products and the number of products in the collection
 * @returns nextPage (number) - The offset of the next page of products
 */
export async function getProductsByCollectionHandle({
  pageParam = 0,
  handle,
  cartId,
}: {
  pageParam?: number
  handle: string
  cartId?: string
}) {
  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const { response, nextPage } = await fetch(
      `${API_BASE_URL}/api/collections/${handle}?cart_id=${cartId}&page=${pageParam.toString()}`
    )
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })

    return {
      response,
      nextPage,
    }
  }

  DEBUG && console.log("PRODUCT_MODULE_DISABLED")
  const { id } = await getCollectionByHandle(handle).then(
    (res) => res.collections[0]
  )

  const { response, nextPage } = await getProductsList({
    pageParam,
    queryParams: { collection_id: [id], cart_id: cartId },
  })
    .then((res) => res)
    .catch((err) => {
      throw err
    })

  return {
    response,
    nextPage,
  }
}

/**
 * Fetches a category by handle, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param handle  (string) - The handle of the category to retrieve
 * @returns collections (array) - An array of categories (should only be one)
 * @returns response (object) - An object containing the products and the number of products in the category
 * @returns nextPage (number) - The offset of the next page of products
 */
export async function getCategoryByHandle(handle: string) {
  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const data = await fetch(`${API_BASE_URL}/api/categories/${handle}`)
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })

    return data
  }

  DEBUG && console.log("PRODUCT_MODULE_DISABLED")
  const data = await medusaRequest("GET", "/product-categories", {
    query: {
      handle,
    },
  })
    .then((res) => res.body)
    .catch((err) => {
      throw err
    })

  return {
    product_categories: data.product_categories,
    parent: data.product_categories[0].parent_category,
  }
}

/**
 * Fetches a list of products in a collection, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param pageParam (number) - The offset of the products to retrieve
 * @param handle (string) - The handle of the collection to retrieve
 * @param cartId (string) - The ID of the cart
 * @returns response (object) - An object containing the products and the number of products in the collection
 * @returns nextPage (number) - The offset of the next page of products
 */
export async function getProductsByCategoryHandle({
  pageParam = 0,
  handle,
  cartId,
}: {
  pageParam?: number
  handle: string
  cartId?: string
}) {
  if (PRODUCT_MODULE_ENABLED) {
    DEBUG && console.log("PRODUCT_MODULE_ENABLED")
    const { response, nextPage } = await fetch(
      `${API_BASE_URL}/api/categories/${handle}?cart_id=${cartId}&page=${pageParam.toString()}`
    )
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })

    return {
      response,
      nextPage,
    }
  }

  DEBUG && console.log("PRODUCT_MODULE_DISABLED")
  const { id } = await getCategoryByHandle(handle).then(
    (res) => res.product_categories[0]
  )

  const { response, nextPage } = await getProductsList({
    pageParam,
    queryParams: { category_id: [id], cart_id: cartId },
  })
    .then((res) => res)
    .catch((err) => {
      throw err
    })

  return {
    response,
    nextPage,
  }
}

/**
 * Fetches products by store ID from Supabase.
 * @param storeId (string) - The ID of the store
 * @param pageParam (number) - The offset of the products to retrieve
 * @returns products (array) - An array of products
 * @returns nextPage (number) - The offset of the next page of products
 */
export async function getProductsByStoreId(storeId: string, pageParam = 0) {
  // Step 1: Fetch product IDs and store IDs from the products table
  const { data: productIds, error: productIdsError } = await supabaseRequest(
    "read",
    "product",
    {
      filters: [{ column: "store_id", operator: "eq", value: storeId }],
      columns: ["id", "store_id"], // Only fetch IDs and store IDs
      rangeStart: pageParam,
    }
  )
  if (productIdsError) throw new Error(productIdsError)

  // console.log('here', productIds);
  // Extract product IDs and store IDs
  const id = productIds.map((product) => product.id)
  const storeIds = productIds.map((product) => product.store_id)
  // console.log('ids', id);
  let products = [] as any
  let nextPage = 0
  if (id && id.length) {
    // Step 2: Fetch full data of the products using the existing medusaRequest implementation
    const { response: prods, nextPage: nxtPg } = await getProductsList({
      pageParam,
      queryParams: {
        id: id,
      }, // Pass product IDs to retrieve full product data
    })

    products = prods.products
    nextPage = nxtPg
  }

  // console.log('prods', products);

  // Step 3: Insert store IDs into product objects
  const productsWithStoreIds = products.map((product, index) => ({
    ...product,
    store_id: storeIds[index], // Insert store ID into each product object
  }))

  return { products: productsWithStoreIds, nextPage }
}

/**
 * Fetches stores and their respective users from Supabase.
 * @param pageParam (number) - The offset of the stores to retrieve
 * @returns storesWithUsers (array) - An array of stores with their respective users
 * @returns nextPage (number) - The offset of the next page of stores
 */
export async function getStores(pageParam = 0) {
  // Step 1: Fetch stores from Supabase
  const { data: stores, error: storesError } = await supabaseRequest(
    "read",
    "store",
    {
      rangeStart: pageParam,
    }
  )
  if (storesError) throw new Error(storesError)

  // Step 2: Fetch users from Supabase
  const { data: users, error: usersError } = await supabaseRequest(
    "read",
    "user",
    {
      rangeStart: pageParam,
    }
  )
  if (usersError) throw new Error(usersError)

  // Step 3: Match users with their respective stores based on store_id
  const storesWithUsers = stores.map((store) => ({
    ...store,
    users: users.filter((user) => user.store_id === store.id),
  }))

  return { stores: storesWithUsers, nextPage: null } // Supabase doesn't support pagination out-of-the-box
}

/**
 * Fetches users from Supabase.
 * @param pageParam (number) - The offset of the users to retrieve
 * @returns users (array) - An array of users
 * @returns nextPage (number) - The offset of the next page of users
 */
export async function getUsers(pageParam = 0) {
  const { data: users, error } = await supabaseRequest("read", "user", {
    rangeStart: pageParam,
  })
  if (error) throw new Error(error)
  return { users, nextPage: null } // Supabase doesn't support pagination out-of-the-box
}

/**
 * Fetches a store by handle or ID from Supabase.
 * @param handleOrId (string) - The handle or ID of the store to retrieve
 * @returns storeWithUsers (object) - The store with its respective users
 */
export async function getStore(handleOrId: string) {
  let store

  // Check if the input is a handle or an ID
  const isHandle = isNaN(parseInt(handleOrId))

  // Step 1: Fetch store from Supabase by handle or ID
  if (isHandle) {
    const { data: stores, error } = await supabaseRequest("read", "store", {
      filters: [{ column: "id", operator: "eq", value: handleOrId }],
    })
    if (error) throw new Error(error)
    store = stores[0]
  } else {
    const { data: stores, error } = await supabaseRequest("read", "store", {
      filters: [{ column: "id", operator: "eq", value: handleOrId }],
    })
    if (error) throw new Error(error)
    store = stores[0]
  }

  if (!store) {
    throw new Error("Store not found")
  }

  // Step 2: Fetch users from Supabase for the found store
  const { data: users, error: usersError } = await supabaseRequest(
    "read",
    "user",
    {
      filters: [{ column: "store_id", operator: "eq", value: store.id }],
    }
  )
  if (usersError) throw new Error(usersError)

  // console.log('here', users)
  // Structure the data
  const storeWithUsers = {
    ...store,
    users,
  }

  return storeWithUsers
}

/**
 * Fetches categories specific to a store from Supabase and includes product objects with their category data.
 * @param {string} storeId The ID of the store to fetch categories for.
 * @returns {Promise<Array<any>>} An array of product objects with their category data.
 * @throws {Error} If an error occurs while fetching data.
 */
export async function getStoreCategories(storeId: string, store: any) {
  try {
    // Fetch products specific to the store
    const { products, nextPage } = await getProductsByStoreId(storeId)

    // Extract product IDs
    const productIds = products.map((product) => product.id)

    // console.log(productIds)

    // Fetch categories for the extracted product IDs
    const { data: productCategories, error } = await supabaseRequest(
      "read",
      "product_category_product",
      {
        filters: [{ column: "product_id", operator: "in", value: productIds }],
      }
    )

    if (error) throw new Error(error)

    // console.log(productCategories)

    // Extract category IDs
    const categoryIds = productCategories.map((pc) => pc.product_category_id)

    // Fetch category data using the extracted category IDs
    const { data: categories } = await supabaseRequest(
      "read",
      "product_category",
      {
        filters: [{ column: "id", operator: "in", value: categoryIds }],
      }
    )

    // console.log(products, productCategories)
    // Map product objects with their respective category data
    const productsWithCategoriesMini = products.map((product) => {
      const productCategory = productCategories.find((pc) => {
        return pc.product_id === product.id
      })
      return { ...product, product_category_product: productCategory }
    })

    const productsWithCategories = productsWithCategoriesMini.map(
      (product_with_category) => {
        const category = categories.find((category) => {
          return (
            category.id ===
            product_with_category.product_category_product?.product_category_id
          )
        })
        return {
          ...product_with_category,
          product_category: category,
          store: store,
        }
      }
    )

    const uniqueCategories = {}
    let uniqueCategoryObjects = productsWithCategories.map((product) => {
      const categoryId = product.product_category?.id
      if (!uniqueCategories[categoryId]) {
        uniqueCategories[categoryId] = true
        return product.product_category
      }
    })

    uniqueCategoryObjects = uniqueCategoryObjects.filter(Boolean)

    // console.log(uniqueCategoryObjects)

    return {
      products: productsWithCategories,
      categories: uniqueCategoryObjects,
    }
  } catch (error: any) {
    throw new Error(`Error fetching store categories: ${error.message}`)
  }
}

export const getStateMarkets = async (stateName) => {
  try {
    // Function to find the state by its name
    const findState = async (name) => {
      const { data: states, error: stateError } = await supabaseRequest(
        "read",
        "state",
        {
          filters: [{ column: "handle", operator: "eq", value: name }],
        }
      )

      if (stateError) {
        throw new Error(`Error fetching state: ${stateError}`)
      }

      return states.length ? states[0] : null
    }

    // Find the state by its name
    const state = await findState(stateName)

    if (!state) {
      throw new Error(`State with name "${stateName}" not found.`)
    }

    const { id: stateId, state: stateFullName, fun_fact } = state

    // Fetch markets for the found state
    const { data: markets, error: marketError } = await supabaseRequest(
      "read",
      "market",
      {
        filters: [{ column: "state_id", operator: "eq", value: stateId }],
      }
    )

    if (marketError) {
      throw new Error(
        `Error fetching markets for state ${stateFullName}: ${marketError}`
      )
    }

    // Fetch un_reg_markets for the found state
    const { data: unRegMarkets, error: unRegMarketError } =
      await supabaseRequest("read", "un_reg_market", {
        filters: [{ column: "state_id", operator: "eq", value: stateId }],
      })

    if (unRegMarketError) {
      throw new Error(
        `Error fetching un_reg_markets for state ${stateFullName}: ${unRegMarketError}`
      )
    }

    // Format the state object with its markets
    const formattedStateInfo = {
      ...state,
      stateName: stateFullName,
      id: stateId,
      markets: markets.map((market) => ({
        ...market,
        stateName: stateFullName,
        state_id: stateId,
      })),
      un_reg_markets: unRegMarkets,
    }

    return formattedStateInfo
  } catch (err: any) {
    console.error("Error in getStateMarkets:", err.message)
    return null
  }
}

export async function getStatesWithMarkets() {
  try {
    // Fetch all states
    const { data: states, error: stateError } = await supabaseRequest(
      "read",
      "state"
    )

    if (stateError) {
      throw new Error(`Error fetching states: ${stateError}`)
    }

    const statesWithMarkets: any = []

    for (const state of states) {
      const { id: state_id, state: stateName, fun_fact } = state

      // Fetch markets for the current state
      const { data: markets, error: marketError } = await supabaseRequest(
        "read",
        "market",
        {
          filters: [{ column: "state_id", operator: "eq", value: state_id }],
        }
      )

      if (marketError) {
        console.error(
          `Error fetching markets for state ${stateName}: ${marketError}`
        )
        continue
      }

      // Fetch un_reg_markets for the found state
      const { data: unRegMarkets, error: unRegMarketError } =
        await supabaseRequest("read", "un_reg_market", {
          filters: [{ column: "state_id", operator: "eq", value: state_id }],
        })

      if (unRegMarketError) {
        throw new Error(
          `Error fetching un_reg_markets for state ${stateName}: ${unRegMarketError}`
        )
      }

      // Format the markets data
      const formattedMarkets = markets.map((market) => ({
        market_name: market.market_name,
        handle: market.handle,
      }))

      // Format the un_reg_markets data
      const formattedUnRegMarkets = unRegMarkets.map((market) => ({
        ...market,
        market_name: market.un_reg_market,
      }))

      // Add the state with its markets to the result
      statesWithMarkets.push({
        state: stateName,
        markets: formattedMarkets,
        un_reg_markets: formattedUnRegMarkets,
        fun_fact,
      })
    }

    return statesWithMarkets
  } catch (err: any) {
    console.error("Error fetching states with markets:", err.message)
    return []
  }
}

export const stateMarkets = [
  {
    state: "Lagos State",
    markets: [
      {
        market_name: "Alaba Market",
        handle: "alaba-market",
      },
      {
        market_name: "Alade Market",
        handle: "alade-market",
      },
      {
        market_name: "Ashade Market",
        handle: "ashade-market",
      },
      {
        market_name: "Balogun Market, Lagos Island",
        handle: "balogun-market-lagos-island",
      },
      {
        market_name: "Bar Beach Market",
        handle: "bar-beach-market",
      },
      {
        market_name: "Bariga Market",
        handle: "bariga-market",
      },
      {
        market_name: "Computer Village",
        handle: "computer-village",
      },
      {
        market_name: "Daleco Market, Isolo-Mushin Road, Lagos",
        handle: "daleco-market-isolo-mushin-road-lagos",
      },
      {
        market_name: "Ebute Ero Market, Lagos Island",
        handle: "ebute-ero-market-lagos-island",
      },
      {
        market_name: "Ekpe Fish Market",
        handle: "ekpe-fish-market",
      },
      {
        market_name: "Ikotun Market",
        handle: "ikotun-market",
      },
      {
        market_name: "Idumota Market",
        handle: "idumota-market",
      },
      {
        market_name: "Isale Eko Market, Lagos Island",
        handle: "isale-eko-market-lagos-island",
      },
      {
        market_name: "Ketu Market",
        handle: "ketu-market",
      },
      {
        market_name: "Ladipo Market",
        handle: "ladipo-market",
      },
      {
        market_name: "Lekki Market",
        handle: "lekki-market",
      },
      {
        market_name: "Mile 12 Market",
        handle: "mile-12-market",
      },
      {
        market_name: "Marocco I and II Markets",
        handle: "marocco-i-and-ii-markets",
      },
      {
        market_name: "Mushin Market",
        handle: "mushin-market",
      },
      {
        market_name: "Ojodu Market",
        handle: "ojodu-market",
      },
      {
        market_name: "Oyingbo Market",
        handle: "oyingbo-market",
      },
      {
        market_name: "Oshodi Market",
        handle: "oshodi-market",
      },
      {
        market_name: "Ogba Market",
        handle: "ogba-market",
      },
      {
        market_name: "Ita Faji Market",
        handle: "ita-faji-market",
      },
      {
        market_name: "Ogogoro Market",
        handle: "ogogoro-market",
      },
      {
        market_name: "Sandgrouse Market",
        handle: "sandgrouse-market",
      },
      {
        market_name: "Rauf Aregbesola Market",
        handle: "rauf-aregbesola-market",
      },
      {
        market_name: "Tejuosho Market",
        handle: "tejuosho-market",
      },
    ],
    fun_fact:
      "Lagos is home to Nigeria's largest city and one of the fastest-growing cities in the world.",
  },
  {
    state: "FCT",
    markets: [
      {
        market_name: "Wuse Market",
        handle: "wuse-market",
      },
      {
        market_name: "Garki Ultra Modern Market",
        handle: "garki-ultra-modern-market",
      },
      {
        market_name: "Utako Market",
        handle: "utako-market",
      },
      {
        market_name: "Nyanya Market",
        handle: "nyanya-market",
      },
      {
        market_name: "Duste Makaranta Market",
        handle: "duste-makaranta-market",
      },
      {
        market_name: "Idu-Karimo Market",
        handle: "idu-karimo-market",
      },
      {
        market_name: "Ram Market Abaji",
        handle: "ram-market-abaji",
      },
      {
        market_name: "Mpape Market",
        handle: "mpape-market",
      },
      {
        market_name: "Garki Market",
        handle: "garki-market",
      },
      {
        market_name: "Kuje Market",
        handle: "kuje-market",
      },
      {
        market_name: "Gudu Market",
        handle: "gudu-market",
      },
      {
        market_name: "Dei –Dei Market",
        handle: "dei-dei-market",
      },
      {
        market_name: "Karu Market",
        handle: "karu-market",
      },
      {
        market_name: "Kubwa Market",
        handle: "kubwa-market",
      },
      {
        market_name: "Maitama’s Farmers Market",
        handle: "maitamas-farmers-market",
      },
      {
        market_name: "Garki Market",
        handle: "garki-market",
      },
    ],
    fun_fact:
      "Abuja, the capital city of Nigeria, is located within the Federal Capital Territory (FCT).",
  },
  {
    state: "Kano State",
    markets: [
      {
        market_name: "Kurumi Market",
        handle: "kurumi-market",
      },
      {
        market_name: "Enlemu Market",
        handle: "enlemu-market",
      },
      {
        market_name: "Kantin Kwori Market",
        handle: "kantin-kwori-market",
      },
      {
        market_name: "Yankura Market",
        handle: "yankura-market",
      },
      {
        market_name: "Galadima Market",
        handle: "galadima-market",
      },
      {
        market_name: "Dawano Market",
        handle: "dawano-market",
      },
      {
        market_name: "Rimi Market",
        handle: "rimi-market",
      },
      {
        market_name: "Kwari Market Mosque",
        handle: "kwari-market-mosque",
      },
      {
        market_name: "Kofar Wabe Market",
        handle: "kofar-wabe-market",
      },
    ],
    fun_fact:
      "Kano State is renowned for its rich cultural heritage, including its traditional dye pits and ancient city walls.",
  },
  {
    state: "Abia State",
    markets: [
      {
        market_name: "Ariaria International Market",
        handle: "ariaria-international-market",
      },
      {
        market_name: "Alaoji Motor Park Market",
        handle: "alaoji-motor-park-market",
      },
      {
        market_name: "Eziukwu Market",
        handle: "eziukwu-market",
      },
      {
        market_name: "Ahia-Ohuru (New Market)",
        handle: "ahia-ohuru-new-market",
      },
      {
        market_name: "Nsulu Market",
        handle: "nsulu-market",
      },
      {
        market_name: "Old Court Mini Market (Akpakara)",
        handle: "old-court-mini-market-akpakara",
      },
      {
        market_name: "Orie Ohabiam Electronic Market",
        handle: "orie-ohabiam-electronic-market",
      },
      {
        market_name: "Salad Market /Railway Station",
        handle: "salad-market-railway-station",
      },
      {
        market_name: "School Road/York Street Mini Market",
        handle: "school-road-york-street-mini-market",
      },
      {
        market_name: "St. Michaels Road /Mini Market",
        handle: "st-michaels-road-mini-market",
      },
      {
        market_name: "Waterside Cattle Market",
        handle: "waterside-cattle-market",
      },
      {
        market_name: "Tenant by Asa Road Mini Market",
        handle: "tenant-by-asa-road-mini-market",
      },
      {
        market_name: "Ebele Market Igbere",
        handle: "ebele-market-igbere",
      },
    ],
    fun_fact:
      "Ariaria International Market in Aba, Abia State, is one of the largest markets in West Africa.",
  },
  {
    state: "Benue State",
    markets: [
      {
        market_name: "Makurdi Modern Market",
        handle: "makurdi-modern-market",
      },
      {
        market_name: "Wurukum Market",
        handle: "wurukum-market",
      },
      {
        market_name: "North Bank Market",
        handle: "north-bank-market",
      },
      {
        market_name: "Wadata Market",
        handle: "wadata-market",
      },
      {
        market_name: "Otukpo Main Market",
        handle: "otukpo-main-market",
      },
      {
        market_name: "Rice Mill Market Otukpo",
        handle: "rice-mill-market-otukpo",
      },
      {
        market_name: "Ela Market",
        handle: "ela-market",
      },
      {
        market_name: "Otobi Market",
        handle: "otobi-market",
      },
      {
        market_name: "Allan Market",
        handle: "allan-market",
      },
      {
        market_name: "Kwasa Market",
        handle: "kwasa-market",
      },
      {
        market_name: "Orijo Market",
        handle: "orijo-market",
      },
      {
        market_name: "Wanune Market",
        handle: "wanune-market",
      },
      {
        market_name: "Abinsi Market",
        handle: "abinsi-market",
      },
      {
        market_name: "Zaki- Biam Yam Market",
        handle: "zaki-biam-yam-market",
      },
      {
        market_name: "Agba-aye Market",
        handle: "agba-aye-market",
      },
      {
        market_name: "Ikpayongo Market",
        handle: "ikpayongo-market",
      },
      {
        market_name: "Aliade Market",
        handle: "aliade-market",
      },
      {
        market_name: "Gboko Main Market",
        handle: "gboko-main-market",
      },
      {
        market_name: "Ogobia Market",
        handle: "ogobia-market",
      },
      {
        market_name: "Taraku Oil Mills Market",
        handle: "taraku-oil-mills-market",
      },
      {
        market_name: "Apir Village Market",
        handle: "apir-village-market",
      },
      {
        market_name: "High Level Market",
        handle: "high-level-market",
      },
    ],
    fun_fact:
      "Benue State is often referred to as the 'Food Basket of the Nation' due to its large agricultural output.",
  },
  {
    state: "Plateau State",
    markets: [
      {
        market_name: "Abattoir Market",
        handle: "abattoir-market",
      },
      {
        market_name: "Terminus, Jos Main Market",
        handle: "terminus-jos-main-market",
      },
      {
        market_name: "Bukuru Market",
        handle: "bukuru-market",
      },
      {
        market_name: "Tuduwadan Market",
        handle: "tuduwadan-market",
      },
      {
        market_name: "Rukuba Market",
        handle: "rukuba-market",
      },
      {
        market_name: "Katako Market",
        handle: "katako-market",
      },
      {
        market_name: "Yan Doya Market",
        handle: "yan-doya-market",
      },
    ],
    fun_fact:
      "Jos, the capital city of Plateau State, is known for its cool climate and beautiful landscape, earning it the nickname 'J-town.'",
  },
  {
    state: "Rivers State",
    markets: [
      {
        market_name: "Obio/Akpor International Market",
        handle: "obioakpor-international-market",
      },
      {
        market_name: "Oil Mill",
        handle: "oil-mill",
      },
      {
        market_name: "Obibo Market",
        handle: "obibo-market",
      },
      {
        market_name: "Choba Market",
        handle: "choba-market",
      },
      {
        market_name: "Mile 4 Market",
        handle: "mile-4-market",
      },
      {
        market_name: "Mile 1 Market",
        handle: "mile-1-market",
      },
      {
        market_name: "Mgbogba Market",
        handle: "mgbogba-market",
      },
      {
        market_name: "Ogunabale Market",
        handle: "ogunabale-market",
      },
      {
        market_name: "Waterlines Market",
        handle: "waterlines-market",
      },
      {
        market_name: "Slaughter Market",
        handle: "slaughter-market",
      },
      {
        market_name: "Imo-River Market",
        handle: "imo-river-market",
      },
      {
        market_name: "Eleme Market",
        handle: "eleme-market",
      },
      {
        market_name: "Okrika Market",
        handle: "okrika-market",
      },
      {
        market_name: "Rumuokoro Market",
        handle: "rumuokoro-market",
      },
      {
        market_name: "Enenewa Market",
        handle: "enenewa-market",
      },
      {
        market_name: "Onne Market",
        handle: "onne-market",
      },
    ],
    fun_fact:
      "Rivers State is known for its abundant natural resources, including oil, and is home to Port Harcourt, the largest city in the state.",
  },
  {
    state: "Oyo State",
    markets: [
      {
        market_name: "Aleshinloye Market",
        handle: "aleshinloye-market",
      },
      {
        market_name: "Gbagi Market",
        handle: "gbagi-market",
      },
      {
        market_name: "Ogunpa Market",
        handle: "ogunpa-market",
      },
      {
        market_name: "Agbeni market",
        handle: "agbeni-market",
      },
      {
        market_name: "New Camp Market Challenge",
        handle: "new-camp-market-challenge",
      },
      {
        market_name: "Iwo Road Market",
        handle: "iwo-road-market",
      },
      {
        market_name: "Oje Market",
        handle: "oje-market",
      },
      {
        market_name: "Oja Oba Market",
        handle: "oja-oba-market",
      },
      {
        market_name: "New garage Market",
        handle: "new-garage-market",
      },
      {
        market_name: "Molete Bode Market",
        handle: "molete-bode-market",
      },
      {
        market_name: "Oke Ado Market",
        handle: "oke-ado-market",
      },
      {
        market_name: "Sango Market",
        handle: "sango-market",
      },
      {
        market_name: "Ojoo Market",
        handle: "ojoo-market",
      },
      {
        market_name: "Ile Tuntun Market",
        handle: "ile-tuntun-market",
      },
      {
        market_name: "Agbokojo wholesales Market",
        handle: "agbokojo-wholesales-market",
      },
      {
        market_name: "Bodija Market",
        handle: "bodija-market",
      },
      {
        market_name: "Oranyan Goat Market",
        handle: "oranyan-goat-market",
      },
      {
        market_name: "Orita Aperin Market",
        handle: "orita-aperin-market",
      },
      {
        market_name: "Amuloko Market",
        handle: "amuloko-market",
      },
      {
        market_name: "Idi Arere Market",
        handle: "idi-arere-market",
      },
      {
        market_name: "Moniya Market",
        handle: "moniya-market",
      },
      {
        market_name: "Agodi Gate Market",
        handle: "agodi-gate-market",
      },
      {
        market_name: "Challenge Market",
        handle: "challenge-market",
      },
      {
        market_name: "Ring Road Market",
        handle: "ring-road-market",
      },
      {
        market_name: "Apata Market",
        handle: "apata-market",
      },
      {
        market_name: "Queen Cinema/Salvation Army",
        handle: "queen-cinemasalvation-army",
      },
      {
        market_name: "Bere",
        handle: "bere",
      },
      {
        market_name: "Basorun",
        handle: "basorun",
      },
    ],
    fun_fact:
      "Oyo State is home to the ancient city of Ibadan, one of the largest cities in West Africa.",
  },
  {
    state: "Akwa-Ibom State",
    markets: [
      {
        market_name: "Itam Market",
        handle: "itam-market",
      },
      {
        market_name: "Abak Main Market",
        handle: "abak-main-market",
      },
      {
        market_name: "Affiong Market",
        handle: "affiong-market",
      },
      {
        market_name: "Abo Market",
        handle: "abo-market",
      },
      {
        market_name: "Ura Bom Market",
        handle: "ura-bom-market",
      },
      {
        market_name: "Uyo Main Market",
        handle: "uyo-main-market",
      },
      {
        market_name: "Offiong Etok Market",
        handle: "offiong-etok-market",
      },
      {
        market_name: "Eket Main Market",
        handle: "eket-main-market",
      },
      {
        market_name: "Urua Oto Market",
        handle: "urua-oto-market",
      },
      {
        market_name: "Ikot Ekpene Main Market",
        handle: "ikot-ekpene-main-market",
      },
      {
        market_name: "Obong Anang Market",
        handle: "obong-anang-market",
      },
      {
        market_name: "Ibno Market Eket",
        handle: "ibno-market-eket",
      },
      {
        market_name: "Oron Market",
        handle: "oron-market",
      },
    ],
    fun_fact:
      "Akwa Ibom State is known for its oil and gas resources as well as its rich cultural heritage.",
  },
  {
    state: "Ogun State",
    markets: [
      {
        market_name: "Ijebu Igbo Market",
        handle: "ijebu-igbo-market",
      },
      {
        market_name: "Ago Iwoye Central Market",
        handle: "ago-iwoye-central-market",
      },
      {
        market_name: "Oru Market",
        handle: "oru-market",
      },
      {
        market_name: "Ota Market",
        handle: "ota-market",
      },
      {
        market_name: "Shagamu Market",
        handle: "shagamu-market",
      },
      {
        market_name: "Abeokuta",
        handle: "abeokuta",
      },
      {
        market_name: "Kuto Market, Abeokuta",
        handle: "kuto-market-abeokuta",
      },
      {
        market_name: "Sabo Market, Sagamu",
        handle: "sabo-market-sagamu",
      },
      {
        market_name: "Oja Oba/Ita Aje, Ijebu Ode",
        handle: "oja-oba-ita-aje-ijebu-ode",
      },
      {
        market_name: "Ita Osun, Ijebu Ode",
        handle: "ita-osun-ijebu-ode",
      },
      {
        market_name: "Lafenwa Market, Abeokuta",
        handle: "lafenwa-market-abeokuta",
      },
      {
        market_name: "Adire and Batik Market, Abeokuta",
        handle: "adire-and-batik-market-abeokuta",
      },
    ],
    fun_fact:
      "Ogun State is known for its industrial base and is home to several manufacturing companies in Nigeria.",
  },
  {
    state: "Kaduna State",
    markets: [
      {
        market_name: "Kaduna Central Market",
        handle: "kaduna-central-market",
      },
      {
        market_name: "Kasuwan Barci",
        handle: "kasuwan-barci",
      },
      {
        market_name: "Kasuwan Kori",
        handle: "kasuwan-kori",
      },
      {
        market_name: "Kakuri Market",
        handle: "kakuri-market",
      },
      {
        market_name: "Station Market",
        handle: "station-market",
      },
      {
        market_name: "Sabon Tasha Market 5",
        handle: "sabon-tasha-market-5",
      },
      {
        market_name: "Panteka Market",
        handle: "panteka-market",
      },
      {
        market_name: "Anwan Dosa Market",
        handle: "anwan-dosa-market",
      },
      {
        market_name: "Tudun Wada Market",
        handle: "tudun-wada-market",
      },
    ],
    fun_fact:
      "Kaduna State is home to one of the oldest textile industries in Nigeria, contributing significantly to the country's textile production.",
  },
  {
    state: "Nassarawa State",
    markets: [
      {
        market_name: "Keffi Market",
        handle: "keffi-market",
      },
      {
        market_name: "Nassarawa Toto Market",
        handle: "nassarawa-toto-market",
      },
      {
        market_name: "Kasuwan Lafiya",
        handle: "kasuwan-lafiya",
      },
      {
        market_name: "Karu Market",
        handle: "karu-market",
      },
      {
        market_name: "Orange Market",
        handle: "orange-market",
      },
      {
        market_name: "Masaka Market",
        handle: "masaka-market",
      },
      {
        market_name: "New Market Keffi",
        handle: "new-market-keffi",
      },
      {
        market_name: "Tamar Market Nassarawa",
        handle: "tamar-market-nassarawa",
      },
      {
        market_name: "Wamba Market",
        handle: "wamba-market",
      },
      {
        market_name: "Akwanga New Market",
        handle: "akwanga-new-market",
      },
      {
        market_name: "Lafia Emirs Palace Market",
        handle: "lafia-emirs-palace-market",
      },
      {
        market_name: "Asapio Market",
        handle: "asapio-market",
      },
      {
        market_name: "Ajaragu Market",
        handle: "ajaragu-market",
      },
      {
        market_name: "Alanis Market",
        handle: "alanis-market",
      },
      {
        market_name: "Laraba Market Doma (Wednesday Market)",
        handle: "laraba-market-doma-wednesday-market",
      },
    ],
    fun_fact:
      "Nassarawa State is home to the Farin Ruwa Waterfalls, one of the highest waterfalls in Nigeria.",
  },
  {
    state: "Cross River State",
    markets: [
      {
        market_name: "Awatt Market",
        handle: "awatt-market",
      },
      {
        market_name: "Marian Market",
        handle: "marian-market",
      },
      {
        market_name: "Uwanse Market",
        handle: "uwanse-market",
      },
      {
        market_name: "8th Miles Market",
        handle: "8th-miles-market",
      },
      {
        market_name: "Akpabuyo Market",
        handle: "akpabuyo-market",
      },
      {
        market_name: "Ikotushie Market",
        handle: "ikotushie-market",
      },
      {
        market_name: "Mbukpa Market",
        handle: "mbukpa-market",
      },
      {
        market_name: "Ikom Market",
        handle: "ikom-market",
      },
      {
        market_name: "Ogoja Market",
        handle: "ogoja-market",
      },
      {
        market_name: "Bokobri Market",
        handle: "bokobri-market",
      },
    ],
    fun_fact:
      "Cross River State is known for its biodiversity and is home to the Cross River gorilla, one of the rarest primates in the world.",
  },
  {
    state: "Imo State",
    markets: [
      {
        market_name: "Okigwe Market",
        handle: "okigwe-market",
      },
      {
        market_name: "Christ Church Market",
        handle: "christ-church-market",
      },
      {
        market_name: "Orie Agu Nsu Market",
        handle: "orie-agu-nsu-market",
      },
      {
        market_name: "Ekpeikpa at Isinweke",
        handle: "ekpeikpa-at-isinweke",
      },
      {
        market_name: "Afor Ogbe Market",
        handle: "afor-ogbe-market",
      },
      {
        market_name: "Anhara Market Isiala Mbano",
        handle: "anhara-market-isiala-mbano",
      },
    ],
    fun_fact:
      "Imo State is known for its rich cultural heritage and is often referred to as the 'Eastern Heartland' of Nigeria.",
  },
  {
    state: "Borno State",
    markets: [
      {
        market_name: "Monday Market, Maiduguri",
        handle: "monday-market-maiduguri",
      },
      {
        market_name: "Custom Market, Maiduguri",
        handle: "custom-market-maiduguri",
      },
      {
        market_name: "Gamboru Market, Maiduguri",
        handle: "gamboru-market-maiduguri",
      },
      {
        market_name: "Monday Market, Biu",
        handle: "monday-market-biu",
      },
      {
        market_name: "Gubio Market, Gubio",
        handle: "gubio-market-gubio",
      },
      {
        market_name: "Galtimari Market, Jere",
        handle: "galtimari-market-jere",
      },
      {
        market_name: "Monday Market, Bama",
        handle: "monday-market-bama",
      },
      {
        market_name: "Damboa Market, Damboa",
        handle: "damboa-market-damboa",
      },
      {
        market_name: "Monday Market, Monguno",
        handle: "monday-market-monguno",
      },
    ],
    fun_fact:
      "Borno State is known as the 'Home of Peace.' It is rich in cultural heritage and is famous for the Kanuri people's traditional Durbar festival.",
  },
]
