// app/components/DeleteReviewModal.jsx
"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "@/app/components/toast";
import SpinnerMini from "@/app/components/SpinnerMini";
import { deleteReviewAction } from "@/app/dashboard/admin/reviews/actions";
import { estedad } from "@/app/_fonts/fonts";

export default function DeleteReviewModal({ review, open, onClose }) {
    const [pending, setPending] = useState(false);

    async function handleDelete() {
        setPending(true);
        const res = await deleteReviewAction(review.id);
        setPending(false);

        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("نظر با موفقیت حذف شد.");
            onClose();
        }
    }

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            dir="rtl"
        >
            <div
                onClick={onClose}
                className="absolute inset-0 bg-night-950/50 backdrop-blur-sm"
            />

            <div
                className={`${estedad.className} relative w-full max-w-md bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-red-200 dark:border-red-900/50 p-6 animate-[popIn_200ms_ease-out]`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-night-700/50 hover:text-night-700 dark:text-cream-50/50 dark:hover:text-cream-50"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                <div className="mx-auto w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <FaExclamationTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>

                <h2 className="text-center text-xl font-bold text-night-900 dark:text-cream-50 mb-2">
                    حذف نظر
                </h2>
                <p className="text-center text-sm text-night-700/70 dark:text-cream-50/70 mb-6">
                    آیا از حذف نظر{" "}
                    <strong className="text-night-900 dark:text-cream-50">
                        «{review.name}»
                    </strong>{" "}
                    اطمینان دارید؟
                    <br />
                    این عملیات غیرقابل بازگشت است.
                </p>

                {/* متن نظر در یک باکس با اسکرول */}
                <div className="bg-cream-50 dark:bg-night-900 rounded-lg border border-night-700/10 dark:border-cream-50/10 p-3 mb-6 max-h-32 overflow-y-auto text-sm text-night-700/80 dark:text-cream-50/70">
                    {review.text}
                </div>

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
                        disabled={pending}
                        className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-600/60 transition flex items-center justify-center gap-2"
                    >
                        {pending ? (
                            <SpinnerMini />
                        ) : (
                            <>
                                <FaTrash /> حذف نظر
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
