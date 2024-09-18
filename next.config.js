/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://api-v3.fastrest.com.tr:4002/graphql/",
    // PROJECT_API_URL: 'https://yapublic.vercel.app/api/ ',
    PROJECT_API_URL: "http://localhost:3000/api/",
  },
  images: {
    domains: [
      "admin.fastrest.com.tr",
      "cdn.fastrest.com.tr",
      "crm.fastrest.com.tr",
    ],
  },
};

module.exports = nextConfig;

/*module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};*/
