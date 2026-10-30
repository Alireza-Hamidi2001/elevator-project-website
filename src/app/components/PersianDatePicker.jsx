// app/components/PersianDatePicker.jsx
"use client";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import { estedad } from "../_fonts/fonts";

// تبدیل اعداد فارسی به لاتین
function toEnglishDigits(str) {
    return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

export default function PersianDatePicker({ name, value, onChange, error }) {
    const dateValue = value
        ? new DateObject({
              date: value,
              calendar: gregorian,
              locale: persian_fa,
          })
        : null;

    return (
        <div className={`${estedad.className} relative`}>
            <input
                type="hidden"
                name={name}
                value={value || ""}
            />

            <DatePicker
                value={dateValue}
                onChange={(date) => {
                    if (date) {
                        // تبدیل به میلادی و فرمت YYYY-MM-DD
                        const formatted = date
                            .convert(gregorian)
                            .format("YYYY-MM-DD");
                        // تبدیل اعداد فارسی به لاتین
                        const latinFormatted = toEnglishDigits(formatted);
                        console.log(
                            `📅 PERSIAN DATE PICKER (${name}) OUTPUT >>>`,
                            latinFormatted,
                        );
                        onChange(latinFormatted);
                    } else {
                        onChange("");
                    }
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={`w-full border rounded-md px-3 py-2 outline-none focus:ring-1 transition-all duration-300 text-right ${
                    error
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500/50"
                } bg-transparent text-night-700 dark:text-cream-50`}
                placeholder="تاریخ را انتخاب کنید"
            />
        </div>
    );
}
