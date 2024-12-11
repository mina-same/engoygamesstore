const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'static.vecteezy.com', 
      'img.freepik.com', 
      'res.cloudinary.com',
      'cdn.salla.sa', // Add this line
    ],
  },
};

module.exports = withNextIntl(nextConfig);
