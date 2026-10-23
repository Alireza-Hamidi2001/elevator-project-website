// app/dashboard/admin/reviews/ReviewActions.jsx
"use client";

import { useState } from "react";
import { updateReviewStatusAction } from "./actions";
import { toast } from "@/app/components/toast";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function ReviewActions({ reviewId, currentStatus }) {
    const [pending, setPending] = useState(false);

    async function handleUpdate(status) {
        setPending(true);
        const res = await updateReviewStatusAction(reviewId, status);
        setPending(false);

        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success(
                status === "approved"
                    ? "نظر با موفقیت تایید شد."
                    : "نظر با موفقیت رد شد.",
            );
        }
    }

    if (currentStatus === "approved") {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                <FaCheck /> تایید شده
            </span>
        );
    }

    if (currentStatus === "rejected") {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                <FaTimes /> رد شده
            </span>
        );
    }

    // وضعیت pending
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleUpdate("approved")}
                disabled={pending}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
            >
                <FaCheck /> تایید
            </button>
            <button
                onClick={() => handleUpdate("rejected")}
                disabled={pending}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
            >
                <FaTimes /> رد
            </button>
        </div>
    );
}
