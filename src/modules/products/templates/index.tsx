"use client"
import dynamic from "next/dynamic"
import React, { useEffect, useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import ProductInfo from "@modules/products/templates/product-info"
// import ProductTabs from "@modules/products/components/product-tabs"
import ProductTabs from "@modules/products/components/product-tabs-rayvvin"
import ProductTabsMain from "@modules/products/components/product-tabs-rayvvin-main"
import RelatedProducts from "@modules/products/components/related-products"
// import ImageGallery from "@modules/products/components/image-gallary"
import ImageGallery from "@modules/products/components/image-gallary-rayvvin"
import MobileActions from "@modules/products/components/mobile-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Hero from "@modules/home/components/hero"
// const ImageGallery = dynamic( () => import( "@modules/products/components/image-gallary-rayvvin" ), { ssr: false } );

type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)

  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding")
    setIsOnboarding(onboarding === "true")
  }, [])

  return (
    <ProductProvider product={product}>
      <div className="content-container flex flex-col medium:flex-row gap-y-6 small:items-start py-6 px-1 relative">
        <div
          style={{ width: "-webkit-fill-available" }}
          // className="content-container flex flex-col small:flex-row small:items-start sm:mb-4 md:mb-0 py-6 relative shadow bg-white p-4 rounded-lg mx-4"
          className="flex flex-col content-container items-center"
        >
          <div className="content-container flex flex-col small:flex-row small:items-start sm:mb-4 md:mb-0 py-6 relative bg-white p-4 rounded-t-lg rounded-b-none">
            <div className=" md:min-w-[100%] lg:min-w-[500px] xl:min-w-[500px] 2xl:min-w-[510px]">
              <ImageGallery images={product?.images || []} />
            </div>
            <div
              className="small:sticky small:top-20 w-full py-8 small:py-0 flex flex-col medium:flex-row gap-y-12"
              ref={info}
            >
              {isOnboarding && <ProductOnboardingCta />}
              <ProductInfo product={product} />
            </div>
            
          </div>
          <ProductTabsMain product={product} />
        </div>

        <div className="small:sticky small:top-20 flex flex-col md:flex-row xl:flex-col gap-y-4 !mt-[initial] xl:mt-3">
          <ProductTabs product={product} />
          <ProductTabs product={product} type="seller" />
        </div>
      </div>
      {/* <div className="content-container my-4 large:px-3 medium:px-6 small:px-4 xs:px-4 small:my-8 lg:pr-3 2xl:pr-0">
        
      </div> */}
      <div className="content-container my-16 px-6 small:px-8 small:my-32 py-4">
        <RelatedProducts product={product} />
      </div>
      <MobileActions product={product} show={!inView} />
    </ProductProvider>
  )
}

export default ProductTemplate
