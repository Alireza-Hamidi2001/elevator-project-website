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

    const statusFilter = searchParams?.status || "all";
    const categoryFilter = searchParams?.category || "all"; // 👈 اضافه شد
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

    // اعمال فیلتر وضعیت
    if (statusFilter !== "all") query = query.eq("status", statusFilter);

    // اعمال فیلتر دسته‌بندی (موضوع)
    if (categoryFilter !== "all") query = query.eq("category", categoryFilter);

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
                        className="p-5 rounded-xl border-2 border-cream-300 dark:border-night-700 bg-cream-50 dark:bg-night-800 flex flex-col gap-4"
                    >
                        {/* هدر: اطلاعات کاربر و وضعیت */}
                        <div className="flex items-start justify-between gap-4 border-b border-night-700/5 dark:border-cream-50/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 overflow-hidden shrink-0">
                                    {ticket.profiles?.avatar_url ? (
                                        <img
                                            src={ticket.profiles.avatar_url}
                                            alt="آواتار"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-bold text-sm">
                                            {initial}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-[1.1rem] text-night-900 dark:text-cream-50">
                                        {senderName}
                                    </p>
                                </div>
                            </div>
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${status.classes}`}
                            >
                                {status.icon} {status.label}
                            </span>
                        </div>

                        {/* موضوع و مکالمه */}
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

                        {/* فوتر: دکمه پاسخ (فقط برای تیکت‌های باز) */}
                        <div className="flex justify-end pt-2 border-t border-night-700/5 dark:border-cream-50/5 mt-2">
                            {ticket.status !== "closed" ? (
                                <ReplyTicketButton
                                    ticket={{
                                        id: ticket.id,
                                        subject: ticket.subject,
                                        message:
                                            messages[messages.length - 1]?.body,
                                    }}
                                />
                            ) : (
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                                    <FaCheckCircle /> این تیکت بسته شده است
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}

            {(!tickets || tickets.length === 0) && (
                <div className="p-12 text-center text-night-700/70 dark:text-cream-50/50 bg-cream-50 dark:bg-night-800 rounded-sm border border-cream-200 dark:border-night-700">
                    هیچ تیکتی با این فیلتر یافت نشد.
                </div>
            )}

            <Pagination
                currentPage={page}
                totalPages={totalPages}
            />
        </div>
    );
}
