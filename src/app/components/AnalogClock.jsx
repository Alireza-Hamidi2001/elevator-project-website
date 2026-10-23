// app/components/DigitalClock.jsx
"use client";

import { useEffect, useState } from "react";
import { estedad } from "../_fonts/fonts";
import PersianNumber from "./PersianNumber";

export default function DigitalClock({ className = "" }) {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const tick = () => setTime(new Date());
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // تا mount نشده، یه placeholder با همون اندازه
    if (!time) {
        return (
            <div
                className={`${estedad.className} flex items-center gap-1 text-sm font-bold tabular-nums text-night-800 dark:text-cream-50 ${className}`}
                aria-hidden="true"
            >
                <span>--</span>
                <span className="opacity-50">:</span>
                <span>--</span>
                <span className="opacity-50">:</span>
                <span>--</span>
            </div>
        );
    }

    const hh = String(time.getHours()).padStart(2, "0");
    const mm = String(time.getMinutes()).padStart(2, "0");
    const ss = String(time.getSeconds()).padStart(2, "0");

    return (
        <div
            className={`${estedad.className} flex items-center gap-1 text-sm font-bold tabular-nums text-night-800 dark:text-cream-50 ${className}`}
            dir="ltr"
            aria-label={`ساعت ${hh}:${mm}:${ss}`}
        >
            <PersianNumber value={hh} />
            <span className="opacity-75 animate-pulse">:</span>
            <PersianNumber value={mm} />
            <span className="opacity-75 animate-pulse">:</span>
            <PersianNumber value={ss} />
        </div>
    );
}
