"use client"

import clsx from "clsx"
import { useCollections, useProductCategories } from "medusa-react"
import Link from "next/link"
import CountrySelect from "../country-select"
import Image from "next/image"

const FooterNav = () => {
  const { collections } = useCollections()
  const { product_categories } = useProductCategories()

  return (
    <div className="content-container flex flex-col gap-y-8 pt-16 pb-8 text-white">
      <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between wrap">
        <div className="flex flex-col space-y-4 w-fit justify-stretch">
          <Link href="/" className="text-xl-semi uppercase">
            <Image
              src="/rayvvin_pngs/Logo (1).png"
              alt={"logo"}
              width={163}
              height={35}
              // fill
              className="object-cover rounded-lg mx-3"
            />
          </Link>
          <div className="flex w-9/12 px-2">
            Our go-to marketplace for quality products, great prices, and fast
            delivery—all in one place.
          </div>
        </div>
        <div className="text-small-regular grid grid-cols-3 sm:grid-cols-4 gap-x-10 md:gap-x-16">
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Menu</span>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  Recently Viewed
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  Popular This Week
                </a>
              </li>
            </ul>
          </div>
          {product_categories && (
            <div className="flex flex-col gap-y-2">
              <span className="text-base-semi">Categories</span>
              <ul className="grid grid-cols-1 gap-2">
                {product_categories?.slice(0, 6).map((c) => {
                  if (c.parent_category) {
                    return
                  }

                  const children =
                    c.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null

                  return (
                    <li className="flex flex-col gap-2" key={c.id}>
                      <Link
                        className={clsx(children && "text-small-semi")}
                        href={`/${c.handle}`}
                      >
                        {c.name}
                      </Link>
                      {children && (
                        <ul className="grid grid-cols-1 ml-3 gap-2">
                          {children &&
                            children.map((child) => (
                              <li key={child.id}>
                                <Link href={`/${child.handle}`}>
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {/* {collections && (
            <div className="flex flex-col gap-y-2">
              <span className="text-base-semi">Markets</span>
              <ul
                className={clsx("grid grid-cols-1 gap-2", {
                  "grid-cols-2": (collections?.length || 0) > 3,
                })}
              >
                {collections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <Link href={`/collections/${c.handle}`}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Our Company</span>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vacancies
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Recently Viewed
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Returns Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Account
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Contact us</span>
            <ul className="grid grid-cols-1 gap-y-2 break-words">
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Help@rayvvin.com
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Support@rayvvin.com
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  +0323212212212
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between">
        <span className="text-xsmall-regular text-gray-500">
          © Copyright 2024 Rayvvin
        </span>
        <div className="min-w-[316px] flex xsmall:justify-end">
          <CountrySelect />
        </div>
      </div>
    </div>
  )
}

export default FooterNav
