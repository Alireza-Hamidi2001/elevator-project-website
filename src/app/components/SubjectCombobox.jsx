// app/dashboard/ticket/SubjectCombobox.jsx
"use client";

import { useState, useRef, useEffect } from "react";

const SUBJECTS = [
    "مشکل فنی",
    "سوال درباره سفارش",
    "درخواست مرجوعی",
    "پیگیری ارسال",
    "مشکل پرداخت",
    "انتقاد و پیشنهاد",
];

export default function SubjectCombobox({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value || "");
    const wrapperRef = useRef(null);

    const filtered = SUBJECTS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase()),
    );

    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleInputChange(e) {
        const val = e.target.value;
        setQuery(val);
        onChange(val);
        setOpen(true);
    }

    function handleSelect(subject) {
        setQuery(subject);
        onChange(subject);
        setOpen(false);
    }

    return (
        <div
            ref={wrapperRef}
            className="relative w-full"
        >
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setOpen(true)}
                placeholder="موضوع را انتخاب کنید یا خودتان بنویسید..."
                className="w-full border border-night-700/10 dark:border-cream-50/10 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {open && filtered.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md bg-white dark:bg-night-800 shadow-lg border border-gray-200 dark:border-night-700">
                    {filtered.map((subject) => (
                        <li
                            key={subject}
                            onClick={() => handleSelect(subject)}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-night-700"
                        >
                            {subject}
                        </li>
                    ))}
                </ul>
            )}

            {open && query && filtered.length === 0 && (
                <ul className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-night-800 shadow-lg border border-gray-200 dark:border-night-700">
                    <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                        موضوع سفارشی: «{query}»
                    </li>
                </ul>
            )}
        </div>
    );
}
