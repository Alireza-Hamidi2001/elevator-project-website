// app/dashboard/user/myTickets/page.jsx
import { Suspense } from "react";
import { almarai } from "@/app/_fonts/fonts";
import { Fallback } from "@/app/components/Fallback";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import TicketList from "./TicketList";

export const metadata = { title: "پیگیری تیکت‌ها" };

export default async function UserTicketsPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const pageKey = `${resolvedParams?.status || "all"}-${
        resolvedParams?.page || "1"
    }`;

    return (
        <div className="py-6 px-4 sm:px-6 bg-white dark:bg-night-900 shadow-sm overflow-auto h-[calc(100vh-4rem)]">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1
                            className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                        >
                            پیگیری تیکت‌ها
                        </h1>
                        <p className="mt-1 text-sm text-night-700/60 dark:text-cream-50/60">
                            وضعیت تیکت‌های پشتیبانی و پاسخ‌های مدیران را اینجا
                            ببینید.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/user/tickets"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                        <FaPlus className="w-3 h-3" />
                        ثبت تیکت جدید
                    </Link>
                </div>

                <Suspense
                    key={pageKey}
                    fallback={<Fallback message="در حال دریافت تیکت‌ها" />}
                >
                    <TicketList searchParams={resolvedParams} />
                </Suspense>
            </div>
        </div>
    );
}
