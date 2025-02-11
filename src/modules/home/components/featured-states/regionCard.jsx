"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const RegionCard = (props) => {
  const { region, color } = props
  return (
    // <div className="text-base-regular mt-2 p-2 flex justify-start rounded-md shadow-card min-h-24">
    <Link
      href={`/states/${region?.id}`}
      className={`text-base-regular mt-2 p-2 flex justify-start rounded-md shadow-card min-h-24`}
      // style={{
      //   background: "rgba(255, 255, 255, 0.19)",
      //   borderRadius: "16px",
      //   boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      //   backdropFilter: "blur(9.7px)",
      //   border: "1px solid rgba(255, 255, 255, 0.3)",
      // }}
    >
      {region ? (
        <div
          className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden rounded-md dark:bg-gray-600 m-1 dark:ring-gray-500 p-1 shadow-card"
          style={{ background: color }}
        >
          <span
            className="font-medium text-xl text-white"
            style={{ fontFamily: "Lemon, serif" }}
          >
            {region?.name.split("")[0]}
          </span>
        </div>
      ) : (
        <div className="rounded-full p-8 animate-pulse bg-gray-100"></div>
      )}
      <div className="my-2 px-2 flex justify-around flex-col">
        <h1 className="text-base font-semibold">{region.full_name}</h1>
        {region ? (
          <span className="text-base-regular">Nigeria</span>
        ) : (
          <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
        )}

        {/* <div></div> */}
      </div>
    </Link>
    // </div>
  )
}

export default RegionCard
