import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",   // оставляем экспорт
    trailingSlash: true,
    images: { unoptimized: true },
};

export default nextConfig;
