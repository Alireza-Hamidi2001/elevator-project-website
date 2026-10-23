import { almarai } from "@/app/layout";
import TicketCard from "./TicketCard";

export const metadata = {
    title: "صندوق دریافت",
    description: "تیکت‌های دریافتی پشتیبانی",
};

// داده‌های سمپل — بعداً از دیتابیس بخون
const sampleTickets = [
    {
        id: "TK-1024",
        subject: "مشکل در نصب آسانسور",
        senderName: "علی رضایی",
        priority: "urgent",
        status: "open",
        message:
            "سلام، آسانسور ساختمان ما بعد از نصب با خطای E5 متوقف می‌شه. لطفاً هرچه سریع‌تر پیگیری کنید چون ساکنین در طبقات بالا گیر افتادن.",
        createdAt: new Date("2024-06-15T09:30:00").toISOString(),
    },
    {
        id: "TK-1023",
        subject: "درخواست فاکتور رسمی",
        senderName: "سارا محمدی",
        priority: "medium",
        status: "in_progress",
        message:
            "برای پروژه‌ای که ماه گذشته تحویل گرفتیم، نیاز به فاکتور رسمی داریم. لطفاً راهنمایی کنید چه مدارکی لازمه.",
        createdAt: new Date("2024-06-14T14:15:00").toISOString(),
    },
    {
        id: "TK-1022",
        subject: "سوال درباره گارانتی",
        senderName: "مهندس کریمی",
        priority: "low",
        status: "closed",
        message:
            "گارانتی قطعات آسانسور مدل آرامیس چند ساله است؟ آیا شامل سرویس دوره‌ای هم می‌شه؟",
        createdAt: new Date("2024-06-12T11:00:00").toISOString(),
    },
];

// آمار سریع (اختیاری)
const stats = [
    { label: "باز", value: 1, color: "blue" },
    { label: "در حال بررسی", value: 1, color: "amber" },
    { label: "بسته‌شده", value: 1, color: "green" },
];

export default function InboxPage() {
    return (
        <main
            dir="rtl"
            className="w-full mx-auto max-w-7xl px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-14 text-night-700 dark:text-cream-50"
        >
            {/* هدر */}
            <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <h1
                    className={`${almarai.className} text-2xl sm:text-3xl lg:text-4xl font-bold`}
                >
                    صندوق دریافت
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-night-700/70 dark:text-cream-50/60">
                    تیکت‌های دریافتی از کاربران
                </p>
                <div className="mt-5 sm:mt-6 h-1 w-16 sm:w-20 bg-night-700 dark:bg-cream-50 mx-auto rounded-full" />
            </header>

            {/* آمار سریع */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto">
                {stats.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 p-3 sm:p-4 text-center"
                    >
                        <div
                            className={`${almarai.className} text-xl sm:text-2xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}
                        >
                            {item.value}
                        </div>
                        <p className="mt-1 text-[11px] sm:text-xs text-night-700/60 dark:text-cream-50/50">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* لیست تیکت‌ها */}
            {sampleTickets.length === 0 ? (
                <p className="text-center text-night-700/60 dark:text-cream-50/50 py-16">
                    هنوز تیکتی دریافت نشده است
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {sampleTickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
