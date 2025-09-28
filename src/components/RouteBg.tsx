"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RouteBg() {
    const pathname = usePathname();
    const isNeverEver = pathname?.startsWith("/never-ever");

    const [vh, setVh] = useState("100vh");
    useEffect(() => {
        const updateVh = () => setVh(`${window.innerHeight}px`);
        updateVh();
        window.addEventListener("resize", updateVh);
        return () => window.removeEventListener("resize", updateVh);
    }, []);

    // Класс на <html> для прозрачного фона страницы
    useEffect(() => {
        const root = document.documentElement;
        if (isNeverEver) root.classList.add("neverever-active");
        else root.classList.remove("neverever-active");
        return () => root.classList.remove("neverever-active");
    }, [isNeverEver]);

    // iOS 26: делаем адресную строку/нижнюю панель полупрозрачными —
    // ставим theme-color = transparent только на нужной странице
    useEffect(() => {
        let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }
        const prev = meta.getAttribute("content") || "#151515";
        if (isNeverEver) meta.setAttribute("content", "transparent");
        else meta.setAttribute("content", "#151515");

        return () => {
            // при уходе со страницы — вернём дефолт
            meta && meta.setAttribute("content", "#151515");
        };
    }, [isNeverEver]);

    return (
        <AnimatePresence mode="wait">
            {isNeverEver && (
                <motion.div
                    key="bg-never-ever"
                    className="fixed pointer-events-none z-0"
                    style={{
                        // важное: фон заезжает в safe-area, чтобы быть видимым под браузерными барами
                        top: "calc(-1 * env(safe-area-inset-top, 0px))",
                        right: "calc(-1 * env(safe-area-inset-right, 0px))",
                        bottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
                        left: "calc(-1 * env(safe-area-inset-left, 0px))",
                        background: "#FFA724",
                        height: "100dvh",      // в iOS 26 dvh учитывает динамические бары
                        minHeight: vh,         // страховка на старых WebKit
                    }}
                    initial={{ clipPath: "ellipse(0% 0% at 100% 100%)" }}
                    animate={{ clipPath: "ellipse(200% 200% at 100% 100%)" }}
                    exit={{ clipPath: "ellipse(0% 0% at 100% 100%)" }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
            )}
        </AnimatePresence>
    );
}
