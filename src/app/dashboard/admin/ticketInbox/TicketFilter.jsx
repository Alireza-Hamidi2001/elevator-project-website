"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TicketFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get("status") || "all";

    const statuses = [
        { value: "all", label: "همه تیکت‌ها" },
        { value: "open", label: "باز" },
        { value: "in_progress", label: "در حال بررسی" },
        { value: "closed", label: "بسته‌شده" },
    ];

    function handleFilter(status) {
        const params = new URLSearchParams(searchParams);
        if (status === "all") {
            params.delete("status");
        } else {
            params.set("status", status);
        }
        params.delete("page");
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">
            {statuses.map((s) => (
                <button
                    key={s.value}
                    onClick={() => handleFilter(s.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentStatus === s.value
                            ? "bg-blue-600 text-white shadow-sm"
                            : "border border-amber-100 dark:border-night-700 bg-cream-50 dark:bg-night-800 text-night-700 dark:text-cream-50 hover:bg-cream-200 dark:hover:bg-night-700"
                    }`}
                >
                    {s.label}
                </button>
            ))}
        </div>
    );
}
