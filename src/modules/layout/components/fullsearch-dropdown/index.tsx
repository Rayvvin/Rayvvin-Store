import { Popover, Transition } from "@headlessui/react"
import React, { useState, useEffect, Fragment, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faClose,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import CartDropdown from "../cart-dropdown" // adjust this import as needed
import InfiniteProducts from "@modules/products/components/infinite-products"

interface Product {
  id: string
  title: string
  description?: string
  // add other properties as needed
}

const FullSearchDropdown = () => {
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState<StoreGetProductsParams>({
    // category_id: product_categories?.map((c) => c.id),
    // collection_id: collections?.map((c) => c.id),
    // type_id: product_types?.map((c) => c.id),
    // tags: product_tags?.map((c) => c.value)
  })
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  // Simulate product search on submit
  const handleSearch = (query) => {
    setParams({
      q: query,
    })
  }

  useEffect(() => {
    if (query) {
      if (!open) {
        setOpen(true)
      }
      handleSearch(query)
    } else {
      handleSearch("")
      setOpen(false)
    }
  }, [query])

  return (
    <div className="h-full w-full">
      <Popover className="h-full flex w-full">
        <>
          <div
            className="relative flex items-center justify-end sm:justify-start cursor-pointer w-full"
            // onClick={() => push("/store")}
          >
            <span className="px-4 sm:hidden" onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faSearch} color="#344F16" />
            </span>
            <div className="w-full justify-center items-center mb-4 hidden sm:flex">
              <form
                className="max-w-md mx-auto w-9/12 rounded-md"
                // onSubmit={handleSearch}
              >
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  Search
                </label>
                <div className="relative bg-[#F3F9FB] rounded-lg">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-[#3D8B7A]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border-0 rounded-lg bg-[#F3F9FB] focus:outline-none"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-transparent font-medium rounded-lg text-sm px-4 py-2"
                  >
                    <FontAwesomeIcon icon={faBars} color="#344F16" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel
              static
              className="absolute top-full inset-x-0 z-30 border-t border-b border-gray-200 bg-white/30 backdrop-blur-md"
            >
              <div className="py-4 px-4">
                <div className="overflow-y-auto max-h-[90vh] md:max-h-[74vh] h-full scrollbar-hide">
                  <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base-semi text-gray-900 hidden sm:flex">
                        Search Results
                      </h3>
                      <div className="w-full justify-center items-center sm:hidden">
                        <form className="max-w-md mx-auto w-[90%] rounded-md">
                          {query && (
                            <label
                              htmlFor="default-search"
                              className="mb-2 text-sm font-medium text-gray-900 sr-only"
                            >
                              Search results for &quot;{query}&quot;
                            </label>
                          )}
                          <div className="relative bg-[#F3F9FB] rounded-lg">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-[#3D8B7A]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </div>
                            <input
                              type="search"
                              id="default-search"
                              className="block w-full p-4 ps-10 text-sm text-gray-900 border-0 rounded-lg bg-[#F3F9FB] focus:outline-none"
                              placeholder="Search..."
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              required
                            />
                            <button
                              type="submit"
                              className="text-white absolute end-2.5 bottom-2.5 bg-transparent font-medium rounded-lg text-sm px-4 py-2"
                            >
                              <FontAwesomeIcon icon={faBars} color="#344F16" />
                            </button>
                          </div>
                        </form>
                      </div>
                      <button
                        className="text-gray-500 hover:text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        <FontAwesomeIcon icon={faClose} color="#344F16" />
                      </button>
                    </div>

                    {query && (
                      <div className="text-sm text-black mb-4 sm:hidden">
                        Search results for &quot;{query}&quot;
                      </div>
                    )}
                    
                    {query && <InfiniteProducts params={params} setOpen={setOpen} />}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  )
}

export default FullSearchDropdown
