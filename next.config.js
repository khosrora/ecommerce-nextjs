/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL" : "mongodb://localhost:27017/ecommerce_nextjs"
  }
}

module.exports = nextConfig
