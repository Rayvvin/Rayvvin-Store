import Image from "next/image"

export default function MarketplaceGrid() {
  const markets = [
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 2,
      name: "Market 2",
      description: "A fusion of culture and modernity at Market 2.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    {
      id: 1,
      name: "Market 1",
      description: "Discover the best products in Market 1.",
      image: "/marrakesh.jpg",
    },
    
    // Add more markets as needed
  ]

  return (
    <section className="mx-2 mt-16 px-4 flex flex-col">
      <section className="text-center mb-6 flex flex-col justify-center">
        <h2 className="text-4xl font-heading text-primary mb-4">
          ...where culture meets technology
        </h2>
        <p className="text-xl font-body text-accent mb-8">
          Explore the vibrant markets and stores across Africa from the comfort
          of your home.
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {markets.map((market) => (
          <div
            key={market.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Image
              src={market.image}
              alt={market.name}
              width={500}
              height={300}
              className="w-full h-32 object-cover"
            />
            <div className="py-2 px-2">
              <h3 className="!text-md font-heading text-primary mb-1">
                {market.name}
              </h3>
              <p className="text-accent !text-xs font-body">
                Location: State, Country
              </p>
              <p className="text-accent !text-xs font-body">
                {market.description}
              </p>
              <button className="mt-2 mb-1 text-sm bg-secondary text-white py-1 px-2 rounded hover:bg-primary transition-colors">
                View Market
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end p-2 mx-4 mt-2">
        <button className="bg-secondary text-white py-2 px-6 rounded-lg hover:bg-primary transition-all">
          View more
        </button>
      </div>
    </section>
  )
}
