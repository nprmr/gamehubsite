"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import NeverEverRive from "@/components/NeverEverRive";
import Chip from "@/components/Chip";
import CategoryCard from "@/components/CategoryCard";
import PlayButton from "@/components/PlayButton";
import Container from "@/components/Container";
import { useEffect, useState } from "react";

/** ===== Типы ===== */
interface Category {
    id: number;
    label: string;
    icon: string;
    color?: string;
}

/** ===== Анимационные пресеты ===== */
const springFast: Transition = { type: "spring", stiffness: 400, damping: 25 };
const springMedium: Transition = { type: "spring", stiffness: 300, damping: 25 };
const titleTransition: Transition = { ...springFast, delay: 0.2 };

const chipsContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { delayChildren: 0.2, staggerChildren: 0.18 },
    },
};
const chipItem: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: springFast },
};
const textContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { delayChildren: 0.4, staggerChildren: 0.1 },
    },
};
const textLine: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: springMedium },
};
const categoriesContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.1 } },
};
const categoryItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: springFast },
};

/** ====== Текст описания ====== */
const descriptionLines = [
    "«Я никогда не» — игра, которая разгоняет любую вечеринку!",
    "",
    "Правила просты: один игрок говорит фразу, начинающуюся с «Я никогда не…». Например: «Я никогда не летал автостопом». Те, кто это делал, должны признаться действием — чаще всего выпить.",
    "",
    "Каждый раунд открывает неожиданные факты о друзьях: кто-то оказывается авантюристом, кто-то — экспертом в необычных вещах, а кто-то просто честно удивляет всех своим опытом.",
    "",
    "«Я никогда не» идеально подходит для вечеринок, встреч с друзьями и свиданий. Здесь нет победителей и проигравших — есть только смех, истории и атмосфера близости.",
    "",
    "Почему игра достойна вашего внимания:",
    " • простые правила — начнёте сразу;",
    " • весело в любой компании;",
    " • узнаёте друзей с новой стороны.",
    "",
    "Попробуйте сыграть — и уже через пару минут компания будет смеяться, краснеть и делиться откровениями!",
];

export default function NeverEverPage() {
    /** ====== Получение категорий ====== */
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        void (async () => {
            try {
                // ⚡️ Теперь стучимся в Render-прокси
                const res = await fetch(
                    "https://hub-proxy.onrender.com/api/games/never-ever/categories",
                    { cache: "no-store" }
                );

                if (!res.ok) {
                    setError(`Ошибка ${res.status}`);
                    return;
                }

                const data: Category[] = await res.json();
                setCategories(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <main className="neverever-page min-h-screen flex flex-col items-center relative">
            {/* Заголовок + Rive */}
            <div className="relative w-full max-w-[1400px] mx-auto desktop-header">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={titleTransition}
                    className="pointer-events-none text-white font-black text-center z-0 whitespace-nowrap overlay-title"
                    style={{ fontSize: "164px", lineHeight: "196px" }}
                >
                    Я НИКОГДА НЕ
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={titleTransition}
                    className="relative z-10 flex items-center justify-center"
                >
                    <NeverEverRive />
                </motion.div>
            </div>

            {/* Чипсы */}
            <Container>
                <motion.div
                    variants={chipsContainer}
                    initial="hidden"
                    animate="visible"
                    className="mt-[16px] flex flex-wrap gap-[40px] justify-center chips-container"
                >
                    <motion.div variants={chipItem}><Chip text="14 категорий" /></motion.div>
                    <motion.div variants={chipItem}><Chip text="1 000 вопросов" /></motion.div>
                    <motion.div variants={chipItem}><Chip text="от 2-х игроков" /></motion.div>
                </motion.div>
            </Container>

            {/* Описание */}
            <Container>
                <motion.div
                    variants={textContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-white font-normal neverever-description"
                    style={{ fontFamily: "Advent Pro" }}
                >
                    {descriptionLines.map((line, idx) => (
                        <motion.p key={idx} variants={textLine} className="mb-2">
                            {line}
                        </motion.p>
                    ))}
                </motion.div>
            </Container>

            {/* Список категорий */}
            <section className="categories-section w-full max-w-[1024px] with-playbutton-space">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={springFast}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-white text-3xl font-bold mb-6 categories-title"
                >
                    Список категорий:
                </motion.h2>

                {loading && <p className="text-white">Загрузка категорий...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <motion.div
                    variants={categoriesContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="categories"
                >
                    {categories.map((cat) => (
                        <motion.div key={cat.id} variants={categoryItem}>
                            <CategoryCard
                                label={cat.label}
                                src={cat.icon}
                                color={cat.color}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Кнопка */}
            <div
                className="
          w-full flex justify-center
          fixed bottom-4 left-0 right-0 md:relative
          pointer-events-none md:pointer-events-auto
          safe-bottom
        "
            >
                <div className="pointer-events-auto flex justify-center w-full">
                    <PlayButton text="Играть" onClick={() => console.log("Play clicked")} />
                </div>
            </div>
        </main>
    );
}
