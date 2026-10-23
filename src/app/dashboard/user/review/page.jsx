// app/dashboard/user/review/page.jsx
import { Suspense } from "react";
import ReviewList from "./ReviewList";
import { almarai } from "@/app/_fonts/fonts";
import { Fallback } from "@/app/components/Fallback";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export const metadata = { title: "نظرات من" };

export default function UserReviewsPage() {
    return (
        <div className="py-6 px-4 sm:px-6 bg-white dark:bg-night-900 shadow-sm min-h-[calc(100vh-4rem)]">
            <div className="mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1
                            className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                        >
                            نظرات من
                        </h1>
                        <p className="mt-1 text-sm text-night-700/60 dark:text-cream-50/60">
                            لیست نظراتی که تاکنون ثبت کرده‌اید و وضعیت بررسی
                            آن‌ها.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/user/review/new"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                        <FaPlus className="w-3 h-3" />
                        ثبت نظر جدید
                    </Link>
                </div>

                <Suspense
                    fallback={<Fallback message="در حال دریافت نظرات شما" />}
                >
                    <ReviewList />
                </Suspense>
            </div>
        </div>
    );
}
