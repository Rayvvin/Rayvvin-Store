"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const RegionCard = (props) => {
  const { region, color } = props
  return (
    // <div className="text-base-regular mt-2 p-2 flex justify-start rounded-md shadow-card min-h-24">
    <Link
      href={`/stores/${region?.id}`}
      // className="text-base-regular mt-2 p-2 flex justify-start rounded-md shadow-card min-h-24"
      // style={{
      //   background: "rgba(255, 255, 255, 0.19)",
      //   borderRadius: "16px",
      //   boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      //   backdropFilter: "blur(9.7px)",
      //   border: "1px solid rgba(255, 255, 255, 0.3)",
      // }}
    >
      <div
        key={region.id}
        className="overflow-hidden bg-[transparent] p-2 md:p-3 lg:p-4"
      >
        <div className='relative'>
          <Image
            src="/marrakesh.jpg"
            alt={region.name}
            width={500}
            height={300}
            className="w-full h-32 xs:h-16 object-cover rounded-lg"
          />
          {region ? (
            <div
              className="absolute inline-flex items-center justify-center w-14 h-14 overflow-hidden rounded-full dark:bg-gray-600 m-1 dark:ring-gray-500 p-1 border-4 border-white bottom-[-20px] left-3"
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
            <div className="absolute rounded-full p-8 animate-pulse bg-gray-100 bottom-[-20px] left-3"></div>
          )}
        </div>

        <div className="py-2 mt-3 px-2 ">
          <h3 className="!text-sm font-heading text-primary mb-1">
            {region.name}
          </h3>
          <p className="text-accent !text-xs font-body">
            <Link href={`/states/${region?.state_id}`}>
              {region?.stateName}
            </Link>{" "}
            {"-"} {"Nigeria"}
          </p>
          {/* <p className="text-accent !text-xs font-body">
            {`Discover the best products in ${region.name}, ${region?.stateName}, Nigeria`}
          </p> */}
          <button className="mt-2 mb-1 text-sm bg-secondary text-white py-1 px-2 rounded hover:bg-primary transition-colors">
            Visit Store
          </button>
        </div>
      </div>
    </Link>
    // </div>
  )
}

export default RegionCard
