"use client";

import { FaMale, FaFemale } from "react-icons/fa";

const options = [
    { value: "male", label: "مرد", icon: <FaMale /> },
    { value: "female", label: "زن", icon: <FaFemale /> },
];

export default function GenderSelect({ value, onChange, error }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">جنسیت</span>
            <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => {
                    const isSelected = value === opt.value;
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => onChange(opt.value)}
                            aria-pressed={isSelected}
                            className={`group flex items-center justify-center gap-2 rounded-md px-3 py-2.5 border transition-all duration-300 ${
                                isSelected
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                    : error
                                    ? "border-red-500"
                                    : "border-night-700/10 dark:border-cream-50/10 hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-500/5"
                            }`}
                        >
                            <span
                                className={`text-lg transition-transform duration-300 ${
                                    isSelected
                                        ? "scale-110"
                                        : "group-hover:scale-110"
                                }`}
                            >
                                {opt.icon}
                            </span>
                            <span className="text-sm font-medium">
                                {opt.label}
                            </span>
                        </button>
                    );
                })}
            </div>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}
