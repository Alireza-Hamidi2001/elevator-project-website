// app/components/LogoutButton.jsx
"use client";

import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useLogout } from "../_hooks/useLogout";

export default function LogoutButton({ onMenuClose }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { handleLogout, pending } = useLogout();

    function handleClick() {
        if (onMenuClose) onMenuClose();
        setConfirmOpen(true);
    }

    function handleConfirm() {
        handleLogout(() => setConfirmOpen(false));
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="flex items-center justify-center gap-2 w-full h-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition rounded-md px-2 py-2"
            >
                <LuLogOut className="w-6 h-6" />
                <span className="hidden sm:inline text-sm">خروج از حساب</span>
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
