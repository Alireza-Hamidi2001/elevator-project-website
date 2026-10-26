"use client";

import { useState } from "react";
import ReplyModal from "./ReplyModal";
import { LuReply } from "react-icons/lu";

export default function ReplyTicketButton({ ticket }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition"
            >
                <LuReply className="w-3 h-3" /> پاسخ
            </button>
            <ReplyModal
                ticket={ticket}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
