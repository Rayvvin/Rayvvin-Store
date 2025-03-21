import React from "react"
// import { Link, useLocation } from 'react-router-dom';

import { usePathname } from "next/navigation"
import Link from "next/link"

const Breadcrumb: React.FC = () => {
  const pathname = usePathname()

  const pathnames = pathname.split("/").filter((x) => x)

  return (
    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse overflow-x-auto whitespace-nowrap">
      <li className="inline-flex items-center">
      <Link
      href="/"
      className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-[#3D8B7A]"
      >
      <svg
      className="w-3 h-3 me-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      >
      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
      </svg>
      Home
      </Link>
      </li>
      {pathnames.length >= 2 && (
      <li className="inline-flex items-center relative">
      <svg
      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
      >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 9 4-4-4-4"
      />
      </svg>
      <button className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-[#3D8B7A]">
      ...
      </button>
      <div className="absolute left-0 z-10 hidden mt-2 bg-white border border-gray-200 rounded shadow-lg">
      <ul className="py-1 text-sm text-gray-700">
        {pathnames.slice(1, -1).map((value, index) => {
        const to = `/${pathnames.slice(0, index + 2).join("/")}`
        return (
        <li key={to}>
        <Link
          href={to}
          className="block px-4 py-2 hover:bg-gray-100 capitalize"
        >
          {value}
        </Link>
        </li>
        )
        })}
      </ul>
      </div>
      </li>
      )}
      {pathnames.length >= 1 && (
      <li className="inline-flex items-center">
      <svg
      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
      >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 9 4-4-4-4"
      />
      </svg>
      <Link
      href={`/${pathnames[pathnames.length - 1]}`}
      className="ms-1 text-sm font-normal text-[#3D8B7A] md:ms-2 capitalize"
      >
      {pathnames[pathnames.length - 1].length > 7
        ? `${pathnames[pathnames.length - 1].substring(0, 7)}...`
        : pathnames[pathnames.length - 1]}
      </Link>
      </li>
      )}
    </ol>
  )
}

export default Breadcrumb
