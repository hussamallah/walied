import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/(.*)',
        destination: 'https://www.yourdomain.com/$1',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'yourdomain.com',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
