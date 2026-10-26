// app/dashboard/admin/users/DeleteUserButton.jsx
"use client";

import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";
import { FaTrash } from "react-icons/fa";

export default function DeleteUserButton({ user }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-all duration-300 w-[9rem] mx-auto"
            >
                <FaTrash /> حذف کاربر
            </button>
            <DeleteUserModal
                user={user}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
