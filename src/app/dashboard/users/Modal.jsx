"use client";

import { almarai } from "@/app/layout";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, onClose, title, children }) {
    const modalRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    // فقط در کلاینت mount می‌شه
    useEffect(() => {
        setMounted(true);
    }, []);

    // بستن با Esc
    useEffect(() => {
        if (!isOpen) return;
        function handleKey(e) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // قفل اسکرول صفحه
    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* پس‌زمینه تار و تیره */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm modal-fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* کارت مدال */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-md sm:max-w-lg rounded-2xl bg-white dark:bg-night-800 border border-night-700/10 dark:border-cream-50/10 shadow-2xl overflow-hidden modal-pop-in max-h-[90vh] flex flex-col"
            >
                <header className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-night-700/10 dark:border-cream-50/10 shrink-0">
                    <h2
                        id="modal-title"
                        className={`${almarai.className} text-base sm:text-lg font-bold text-night-700 dark:text-cream-50`}
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="بستن"
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-night-700/60 dark:text-cream-50/60 hover:bg-night-700/5 dark:hover:bg-cream-50/10 hover:text-night-700 dark:hover:text-cream-50 transition-colors"
                    >
                        <FaTimes />
                    </button>
                </header>

                <div className="px-5 sm:px-6 py-5 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
}
