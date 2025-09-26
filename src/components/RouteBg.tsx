"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RouteBg() {
    const pathname = usePathname();
    const isNeverEver = pathname?.startsWith("/never-ever");

    return (
        <AnimatePresence mode="wait">
            {isNeverEver && (
                <motion.div
                    key="bg-never-ever"
                    className="fixed inset-0 z-0 pointer-events-none"
                    style={{ background: "#FFA724" }} // правильный цвет
                    initial={{ clipPath: "ellipse(0% 0% at 100% 100%)" }}      // старт: крошечный овал в правом нижнем углу
                    animate={{ clipPath: "ellipse(200% 200% at 100% 100%)" }}  // овал расширяется так, что перекрывает экран
                    exit={{ clipPath: "ellipse(0% 0% at 100% 100%)" }}         // при уходе сжимается обратно
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}   // плавное ease-out
                />
            )}
        </AnimatePresence>
    );
}
