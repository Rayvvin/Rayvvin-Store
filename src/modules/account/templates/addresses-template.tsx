"use client"

import { useAccount } from "@lib/context/account-context"
import AddressBook from "../components/address-book"
import AddAddress from "../components/address-card/add-address"

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full px-5">
      <div className="mb-8 flex flex-col gap-y-4">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-[21px] font-bold md:text-xl-semi">Address Book</h1>
          <AddAddress />
        </div>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div>
      <AddressBook customer={customer} />
    </div>
  )
}

export default AddressesTemplate
