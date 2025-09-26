import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",   // 👈 это ключ
    trailingSlash: true,
    images: { unoptimized: true },
};

export default nextConfig;
