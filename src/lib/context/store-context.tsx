"use client"

import { medusaClient } from "@lib/config"
import { handleError } from "@lib/util/handle-error"
import { Region } from "@medusajs/medusa"
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
} from "medusa-react"
import React, { useEffect, useState } from "react"
import { useCartDropdown } from "./cart-dropdown-context"
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify"

interface VariantInfoProps {
  variantId: string
  quantity: number
}

interface LineInfoProps {
  lineId: string
  quantity: number
}

interface StoreContext {
  countryCode: string | undefined
  setRegion: (regionId: string, countryCode: string) => void
  addItem: (item: VariantInfoProps) => void
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string) => void
  resetCart: () => void
}

const StoreContext = React.createContext<StoreContext | null>(null)

export const useStore = () => {
  const context = React.useContext(StoreContext)
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

interface StoreProps {
  children: React.ReactNode
}

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"
const REGION_KEY = "medusa_region"

export const StoreProvider = ({ children }: StoreProps) => {
  const { cart, setCart, createCart, updateCart } = useCart()
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const { timedOpen } = useCartDropdown()
  const addLineItem = useCreateLineItem(cart?.id!)
  const removeLineItem = useDeleteLineItem(cart?.id!)
  const adjustLineItem = useUpdateLineItem(cart?.id!)

  // check if the user is onboarding and sets the onboarding session storage
  const searchParams = useSearchParams()
  const onboardingCartId = searchParams.get("cart_id")
  const isOnboarding = searchParams.get("onboarding")

  useEffect(() => {
    if (isOnboarding === "true") {
      sessionStorage.setItem("onboarding", "true")
    }
  }, [isOnboarding])

  const storeRegion = (regionId: string, countryCode: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(
        REGION_KEY,
        JSON.stringify({ regionId, countryCode })
      )

      setCountryCode(countryCode)
    }
  }

  useEffect(() => {
    if (!IS_SERVER) {
      const storedRegion = localStorage.getItem(REGION_KEY)
      if (storedRegion) {
        const { countryCode } = JSON.parse(storedRegion)
        setCountryCode(countryCode)
      }
    }
  }, [])

  const getRegion = () => {
    if (!IS_SERVER) {
      const region = localStorage.getItem(REGION_KEY)
      if (region) {
        return JSON.parse(region) as { regionId: string; countryCode: string }
      }
      // else {
      //   setRegion("reg_01JMWCE1MTA2V95CGR8DNH709C", "gb")
      //   return { regionId: "reg_01JMWCE1MTA2V95CGR8DNH709C", countryCode: "gb" }
      // }
    }
    return null
  }

  const setRegion = async (regionId: string, countryCode: string) => {
    await updateCart.mutateAsync(
      {
        region_id: regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          storeRegion(regionId, countryCode)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const ensureRegion = (region: Region, countryCode?: string | null) => {
    if (!IS_SERVER) {
      const { regionId, countryCode: defaultCountryCode } = getRegion() || {
        regionId: region.id,
        countryCode: region.countries[0].iso_2,
      }

      const finalCountryCode = countryCode || defaultCountryCode

      if (regionId !== region.id) {
        setRegion(region.id, finalCountryCode)
      }

      storeRegion(region.id, finalCountryCode)
      setCountryCode(finalCountryCode)
    }
  }

  const storeCart = (id: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(CART_KEY, id)
    }
  }

  const getCart = () => {
    if (!IS_SERVER) {
      return localStorage.getItem(CART_KEY)
    }
    return null
  }

  const deleteCart = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(CART_KEY)
    }
  }

  const deleteRegion = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(REGION_KEY)
    }
  }

  const createNewCart = async (regionId?: string) => {
    await createCart.mutateAsync(
      { region_id: regionId },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const resetCart = () => {
    deleteCart()

    const savedRegion = getRegion()

    createCart.mutateAsync(
      {
        region_id: savedRegion?.regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  useEffect(() => {
    const ensureCart = async () => {
      const cartId = onboardingCartId || getCart()
      const region = getRegion()

      if (cartId) {
        const cartRes = await medusaClient.carts
          .retrieve(cartId)
          .then(({ cart }) => {
            return cart
          })
          .catch(async (_) => {
            return null
          })

        if (!cartRes || cartRes.completed_at) {
          deleteCart()
          deleteRegion()
          await createNewCart()
          return
        }

        setCart(cartRes)
        ensureRegion(cartRes.region)
      } else {
        await createNewCart(region?.regionId)
      }
    }

    if (!IS_SERVER && !cart?.id) {
      ensureCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addItem = ({
    variantId,
    quantity,
  }: {
    variantId: string
    quantity: number
  }) => {
    // const addLineItemPromise = () =>
    //   addLineItem.mutateAsync(
    //     {
    //       variant_id: variantId,
    //       quantity: quantity,
    //     },
    //     {
    //       onSuccess: ({ cart }) => {
    //         setCart(cart)
    //         storeCart(cart.id)
    //         timedOpen()
    //       },
    //       onError: (error) => {
    //         handleError(error)
    //       },
    //     }
    //   )

    // toast.promise(addLineItemPromise, {
    //   pending: "Adding to Cart",
    //   success: "Product Added to Cart",
    //   error: "Adding to Cart Failed",
    // })

    addLineItem.mutateAsync(
      {
        variant_id: variantId,
        quantity: quantity,
      },
      {
        onSuccess: ({ cart }) => {
          toast("Product Added to Cart", {
            type: "success",
          })
          setCart(cart)
          storeCart(cart.id)
          timedOpen()
        },
        onError: (error) => {
          toast("Add to Cart Failed", {
            type: "error",
          })
          handleError(error)
        },
      }
    )
  }

  const deleteItem = (lineId: string) => {
    const removeLineItemPromise = () =>
      removeLineItem.mutateAsync(
        {
          lineId,
        },
        {
          onSuccess: ({ cart }) => {
            setCart(cart)
            storeCart(cart.id)
          },
          onError: (error) => {
            handleError(error)
          },
        }
      )

    toast.promise(removeLineItemPromise, {
      pending: "Removing from Cart",
      success: "Product Removed from Cart",
      error: "Removing to Cart Failed",
    })
  }

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    const adjustLineItemPromise = () =>
      adjustLineItem.mutateAsync(
        {
          lineId,
          quantity,
        },
        {
          onSuccess: ({ cart }) => {
            setCart(cart)
            storeCart(cart.id)
          },
          onError: (error) => {
            handleError(error)
          },
        }
      )
    toast.promise(adjustLineItemPromise, {
      pending: "Updating Cart Item",
      success: "Cart Item Updated",
      error: "Updating Cart Item Failed",
    })
  }

  return (
    <StoreContext.Provider
      value={{
        countryCode,
        setRegion,
        addItem,
        deleteItem,
        updateItem,
        resetCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
