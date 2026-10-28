// app/components/PersianDatePicker.jsx
"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { estedad } from "../_fonts/fonts";

export default function PersianDatePicker({ name, value, onChange, error }) {
    return (
        <div className={`${estedad.className}`}>
            {/* اینپوت مخفی برای ارسال به سرور */}
            <input
                type="hidden"
                name={name}
                value={value || ""}
            />

            <DatePicker
                value={value}
                onChange={(date) => {
                    // فرمت خروجی رو به YYYY-MM-DD (میلادی) تغییر می‌دیم که دیتابیس قبول کنه
                    if (date) {
                        onChange(
                            date.convert("gregorian").format("YYYY-MM-DD"),
                        );
                    } else {
                        onChange("");
                    }
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={`placeholder:text-[.8rem] border rounded-md px-3 py-2 outline-none focus:ring-1 transition-all duration-300 text-right ${
                    error
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500/50"
                } bg-transparent text-night-700 dark:text-cream-50`}
                placeholder="تاریخ پایان قرارداد را انتخاب کنید"
            />
        </div>
    );
}
