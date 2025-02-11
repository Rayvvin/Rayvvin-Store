import { useAccount } from "@lib/context/account-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AccountNav = () => {
  const route = usePathname()
  const { handleLogout } = useAccount()

  return (
    <div className="px-3">
      <div className="small:hidden">
        {route !== "/account" && (
          <Link
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </Link>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          {/* <div className="py-4 px-6">
            <h3 className="text-base-semi">Account</h3>
          </div> */}
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li className="px-2 w-full">
                <AccountNavLink href="/account" route={route!}>
                  <div>
                    <User size={24} color="#000000" />
                  </div>{" "}
                  Account Overview
                </AccountNavLink>
              </li>
              <li className="px-2 w-full">
                <AccountNavLink href="/account/profile" route={route!}>
                  <div>
                    <User size={24} color="#000000" />
                  </div>{" "}
                  My Profile
                </AccountNavLink>
              </li>
              <li className="px-2 w-full">
                <AccountNavLink href="/account/addresses" route={route!}>
                  <div>
                    <MapPin size={24} color="#000000" />
                  </div>{" "}
                  Address Book
                </AccountNavLink>
              </li>
              <li className="px-2 w-full">
                <AccountNavLink href="/account/orders" route={route!}>
                  <div>
                    <Package size={24} color="#000000" />
                  </div>{" "}
                  My Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700 px-2 w-full">
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <Link
      href={href}
      className={clsx(
        "text-gray-700 px-2 py-4 rounded-md w-full inline-flex items-center whitespace-nowrap gap-x-2 text-sm",
        {
          "text-gray-900 bg-[#EFEFEF] font-semibold": active,
        }
      )}
    >
      <>{children}</>
    </Link>
  )
}

export default AccountNav
