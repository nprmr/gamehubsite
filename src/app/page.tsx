"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/never-ever")}
            className="
          px-12 py-6 rounded-full
          bg-white text-black font-bold text-3xl
          shadow-lg transition-colors
          hover:bg-neutral-200
        "
        >
          Играть
        </motion.button>
      </main>
  );
}
