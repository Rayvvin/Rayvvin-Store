import { getStoreCategories, getStores } from "@lib/data"
import React, { useState, useEffect, useMemo } from "react"
import useStoreCategories from "./use-store-categories"
import { useProductCategories, useProducts } from "medusa-react"

function useStoresProducts() {
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState<any[]>()
  const [categories, setCategories] = useState<any[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { product_categories } = useProductCategories({ expand: "products" })

  useMemo(() => {
    async function fetchStores() {
      try {
        const { stores } = await getStores()
        let _products = product_categories
          ? product_categories?.flatMap((value) =>
              value.products !== null ? value.products : []
            )
          : []
        let _categories = product_categories ? product_categories : []
        setStores(stores)
        setProducts(_products)
        setCategories(_categories)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchStores()
  }, [product_categories])

  return { stores, products, categories, loading, error }
}

export default useStoresProducts
