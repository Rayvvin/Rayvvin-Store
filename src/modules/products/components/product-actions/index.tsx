import { useProductActions } from "@lib/context/product-context"
import StarRatingComponent from "react-star-rating-component"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useEffect, useMemo } from "react"
import { Product } from "types/medusa"
import { Id, ToastContainer, toast } from "react-toastify"

type ProductActionsProps = {
  product: PricedProduct
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  // useEffect(() => {
  //   console.log(product)
  // }, [product])

  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link
          href={`/collections/${product.collection.handle}`}
          className="text-small-regular text-gray-700"
        >
          {product.collection.title}
        </Link>
      )}
      <h3 className="text-xl-regular font-extrabold">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      <span className="flex items-center text-base-regular text-[#A9A9A9] gap-x-2">
        <StarRatingComponent
          name="rate2"
          editing={false}
          starCount={5}
          value={0}
          renderStarIcon={() => (
            <i style={{ fontStyle: "normal", fontSize: "15px" }}>★</i>
          )}
          starColor={"#FFB447"}
          // emptyStarColor={"transparent"}
        />
        {`(${0} customer reviews)`}
      </span>

      {product.variants.length >= 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {(product.options || []).map((option) => {
            // console.log(product)
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            )
          })}
        </div>
      )}

      <div className="mb-4">
        {selectedPrice ? (
          <div className="flex flex-col text-[#3D8B7A]">
            <span
              className={clsx("text-xl-semi", {
                "text-rose-600": selectedPrice.price_type === "sale",
              })}
            >
              {selectedPrice.calculated_price}
            </span>
            {selectedPrice.price_type === "sale" && (
              <>
                <p>
                  <span className="text-gray-500">Original: </span>
                  <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                </p>
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="sm:grid-cols-2 gap-y-4 sm:gap-x-4 grid grid-cols-1">
        <Button
          onClick={() => {
            // console.log("Adding to cart");

            addToCart
            // console.log(product)
          }}
          className="rounded-md w-full"
          style={{
            background: "#3D8B7A",
            borderColor: "#3D8B7A",
            color: "white",
          }}
        >
          {!inStock ? "Out of stock" : "Add to cart"}
        </Button>
        {/* <Button
          onClick={addToCart}
          className="rounded-md w-full"
          style={{
            background: "white",
            borderColor: "#3D8B7A",
            color: "#3D8B7A",
          }}
        >
          {!inStock ? "Out of stock" : "Add to cart"}
          Add to Favourites
        </Button> */}
      </div>
    </div>
  )
}

export default ProductActions
