import { Tab } from "@headlessui/react"
import { Product } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { Avatar, Link } from "@nextui-org/react"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = process.env.NEXT_PUBLIC_VITE_BASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL and KEY are required")
}

const supabase = createClient(supabaseUrl, supabaseKey)
const fetchProductAndStore = async (productId: string) => {
  const { data: productData, error: productError } = await supabase
    .from("product")
    .select("*")
    .eq("id", productId)
    .single()

  if (productError) {
    console.error("Error fetching product:", productError)
    return null
  }

  // console.log(productData)

  const { data: storeData, error: storeError } = await supabase
    .from("store")
    .select("*")
    .eq("id", productData.store_id)
    .single()

  if (storeError) {
    console.error("Error fetching store:", storeError)
    return null
  }

  // console.log(storeData)

  return { product: productData, store: storeData }
}

type ProductTabsProps = {
  product: PricedProduct
  type?: string
}

const ProductTabs = ({ product, type }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    // return a switch to produces a list of tabs based on the type passed in
    switch (type) {
      case "delivery and returns":
        return [
          {
            label: "Delivery & Returns",
            component: <DeliveryReturnsTab />,
          },
        ]
      case "seller":
        return [
          {
            label: "Seller Information",
            component: <SellerTab product={product} />,
          },
        ]
      default:
        return [
          {
            label: "Delivery & Returns",
            component: <DeliveryReturnsTab />,
          },
        ]
    }
  }, [product])

  return (
    <div className="flex flex-col lg:min-w-[320px] xl:min-w-[370px] xl:w-11/12 2xl:w-full mx-2 px-0">
      <Tab.Group>
        <Tab.List className="border-b border-gray-200 box-border grid grid-cols-2 pt-3 lg:min-w-[320px] xl:min-w-[370px] xl:w-full bg-white rounded-t-lg px-2">
          {tabs.map((tab, i) => {
            return (
              <Tab
                key={i}
                className={({ selected }) =>
                  clsx(
                    "text-start uppercase text-small-regular pb-2 -mb-px border-b border-gray-200 transition-color duration-150 ease-in-out",
                    {
                      // "border-b border-gray-900": selected,
                    }
                  )
                }
              >
                {tab.label}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels className="flex flex-col lg:min-w-[320px] xl:min-w-[370px] xl:w-full px-3 bg-white rounded-b-lg">
          {tabs.map((tab, j) => {
            return <div key={j}>{tab.component}</div>
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <Tab.Panel className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {product.tags?.length ? (
        <div>
          <span className="font-semibold">Tags</span>
        </div>
      ) : null}
    </Tab.Panel>
  )
}

const DeliveryReturnsTab = () => {
  return (
    <Tab.Panel className="text-small-regular py-4 flex flex-col gap-y-4">
      <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 box-border pb-4">
        <div className="flex items-start gap-x-2 w-full">
          <FastDelivery color="#3D8B7A" size={25} />
          <div className="flex flex-col w-full">
            <span className="text-lg">Door Delivery</span>
            <p className="text-sm md:text-xs text-[#4E4E4E] !leading-8 w-full">
              Estimated delivery time 1 - 3 business days
              <br />
              <strong>Express Delivery Available</strong>
              <br />
              <strong>For Same-Day-Delivery:</strong> Please place your order
              before 11AM.
              <br />
              <strong>For Next-Day-Delivery:</strong> Orders placed after 11AM
              will be delivered the next day.
              <br />
              <strong>Note:</strong> Availability may vary by location.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2 w-full">
          <FastDelivery color="#3D8B7A" size={25} />
          <div className="flex flex-col w-full">
            <span className="text-base">Return Policy</span>
            <p className="text-sm md:text-xs text-[#4E4E4E] !leading-8 w-full">
              <strong>Guaranteed 48 Hours Return Policy</strong>
              <br />
              Products must be returned within 48hrs of delivery to effect
              changes.
            </p>
          </div>
        </div>
      </div>
    </Tab.Panel>
  )
}

const SellerTab = ({ product }) => {
  const [store, setStore] = useState<any>(null)

  useEffect(() => {
    const fetchStoreData = async () => {
      const storeData = await fetchProductAndStore(product.id)
      setStore(storeData)
    }

    fetchStoreData()
  }, [product])

  return (
    <Tab.Panel className="text-small-regular py-4 flex flex-col gap-y-4">
      <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 box-border pb-4">
        <Link href={`/stores/${store?.store?.id}`}>
          <div
            className="flex items-center gap-x-4 w-full"
            onClick={() => {
              // window.location.href = `/stores/${store?.store?.id}`
            }}
          >
            <Avatar src="/rayvvin_pngs/Avatar.png" size="md" />
            <div className="flex flex-col w-full">
              <span className="text-base">
                {store && store.store ? store?.store?.name : ""}
              </span>
              <p className="text-xs text-[#4E4E4E] w-full">
                Number of Months Selling on Rayvvin:{" "}
                {store && store.store
                  ? Math.floor(
                      (new Date().getTime() -
                        new Date(store.store.created_at).getTime()) /
                        (1000 * 60 * 60 * 24 * 30)
                    )
                  : "-"}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2 w-full">
          {/* <FastDelivery color="#3D8B7A" size={25} /> */}
          <div className="flex flex-col w-full">
            <span className="text-sm">Seller Performance</span>
            <p className="text-sm text-[#4E4E4E] leading-8 w-full">
              <ol className="list-disc pl-8">
                <li>
                  Order Fulfillment Rate{" "}
                  <span className="text-[#098B07]">(Excellent)</span>
                </li>
                <li>
                  Quality Score{" "}
                  <span className="text-[#098B07]">(Excellent)</span>
                </li>
                <li>
                  Customer Rating{" "}
                  <span className="text-[#098B07]">(Excellent)</span>
                </li>
              </ol>
            </p>
          </div>
        </div>
      </div>
    </Tab.Panel>
  )
}

const ShippingInfoTab = () => {
  return (
    <Tab.Panel className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery color="#3D8B7A" />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh color="#3D8B7A" />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back color="#3D8B7A" />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </Tab.Panel>
  )
}

export default ProductTabs
