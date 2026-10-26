// app/dashboard/user/myTickets/TicketList.jsx
import { createClient } from "@/lib/supabase/server";
import { almarai } from "@/app/_fonts/fonts";
import {
    FaRegCircle,
    FaCheckCircle,
    FaUser,
    FaUserShield,
} from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import Pagination from "@/app/dashboard/admin/reviews/Pagination";

function formatDate(dateString) {
    return new Intl.DateTimeFormat("fa-IR", {
        calendar: "persian",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(dateString));
}

const STATUS_MAP = {
    open: {
        label: "باز",
        icon: <FaRegCircle className="text-xs" />,
        classes:
            "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    },
    closed: {
        label: "بسته‌شده",
        icon: <FaCheckCircle className="text-xs" />,
        classes:
            "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    },
};

export default async function TicketList({ searchParams }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const statusFilter = searchParams?.status || "all";
    const page = Number(searchParams?.page) || 1;
    const limit = 5;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // ۱. تیکت‌های کاربر
    let query = supabase
        .from("tickets")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (statusFilter !== "all") query = query.eq("status", statusFilter);

    const { data: tickets, count, error } = await query;

    if (error) {
        console.error("TICKETS FETCH ERROR:", error);
        return <div className="p-6 text-red-500">خطا در دریافت تیکت‌ها.</div>;
    }

    const totalPages = Math.ceil((count || 0) / limit);
    const ticketIds = tickets?.map((t) => t.id) || [];

    // ۲. پیام‌های این تیکت‌ها
    let messages = [];
    if (ticketIds.length > 0) {
        const { data: msgs } = await supabase
            .from("ticket_messages")
            .select("*")
            .in("ticket_id", ticketIds)
            .order("created_at", { ascending: true });

        if (msgs) {
            messages = msgs;
        }
    }

    return (
        <div className="space-y-6">
            {tickets?.map((ticket) => {
                const status = STATUS_MAP[ticket.status] || STATUS_MAP.open;
                const ticketMessages = messages.filter(
                    (m) => m.ticket_id === ticket.id,
                );

                return (
                    <div
                        key={ticket.id}
                        className="p-5 rounded-xl border-2 border-cream-300 dark:border-night-700 bg-cream-50 dark:bg-night-800 flex flex-col gap-4"
                    >
                        <div className="flex items-center justify-between border-b border-night-700/5 dark:border-cream-50/5 pb-4">
                            <span className="text-sm font-bold text-night-900 dark:text-cream-50">
                                تیکت: {ticket.subject}
                            </span>
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${status.classes}`}
                            >
                                {status.icon} {status.label}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {ticketMessages.map((msg) => {
                                // تشخیص اینکه پیام از طرف خود کاربر است یا مدیر
                                const isMyMessage = msg.sender_id === user.id;

                                // اگر پیام من بود "شما" ، اگر نبود "مدیر"
                                const senderName = isMyMessage ? "شما" : "مدیر";

                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex flex-col gap-1 max-w-[85%] ${
                                            isMyMessage
                                                ? "self-end items-end"
                                                : "self-start items-start"
                                        }`}
                                    >
                                        <span className="text-[0.8rem] text-night-700/50 dark:text-cream-50/50 flex items-center gap-1.5">
                                            {isMyMessage ? (
                                                <FaUser />
                                            ) : (
                                                <FaUserShield />
                                            )}
                                            {senderName}
                                        </span>

                                        <div
                                            className={`p-3 rounded-2xl text-sm leading-7 whitespace-pre-wrap ${
                                                isMyMessage
                                                    ? "bg-blue-600 text-white rounded-tl-sm"
                                                    : "bg-white dark:bg-night-700 border border-night-700/10 dark:border-cream-50/10 rounded-tr-sm text-night-800 dark:text-cream-100"
                                            }`}
                                        >
                                            <p
                                                className={`flex items-center gap-2 text-[0.9rem] ${
                                                    isMyMessage
                                                        ? "text-white"
                                                        : "text-gray-800 dark:text-gray-100"
                                                }`}
                                            >
                                                <BiSolidMessageRounded />
                                                {msg.body}
                                            </p>
                                        </div>

                                        <span className="flex items-center gap-2 text-[0.75rem] text-night-700/50 dark:text-cream-50/50">
                                            <HiMiniCalendarDateRange />
                                            {formatDate(msg.created_at)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {(!tickets || tickets.length === 0) && (
                <div className="p-12 text-center text-night-700/70 dark:text-cream-50/50 bg-cream-50 dark:bg-night-800 rounded-sm border border-cream-200 dark:border-night-700">
                    هیچ تیکتی یافت نشد.
                </div>
            )}

            <Pagination
                currentPage={page}
                totalPages={totalPages}
            />
        </div>
    );
}
