/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL": "mongodb://localhost:27017/ecommerce_nextjs",
    "ACCESS_TOKEN_SECRET": "AEUHXayzc7uh7Pp8K25E8ZuNaTNZq7sEuKsMa9YY4ztLCLMj7X",
    "REFRESH_TOKEN_SECRET": "4J7P9LuwupUW6xEJnWXZWdSVdBKvUJtefqJBryLC9fD3SmAXfhU9BdUF7bDUNxThTEvC5rRpq5AVqjrh",
  }
}

module.exports = nextConfig
