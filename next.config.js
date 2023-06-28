/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_MY_VARIABLE: process.env.NEXT_PUBLIC_MY_VARIABLE,
  },
};

module.exports = nextConfig;
