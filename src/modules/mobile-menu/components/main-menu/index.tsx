import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import { stateMarkets } from "@lib/data"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import Search from "@modules/common/icons/search"
import X from "@modules/common/icons/x"
import { useCollections, useMeCustomer } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"

const MainMenu = () => {
  const { collections } = useCollections()
  const { customer } = useMeCustomer()
  const { countryCode } = useStore()

  const countries = useCountryOptions()

  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenCountry = () => setScreen("country")
  const setScreenSearch = () => setScreen("search")

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={setScreenCountry}
          >
            <ReactCountryFlag countryCode={countryCode || "gb"} svg />
            <ChevronDown />
          </button>
        </div>
        <div>
          <Image
            src="/rayvvin_pngs/Logo.png"
            alt={"logo"}
            width={120}
            height={35}
            // fill
            className={"object-cover rounded-lg mx-3"}
          />
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        {process.env.FEATURE_SEARCH_ENABLED && (
          <button
            className="bg-gray-50 flex items-center px-4 py-2 gap-x-2 text-gray-500"
            onClick={setScreenSearch}
          >
            <Search size={24} />
            <span placeholder="Search products" className="text-base-regular">
              Search products
            </span>
          </button>
        )}

        <div className="flex flex-col flex-1 text-large-regular text-gray-900">
          <ul className="flex flex-col gap-y-2">
            {/* <li className="bg-gray-50 p-4">
              <Link href="/store">
                <button
                  className="flex items-center justify-between w-full"
                  onClick={close}
                >
                  <span className="sr-only">Go to Store</span>
                  <span>Store</span>
                  <ChevronDown className="-rotate-90" />
                </button>
              </Link>
            </li> */}
            {stateMarkets && countryCode === 'ng' ? (
              <>
                {stateMarkets.map((collection) => (
                  <li key={collection.state} className="bg-gray-50 p-4">
                    <Link
                      href={`/states/${collection.state
                        .split(" ")[0]
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      <button
                        className="flex items-center justify-between w-full"
                        onClick={close}
                      >
                        <span className="sr-only">
                          Go to {collection.state}
                        </span>
                        <span>{collection.state}</span>
                        <ChevronDown className="-rotate-90" />
                      </button>
                    </Link>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-y-8 text-small-regular">
            {!customer ? (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase">Account</span>
                <Link href={`/account/login`} passHref>
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to sign in page</span>
                    <span className="normal-case">Sign in</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase">Signed in as</span>
                <Link href={`/account`} passHref>
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to account page</span>
                    <span className="normal-case">{customer.email}</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </Link>
              </div>
            )}
            <div className="flex flex-col gap-y-4">
              <span className="text-gray-700 uppercase">Delivery</span>
              <button
                className="flex items-center justify-between border-b border-gray-200 py-2"
                onClick={setScreenCountry}
              >
                <span className="sr-only">
                  Click to select shipping country
                </span>
                <div className="flex items-center gap-x-2">
                  <ReactCountryFlag countryCode={countryCode || "us"} svg />
                  <span className="normal-case">
                    Shipping to{" "}
                    {countries?.find((c) => c.country === countryCode)?.label}
                  </span>
                </div>
                <ChevronDown className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
