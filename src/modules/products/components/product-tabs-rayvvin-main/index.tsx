import { Tab } from "@headlessui/react"
import { Product } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { Avatar } from "@nextui-org/react"
import clsx from "clsx"
import React, { Fragment } from "react"
import { useMemo } from "react"
import StarRatingComponent from "react-star-rating-component"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductTabsMain = ({ product }: ProductTabsProps) => {
  const reviews = useMemo(() => {
    return [
      {
        stars: 4,
        user: "Prince Chijioke",
        user_image: "/rayvvin_pngs/Avatar2.png",
        date: "Nov 07, 2024",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis  euismod commodo porttitor. Vestibulum tincidunt est  arcu, vel viverra lacus condimentum sed. ",
      },
      {
        stars: 3,
        user: "Prince Chijioke",
        user_image: "/rayvvin_pngs/Avatar2.png",
        date: "Nov 09, 2024",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis  euismod commodo porttitor. Vestibulum tincidunt est  arcu, vel viverra lacus condimentum sed. ",
      },
    ]
  }, [product])

  const tabs = useMemo(() => {
    return [
      {
        label: "Product Information",
        component: <ShippingInfoTab />,
      },
      {
        label: "Specifications",
        component: <ProductInfoTab product={product} />,
      },
      {
        label: <div className="flex gap-x-3">Reviews <span className="text-[#3D8B7A] bg-[#E7EBEA] flex rounded-full px-2">{reviews?.length}</span></div>,
        component: <ReviewTab reviews={reviews} />,
      },
    ]
  }, [product])

  

  return (
    <div className="flex flex-col mx-2 lg:mx-0 px-0 w-full">
      <Tab.Group>
        <Tab.List className="border-b border-gray-200 box-border flex flex-row justify-start pt-3 w-full bg-white rounded-t-none gap-x-2 overflow-x-auto overflow-y-clip">
          {tabs.map((tab, i) => {
            return (
              <Tab
                key={i}
                className={({ selected }) =>
                  clsx(
                    "text-center text-[#595959] uppercase text-small-regular -mb-px pb-2 mx-4 border-b-2 border-gray-200 transition-color duration-150 ease-in-out whitespace-nowrap",
                    {
                      "border-b-2 mb-0 !border-[#3D8B7A] text-black": selected,
                    }
                  )
                }
              >
                {tab.label}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels className="flex flex-col px-3 bg-white rounded-b-lg">
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

const ShippingInfoTab = () => {
  return (
    <Tab.Panel className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
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

interface Review {
  stars: number
  user: string
  user_image?: string
  date: string
  review: string

}

interface ReviewTabProps {
  reviews: Review[]
}

const ReviewTab = ({ reviews }: ReviewTabProps) => {
  return (
    <Tab.Panel className="text-small-regular py-4 flex flex-col gap-y-4">
      <div className="grid grid-cols-1 gap-y-8 pb-4">
        {reviews.map((review, i) => (
          <div key={i} className="flex items-start gap-x-4 w-full">
            <Avatar src={review.user_image} size="lg" />
            <div className="flex flex-col w-full gap-y-2">
              <div className="flex flex-col gap-y-1">
                <span className="flex items-center text-base-regular text-[#A9A9A9] gap-x-2 py-2">
                  <StarRatingComponent
                    name="rate2"
                    editing={false}
                    starCount={5}
                    value={review.stars}
                    renderStarIcon={() => (
                      <i style={{ fontStyle: "normal", fontSize: "15px" }}>★</i>
                    )}
                    starColor={"#FFB447"}
                  />
                </span>
                <span className="text-sm font-bold">{review.user}</span>
                <p className="text-xs text-[#00000080] w-full">{review.date}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-[#151515B2] leading-6 w-full">
                  {review.review}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Tab.Panel>
  )
}

export default ProductTabsMain
