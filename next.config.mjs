/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // allowedDevOrigins: ['192.168.100.22']
    turbo: false
  }
  
};

export default nextConfig;
