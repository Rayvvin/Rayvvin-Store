import { Metadata } from "next"
import StoreTemplate from "@modules/store/templates"
import {
  getProductByHandle,
  getProductsByStoreId,
  getStateMarkets,
  getStore,
} from "@lib/data"
import ProductTemplate from "@modules/products/templates"
import { notFound } from "next/navigation"
import SingleStoreTemplate from "@modules/single-store/templates"
import SingleStateTemplate from "@modules/single-state/templates"
import useStateMarkets from "@lib/hooks/use-state-markets"
import SingleMarketTemplate from "@modules/single-market/templates"

type Props = {
  params: { state: string; market: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = await getStateMarkets(params.state).catch((err) => {
    notFound()
  })

  const market = state?.markets.find((mrkt) => {
    return mrkt.handle === params.market
  })

  // const store = await getStore(params.id).catch((err) => {
  //   notFound()
  // })

  // console.log(market);
  if (!state && !market) {
    notFound()
  }

  

  return {
    title: `${market?.market_name} - ${state?.stateName}  | Afriomarkets`,
    description: "Explore all of our products.",
  }
}

export default async function MarketPage({ params }: Props) {
  const state = await getStateMarkets(params.state).catch((err) => {
    notFound()
  })

  const market = state?.markets.find((mrkt) => {
    return mrkt.handle === params.market
  })

  if (!state && !market) {
    notFound()
  }

  // const {products} = await getProductsByStoreId(store?.id)

  // console.log(market);

  return (
    <SingleMarketTemplate
      state={state}
      market={market}
      // store={store}
      // users={store?.users}
      // products={products}
    />
  )
}
