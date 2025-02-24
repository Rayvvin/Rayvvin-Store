const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const nodeExternals = require("webpack-node-externals")

module.exports = withStoreConfig({
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@medusajs/product"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
        "supports-color": "supports-color",
      })
    }

    return config
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
      "medusa-server-testing.s3.amazonaws.com",
      "qqhnbezrwcbdyidfudcs.supabase.co",
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
