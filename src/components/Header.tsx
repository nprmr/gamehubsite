"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > lastScrollY) {
                // скроллим вниз → скрыть
                setVisible(false);
            } else {
                // скроллим вверх → показать
                setVisible(true);
            }
            setLastScrollY(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 h-[72px] bg-black text-white shadow-md z-50"
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : -80 }} // уезжает вверх
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {/* Контент хэдера */}
            <div className="h-full flex items-center px-6">
                {/* Пока пусто */}
            </div>
        </motion.header>
    );
}
