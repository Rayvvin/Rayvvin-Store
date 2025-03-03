"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import { Button } from "@nextui-org/react"
import { createClient } from "@supabase/supabase-js"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { toast } from "react-toastify"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"

const supabaseUrl = process.env.NEXT_PUBLIC_VITE_BASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL and KEY are required")
}

const supabase = createClient(supabaseUrl, supabaseKey)

const handleSubscribe = async (firstName, email) => {
  const { data: existingUser, error: fetchError } = await supabase
    .from("subscription")
    .select("*")
    .eq("email", email)
    .maybeSingle()

  if (fetchError) {
    console.error("Error checking subscription:", fetchError)
    return
  }

  if (existingUser) {
    // console.log("User already subscribed")
    toast("You're already subscribed", { type: "info" })
    // Show toast notification for already subscribed
    return
  }

  const { data, error } = await supabase
    .from("subscription")
    .insert([{ first_name: firstName, email: email }])

  if (error) {
    // console.error("Error subscribing:", error)
    toast("Error subscribing", { type: "error" })
  } else {
    // console.log("Successfully subscribed:", data)
    toast("Successfully subscribed", { type: "success" })
    // Show toast notification for successful subscription
  }
}
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

const CustomDealsSubscribe = () => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  return (
    <div className="relative bg-[#FFB447] text-white overflow-hidden mx-0 md:mx-0 lg:mx-0 xl:mx-0 mb-10 w-full h-[421px] sm:h-[421px] ">
      {/* Background Image */}
      {/* <div className="absolute inset-0">
        <Image
          src='/rayvvin_pngs/Component 2.png'
          alt="Background Image"
          fill
          className="object-cover opacity-60"
        />
      </div> */}

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const firstName = e.target.firstName.value
          const email = e.target.email.value
          await handleSubscribe(firstName, email)
        }}
        className="relative z-10 flex flex-col items-center p-6 md:p-4 lg:p-8 space-y-4 h-[400px] px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 items-center justify-center"
      >
        <div className="flex flex-col w-full sm:w-9/12 space-y-6 items-center justify-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            Subscribe to our newsletter
          </h2>
          <p className="text-sx md:text-md lg:text-lg text-center">
            Stay up to date with our new collections, latest deals and special
            offers. We announce a new collection every week so be sure to stay
            tuned.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-x-4 sm:space-x-6 gap-y-4 mt-8 justify-start items-center sm:justify-center">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="py-2 px-4 ml-4 rounded-md bg-transparent border border-white text-white placeholder-white text-xs sm:text-base"
          />
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            className="py-2 px-4 rounded-md bg-transparent border border-white text-white placeholder-white text-xs sm:text-base"
          />
          <Button
            type="submit"
            className="inline-flex bg-[#3D8B7A] hover:bg-green-800 text-white py-2 px-4 rounded-lg break-keep transition items-center w-fit"
          >
            Subscribe Now!
          </Button>
        </div>
      </form>

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

export default CustomDealsSubscribe
