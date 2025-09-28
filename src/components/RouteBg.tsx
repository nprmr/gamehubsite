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

    // переключаем фон body только на этой странице
    useEffect(() => {
        const root = document.documentElement;
        if (isNeverEver) {
            root.classList.add("neverever-active");
        } else {
            root.classList.remove("neverever-active");
        }
        return () => root.classList.remove("neverever-active");
    }, [isNeverEver]);

    return (
        <AnimatePresence mode="wait">
            {isNeverEver && (
                <motion.div
                    key="bg-never-ever"
                    className="fixed pointer-events-none z-0"
                    style={{
                        top: "calc(-1 * env(safe-area-inset-top, 0px))",
                        right: "calc(-1 * env(safe-area-inset-right, 0px))",
                        bottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
                        left: "calc(-1 * env(safe-area-inset-left, 0px))",
                        background: "#FFA724",
                        height: "100dvh",
                        minHeight: vh,
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
