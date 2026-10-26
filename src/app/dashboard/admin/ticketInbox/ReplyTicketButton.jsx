// app/dashboard/admin/ticketInbox/ReplyTicketButton.jsx
"use client";

import { useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import ReplyModal from "./ReplyModal";

export default function ReplyTicketButton({ ticket }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 cursor-pointer text-white rounded-sm text-xs font-medium transition"
            >
                <IoArrowUndo className="w-3 h-3" /> پاسخ
            </button>
            <ReplyModal
                ticket={ticket}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
