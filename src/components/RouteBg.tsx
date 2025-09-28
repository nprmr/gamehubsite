"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function RouteBg() {
    const pathname = usePathname();
    const isNeverEver = pathname?.startsWith("/never-ever");

    // theme-color для Safari
    useEffect(() => {
        document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove());
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = "transparent"; // всегда прозрачный
        document.head.appendChild(meta);
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
