import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,

    images: {
        unoptimized: true,
    },

    // basePath: "/subfolder", // оставь закомментированным если не нужно
};

export default nextConfig;
