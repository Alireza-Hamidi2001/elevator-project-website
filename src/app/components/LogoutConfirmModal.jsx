// app/components/LogoutConfirmModal.jsx
"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LuLogOut, LuX } from "react-icons/lu";
import { estedad } from "../_fonts/fonts";

export default function LogoutConfirmModal({
    open,
    onClose,
    onConfirm,
    pending,
}) {
    // قفل اسکرول + بستن با Esc
    useEffect(() => {
        if (!open) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function onKey(e) {
            if (e.key === "Escape" && !pending) onClose();
        }
        document.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = prev;
            document.removeEventListener("keydown", onKey);
        };
    }, [open, pending, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            dir="rtl"
        >
            {/* بک‌دراپ با blur */}
            <div
                onClick={() => !pending && onClose()}
                className="absolute inset-0 bg-night-950/40 dark:bg-night-950/70 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
            />

            {/* کارت مودال */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-title"
                className={`${estedad.className} relative w-full max-w-sm bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-night-700/10 dark:border-cream-50/10 p-6 animate-[popIn_250ms_cubic-bezier(0.16,1,0.3,1)]`}
            >
                {/* دکمه بستن */}
                <button
                    onClick={() => !pending && onClose()}
                    disabled={pending}
                    className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full text-night-700/60 dark:text-cream-50/60 hover:bg-night-700/5 dark:hover:bg-cream-50/10 transition disabled:opacity-40"
                    aria-label="بستن"
                >
                    <LuX className="w-4 h-4" />
                </button>

                {/* آیکون */}
                <div className="mx-auto w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <LuLogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>

                {/* متن */}
                <h2
                    id="logout-title"
                    className="text-center text-lg font-bold text-night-900 dark:text-cream-50"
                >
                    خروج از حساب
                </h2>
                <p className="text-center text-sm text-night-700/70 dark:text-cream-50/60 mt-2 leading-6">
                    آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
                </p>

                {/* دکمه‌ها */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        disabled={pending}
                        className="w-full py-2.5 rounded-lg border border-night-700/15 dark:border-cream-50/15 text-sm font-medium text-night-700 dark:text-cream-50 hover:bg-night-700/5 dark:hover:bg-cream-50/5 transition disabled:opacity-50"
                    >
                        انصراف
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={pending}
                        className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-600/60 text-sm font-medium text-white transition flex items-center justify-center gap-2"
                    >
                        {pending ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                در حال خروج
                            </>
                        ) : (
                            "بله، خارج شو"
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
