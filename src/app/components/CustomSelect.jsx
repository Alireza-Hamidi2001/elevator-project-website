// components/CustomSelect.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { estedad } from "../_fonts/fonts"; // مسیر فونتت رو چک کن

export default function CustomSelect({
    name,
    value,
    onChange,
    options,
    placeholder = "انتخاب کنید",
    error,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // بستن دراپ‌داون وقتی بیرون کلیک شد
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // پیدا کردن لیبل انتخاب شده
    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div
            ref={dropdownRef}
            className={`relative ${estedad.className}`}
        >
            {/* اینپوت مخفی برای ارسال به سرور */}
            <input
                type="hidden"
                name={name}
                value={value || ""}
            />

            {/* دکمه‌ای که دراپ‌داون رو باز می‌کنه */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md border transition-all duration-300 outline-none focus:ring-1 
                    ${
                        error
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500/50 hover:border-night-700/30 dark:hover:border-cream-50/30"
                    }
                    ${
                        isOpen
                            ? "bg-cream-50 dark:bg-night-800 ring-2 ring-blue-500/20"
                            : "bg-transparent"
                    }
                    text-night-700 dark:text-cream-50
                `}
            >
                <span
                    className={
                        selectedOption
                            ? ""
                            : "text-night-700/40 dark:text-cream-50/40"
                    }
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${
                        isOpen
                            ? "rotate-180 text-blue-500"
                            : "text-night-700/40 dark:text-cream-50/40"
                    }`}
                />
            </button>

            {/* لیست بازشونده */}
            <div
                className={`absolute z-50 w-full mt-1.5 bg-white dark:bg-night-800 border border-night-700/10 dark:border-cream-50/10 rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-out origin-top
                    ${
                        isOpen
                            ? "opacity-100 scale-y-100 translate-y-0 visible"
                            : "opacity-0 scale-y-95 -translate-y-2 invisible pointer-events-none"
                    }
                `}
            >
                <ul className="max-h-60 overflow-y-auto py-1">
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm text-right transition-colors duration-150
                                    ${
                                        value === option.value
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                                            : "text-night-700 dark:text-cream-50 hover:bg-cream-100 dark:hover:bg-night-700"
                                    }
                                `}
                            >
                                {option.label}
                                {value === option.value && (
                                    <FaCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
