/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'localhost',
            'flowbite.com',
            '127.0.0.1',
            'images.unsplash.com',
            'unsplash.com',
            'tailwindui.com'
        ]
    }
};

module.exports = nextConfig;
