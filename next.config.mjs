/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optional: you can be more specific with the pathname if you like
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;
