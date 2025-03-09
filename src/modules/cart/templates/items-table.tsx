import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import Item from "@modules/cart/components/item"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import { formatAmount } from "medusa-react"
import React from "react"
import StarRatingComponent from "react-star-rating-component"

type ItemsTableTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTableTemplate = ({ items, region }: ItemsTableTemplateProps) => {
  const { updateItem, deleteItem } = useStore()
  return (
    <div className="flex w-full">
      {/* <div className="border-b border-gray-200 pb-3 flex items-center">
        <h1 className="text-xl-semi">Shopping Bag</h1>
      </div>
      <div className="grid grid-cols-1 gap-y-8 py-8">
        {items && region
          ? items
              .sort((a, b) => {
                return a.created_at > b.created_at ? -1 : 1
              })
              .map((item) => {
                return <Item key={item.id} item={item} region={region} />
              })
          : Array.from(Array(5).keys()).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </div> */}

      <div className="flex w-full relative overflow-x-auto pb-4 sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Shopping Cart
            {/* <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Your shopping cart.
            </p> */}
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-[#ECF3F2] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Item Details
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {items && region
              ? items
                  .sort((a, b) => {
                    return a.created_at > b.created_at ? -1 : 1
                  })
                  .map((item) => {
                    // return <Item key={item.id} item={item} region={region} />
                    return (
                      <tr key={item.id} className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-20 h-20">
                              {/* <div className="w-[122px]"> */}
                              <Thumbnail
                                thumbnail={item.thumbnail}
                                size="full"
                              />
                              {/* </div> */}
                            </div>
                            <div className="ml-4 flex-1 flex flex-col justify-between gap-y-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {item.title}
                              </div>
                              <LineItemOptions variant={item.variant} />
                              <div className="text-xs text-[#898989] dark:text-gray-200">
                                In Stock
                              </div>
                              <span className="flex items-center text-[#A9A9A9] gap-x-2">
                                <StarRatingComponent
                                  name="rate2"
                                  editing={false}
                                  starCount={5}
                                  value={0}
                                  renderStarIcon={() => (
                                    <i
                                      style={{
                                        fontStyle: "normal",
                                        fontSize: "13px",
                                      }}
                                    >
                                      ★
                                    </i>
                                  )}
                                  starColor={"#FFB447"}
                                  // emptyStarColor={"transparent"}
                                />
                                <p className="!text-xs">{`(${0} reviews)`}</p>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="ml-4 flex-1 flex flex-col justify-between gap-y-1">
                            <span className="flex items-center text-[#A9A9A9] gap-x-2 !font-bold">
                              <LineItemPrice item={item} region={region} />
                            </span>
                            <span className="flex items-center text-[#A9A9A9] gap-x-2 text-xs">
                              {`${formatAmount({
                                amount: item.unit_price || 0,
                                region: region,
                                includeTaxes: false,
                              })} x ${item.quantity} item${
                                item.quantity > 1 ? "s" : ""
                              }`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <div className="text-sm text-gray-900 dark:text-gray-200">
                            <div>
                              <button
                                className="flex items-center gap-x-1 text-gray-500"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                          {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </div> */}
                        </td>
                      </tr>
                    )
                  })
              : Array.from(Array(5).keys()).map((i) => {
                  return <SkeletonLineItem key={i} />
                })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ItemsTableTemplate
