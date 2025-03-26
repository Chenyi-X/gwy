/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://10.44.94.224:5000/api/:path*",
          },
          {
            source: "/flask-static/:path*",
            destination: "http://localhost:5000/static/:path*",
          },
        ];
    },
};

export default nextConfig;
