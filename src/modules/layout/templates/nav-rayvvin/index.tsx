"use client"

import {
  faBars,
  faUser,
  faShoppingCart,
  faArrowDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import Breadcrumb from "../breadcrumb"
import { useProductCategories } from "medusa-react"

const Nav = () => {
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const { product_categories, isLoading } = useProductCategories()

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  useEffect(() => {
    if (!isLoading) {
      console.log(product_categories)
    }
  }, [product_categories])

  const { toggle } = useMobileMenu()

  return (
    <div
      // className="sticky top-0 inset-x-0 z-50 group"
      className="relative"
      // className={clsx("sticky top-0 inset-x-0 z-50 group", {
      //   // "!fixed": isHome,
      // })}
    >
      {/* <header
        className={clsx(
          "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200",
          {
            "!bg-white !border-gray-200": !isHome || isScrolled,
          }
        )}
      >
        <nav
          className={clsx(
            "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
            {
              "text-white group-hover:text-gray-900": isHome && !isScrolled,
            }
          )}
        >
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu />
            </div>
          </div>

          <div className="flex items-center h-full">
            <Link
              href="/"
              className="text-xl-semi"
              style={{ fontFamily: "Lemon, serif" }}
            >
              <Image
                src="/afriomarket_pngs/afrio market - logo.png"
                alt={"logo"}
                width={180}
                height={35}
                // fill
                className={clsx("object-cover rounded-lg mx-3 grayscale", {
                  "grayscale-0": !isHome || isScrolled,
                })}
              />
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account">Account</Link>
            </div>
            <CartDropdown />
          </div>
          
        </nav>
        <MobileMenu />
      </header> */}
      <div className="hidden sm:flex justify-between items-center py-3 px-6 bg-[#3D8B7A]">
        <div className="flex items-center">
          <span className="text-sm text-white">Welcome to Rayvvin!</span>
        </div>
        <div className="flex items-center gap-4 text-white">
          <a href="#" className="text-sm hover:underline">
            Deliver to Uyo, Nigeria
          </a>
          |
          <a href="#" className="text-sm hover:underline">
            Track your order
          </a>
          |
          <a href="/store" className="text-sm hover:underline">
            Shop
          </a>
        </div>
      </div>
      <div
        className={clsx(
          "sticky top-0 inset-x-0 z-50 flex flex-wrap justify-between items-center py-4 px-6 border-b-1 border-[#EDEDED] group bg-white",
          {
            "!justify-center": pathname && pathname == "/account/login",
          }
        )}
      >
        <div className="flex space-x-2">
          <button id="menu-toggle" className=" md:hidden" onClick={toggle}>
            <FontAwesomeIcon icon={faBars} color="#3D8B7A" />
          </button>
          <Link
            href="/"
            className="text-xl-semi"
            style={{ fontFamily: "Lemon, serif" }}
          >
            <Image
              src="/rayvvin_pngs/Logo.png"
              alt={"logo"}
              width={135}
              height={35}
              // fill
              className="w-[82px] md:w-[135px]"
              // className={clsx("object-cover rounded-lg mx-3 grayscale", {
              //   "grayscale-0": !isHome || isScrolled,
              // })}
            />
          </Link>
        </div>

        {pathname &&
          pathname !== "/account/login" &&
          pathname !== "/account/register" && (
            <Fragment>
              <div className="hidden sm:flex flex-1 mx-6 lg:w-6/12 md:w-auto md:mt-0">
                <div className="flex w-full justify-center items-center">
                  {/* <input
                  type="text"
                  placeholder="Search essentials, groceries, and more..."
                  class="w-9/12 py-2 px-4 rounded-md bg-[#F3F9FB]"
                /> */}
                  <form className="max-w-md mx-auto w-9/12 rounded-md ">
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
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-transparent  font-medium rounded-lg text-sm px-4 py-2"
                      >
                        <FontAwesomeIcon icon={faBars} color="#3D8B7A" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="items-center flex flex-row gap-6">
                <Link
                  href="/account"
                  className="flex flex-row space-x-2 items-center"
                >
                  <FontAwesomeIcon icon={faUser} color="#3D8B7A" />
                  <a
                    href="/account"
                    className="hover:underline text-sm hidden sm:flex break-keep "
                  >
                    Account
                  </a>
                </Link>
                <p className="hidden sm:flex text-gray-500">|</p>
                <div className="flex flex-row space-x-2 items-center">
                  <CartDropdown />
                </div>
                <MobileMenu />
              </div>
            </Fragment>
          )}
      </div>
      <div
        className={clsx("py-4 px-8 border-b-1 border-[#EDEDED] bg-white", {
          hidden:
            (pathname && pathname == "/") ||
            pathname == "/account/login" ||
            pathname == "/account/register",
        })}
      >
        {pathname &&
          pathname !== "/" &&
          pathname !== "/account/login" &&
          pathname !== "/account/register" && <Breadcrumb />}
        {pathname &&
          pathname === "/" &&
          product_categories?.map((c) => (
            <span className="inline-flex bg-[#F3F9FB] hover:bg-[#3D8B7A] hover:text-white text-sm me-2 px-4 py-2 rounded-full items-center">
              {c.name}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </span>
          ))}
      </div>
    </div>
  )
}

export default Nav
