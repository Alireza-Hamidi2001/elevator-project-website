// app/dashboard/admin/ticketInbox/TicketList.jsx
import { createClient } from "@/lib/supabase/server";
import { almarai, estedad } from "@/app/_fonts/fonts";
import {
    FaRegClock,
    FaUser,
    FaCheckCircle,
    FaRegCircle,
    FaUserShield,
} from "react-icons/fa";
import ReplyTicketButton from "./ReplyTicketButton";
import Pagination from "../reviews/Pagination";

// تاریخ
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
    in_progress: {
        label: "در حال بررسی",
        icon: <FaRegClock className="text-xs" />,
        classes:
            "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    },
    closed: {
        label: "بسته‌شده",
        icon: <FaCheckCircle className="text-xs" />,
        classes:
            "flex items-center gap-1 px-3 py-1.5 border-none bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-50",
    },
};

export default async function TicketList({ searchParams }) {
    const supabase = await createClient();

    // گرفتن اطلاعات کاربر لاگین کرده (برای تشخیص ادمین)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const statusFilter = searchParams?.status || "all";
    const page = Number(searchParams?.page) || 1;
    const limit = 5;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from("tickets")
        .select(
            `
            *, 
            profiles (first_name, last_name, avatar_url), 
            ticket_messages (
                id,
                body,
                created_at,
                sender_id
            )
        `,
            { count: "exact" },
        )
        .order("created_at", { ascending: false })
        .range(from, to);

    if (statusFilter !== "all") query = query.eq("status", statusFilter);

    const { data: tickets, count, error } = await query;

    if (error) {
        console.error("TICKETS FETCH ERROR", error);
        return <div className="p-6 text-red-500">خطا در دریافت تیکت‌ها.</div>;
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return (
        <div className="space-y-6">
            {tickets?.map((ticket) => {
                const status = STATUS_MAP[ticket.status] || STATUS_MAP.open;
                const senderName = `${ticket.profiles?.first_name} ${ticket.profiles?.last_name}`;
                const initial = ticket.profiles?.first_name?.charAt(0) || "?";

                // مرتب‌سازی پیام‌ها از قدیمی به جدید
                const messages = (ticket.ticket_messages || []).sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at),
                );

                return (
                    <div
                        key={ticket.id}
                        className="p-5 rounded-xl border border-cream-200 dark:border-night-700 bg-cream-50 dark:bg-night-800 flex flex-col gap-4"
                    >
                        {/* هدر: اطلاعات کاربر و وضعیت */}
                        <div className="flex items-start justify-between gap-4 border-b border-night-700/5 dark:border-cream-50/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 overflow-hidden shrink-0">
                                    {ticket.profiles?.avatar_url ? (
                                        <img
                                            src={ticket.profiles.avatar_url}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-bold text-sm">
                                            {initial}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-night-900 dark:text-cream-50">
                                        {senderName}
                                    </p>
                                    <p className="text-xs text-night-700/60 dark:text-cream-50/60">
                                        {formatDate(ticket.created_at)}
                                    </p>
                                </div>
                            </div>
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${status.classes}`}
                            >
                                {status.icon} {status.label}
                            </span>
                            
                        </div>

                        {/* موضوع */}
                        <div>
                            <h3
                                className={`${almarai.className} text-base font-bold text-night-900 dark:text-cream-50 mb-3`}
                            >
                                {ticket.subject}
                            </h3>

                            {/* مکالمه (Thread) */}
                            <div className="flex flex-col gap-3">
                                {messages.map((msg) => {
                                    const isAdminMessage =
                                        msg.sender_id === user.id;
                                    return (
                                        <div
                                            key={msg.id}
                                            className={`flex flex-col gap-1 max-w-[85%] ${
                                                isAdminMessage
                                                    ? "self-end items-end"
                                                    : "self-start items-start"
                                            }`}
                                        >
                                            {/* نام فرستنده */}
                                            <span className="text-[0.8rem] text-night-700/50 dark:text-cream-50/50 flex items-center gap-1">
                                                {isAdminMessage ? (
                                                    <>
                                                        <FaUserShield className="text-blue-500" />{" "}
                                                        شما (مدیر)
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaUser /> {senderName}
                                                    </>
                                                )}
                                            </span>

                                            {/* حباب پیام */}
                                            <div
                                                className={`p-3 rounded-2xl text-sm leading-7 whitespace-pre-wrap ${
                                                    isAdminMessage
                                                        ? "bg-blue-600 text-white rounded-tl-sm"
                                                        : "bg-white dark:bg-night-700 border border-night-700/10 dark:border-cream-50/10 rounded-tr-sm text-night-800 dark:text-cream-100"
                                                }`}
                                            >
                                                {msg.body}
                                            </div>

                                            {/* زمان ارسال */}
                                            <span className="text-[0.8rem] text-night-700/40 dark:text-cream-50/40">
                                                {formatDate(msg.created_at)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}

            {(!tickets || tickets.length === 0) && (
                <div className="p-12 text-center text-night-700/70 dark:text-cream-50/50 bg-cream-50 dark:bg-night-800 rounded-sm border border-cream-200 dark:border-night-700">
                    هیچ تیکتی با این وضعیت یافت نشد.
                </div>
            )}

            <Pagination
                currentPage={page}
                totalPages={totalPages}
            />
        </div>
    );
}
