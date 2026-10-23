// app/dashboard/admin/reviews/ReviewList.jsx
import { createClient } from "@/lib/supabase/server";
import ReviewActions from "./ReviewActions";
import Pagination from "./Pagination";
import PersianNumber from "@/app/components/PersianNumber";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";

// تابع فرمت تاریخ شمسی
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
        calendar: "persian",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export default async function ReviewList({ searchParams }) {
    const supabase = await createClient();
    const statusFilter = searchParams?.status || "pending";
    const page = Number(searchParams?.page) || 1;
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from("reviews")
        .select(
            `
            *,
            profiles:user_id (
                first_name,
                last_name,
                phone
            )
        `,
            { count: "exact" },
        )
        .order("created_at", { ascending: false })
        .range(from, to);

    // اعمال فیلتر
    if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
    }

    const { data: reviews, count, error } = await query;

    if (error) {
        console.error("Reviews Fetch Error:", error);
        return (
            <div className="p-6 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
                خطا در دریافت نظرات.
            </div>
        );
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                {reviews?.map((review) => (
                    <div
                        key={review.id}
                        className="p-5 rounded-xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 shadow-sm flex flex-col gap-4"
                    >
                        {/* هدر کارت: اطلاعات کاربر و تاریخ */}
                        <div className="flex items-start justify-between gap-4 border-b border-night-700/5 dark:border-cream-50/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <FaUserCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-night-900 dark:text-cream-50">
                                        {review.profiles?.first_name}{" "}
                                        {review.profiles?.last_name}
                                    </p>
                                    <p
                                        className="text-xs text-night-700/60 dark:text-cream-50/60 mt-0.5"
                                        dir="ltr"
                                    >
                                        <PersianNumber
                                            value={review.profiles?.phone}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-night-700/60 dark:text-cream-50/60">
                                    {formatDate(review.created_at)}
                                </p>
                            </div>
                        </div>

                        {/* متن نظر و امتیاز */}
                        <div>
                            <div
                                className="flex items-center gap-1 mb-2"
                                dir="ltr"
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star}>
                                        {review.rating >= star ? (
                                            <FaStar className="w-4 h-4 text-amber-400" />
                                        ) : (
                                            <FaRegStar className="w-4 h-4 text-night-700/20 dark:text-cream-50/20" />
                                        )}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm leading-7 text-night-700 dark:text-cream-50/90 whitespace-pre-wrap">
                                {review.body}
                            </p>
                        </div>

                        {/* فوتر: وضعیت و دکمه‌ها */}
                        <div className="flex items-center justify-end pt-2">
                            <ReviewActions
                                reviewId={review.id}
                                currentStatus={review.status}
                            />
                        </div>
                    </div>
                ))}

                {(!reviews || reviews.length === 0) && (
                    <div className="p-12 text-center text-night-700/50 dark:text-cream-50/50 bg-white dark:bg-night-800 rounded-xl border border-night-700/10">
                        هیچ نظری با این وضعیت یافت نشد.
                    </div>
                )}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
            />
        </div>
    );
}
