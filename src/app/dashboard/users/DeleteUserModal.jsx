"use client";

import { useState, useTransition } from "react";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import Modal from "./Modal";
import { almarai } from "@/app/layout";

export default function DeleteUserModal({ isOpen, onClose, user, onDeleted }) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    function handleConfirm() {
        setError("");
        startTransition(async () => {
            try {
                // await deleteUser(user.id);
                await new Promise((r) => setTimeout(r, 800)); // شبیه‌سازی
                onDeleted?.(user.id);
                onClose();
            } catch (e) {
                setError("خطا در حذف کاربر. دوباره تلاش کنید.");
            }
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="تأیید حذف کاربر"
        >
            <div className="flex flex-col items-center text-center">
                {/* آیکون هشدار */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-2xl sm:text-3xl border border-red-500/20">
                    <FaExclamationTriangle />
                </div>

                <p className="mt-5 text-base sm:text-lg text-night-700 dark:text-cream-50">
                    آیا از حذف{" "}
                    <span
                        className={`${almarai.className} font-bold text-red-600 dark:text-red-400`}
                    >
                        {user?.firstName} {user?.lastName}
                    </span>{" "}
                    مطمئن هستید؟
                </p>

                <p className="mt-2 text-xs sm:text-sm text-night-700/60 dark:text-cream-50/50">
                    این عملیات قابل بازگشت نیست.
                </p>

                {error && (
                    <p className="mt-4 text-xs sm:text-sm text-red-500">
                        {error}
                    </p>
                )}

                {/* دکمه‌ها */}
                <div className="mt-6 flex flex-col-reverse xs:flex-row xs:justify-center gap-3 w-full">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="w-full xs:w-auto px-5 py-2.5 rounded-lg border border-night-700/10 dark:border-cream-50/10 text-night-700 dark:text-cream-50 hover:bg-night-700/5 dark:hover:bg-cream-50/5 disabled:opacity-50 transition-all duration-300"
                    >
                        انصراف
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isPending}
                        className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:bg-red-600/60 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {isPending ? (
                            <>
                                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                در حال حذف...
                            </>
                        ) : (
                            <>
                                <FaTrash className="text-xs" />
                                بله، حذف کن
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
