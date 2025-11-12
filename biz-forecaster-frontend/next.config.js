/** @type {import('next').NextConfig} */
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
                destination: `${process.env.BACKEND_URL}/:path*`,
            },
        ];
    },
    webpack: (config) => {
        // This is the crucial part. It tells webpack to use the tsconfig.json
        // for resolving path aliases.
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
        ];
        return config;
    },
};

module.exports = nextConfig;