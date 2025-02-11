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
            {/* <div className={`text-xs capitalize text-[#2c7865] ${style}`}>
              {["Hours", "Minutes", "Seconds"][index]}
            </div> */}
            <div
              className={`text-sm font-bold text-[#2c7865] py-1 pb-1 px-1 rounded ${style}`}
            >
              {unit}
              {["h", "m", "s"][index]}
            </div>
          </div>
        ))}
    </div>
  )
}

const CustomDeals = () => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  return (
    <div className="relative bg-[#FFB447] text-white rounded-lg overflow-hidden mx-0 md:mx-0 lg:mx-0 xl:mx-0 mb-4 w-full h-[128px]">
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
      <div className="relative z-10 flex flex-row items-start justify-between p-6 md:p-4 lg:p-8 space-y-6 h-[400px] px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 ">
        <Image
          src="/rayvvin_pngs/image 10.png"
          alt="Background Image"
          width={171}
          height={201}
          className="object-cover w-[64px] md:w-[171px] relative -bottom-[55px] md:bottom-auto"
        />
        <div className="flex flex-col items-center relative bottom-6 text-black">
          <h2 className="text-center text-lg md:text-xl lg:text-2xl font-bold">
            Rayvvin Flash Sales!
          </h2>
          <div className="text-center text-sm flex items-center break-keep ">
            Ends in:
            <CountdownTimer timeString={"2:00:00"} style="text-black" />
          </div>
        </div>
        <Image
          src="/rayvvin_pngs/image 12.png"
          alt="Background Image"
          width={142}
          height={111}
          className="object-cover w-[53px] md:w-[142px] relative -bottom-[40px] md:bottom-auto"
        />
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

export default CustomDeals
