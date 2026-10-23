"use client";

import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useLogout } from "../_hooks/useLogout";

export default function LogoutButton({ onMenuClose }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { handleLogout, pending } = useLogout();

    function handleClick() {
        if (onMenuClose) onMenuClose(); // بستن منوی کاربری
        setConfirmOpen(true); // باز کردن مودال
    }

    function handleConfirm() {
        handleLogout(() => setConfirmOpen(false)); // بستن مودال بعد از موفقیت
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
                <LuLogOut />
                خروج از حساب
            </button>

            <LogoutConfirmModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
                pending={pending}
            />
        </>
    );
}
