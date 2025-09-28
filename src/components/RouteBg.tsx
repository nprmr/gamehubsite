"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function RouteBg() {
    const pathname = usePathname();
    const isNeverEver = pathname?.startsWith("/never-ever");

    // обновляем CSS-переменную --isl-vh
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty(
                "--isl-vh",
                `${window.innerHeight * 0.01}px`
            );
        };
        setVh();
        window.addEventListener("resize", setVh);
        return () => window.removeEventListener("resize", setVh);
    }, []);

    // переключаем класс для прозрачного фона
    useEffect(() => {
        const root = document.documentElement;
        if (isNeverEver) root.classList.add("neverever-active");
        else root.classList.remove("neverever-active");
        return () => root.classList.remove("neverever-active");
    }, [isNeverEver]);

    // пересоздаём theme-color
    useEffect(() => {
        document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove());
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = isNeverEver ? "transparent" : "#151515";
        document.head.appendChild(meta);
    }, [isNeverEver]);

    return (
        <AnimatePresence mode="wait">
            {isNeverEver && (
                <motion.div
                    key="bg-never-ever"
                    className="isl_holder pointer-events-none"
                    style={{ background: "#FFA724" }}
                    initial={{ clipPath: "ellipse(0% 0% at 100% 100%)" }}
                    animate={{ clipPath: "ellipse(200% 200% at 100% 100%)" }}
                    exit={{ clipPath: "ellipse(0% 0% at 100% 100%)" }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
            )}
        </AnimatePresence>
    );
}
