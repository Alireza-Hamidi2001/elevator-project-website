// app/dashboard/admin/reviews/page.jsx
import { Suspense } from "react";
import ReviewList from "./ReviewList";
import ReviewFilter from "./ReviewFilter";
import { almarai } from "@/app/_fonts/fonts";
import { Fallback } from "@/app/components/Fallback"; // همون کامپوننتی که فرستادی

export const metadata = { title: "بررسی نظرات" };

export default async function AdminReviewsPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const pageKey = `${resolvedParams?.status || "pending"}-${
        resolvedParams?.page || "1"
    }`;

    return (
        <div className="py-6 px-4 sm:px-6 bg-white dark:bg-night-900 shadow-sm overflow-auto h-[calc(100vh-4rem)]">
            <div className="max-w-5xl mx-auto space-y-6">
                <div>
                    <h1
                        className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                    >
                        بررسی نظرات
                    </h1>
                    <p className="mt-1 text-sm text-night-700/60 dark:text-cream-50/60">
                        نظرات ثبت‌شده توسط کاربران را بررسی، تایید یا رد کنید.
                    </p>
                </div>

                {/* فیلتر وضعیت */}
                <ReviewFilter />

                {/* لیست نظرات */}
                <Suspense
                    key={pageKey}
                    fallback={<Fallback message="در حال دریافت نظرات" />}
                >
                    <ReviewList searchParams={resolvedParams} />
                </Suspense>
            </div>
        </div>
    );
}
