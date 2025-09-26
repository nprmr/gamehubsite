"use client";

import { Squircle } from "corner-smoothing";
import styled from "styled-components";

const StyledSquircle = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    background: #fff;

    &::before {
        background: #fff; /* внутренняя заливка */
    }

    /* Текст по умолчанию (desktop) */
    font-size: 28px;
    line-height: 32px;
    font-weight: bold;
    color: #000;

    /* ===== Адаптив ===== */
    @media (max-width: 1064px) {
        padding: 12px 16px;
        font-size: 16px;
        line-height: 20px;
    }
`;

interface ChipProps {
    text: string;
    radius?: number;
    smoothing?: number;
}

export default function Chip({
                                 text,
                                 radius = 20,
                                 smoothing = 1,
                             }: ChipProps) {
    return (
        <Squircle
            as={StyledSquircle}
            cornerRadius={radius}
            cornerSmoothing={smoothing}
            borderWidth={2}
        >
            {text}
        </Squircle>
    );
}
