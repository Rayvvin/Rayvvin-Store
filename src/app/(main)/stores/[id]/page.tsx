import { Metadata } from "next"
import StoreTemplate from "@modules/store/templates"
import { getProductByHandle, getProductsByStoreId, getStore } from "@lib/data"
import ProductTemplate from "@modules/products/templates"
import { notFound } from "next/navigation"
import SingleStoreTemplate from "@modules/single-store/templates"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = await getStore(params.id).catch((err) => {
    notFound()
  })


  

  return {
    title: `${store?.name} | Afriomarkets`,
    description: "Explore all of our products.",
  }
}



export default async function StorePage({ params }: Props) {
  const store = await getStore(params.id).catch((err) => {
    notFound()
  })
  
  const {products} = await getProductsByStoreId(store?.id)

  // console.log(products)
  

  return <SingleStoreTemplate store={store} users={store?.users} products={products} />
}
