// app/dashboard/admin/ticketInbox/TicketFilter.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TicketFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // وضعیت‌ها
    const currentStatus = searchParams.get("status") || "all";
    const statuses = [
        { value: "all", label: "همه وضعیت‌ها" },
        { value: "open", label: "باز" },
        { value: "closed", label: "بسته‌شده" },
    ];

    // دسته‌بندی‌ها (موضوع تیکت)
    const currentCategory = searchParams.get("category") || "all";
    const categories = [
        { value: "all", label: "همه موضوعات" },
        { value: "technical", label: "فنی و خرابی" },
        { value: "financial", label: "مالی و صورتحساب" },
        { value: "periodic", label: "سرویس دوره ای" },
    ];

    // تابع آپدیت پارامترها
    function updateParams(key, value) {
        const params = new URLSearchParams(searchParams);
        if (value === "all") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        params.delete("page"); // با تغییر فیلتر به صفحه اول برگرد
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-4 mb-6">
            {/* فیلتر وضعیت */}
            <div className="grid grid-cols-[auto_1fr_1fr_1fr] sm:grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2">
                <span className="text-sm col-span-6 sm:col-auto font-medium text-night-700 dark:text-cream-50 ml-1">
                    وضعیت:
                </span>
                {statuses.map((s) => (
                    <button
                        key={s.value}
                        onClick={() => updateParams("status", s.value)}
                        className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                            currentStatus === s.value
                                ? "bg-blue-600 text-white shadow-sm"
                                : "border border-amber-100 dark:border-night-700 bg-cream-50 dark:bg-night-800 text-night-700 dark:text-cream-50 hover:bg-cream-200 dark:hover:bg-night-700"
                        }`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* فیلتر دسته‌بندی */}
            <div className="grid grid-cols-3 sm:grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] items-center gap-2">
                <span className="text-sm col-span-3 sm:col-auto font-medium text-night-700 dark:text-cream-50 ml-1">
                    موضوع:
                </span>
                {categories.map((c) => (
                    <button
                        key={c.value}
                        onClick={() => updateParams("category", c.value)}
                        className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                            currentCategory === c.value
                                ? "bg-amber-700 text-white shadow-sm"
                                : "border border-amber-100 dark:border-night-700 bg-cream-50 dark:bg-night-800 text-night-700 dark:text-cream-50 hover:bg-cream-200 dark:hover:bg-night-700"
                        }`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
