// app/dashboard/admin/ticketInbox/ReplyModal.jsx
"use client";

import { useState, useActionState, useEffect } from "react";
import { createPortal } from "react-dom";
import { LuX, LuSend } from "react-icons/lu";
import { replyToTicketAction } from "./actions";
import { toast } from "@/app/components/toast";
import SpinnerMini from "@/app/components/SpinnerMini";

export default function ReplyModal({ ticket, open, onClose }) {
    const [message, setMessage] = useState("");

    const [state, formAction, pending] = useActionState(replyToTicketAction, {
        ok: null,
        message: "",
        ts: null,
    });

    useEffect(() => {
        if (state.message && state.ts) {
            if (state.ok) {
                toast.success(state.message);
                // setMessage("");  👈 این خط حذف شد
                onClose();
            } else {
                toast.error(state.message);
            }
        }
    }, [state.ts, state.ok, state.message, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            dir="rtl"
        >
            <div
                onClick={onClose}
                className="absolute inset-0 bg-night-950/40 backdrop-blur-md"
            />

            <div className="relative w-full max-w-lg bg-white dark:bg-night-800 rounded-2xl shadow-xl border border-night-700/10 dark:border-cream-50/10 p-6 animate-[popIn_200ms_ease-out]">
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-night-700/50 hover:text-night-700 dark:text-cream-50/50 dark:hover:text-cream-50"
                >
                    <LuX className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold text-night-900 dark:text-cream-50 mb-4">
                    پاسخ به تیکت
                </h3>

                <div className="mb-4 p-3 bg-cream-50 dark:bg-night-900 rounded-lg text-sm text-night-700/70 dark:text-cream-50/60">
                    <p className="font-medium text-night-900 dark:text-cream-50 mb-1">
                        {ticket.subject}
                    </p>
                    <p className="line-clamp-2">{ticket.message}</p>
                </div>

                <form
                    action={formAction}
                    className="flex flex-col gap-4"
                >
                    <input
                        type="hidden"
                        name="ticketId"
                        value={ticket.id}
                    />
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="پاسخ خود را بنویسید..."
                        className="w-full border border-night-700/10 dark:border-cream-50/10 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500/50 resize-none bg-transparent"
                    />
                    <button
                        type="submit"
                        disabled={pending}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/60 text-white rounded-md py-2 transition flex items-center justify-center gap-2"
                    >
                        {pending ? (
                            <p className="flex items-center gap-2">
                                <SpinnerMini />
                                درحال ارسال
                            </p>
                        ) : (
                            <>
                                <LuSend /> ارسال پاسخ و بستن تیکت
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>,
        document.body,
    );
}
