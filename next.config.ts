import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // ✅ снова статическая сборка
    output: "export",

    // ✅ при экспорте все пути будут /path/index.html
    trailingSlash: true,

    // ✅ отключаем server-side оптимизацию картинок
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
