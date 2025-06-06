"use client"

import clsx from "clsx"
import { useCollections, useProductCategories } from "medusa-react"
import Link from "next/link"
import CountrySelect from "../country-select"
import Image from "next/image"
import {
  FacebookIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
} from "@modules/SVGIcons/SVGicons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faInstagramSquare,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons"

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
        <div className="text-small-regular grid grid-cols-3 sm:grid-cols-3 gap-x-10 md:gap-x-16">
          {/* <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Socials</span>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <Link href={"/"}>
                  <FacebookIcon />
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <TwitterIcon />
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <LinkedInIcon />
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <TelegramIcon />
                </Link>
              </li>
            </ul>
          </div> */}
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
                      {/* {children && (
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
                      )} */}
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
                <a href="/about" target="_blank" rel="noreferrer">
                  About us
                </a>
              </li>

              <li>
                <a href="/privacy" target="_blank" rel="noreferrer">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/returns" target="_blank" rel="noreferrer">
                  Returns Policy
                </a>
              </li>
              <li>
                <a href="/about" target="_blank" rel="noreferrer">
                  Account
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Contact us</span>
            <ul className="grid grid-cols-1 gap-y-2 break-words">
              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  admin@rayvvin.com
                </a>
              </li>

              <li>
                <a href="/" target="_blank" rel="noreferrer">
                  +447713960012
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
        <ul className="flex flex-row gap-x-4">
          <li>
            <Link
              href={
                "https://web.facebook.com/people/The-Rayvvin-Store/61551347613696/"
              }
            >
              <FacebookIcon />
            </Link>
          </li>
          <li>
            <Link href={"https://www.instagram.com/therayvvinstore"}>
              {/* <TwitterIcon /> */}
              <FontAwesomeIcon
                icon={faInstagramSquare}
                color="#fff"
                fontSize={32}
              />
            </Link>
          </li>
          <li>
            <Link href={"https://www.tiktok.com/@therayvvinstore"}>
              {/* <TwitterIcon /> */}
              <FontAwesomeIcon icon={faTiktok} color="#fff" fontSize={32} />
            </Link>
          </li>
          {/* <li>
            <Link href={"https://chat.whatsapp.com/B8aQorgFMiCHNJ3I4JGiEB"}>
            <FontAwesomeIcon icon={faWhatsapp} color="#fff" fontSize={32} />
            </Link>
          </li> */}
          {/* <li>
            <Link href={"/"}>
              <TelegramIcon />
            </Link>
          </li> */}
        </ul>
        <div className="min-w-[316px] flex xsmall:justify-end">
          <CountrySelect />
        </div>
      </div>
    </div>
  )
}

export default FooterNav
