import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "@modules/products/components/product-actions"
import React from "react"
import { Product } from "types/medusa"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-12 lg:min-w-[330px] xl:min-w-[380px] lg:max-w-[380px] xl:max-w-[430px] mx-auto">
        <div>
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
