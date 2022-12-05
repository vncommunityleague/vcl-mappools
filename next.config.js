/**
 * @type {import("next").NextConfig}
 */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [ "a.ppy.sh", "assets.ppy.sh" ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/vhp4",
                permanent: true,
            },
        ]
    }
};

module.exports = nextConfig;
