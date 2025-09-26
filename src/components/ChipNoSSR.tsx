"use client";

import dynamic from "next/dynamic";

const Chip = dynamic(() => import("./Chip"), { ssr: false });
export default Chip;
