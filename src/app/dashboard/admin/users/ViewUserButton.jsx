// app/dashboard/admin/users/ViewUserButton.jsx
"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import UserDetailsModal from "./UserDetailsModal";

export default function ViewUserButton({ userId }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-all duration-300 w-[9rem] mx-auto"
            >
                <FaEye /> مشاهده جزئیات
            </button>
            <UserDetailsModal
                userId={userId}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
