import { Metadata } from "next"
import StoreTemplate from "@modules/store/templates"
import {
  getProductByHandle,
  getProductsByStoreId,
  getStateMarkets,
  getStatesWithMarkets,
  getStore,
} from "@lib/data"
import ProductTemplate from "@modules/products/templates"
import { notFound } from "next/navigation"
import SingleStoreTemplate from "@modules/single-store/templates"
import SingleStateTemplate from "@modules/single-state/templates"
import useStateMarkets from "@lib/hooks/use-state-markets"

type Props = {
  params: { state: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = await getStateMarkets(params.state).catch((err) => {
    notFound()
  })
  

  

  return {
    title: `${state?.stateName} | Afriomarkets`,
    description: "Explore all of our products.",
  }
}

export default async function StatePage({ params }: Props) {
  // const store = await getStore(params.id).catch((err) => {
  //   notFound()
  // })

  const state = await getStateMarkets(params.state).catch((err) => {
    notFound()
  })


  // const {products} = await getProductsByStoreId(store?.id)

  // console.log(state)

  return (
    <SingleStateTemplate
      state={state}
      // store={store}
      // users={store?.users}
      // products={products}
    />
  )
}
