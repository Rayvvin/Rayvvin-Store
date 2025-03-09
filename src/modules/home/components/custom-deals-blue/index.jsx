"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"

const CountdownTimer = ({ timeString, style }) => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number)
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    setTimeLeft(totalSeconds)
  }, [timeString])

  useEffect(() => {
    if (timeLeft <= 0) return

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0")
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0")
    const seconds = String(time % 60).padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className="flex space-x-2 text-center">
      {formatTime(timeLeft)
        .split(":")
        .map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`text-xs capitalize text-[#2c7865] ${style}`}>
              {["Hours", "Minutes", "Seconds"][index]}
            </div>
            <div
              className={`text-xl font-bold text-[#2c7865] py-1 pb-1 px-4 rounded ${style}`}
            >
              {unit}
            </div>
          </div>
        ))}
    </div>
  )
}

const CustomDealsBlue = () => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  return (
    <div className="relative bg-[#201FC2] text-white overflow-hidden mx-0 md:mx-0 lg:mx-0 xl:mx-0 mb-10 w-full h-auto lg:h-[174px] ">
      {/* Background Image */}
      {/* <div className="absolute inset-0">
        <Image
          src='/rayvvin_pngs/Component 2.png'
          alt="Background Image"
          fill
          className="object-cover opacity-60"
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 flex flex-row items-start justify-between p-6 md:p-4 lg:p-8 space-y-6 px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 ">
        <div className="flex flex-col sm:flex-row space-x-4 sm:space-x-6 space-y-4 items-start sm:items-center">
          <Image
            src="/rayvvin_pngs/Logo (1).png"
            alt="Background Image"
            width={142}
            height={39}
            className="w-[95px] sm:w-[142px] ml-4 h-fit"
          />
          <Image
            src="/rayvvin_pngs/Group 437.png"
            alt="Background Image"
            width={171}
            height={201}
            className="object-cover w-[102px] sm:w-[171px]"
          />
          <div className="flex w-[171px] text-white text-[14px] sm:text-[20px]">
            On all Groceries Top Deals and Flash sales.
          </div>

          <a
            href="/store"
            className="flex bg-[#FFB447] rounded-lg w-[171px] text-white text-[15px] text-[#082621] p-2"
          >
            Start shopping
          </a>
        </div>

        <div className="flex px-2">
          <Image
            src="/rayvvin_pngs/pngegg 1.png"
            alt="Background Image"
            width={251}
            height={218}
            // fill
            className="object-cover relative md:top-0 "
          />
        </div>

        {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Enhance Your Shopping Experience
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl">
          <CountdownTimer timeString={'2:00:00'} style="!text-white" />
        </p>
        <Link
          href="/categories"
          className="inline-block bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg transition"
        >
          Buy Now!
        </Link> */}
      </div>

      {/* Overlay Icons */}
      {/* <div className="absolute right-0 bottom-0 flex flex-col items-center space-y-2 p-4">
        <div className="bg-white text-green-900 p-2 rounded-full">
          <Image src="/path-to-icon1.svg" alt="Icon 1" width={24} height={24} />
        </div>
        <div className="bg-white text-green-900 p-2 rounded-full">
          <Image src="/path-to-icon2.svg" alt="Icon 2" width={24} height={24} />
        </div>
        <div className="bg-white text-green-900 p-2 rounded-full">
          <Image src="/path-to-icon3.svg" alt="Icon 3" width={24} height={24} />
        </div>
      </div> */}
    </div>
  )
}

export default CustomDealsBlue
