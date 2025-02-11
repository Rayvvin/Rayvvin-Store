import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import React from "react"
import StarRatingComponent from "react-star-rating-component"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
}

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore()

  return (
    <div className="grid grid-cols-[62px_1fr] gap-x-4">
      <div className="w-[62px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="text-base-regular flex flex-col gap-y-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span>{item.title}</span>
            <LineItemOptions variant={item.variant} />
          </div>
          <NativeSelect
            value={item.quantity}
            onChange={(value) =>
              updateItem({
                lineId: item.id,
                quantity: parseInt(value.target.value),
              })
            }
            className="max-h-[35px] w-[75px]"
          >
            {Array.from(
              [
                ...Array(
                  item.variant.inventory_quantity > 0
                    ? item.variant.inventory_quantity
                    : 10
                ),
              ].keys()
            )
              .slice(0, 10)
              .map((i) => {
                const value = i + 1
                return (
                  <option value={value} key={i}>
                    {value}
                  </option>
                )
              })}
          </NativeSelect>
        </div>
        <div className="flex flex-1 flex-col gap-y-1">
          <div className="text-xs text-[#898989] dark:text-gray-200">
            In Stock
          </div>
          <div className="flex items-center gap-x-2">
            <StarRatingComponent
              name="rate2"
              editing={false}
              starCount={5}
              value={3}
              renderStarIcon={() => (
                <i style={{ fontStyle: "normal", fontSize: "15px" }}>★</i>
              )}
              starColor={"#FFB447"}
              // emptyStarColor={"transparent"}
            />
            <span className="text-[#A9A9A9]">{`(${18} reviews)`}</span>
          </div>
        </div>

        <div className="flex items-end justify-between text-small-regular flex-1">
          <div>
            <button
              className="flex items-center gap-x-1 text-gray-500"
              onClick={() => deleteItem(item.id)}
            >
              <Trash size={14} />
              <span>Remove</span>
            </button>
          </div>
          <div>
            <LineItemPrice item={item} region={region} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
