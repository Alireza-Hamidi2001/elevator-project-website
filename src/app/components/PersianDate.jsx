// app/components/PersianDate.jsx
"use client";

import { useEffect, useState } from "react";
import { estedad } from "../_fonts/fonts";
import SpinnerMini from "./SpinnerMini";

export default function PersianDate({ className = "" }) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    // تا mount نشده، placeholder
    if (!date) {
        return (
            <div
                className={`${estedad.className} flex items-center gap-2 text-xs text-night-700/60 dark:text-cream-50/60 ${className}`}
                aria-hidden="true"
            >
                <SpinnerMini />
                <span>در حال بارگذاری...</span>
            </div>
        );
    }

    const formatter = new Intl.DateTimeFormat("fa-IR", {
        calendar: "persian",
        timeZone: "Asia/Tehran",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const parts = formatter.formatToParts(date);
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const year = parts.find((p) => p.type === "year")?.value ?? "";

    return (
        <div
            className={`${estedad.className} flex items-center gap-1.5 text-xs text-night-700/70 dark:text-cream-50/60 ${className}`}
            dir="rtl"
            aria-label={`${weekday} ${day} ${month} ${year}`}
        >
            <span className="font-medium text-night-800 dark:text-cream-50/90">
                {weekday}
            </span>
            <span className="opacity-40">|</span>
            <span>
                {day} {month} {year}
            </span>
        </div>
    );
}
