"use client"

import { useEffect, useState } from "react"

const InfoCard = (props) => {
  const { region, color } = props
  return (
    <div
      className="text-base-regular mt-2 p-4 flex justify-start items-center rounded-md min-h-24 bg-gray-100"
      style={{
        // background: "rgba(255, 255, 255, 0.19)",
        borderRadius: "12px",
        boxShadow: "0 4px 30px rgba(255, 255, 255, 0.1)",
        // backdropFilter: "blur(9.7px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      {region ? (
        <div
          className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600 m-1 dark:ring-gray-500 p-1 shadow-card"
          style={{ background: color }}
        >
          <span className="font-bold text-2xl text-white">
            {region && region.icon ? <region.icon /> : "J&L"}
          </span>
        </div>
      ) : (
        <div className="rounded-full p-8 animate-pulse bg-gray-100"></div>
      )}
      <div className="my-2 px-2 flex justify-around flex-col">
        <h1 className="text-sm font-semibold">
          {region && region.name ? region.name : "Metric"}
        </h1>
        {region && region.value ? (
          <span className="text-base-regular">{region.value}</span>
        ) : (
          <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
        )}

        {/* <div></div> */}
      </div>
    </div>
  )
}

export default InfoCard
