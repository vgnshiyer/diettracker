/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "",
    output: 'export',
    images: {
        unoptimized: true,
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '/simple-diet-planner/' : '',
}

export default nextConfig;
