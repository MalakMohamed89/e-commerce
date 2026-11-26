import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg
  //  (https://ecommerce.routemisr.com/Route-Academy-brands/1678286824747.png)
  images:{
remotePatterns:[
  {
    protocol:"https",
    hostname:"ecommerce.routemisr.com",
    pathname:"/Route-Academy-categories/**"
  },
    {
    protocol:"https",
    hostname:"ecommerce.routemisr.com",
    pathname:"/Route-Academy-products/**"
  },
      {
    protocol:"https",
    hostname:"ecommerce.routemisr.com",
    pathname:"/Route-Academy-brands/**"
  },
]
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
