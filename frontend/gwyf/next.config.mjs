/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://127.0.0.1:5000/api/:path*",
          },
          {
            source: "/flask-static/:path*",
            destination: "http://localhost:5000/static/:path*",
          },
        ];
    },
};

export default nextConfig;
