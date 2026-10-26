// app/dashboard/admin/users/UserStatusToggle.jsx
"use client";

import { useState, useTransition } from "react";
import { toggleUserStatusAction } from "./actions";
import { toast } from "@/app/components/toast";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import SpinnerMini from "@/app/components/SpinnerMini";

export default function UserStatusToggle({ userId, isActive, isCurrentUser }) {
    const [pending, setPending] = useState(false);

    async function handleToggle() {
        setPending(true);
        const res = await toggleUserStatusAction(userId, isActive);
        setPending(false);

        if (res?.error) {
            toast.error(res.error);
        } else if (res?.success) {
            toast.success(
                isActive
                    ? "کاربر با موفقیت غیرفعال شد."
                    : "کاربر با موفقیت فعال شد.",
            );
        }
    }

    // اگه کاربر داره وضعیت خودش رو می‌بینه، دکمه رو غیرفعال نشون بده
    if (isCurrentUser) {
        return (
            <span className="text-xs text-night-700/40 dark:text-cream-50/40">
                (حساب شما)
            </span>
        );
    }

    return (
        <button
            onClick={handleToggle}
            disabled={pending}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium transition-all duration-300 w-[9rem] ${
                isActive
                    ? "bg-amber-300/40 cursor-pointer mx-auto  hover:bg-amber-100 dark:bg-amber-600/40 text-amber-600 dark:text-amber-200 dark:hover:bg-amber-900/40"
                    : "bg-emerald-100 cursor-pointer  mx-auto hover:bg-emerald-100 dark:bg-emerald-800 dark:text-cream-50 dark:hover:bg-emerald-900/40"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {pending ? (
                <SpinnerMini />
            ) : isActive ? (
                <>
                    <FaBan /> غیرفعال کردن کاربر
                </>
            ) : (
                <>
                    <FaCheckCircle /> فعال کردن کاربر
                </>
            )}
        </button>
    );
}
