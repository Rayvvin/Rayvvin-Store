"use client"

import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { formatAmount, useCustomerOrders } from "medusa-react"
import Link from "next/link"
import OrderCard from "../order-card"
import { Fragment, useEffect, useState } from "react"
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import customer from "@medusajs/medusa/dist/repositories/customer"
import ChevronDown from "@modules/common/icons/chevron-down"
import Thumbnail from "@modules/products/components/thumbnail"
import { Avatar } from "@nextui-org/react"
import clsx from "clsx"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import UserIcon from "@modules/common/icons/user"
import { Customer, Order } from "@medusajs/medusa"
import { useAccount } from "@lib/context/account-context"
import Package from "@modules/common/icons/package"
// import item from "@modules/cart/components/item"
import NativeSelect from "@modules/common/components/native-select"
// import { getProfileCompletion } from "../overview"

ChartJS.register(ArcElement, Tooltip, Legend)

const OrderOverview = () => {
  const { orders, isLoading } = useCustomerOrders()
  const { customer } = useAccount()
  const [selectedStatus, setSelectedStatus] = useState("")
  const [orderz, setOrderz] = useState<Order[]>([])

  const options = {
    cutout: "90%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  }

  useEffect(() => {
    if (orders) {
      if (selectedStatus !== "") {
        setOrderz(
          orders?.filter((ord) => {
            ord.fulfillment_status === selectedStatus
          })
        )
      } else {
        setOrderz(orders)
      }
    }
  }, [selectedStatus, orders])

  const orderStats = [
    { name: "Total", bg_color: "#F0FAFF", count: orders?.length },
    {
      name: "Completed",
      bg_color: "#F8FFF0",
      count: orders?.filter((ord) => {
        ord.fulfillment_status === "fulfilled"
      }).length,
    },
    {
      name: "Pending",
      bg_color: "#FFF7F0",
      count: orders?.filter((ord) => {
        ord.fulfillment_status === "not_fulfilled"
      }).length,
    },
    {
      name: "Returned",
      bg_color: "#FFF2F2",
      count: orders?.filter((ord) => {
        ord.fulfillment_status === "returned"
      }).length,
    },
  ]
  if (isLoading) {
    return (
      <div className="text-gray-900 w-full flex justify-center pt-12">
        <Spinner size={36} />
      </div>
    )
  }

  if (orders?.length) {
    return (
      <Fragment>
        <div className="flex-col gap-y-8 w-full flex small:hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 items-center justify-between gap-x-4 mb-6">
            {orderStats.map((stat) => {
              return (
                <div
                  className={`flex flex-col gap-y-4 shadow-md bg-[#FAFAFA] p-4 min-h-[137px] w-full rounded-lg justify-center`}
                >
                  <div className="flex items-stretch justify-center gap-x-4 gap-y-2 w-full flex-col">
                    <div
                      className={`relative w-10 h-10 justify-center items-center shadow-md flex bg-[${stat.bg_color}] rounded-lg`}
                      style={{ background: stat.bg_color }}
                    >
                      {/* <Doughnut data={setData(stat)} options={options} /> */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package size={16} />
                      </div>
                    </div>
                    <p className="text-xs text-[#4E4E4E] w-full whitespace-nowrap">
                      {`${stat.name} Orders`}
                    </p>
                    <p className="text-sm font-bold text-[#4E4E4E] w-full whitespace-nowrap">
                      {`${stat.count} Orders`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          {orders.map((o) => (
            <div
              key={o.id}
              className="border-b border-gray-200 pb-6 last:pb-4 last:border-none"
            >
              <OrderCard order={o} />
            </div>
          ))}
        </div>
        <div className="hidden small:block">
          <div className="flex flex-col py-8 border-t border-gray-200">
            <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
              <div className="flex items-center justify-between gap-x-8 mb-6">
                {orderStats.map((stat) => {
                  return (
                    <div
                      className={`flex flex-col gap-y-4 shadow-md bg-[#FAFAFA] p-4 min-h-[137px] rounded-lg w-full justify-center`}
                    >
                      <div className="flex items-stretch justify-center gap-x-4 gap-y-2 w-full flex-col">
                        <div
                          className={`relative w-10 h-10 justify-center items-center shadow-md flex bg-[${stat.bg_color}] rounded-lg`}
                          style={{ background: stat.bg_color }}
                        >
                          {/* <Doughnut data={setData(stat)} options={options} /> */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={16} />
                          </div>
                        </div>
                        <p className="text-xs text-[#4E4E4E] w-full whitespace-nowrap">
                          {`${stat.name} Orders`}
                        </p>
                        <p className="text-sm font-bold text-[#4E4E4E] w-full whitespace-nowrap">
                          {`${stat.count} Orders`}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2 justify-between">
                  <h3 className="text-large-semi">All orders</h3>
                  <NativeSelect
                    placeholder="All Orders"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="max-h-[35px] w-[150px] rounded-lg"
                  >
                    <option value="fulfilled">Fulfilled</option>
                    <option value="not_fulfilled">Not Fulfilled</option>
                    <option value="returned">Returned</option>
                  </NativeSelect>
                </div>
                <ul className="flex flex-col gap-y-4">
                  {orderz ? (
                    orderz.slice(0, 5).map((order) => {
                      return (
                        <li key={order.id}>
                          <Link href={`/order/details/${order.id}`}>
                            <div className="bg-white flex justify-between items-center p-4 rounded-lg gap-x-6">
                              <div className="flex items-center gap-x-4">
                                <div className="flex -space-x-[70px]">
                                  {order.items.slice(0, 3).map((i) => {
                                    return (
                                      <div key={i.id} className="w-20 h-20">
                                        <Thumbnail
                                          thumbnail={order.items[0].thumbnail}
                                          images={[]}
                                          size="full"
                                          classNamez="shadow-md rounded-md"
                                        />
                                      </div>
                                    )
                                  })}
                                </div>
                                <div className="flex">
                                  {order.items.slice(0, 3).map((i) => {
                                    return (
                                      <div key={i.id} className="flex flex-col">
                                        <div className="flex items-center text-small-regular text-gray-700">
                                          <span className="text-gray-900 font-semibold xl:whitespace-nowrap">
                                            {i.title}
                                          </span>
                                          <span className="ml-2">x</span>
                                          <span>{i.quantity}</span>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                              <div className="grid grid-cols-4 grid-rows-2 text-small-regular gap-x-4 flex w-full">
                                <span className="font-semibold">
                                  Date placed
                                </span>
                                <span className="font-semibold">
                                  Order number
                                </span>
                                <span className="font-semibold">Status</span>
                                <span className="font-semibold">
                                  Total amount
                                </span>

                                <span>
                                  {new Date(order.created_at).toDateString()}
                                </span>

                                <span>#{order.display_id}</span>
                                <span
                                  className={clsx(
                                    "inline-flex w-fit text-xs font-medium me-2 px-2.5 py-0.5 rounded-md",
                                    {
                                      "bg-green-100 text-green-800":
                                        order.fulfillment_status == "fulfilled",
                                      "bg-yellow-100 text-yellow-800":
                                        order.fulfillment_status ==
                                        "not_fulfilled",
                                    }
                                  )}
                                >
                                  {order.fulfillment_status}
                                </span>

                                <span>
                                  {formatAmount({
                                    amount: order.total,
                                    region: order.region,
                                    includeTaxes: false,
                                  })}
                                </span>
                              </div>
                              <button
                                className="flex items-center justify-between"
                                onClick={close}
                              >
                                <span className="sr-only">
                                  Go to order #{order.display_id}
                                </span>
                                <ChevronDown className="-rotate-90" />
                              </button>
                            </div>
                          </Link>

                          <div className="border-t border-gray-200 mt-4"></div>
                        </li>
                      )
                    })
                  ) : (
                    <span>No recent orders</span>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <Link href="/" passHref>
          <Button>Continue shopping</Button>
        </Link>
      </div>
    </div>
  )

  function setData({ bg_color }) {
    return {
      datasets: [
        {
          data: [
            getProfileCompletion(customer),
            100 - getProfileCompletion(customer),
          ],
          backgroundColor: ["#4CAF50", "#E6E6E6"],
          borderWidth: 0,
        },
      ],
    }
  }
}

const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default OrderOverview
