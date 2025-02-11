const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const nodeExternals = require('webpack-node-externals');

module.exports = withStoreConfig({
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@medusajs/product"],
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
      "medusa-server-testing.s3.amazonaws.com",
      "ehhevvujhtrjgcznewzg.supabase.co",
    ],
  },
 
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
