import OrderOverview from "../components/order-overview-new"

const OrdersTemplate = () => {
  return (
    <div className="w-full px-5">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-xl-semi">Orders</h1>
        <p className="text-base-regular">
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      <div>
        <OrderOverview />
      </div>
    </div>
  )
}

export default OrdersTemplate
