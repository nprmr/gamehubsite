import type { Metadata } from "next";
import "./globals.css";
import RouteBg from "@/components/RouteBg";
import Header from "@/components/Header";
import { Advent_Pro } from "next/font/google";

const adventPro = Advent_Pro({
    weight: ["400", "700", "900"],
    subsets: ["latin", "latin-ext"],
    display: "swap",
    fallback: ["sans-serif"],
});

export const metadata: Metadata = {
    title: "GameHub",
    description: "Игры и анимации — GameHub",
    openGraph: {
        title: "GameHub",
        description: "Игры и анимации — GameHub",
        url: "https://hub-game.ru",
        siteName: "GameHub",
        locale: "ru_RU",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
            <meta name="color-scheme" content="dark light" />
            <meta name="theme-color" content="transparent" />
        </head>
        <body className={`${adventPro.className} min-h-screen relative`}>
        {/* Фон по умолчанию (чёрный), отключается RouteBg */}
        <div className="site-bg" />

        <Header />
        <RouteBg />

        <div className="relative z-10 pt-[72px] safe-top">{children}</div>
        </body>
        </html>
    );
}
