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
    return `${hours}:${minutes}`
  }

  return (
    <div className="flex space-x-6 mt-0">
      {formatTime(timeLeft)
        .split(":")
        .map((unit, index) => (
          <div key={index} className="flex flex-col items-start sm:items-center">
            <div
              className={`text-3xl flex flex-row items-center font-bold capitalize text-white ${style}`}
            >
              {["230", "300,000"][index]}
              <p className="text-lg">+</p>
            </div>
            <div
              className={`text-lg text-[#FFB447] py-1 pb-1 px-1 rounded`}
            >
              {/* {unit} */}
              {["Sellers", "Shoppers"][index]}
            </div>
          </div>
        ))}
    </div>
  )
}

const CustomDealsStats = () => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  return (
    <div className="relative flex flex-row justify-between bg-gradient-to-r from-[#3D8B7A] via-[#3D8B7A] to-transparent text-white overflow-hidden mx-0 md:mx-0 lg:mx-0 xl:mx-0 my-10 w-full h-[300px] sm:h-[421px] ">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start p-6 md:p-4 lg:p-8 space-y-4 px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 justify-center">
        <div className="flex flex-col w-full space-y-6 items-start justify-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            Our Marketplace
          </h2>
          <p className="text-sx md:text-md lg:text-lg">
            Real time stats of our Marketplace
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-x-4 sm:space-x-6 gap-y-4 mt-8 ml-0! justify-start items-start">
          <CountdownTimer timeString={"2:00:00"} style="text-black" />
        </div>
      </div>
      {/* Background Image */}
      <div className="flex relative w-[30vw] -z-10">
        <Image
          src="/hero2.jpeg"
          alt="Background Image"
          fill
          className="object-cover opacity-80"
        />
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

export default CustomDealsStats
