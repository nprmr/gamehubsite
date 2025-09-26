"use client";

import { motion } from "framer-motion";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { Squircle } from "corner-smoothing";
import type { ComponentType } from "react";

interface CategoryCardProps {
    label: string;
    src: string;           // путь к .riv файлу
    color?: string;        // цвет карточки (по умолчанию #F09000)
    cornerRadius?: number; // по макету 20
    cornerSmoothing?: number; // [0..1], по умолчанию 1
}

// Оборачиваем Squircle с типами
const MotionSquircle = motion(
    Squircle as ComponentType<React.ComponentProps<typeof Squircle>>
);

export default function CategoryCard({
                                         label,
                                         src,
                                         color = "#F09000",
                                         cornerRadius = 20,
                                         cornerSmoothing = 1,
                                     }: CategoryCardProps) {
    const { rive, RiveComponent } = useRive({
        src,
        stateMachines: "State Machine 1",
        autoplay: true,
    });

    const activation = useStateMachineInput(rive, "State Machine 1", "Activation");

    return (
        <MotionSquircle
            cornerRadius={cornerRadius}
            cornerSmoothing={cornerSmoothing}
            preserveSmoothing
            style={{
                width: 156,
                height: 172,
                padding: "16px 8px",
                backgroundColor: color,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            className="select-none cursor-pointer"
            onMouseEnter={() => activation && (activation.value = true)}
            onMouseLeave={() => activation && (activation.value = false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <div className="flex items-center justify-center" style={{ height: 92 }}>
                <RiveComponent style={{ width: 92, height: 92 }} />
            </div>
            <p className="text-center text-white font-medium mt-2">{label}</p>
        </MotionSquircle>
    );
}
