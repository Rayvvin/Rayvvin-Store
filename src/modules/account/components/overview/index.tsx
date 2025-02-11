import { Customer, Order } from "@medusajs/medusa"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { Avatar } from "@nextui-org/react"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import UserIcon from "@modules/common/icons/user"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import Thumbnail from "@modules/products/components/thumbnail"

ChartJS.register(ArcElement, Tooltip, Legend)

type OverviewProps = {
  orders?: Order[]
  customer?: Omit<Customer, "password_hash">
}

const Overview = ({ orders, customer }: OverviewProps) => {
  const data = {
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

  return (
    <div>
      <div className="small:hidden pt-4">
        <div className="text-xl-semi mb-2 small:mb-4 px-8">
          Hello {customer?.first_name}
        </div>
        <div className=" items-center justify-between gap-x-8 mb-6 flex gap-x-4 py-4 px-4 w-full overflow-x-auto sm:grid sm:grid-cols-2">
          <div className="flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-6 sm:py-4 md:py-6 sm:px-6  shadow-md bg-[#FAFAFA] min-w-[250px] py-4 rounded-lg w-full px-4">
            <div className="flex items-center gap-x-4 w-full">
              <Avatar src="/rayvvin_pngs/Avatar2.png" size="md" />
              <div className="flex flex-col w-full">
                <span className="text-base">{`${customer?.first_name} ${customer?.last_name}`}</span>
                <p className="text-xs text-[#4E4E4E] w-full">Buyer Account</p>
              </div>
            </div>
            <div className="flex items-center gap-x-4 gap-y-2 w-full justify-start text-sm text-[#4E4E4E] leading-8 items-center max-w-sm flex-wrap md:flex-nowrap">
              <span className="flex gap-x-2 justify-center items-center border border-[#E6E6E6] px-2 py-0 rounded-lg text-xs">
                <FontAwesomeIcon icon={faPhone} />
                {customer?.phone}
              </span>
              <span className="flex gap-x-2 justify-center items-center border border-[#E6E6E6] px-2 py-0 rounded-lg text-xs">
                <FontAwesomeIcon icon={faEnvelope} />

                {customer?.email}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 shadow-md py-8 px-6 bg-[#FAFAFA] flex-1 rounded-lg w-full">
            <div className="flex items-center gap-x-4 w-full">
              <div className="relative w-16 h-16 justify-center items-center flex">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserIcon size={16} />
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-4">
                <span className="text-2xl-semi leading-none">{`${getProfileCompletion(
                  customer
                )}%`}</span>
                <p className="text-sm text-[#4E4E4E] w-full whitespace-nowrap">
                  Completed Profile
                </p>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col gap-y-4 shadow-md p-6 rounded-lg w-full">
                <h3 className="text-large-semi">Addresses</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    Saved
                  </span>
                </div>
              </div> */}
        </div>
        <div className="text-base-regular">
          <ul>
            <li>
              <Link
                href="/account/profile"
                className="flex items-center justify-between py-3 border-b border-gray-200 px-8"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <User size={16} />
                    <span>Profile</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </>
              </Link>
            </li>
            <li>
              <Link
                href="/account/addresses"
                className="flex items-center justify-between py-3 border-b border-gray-200 px-8"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <MapPin size={16} />
                    <span>Addresses</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </>
              </Link>
            </li>
            <li>
              <Link
                href="/account/orders"
                className="flex items-center justify-between py-3 border-b border-gray-200 px-8"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <Package size={16} />
                    <span>Orders</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden small:block">
        <div className="text-xl-semi flex justify-between items-start mb-4">
          <span>Hello {customer?.first_name}</span>
          <span className="text-small-regular text-gray-700">
            Signed in as:{" "}
            <span className="font-semibold">{customer?.email}</span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-gray-200">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-center justify-between gap-x-8 mb-6">
              <div className="flex flex-col gap-y-4 shadow-md min-h-[137px] p-6 rounded-lg w-full">
                <div className="flex items-center gap-x-4 w-full">
                  <Avatar src="/rayvvin_pngs/Avatar2.png" size="md" />
                  <div className="flex flex-col w-full">
                    <span className="text-base">{`${customer?.first_name} ${customer?.last_name}`}</span>
                    <p className="text-xs text-[#4E4E4E] w-full">
                      Buyer Account
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4 w-full justify-start text-sm text-[#4E4E4E] leading-8 items-center max-w-sm">
                  <span className="flex gap-x-2 justify-center items-center border border-[#E6E6E6] px-2 py-0 rounded-lg">
                    <FontAwesomeIcon icon={faPhone} />
                    {customer?.phone}
                  </span>
                  <span className="flex gap-x-2 justify-center items-center border border-[#E6E6E6] px-2 py-0 rounded-lg">
                    <FontAwesomeIcon icon={faEnvelope} />
                    {customer?.email}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4 shadow-md p-6 min-h-[137px] rounded-lg w-full">
                <div className="flex items-center gap-x-4 w-full">
                  <div className="relative w-20 h-20 justify-center items-center flex">
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <UserIcon size={16} />
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-y-4">
                    <span className="text-3xl-semi leading-none">{`${getProfileCompletion(
                      customer
                    )}%`}</span>
                    <p className="text-sm text-[#4E4E4E] w-full whitespace-nowrap">
                      Completed Profile
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col gap-y-4 shadow-md p-6 rounded-lg w-full">
                <h3 className="text-large-semi">Addresses</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    Saved
                  </span>
                </div>
              </div> */}
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">Recent orders</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders ? (
                  orders.slice(0, 5).map((order) => {
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
                              <span className="font-semibold">Date placed</span>
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
    </div>
  )
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

export default Overview
