/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {

    reactStrictMode: true,
    // This rewrites rule acts as a proxy during development.
    // It forwards any request made to the frontend's /api/* path
    // to the backend server running on http://localhost:3001.
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // This destination URL will be determined by the environment variable.
                // On Vercel, it will point to your live backend. Locally, it will point to localhost.
                destination: `${process.env.BACKEND_URL}/:path*`
            },
        ];
    },
    webpack: (config) => {
        // This explicitly sets the '@' alias to point to the root of the project.
        // This is a robust way to ensure path aliases work in all environments, including Vercel.
        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
    },
};

module.exports = nextConfig;