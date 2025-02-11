"use client"

import { StoreGetProductsParams } from "@medusajs/medusa"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useEffect, useState } from "react"
import { Tabs, Tab, Card, CardBody, RadioGroup, Radio } from "@nextui-org/react"
import Hero from "@modules/home/components/hero"
import SingleStoreInfiniteProducts from "@modules/products/components/single-store-infinite-products"

const TabbedView = (props) => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  const { plcmnt, tab_obj } = props
//   const [placement, setPlacement] = useState("top")

  // useEffect(()=>{
  //   if(store){
  //     console.log(store)
  //   }
  // },[store])

  return (
    <>
      <div className="flex flex-col px-1">
        <div className="flex w-full flex-col">
          <Tabs aria-label="tab-list" classNames={{base: ['top', 'bottom'].includes(plcmnt) ? 'my_tablist_center' : 'my_tablist_side' }} placement={plcmnt}>
            {tab_obj &&
              tab_obj.map((tab) => {
                return (
                  <Tab key={tab.key} title={tab.title}>
                    {tab.child}
                  </Tab>
                )
              })}
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default TabbedView
