"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Splide, SplideSlide } from "splide-nextjs/react-splide"
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css"

const CustomIntro = () => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  // const {
  //   data: infiniteData,
  //   hasNextPage,
  //   fetchNextPage,
  //   isFetchingNextPage,
  //   refetch,
  // } = useInfiniteQuery(
  //   [`get_category_products`, category.handle, cart?.id],
  //   ({ pageParam }) =>
  //     getProductsByCategoryHandle({
  //       pageParam,
  //       handle: category.handle,
  //       cartId: cart?.id,
  //     }),
  //   {
  //     getNextPageParam: (lastPage) => lastPage.nextPage,
  //   }
  // )

  // useEffect(() => {
  //   if (cart?.region_id) {
  //     refetch()
  //   }
  // }, [cart?.region_id, refetch])

  // const previews = usePreviews({
  //   pages: infiniteData?.pages,
  //   region: cart?.region,
  // })

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inView, hasNextPage])
  // useEffect(() => {
  //   fetch(
  //     "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
  //     // "https://jsonplaceholder.typicode.com/todos/1"
  //   )
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  // }, [])

  return (
    // <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-24 lg:py-24 px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 pb-2 md:pb-4 lg:pb-4 gap-4">
    //   {/* Categories Column */}
    //   <div className="w-full lg:w-1/4 flex flex-col space-y-4 order-last xs:order-last sm:order-last md:order-last lg:order-first xl:order-first">
    //     <h3 className="text-xl font-semibold">Categories</h3>
    //     <div className="flex flex-col space-y-2">
    //       {categories?.map((category) => (
    //         <Link
    //           key={category.id}
    //           href={`/categories/${category.id}`}
    //           className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
    //         >
    //           {category.name}
    //         </Link>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Hero Carousel */}
    //   <div className="w-full lg:w-3/4 mt-8 lg:mt-0 !rounded-md">
    //     <Splide
    //       options={{
    //         type: "loop",
    //         perPage: 1,
    //         autoplay: !true,
    //         interval: 3000,
    //         pagination: false,
    //         arrows: false,
    //         drag: "free",
    //         gap: "1rem",
    //       }}
    //     >
    //       {slides.map((slide, index) => (
    //         <SplideSlide key={index}>
    //           <div className="relative w-full h-64 lg:h-96">
    //             <Image
    //               // src={slide.image}
    //               src={images.hero_bg}
    //               alt={slide.title}
    //               fill
    //               className="object-cover rounded-lg"
    //             />
    //             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center !rounded-md">
    //               <div className="text-center">
    //                 <h2 className="text-white text-2xl lg:text-4xl font-bold mb-4">
    //                   {slide.title}
    //                 </h2>
    //                 <p className="text-white text-lg lg:text-xl">
    //                   {slide.subtitle}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </SplideSlide>
    //       ))}
    //     </Splide>
    //   </div>
    // </div>
    <main className="container mx-auto mt-8">
      <section className="text-center">
        <h2 className="text-4xl font-heading text-primary mb-4">
          ...where culture meets technology
        </h2>
        <p className="text-xl font-body text-accent mb-8">
          Explore the vibrant markets and stores across Africa from the comfort
          of your home.
        </p>
        <button className="bg-secondary text-white py-2 px-6 rounded-lg hover:bg-primary transition-all">
          Explore Now
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mx-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/marrakesh.jpg"
            alt="Market 1"
            width={500}
            height={300}
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-2xl font-heading text-primary">Market 1</h3>
            <p className="text-accent font-body">
              Discover the best products in Market 1.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/marrakesh.jpg"
            alt="Market 2"
            width={500}
            height={300}
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-2xl font-heading text-primary">Market 2</h3>
            <p className="text-accent font-body">
              A fusion of culture and modernity at Market 2.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/marrakesh.jpg"
            alt="Market 3"
            width={500}
            height={300}
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-2xl font-heading text-primary">Market 3</h3>
            <p className="text-accent font-body">
              Experience the richness of African markets at Market 3.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CustomIntro
