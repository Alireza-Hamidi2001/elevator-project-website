import { almarai, estedad } from "@/app/layout";
import {
    FaRegClock,
    FaExclamationCircle,
    FaCheckCircle,
    FaRegCircle,
    FaUser,
} from "react-icons/fa";

// نقشه اولویت‌ها به رنگ و متن
const PRIORITY_MAP = {
    low: {
        label: "کم",
        classes:
            "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
        dot: "bg-gray-400",
    },
    medium: {
        label: "متوسط",
        classes:
            "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        dot: "bg-blue-500",
    },
    high: {
        label: "زیاد",
        classes:
            "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
        dot: "bg-orange-500",
    },
    urgent: {
        label: "فوری",
        classes:
            "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        dot: "bg-red-500",
    },
};

// نقشه وضعیت‌ها
const STATUS_MAP = {
    open: {
        label: "باز",
        icon: <FaRegCircle className="text-xs" />,
        classes:
            "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    in_progress: {
        label: "در حال بررسی",
        icon: <FaRegClock className="text-xs" />,
        classes:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    closed: {
        label: "بسته‌شده",
        icon: <FaCheckCircle className="text-xs" />,
        classes:
            "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    },
};

export default function TicketCard({ ticket }) {
    const priority = PRIORITY_MAP[ticket.priority] || PRIORITY_MAP.medium;
    const status = STATUS_MAP[ticket.status] || STATUS_MAP.open;
    const initial = ticket.senderName?.charAt(0) || "?";

    // فرمت تاریخ (بدون کتابخانه)
    const date = new Date(ticket.createdAt);
    const dateLabel = date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 p-5 sm:p-6 transition-all duration-500 hover:shadow-xl hover:border-blue-500/30">
            {/* گرادیان تزئینی در hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* هدر: آواتار فرستنده + موضوع + بج‌ها */}
            <div className="relative z-10 flex items-start gap-4">
                <div
                    className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                    aria-hidden="true"
                >
                    {initial}
                </div>

                <div className="flex-1 min-w-0">
                    <h3
                        className={`${almarai.className} text-base sm:text-lg font-bold truncate`}
                    >
                        {ticket.subject}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-night-700/60 dark:text-cream-50/50">
                        <FaUser className="text-[10px]" />
                        <span className="truncate">{ticket.senderName}</span>
                    </div>
                </div>
            </div>

            {/* متن پیام */}
            <p
                className={`${estedad.className} relative z-10 mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-night-700/80 dark:text-cream-50/70 line-clamp-3`}
            >
                {ticket.message}
            </p>

            {/* بج‌های اولویت و وضعیت */}
            <div className="relative z-10 mt-4 flex items-center gap-2 flex-wrap">
                <span
                    className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-full border ${priority.classes}`}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}
                    />
                    اولویت: {priority.label}
                </span>

                <span
                    className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-full border ${status.classes}`}
                >
                    {status.icon}
                    {status.label}
                </span>
            </div>

            {/* جداکننده + تاریخ */}
            <div className="relative z-10 mt-5 pt-4 border-t border-night-700/10 dark:border-cream-50/10 flex items-center justify-between gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs text-night-700/50 dark:text-cream-50/40">
                    <FaRegClock className="text-[10px]" />
                    {dateLabel}
                </span>

                <span className="text-[11px] sm:text-xs text-night-700/40 dark:text-cream-50/30 font-mono">
                    #{ticket.id}
                </span>
            </div>
        </article>
    );
}
