import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // ✅ включаем статическую сборку вместо SSR
    output: "export",

    // ✅ чтобы при экспорте страницы были в формате папка/index.html
    // например: /never-ever/index.html → работает при обновлении страницы
    trailingSlash: true,

    // ✅ отключаем серверную оптимизацию картинок,
    // т.к. на FTP у тебя нет next/image backend
    images: {
        unoptimized: true,
    },

    // ⚡ опционально: если используешь basePath (сайт не в корне домена),
    // раскомментируй и укажи путь:
    // basePath: "/subfolder",
};

export default nextConfig;
