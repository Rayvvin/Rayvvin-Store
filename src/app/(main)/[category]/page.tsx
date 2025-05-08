import { getCategoryByHandle } from "@lib/data"
import CategoryTemplate from "@modules/categories/templates"
import HomePage from "@modules/home/components/homepage-new"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

type Props = {
  params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_categories } = await getCategoryByHandle(
    params.category
  ).catch((err) => {
    notFound()
  })

  const category = product_categories[0]

  return {
    title: `${category.name} | Acme Store`,
    description: `${category.name} category`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { product_categories } = await getCategoryByHandle(
    params.category
  ).catch((err) => {
    notFound()
  })

  const category = product_categories[0]
  console.log(category);

  // if (
  //   category &&
  //   category.category_children &&
  //   category.category_children.length > 0
  // ) {
  //   return <HomePage category={category} />
  // } else {
  //   return redirect(`/${category.handle}/products`)
  // }
  return <HomePage category={category} />

  
}
