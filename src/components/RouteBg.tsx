"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RouteBg() {
    const pathname = usePathname();
    const isNeverEver = pathname?.startsWith("/never-ever");

    // JS-фиксация для старых Safari
    const [vh, setVh] = useState("100vh");

    useEffect(() => {
        const updateVh = () => {
            setVh(`${window.innerHeight}px`);
        };
        updateVh();
        window.addEventListener("resize", updateVh);
        return () => window.removeEventListener("resize", updateVh);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isNeverEver && (
                <motion.div
                    key="bg-never-ever"
                    className="fixed left-0 top-0 w-full z-0 pointer-events-none"
                    style={{
                        background: "#FFA724",
                        height: "100dvh", // новые браузеры
                        minHeight: vh, // fallback для старых iOS
                        paddingBottom: "env(safe-area-inset-bottom)", // перекрытие home indicator
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
