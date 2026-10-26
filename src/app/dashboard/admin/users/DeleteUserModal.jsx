// app/dashboard/admin/users/DeleteUserModal.jsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { deleteUserAction } from "./actions";
import { toast } from "@/app/components/toast";
import SpinnerMini from "@/app/components/SpinnerMini";
import { estedad } from "@/app/_fonts/fonts";

export default function DeleteUserModal({ user, open, onClose }) {
    const [confirmText, setConfirmText] = useState("");
    const [pending, setPending] = useState(false);

    // کلمه‌ای که کاربر باید تایپ کنه
    const REQUIRED_TEXT = "حذف";
    const isConfirmed = confirmText === REQUIRED_TEXT;

    useEffect(() => {
        if (!open) setConfirmText(""); // ریست کردن وقتی بسته میشه
    }, [open]);

    async function handleDelete() {
        if (!isConfirmed || pending) return;

        setPending(true);
        const res = await deleteUserAction(user.id);
        setPending(false);

        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("کاربر با موفقیت حذف شد.");
            onClose();
        }
    }

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            dir="rtl"
        >
            {/* بک‌دراپ تار */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-night-950/50 backdrop-blur-sm"
            />

            {/* کارت مودال */}
            <div
                className={`${estedad.className} relative w-full max-w-md bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-red-200 dark:border-red-900/50 p-6 animate-[popIn_200ms_ease-out]`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-night-700/50 hover:text-night-700 dark:text-cream-50/50 dark:hover:text-cream-50"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                {/* آیکون هشدار */}
                <div className="mx-auto w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <FaExclamationTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>

                {/* متن */}
                <h2 className="text-center text-xl font-bold text-night-900 dark:text-cream-50 mb-2">
                    حذف کاربر
                </h2>
                <p className="text-center text-sm text-night-700/70 dark:text-cream-50/70 mb-6">
                    آیا مطمئن هستید که می‌خواهید کاربر{" "}
                    <strong className="text-night-900 dark:text-cream-50">
                        «{user.first_name} {user.last_name}»
                    </strong>{" "}
                    را حذف کنید؟ این عملیات غیرقابل بازگشت است.
                </p>

                {/* پیام هشدار قرمز */}
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-4 text-center text-sm text-red-600 dark:text-red-400 font-medium">
                    برای تایید، کلمه‌ی{" "}
                    <strong className="font-bold border-b border-red-400">
                        «حذف»
                    </strong>{" "}
                    را در کادر زیر تایپ کنید.
                </div>

                {/* فیلد ورودی */}
                <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="حذف"
                    className="w-full border border-red-300 dark:border-red-900/50 rounded-md px-3 py-2 text-center text-lg outline-none focus:ring-2 focus:ring-red-500/50 bg-transparent text-night-900 dark:text-cream-50 mb-4"
                />

                {/* دکمه‌ها */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        disabled={pending}
                        className="w-full py-2.5 rounded-lg border border-night-700/15 dark:border-cream-50/15 text-sm font-medium text-night-700 dark:text-cream-50 hover:bg-night-700/5 dark:hover:bg-cream-50/5 transition disabled:opacity-50"
                    >
                        انصراف
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={!isConfirmed || pending}
                        className={`w-full py-2.5 rounded-lg text-sm font-medium text-white transition flex items-center justify-center gap-2 ${
                            !isConfirmed || pending
                                ? "bg-red-600/50 cursor-not-allowed opacity-60"
                                : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20"
                        }`}
                    >
                        {pending ? (
                            <SpinnerMini />
                        ) : (
                            <>
                                <FaTrash /> حذف کاربر
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
