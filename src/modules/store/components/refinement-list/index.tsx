// 'use client'
import { StoreGetProductsParams } from "@medusajs/medusa"
import clsx from "clsx"
import {
  useCollections,
  useProductCategories,
  useProducts,
  useProductTags,
  useProductTypes,
} from "medusa-react"
import { ChangeEvent, useEffect, useState } from "react"
import MultiRangeSlider from "@modules/home/components/multi-range-slider"
import StarRatingComponent from "react-star-rating-component"
import { faBars, faClose, faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
  categories?: any
}

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined
}

const RefinementList = ({
  refinementList,
  setRefinementList,
  categories,
}: RefinementListProps) => {
  const { collections, isLoading } = useCollections()
  const { product_categories } = useProductCategories({ expand: "products" })
  const { product_types } = useProductTypes()
  const { product_tags } = useProductTags()
  const { products } = useProducts()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (refinementList) {
      console.log(refinementList)
    }
  }, [refinementList])

  // useEffect(() => {
  //   console.log(openModal)
  // }, [openModal])

  const handleCollectionChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = e.target

    const collectionIds = refinementList.collection_id || []

    const exists = collectionIds.includes(id)

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        collection_id: [...collectionIds, id],
      })

      return
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        collection_id: collectionIds.filter((c) => c !== id),
      })

      return
    }

    return
  }

  const handleCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = e.target

    const categoryIds = refinementList.category_id || []

    const exists = categoryIds.includes(id)

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        category_id: [...categoryIds, id],
      })

      return
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        category_id: categoryIds.filter((c) => c !== id),
      })

      return
    }

    return
  }

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { checked } = e.target

    const typeIds = refinementList.type_id || []

    const exists = typeIds.includes(id)

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        type_id: [...typeIds, id],
      })

      return
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        type_id: typeIds.filter((c) => c !== id),
      })

      return
    }

    return
  }

  return (
    <div
    // className="sticky top-2.5 inset-x-0 group"
    >
      <div className="px-8 py-4  small:pr-2 small:pl-4 small:min-w-[250px] shadow-sm hidden flex-col h-full p-4 m-2 bg-white rounded-md space-y-4 lg:flex">
        <div className="flex w-full justify-between items-center">
          {/* <input
              type="text"
              placeholder="Search essentials, groceries, and more..."
              class="w-9/12 py-2 px-4 rounded-md bg-[#F3F9FB]"
            /> */}

          <form className="max-w-md w-full rounded-md ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 ps-10 text-sm text-gray-900 border-0 rounded-lg bg-[#F3F9FB] focus:border-[#F3F9FB]"
                placeholder="Search Products"
                value={refinementList.q}
                onChange={(e) => {
                  setRefinementList({
                    ...refinementList,
                    q: e.target.value,
                  })
                }}
                required
              />
            </div>
          </form>
        </div>
        <div className="flex w-full justify-between items-center">
          <span className="text-sm font-bold text-[#595959]">Filter By:</span>
        </div>
        <div className="flex-col px-4 space-y-4">
          <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
            <span className="text-sm mb-4 text-[#595959]">Categories</span>
            <ul className="text-base-regular flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 px-2">
              {product_categories
                ?.filter((cat) => {
                  return refinementList.category_id?.includes(cat.id)
                })
                .map((c) => (
                  <li key={c.id}>
                    <label className="flex items-center justify-between gap-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={refinementList.category_id?.includes(
                          c.id
                        )}
                        onChange={(e) => handleCategoryChange(e, c.id)}
                        className="accent-[#3D8B7A] hidden"
                      />
                      <p
                        className={`${clsx("text-xs", {
                          "text-[#3D8B7A]":
                            refinementList.category_id?.includes(c.id),
                        })}`}
                      >
                        {c.name}
                      </p>

                      {c.products && (
                        <span
                          className={clsx(
                            "inline-flex bg-[#E2EEEB] text-[#3D8B7A] text-sx me-2 px-2 py-0 rounded-full items-center",
                            {
                              "!bg-[#3D8B7A] text-white":
                                refinementList.category_id?.includes(c.id),
                            }
                          )}
                        >
                          {c.products.length}
                        </span>
                      )}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
            <span className="text-sm mb-4 text-[#595959]">Collections</span>
            <ul className="text-xs flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 px-2">
              {collections?.map((c) => (
                <li key={c.id}>
                  <label className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      defaultChecked={refinementList.collection_id?.includes(
                        c.id
                      )}
                      onChange={(e) => handleCollectionChange(e, c.id)}
                      className="accent-[#3D8B7A]"
                    />
                    {c.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
          <span className="text-sm mb-4 font-bold text-[#595959]">
            Product Types
          </span>
          <ul className="text-xs flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 px-2">
            {product_types?.map((c) => (
              <li key={c.id}>
                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={refinementList.type_id?.includes(c.id)}
                    onChange={(e) =>
                      setRefinementList({
                        ...refinementList,
                        type_id: e.target.checked
                          ? [...(refinementList.type_id || []), c.id]
                          : refinementList.type_id?.filter((id) => id !== c.id),
                      })
                    }
                    className="accent-[#3D8B7A]"
                  />
                  {c.value}
                </label>
              </li>
            ))}
          </ul>
        </div> */}
          <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
            <span className="text-sm mb-4 text-[#595959]">
              Discount Percentage
            </span>
            <ul className="text-xs flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 space-y-1 px-2">
              {[10, 20, 30, 40, 50].reverse()?.map((c) => (
                <li key={c}>
                  <label className="flex justify-between items-center gap-x-2">
                    {/* <input
                    type="checkbox"
                    defaultChecked={refinementList.category_id?.includes(c.id)}
                    onChange={(e) => handleCategoryChange(e, c.id)}
                    className="accent-[#3D8B7A] hidden"
                  /> */}
                    <p
                      className={`${clsx("text-xs", {
                        // "text-[#3D8B7A]": refinementList.category_id?.includes(
                        //   c.id
                        // ),
                      })}`}
                    >
                      {c}% or more
                    </p>

                    {c && (
                      <span
                        className={clsx(
                          "inline-flex bg-[#E2EEEB] text-[#3D8B7A] text-sx me-2 px-2 py-0 rounded-full items-center"
                          // {
                          //   "!bg-[#3D8B7A] text-white":
                          //     refinementList.category_id?.includes(c.id),
                          // }
                        )}
                      >
                        {c}
                      </span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
            <span className="text-sm mb-4 text-[#595959]">Rating</span>
            <ul className="text-xs flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 space-y-1 px-2">
              {[1, 2, 3, 4, 5].reverse()?.map((c) => (
                <li key={c}>
                  <label className="flex justify-start items-center gap-x-2">
                    <input
                      type="checkbox"
                      // defaultChecked={refinementList.category_id?.includes(c.id)}
                      // onChange={(e) => handleCategoryChange(e, c.id)}
                      className="accent-[#3D8B7A]"
                    />

                    <StarRatingComponent
                      name="rate2"
                      editing={false}
                      starCount={c}
                      value={3}
                      renderStarIcon={() => (
                        <i style={{ fontStyle: "normal", fontSize: "16px" }}>
                          ★
                        </i>
                      )}
                      starColor={"#FFB447"}
                      // emptyStarColor={"transparent"}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
            <span className="text-sm mb-4 text-[#595959]">Price</span>
            <div className="text-xs flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 px-2">
              <MultiRangeSlider min={0} max={1000} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4  small:pr-2 small:pl-4 small:min-w-[250px] shadow-sm flex flex-col h-full p-4 m-2 bg-white rounded-md space-y-4 lg:hidden">
        <div className="flex gap-x-4 small:flex-col small:gap-y-4 justify-between items-center">
          <div className="flex w-full justify-between items-center">
            {/* <input
              type="text"
              placeholder="Search essentials, groceries, and more..."
              class="w-9/12 py-2 px-4 rounded-md bg-[#F3F9FB]"
            /> */}

            <form className="max-w-md w-full rounded-md ">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border-0 rounded-lg bg-[#F3F9FB] focus:border-[#F3F9FB]"
                  placeholder="Search essentials, groceries, and more..."
                  value={refinementList.q}
                  onChange={(e) => {
                    setRefinementList({
                      ...refinementList,
                      q: e.target.value,
                    })
                  }}
                  required
                />
              </div>
            </form>
            {/* <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-transparent  font-medium rounded-lg text-sm px-4 py-2"
            >
              <FontAwesomeIcon icon={faBars} color="#3D8B7A" />
            </button> */}
          </div>
          <div className="block md:flex md:space-x-4">
            <button
              data-modal-target="small-modal"
              data-modal-toggle="small-modal"
              className="block w-fit md:w-auto font-medium rounded-lg text-sm px-5 py-3 text-center bg-[#3D8B7A]"
              type="button"
              // onClick={() => setOpenModal(!openModal)}
              onClick={() => {
                const modal = document.getElementById("small-modal")
                // modal?.classList.toggle("hidden")
                console.log(openModal)
                setOpenModal(!openModal)
              }}
            >
              <FontAwesomeIcon icon={faFilter} color="#ffffff" />
            </button>
            {openModal && (
              <div
                id="small-modal"
                tabIndex={-1}
                className="fixed backdrop-blur-sm flex justify-center items-center top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative p-6 rounded-lg flex flex-col w-full max-w-md max-h-full bg-white shadow-card space-y-4">
                  <div className="flex w-full justify-between items-center">
                    {/* <input
              type="text"
              placeholder="Search essentials, groceries, and more..."
              class="w-9/12 py-2 px-4 rounded-md bg-[#F3F9FB]"
            /> */}

                    <span className="text-xl font-bold text-[#595959]">
                      Filter by
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="block w-fit md:w-auto font-medium rounded-lg text-sm px-5 py-3 text-center"
                    >
                      <FontAwesomeIcon
                        icon={faClose}
                        color="#3D8B7A"
                        fontSize={"18px"}
                      />
                    </button>
                  </div>
                  <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
                    <span className="text-lg mb-4 font-bold text-[#595959]">
                      Collections
                    </span>
                    <ul className="text-base flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 px-4">
                      {collections?.map((c) => (
                        <li key={c.id}>
                          <label className="flex items-center gap-x-2">
                            <input
                              type="checkbox"
                              defaultChecked={refinementList.collection_id?.includes(
                                c.id
                              )}
                              onChange={(e) => handleCollectionChange(e, c.id)}
                              className="accent-[#3D8B7A]"
                            />
                            {c.title}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
                    <span className="text-lg mb-4 font-bold text-[#595959]">
                      Categories
                    </span>
                    <ul className="text-base-regular flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 space-y-2 px-2">
                      {product_categories?.map((c) => (
                        <li key={c.id}>
                          <label className="flex items-center justify-between gap-x-2">
                            <input
                              type="checkbox"
                              defaultChecked={refinementList.category_id?.includes(
                                c.id
                              )}
                              onChange={(e) => handleCategoryChange(e, c.id)}
                              className="accent-[#3D8B7A] hidden"
                            />
                            <p
                              className={`${clsx("text-base", {
                                "text-[#3D8B7A]":
                                  refinementList.category_id?.includes(c.id),
                              })}`}
                            >
                              {c.name}
                            </p>

                            {c.products && (
                              <span
                                className={clsx(
                                  "inline-flex bg-[#E2EEEB] text-[#3D8B7A] text-base me-2 px-2 py-0 rounded-full items-center",
                                  {
                                    "!bg-[#3D8B7A] text-white":
                                      refinementList.category_id?.includes(
                                        c.id
                                      ),
                                  }
                                )}
                              >
                                {c.products.length}
                              </span>
                            )}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
          <span className="text-sm mb-4 font-bold text-[#595959]">
            Product Types
          </span>
          <ul className="text-xs flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 px-2">
            {product_types?.map((c) => (
              <li key={c.id}>
                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={refinementList.type_id?.includes(c.id)}
                    onChange={(e) =>
                      setRefinementList({
                        ...refinementList,
                        type_id: e.target.checked
                          ? [...(refinementList.type_id || []), c.id]
                          : refinementList.type_id?.filter((id) => id !== c.id),
                      })
                    }
                    className="accent-[#3D8B7A]"
                  />
                  {c.value}
                </label>
              </li>
            ))}
          </ul>
        </div> */}
                  <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
                    <span className="text-lg mb-4 font-bold text-[#595959]">
                      Discount Percentage
                    </span>
                    <ul className="text-base flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 space-y-2 px-4">
                      {[10, 20, 30, 40, 50].reverse()?.map((c) => (
                        <li key={c}>
                          <label className="flex justify-between items-center gap-x-2">
                            {/* <input
                    type="checkbox"
                    defaultChecked={refinementList.category_id?.includes(c.id)}
                    onChange={(e) => handleCategoryChange(e, c.id)}
                    className="accent-[#3D8B7A] hidden"
                  /> */}
                            <p
                              className={`${clsx("text-base", {
                                // "text-[#3D8B7A]": refinementList.category_id?.includes(
                                //   c.id
                                // ),
                              })}`}
                            >
                              {c}% or more
                            </p>

                            {c && (
                              <span
                                className={clsx(
                                  "inline-flex bg-[#E2EEEB] text-[#3D8B7A] text-base me-2 px-2 py-0 rounded-full items-center"
                                  // {
                                  //   "!bg-[#3D8B7A] text-white":
                                  //     refinementList.category_id?.includes(c.id),
                                  // }
                                )}
                              >
                                {c}
                              </span>
                            )}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-4">
                    <span className="text-lg mb-4 font-bold text-[#595959]">
                      Rating
                    </span>
                    <ul className="text-base flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 space-y-4 px-2">
                      {[1, 2, 3, 4, 5].reverse()?.map((c) => (
                        <li key={c}>
                          <label className="flex text-base justify-start items-center gap-x-2">
                            <input
                              type="checkbox"
                              // defaultChecked={refinementList.category_id?.includes(c.id)}
                              // onChange={(e) => handleCategoryChange(e, c.id)}
                              className="accent-[#3D8B7A]"
                            />

                            <StarRatingComponent
                              name="rate2"
                              editing={false}
                              starCount={c}
                              value={3}
                              renderStarIcon={() => (
                                <i
                                  style={{
                                    fontStyle: "normal",
                                    fontSize: "24px",
                                  }}
                                >
                                  ★
                                </i>
                              )}
                              starColor={"#FFB447"}
                              // emptyStarColor={"transparent"}
                            />
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-col gap-x-4 small:flex-col small:gap-y-4 space-y-2">
                    <span className="text-lg mb-4 font-bold text-[#595959]">
                      Price
                    </span>
                    <div className="text-base flex-col items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 px-2">
                      <MultiRangeSlider min={0} max={1000} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
