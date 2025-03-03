import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import StarRatingComponent from "react-star-rating-component"
import {
  faCoffee,
  faUser,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  store,
  category,
}: ProductPreviewType) => {
  return (
    <Link href={`/products/${handle}`}>
      <div
        className="bg-[#FEFEF2] p-2 rounded-lg"
        style={
          {
            // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 10px",
            // borderRadius: "9px",
          }
        }
      >
        <Thumbnail thumbnail={thumbnail} size="full" />
        <div className="text-xs xs:text-base-regular mt-4 px-2 flex justify-between flex-wrap font-bold">
          <span className="text-sm">{title}</span>
        </div>
        <div className="text-xs-regular mt-1 px-2 flex justify-between items-center flex-wrap">
          {category ? (
            <div className="text-xs mt-0">{category?.name}</div>
          ) : null}

          <div className="text-sm mt-1 mb-1">
            <StarRatingComponent
              name="rate2"
              editing={false}
              starCount={5}
              value={0}
              renderStarIcon={() => (
                <i style={{ fontStyle: "normal", fontSize: "13px" }}>★</i>
              )}
              starColor={"#FFB447"}
              // emptyStarColor={"transparent"}
            />
          </div>

          {/* <div></div> */}
        </div>
        <div className="text-xs xs:text-base-regular mt-2 px-2 flex justify-between flex-wrap">
          <div className="flex items-center gap-x-2 mt-1">
            {price ? (
              <>
                {price.price_type === "sale" && (
                  <span className="line-through text-gray-500">
                    {price.original_price}
                  </span>
                )}
                <span
                  className={clsx("font-semibold", {
                    "text-rose-500": price.price_type === "sale",
                  })}
                >
                  {price.calculated_price}
                </span>
              </>
            ) : (
              <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
            )}
          </div>
          <div className="text-sm mt-1 px-2 py-1 rounded-full border-2 border-[#3D8B7A]">
            <FontAwesomeIcon icon={faShoppingCart} fontSize={'10px'} color="#3D8B7A" />
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </Link>
  )
}

export default ProductPreview
