"use client";

import { motion } from "framer-motion";

interface PlayButtonProps {
    text: string;
    onClick?: () => void;
}

export default function PlayButton({ text, onClick }: PlayButtonProps) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="
        w-[312px] rounded-full bg-white text-black font-bold
        text-[20px] leading-[24px] py-[14px]
        relative z-20 pointer-events-auto
        transition-transform transition-colors duration-200 ease-out
        md:w-auto md:px-[72px] md:py-[32px] md:text-[52px] md:leading-[62px]
        md:hover:bg-neutral-100 md:hover:scale-[1.02]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
      "
        >
            {text}
        </motion.button>
    );
}
