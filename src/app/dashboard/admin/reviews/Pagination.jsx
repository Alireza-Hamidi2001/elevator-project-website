// app/dashboard/admin/reviews/Pagination.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import PersianNumber from "@/app/components/PersianNumber";

export default function Pagination({ currentPage, totalPages }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function changePage(newPage) {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-night-700/10 dark:border-cream-50/10 hover:bg-night-700/5 dark:hover:bg-cream-50/5 disabled:opacity-30 transition-all"
            >
                <FaChevronRight className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-night-700 dark:text-cream-50/80">
                صفحه <PersianNumber value={currentPage} /> از{" "}
                <PersianNumber value={totalPages} />
            </span>
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-night-700/10 dark:border-cream-50/10 hover:bg-night-700/5 dark:hover:bg-cream-50/5 disabled:opacity-30 transition-all"
            >
                <FaChevronLeft className="w-4 h-4" />
            </button>
        </div>
    );
}
