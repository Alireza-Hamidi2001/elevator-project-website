// app/dashboard/user/review/ReviewList.jsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";
import PersianNumber from "@/app/components/PersianNumber";
import { estedad } from "@/app/_fonts/fonts";

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

export default async function ReviewList() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // دریافت نظرات خود کاربر
    const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        return (
            <div className="p-6 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
                خطا در دریافت نظرات.
            </div>
        );
    }

    // حالت خالی بودن (اگر نظری ثبت نکرده باشد)
    if (!reviews || reviews.length === 0) {
        return (
            <div
                className={`${estedad.className} flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-night-800 rounded-xl border border-night-700/10 dark:border-cream-50/10 shadow-sm`}
            >
                <div className="w-16 h-16 rounded-full bg-cream-100 dark:bg-night-700 flex items-center justify-center mb-4 text-night-700/50 dark:text-cream-50/50">
                    <FaRegStar className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-night-900 dark:text-cream-50 mb-2">
                    هنوز نظری ثبت نکرده‌اید
                </h3>
                <p className="text-sm text-night-700/60 dark:text-cream-50/60 mb-6 max-w-sm">
                    شما تاکنون هیچ نظری در مورد خدمات ما ثبت نکرده‌اید. اگر
                    تجربه‌ای دارید، خوشحال می‌شویم آن را با ما و سایر کاربران به
                    اشتراک بگذارید.
                </p>
                <Link
                    href="/dashboard/user/review/new"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    ثبت اولین نظر
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {reviews.map((review) => {
                // تنظیمات ظاهری برای هر وضعیت
                const statusConfig = {
                    pending: {
                        label: "در انتظار تایید",
                        color: "text-amber-600 dark:text-amber-400",
                        bg: "bg-amber-50 dark:bg-amber-900/20",
                    },
                    approved: {
                        label: "تایید شده",
                        color: "text-emerald-600 dark:text-emerald-400",
                        bg: "bg-emerald-50 dark:bg-emerald-900/20",
                    },
                    rejected: {
                        label: "رد شده",
                        color: "text-red-600 dark:text-red-400",
                        bg: "bg-red-50 dark:bg-red-900/20",
                    },
                };
                const status =
                    statusConfig[review.status] || statusConfig.pending;

                return (
                    <div
                        key={review.id}
                        className="p-5 rounded-xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 shadow-sm flex flex-col gap-4"
                    >
                        {/* هدر کارت */}
                        <div className="flex items-center justify-between border-b border-night-700/5 dark:border-cream-50/5 pb-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${status.bg} ${status.color}`}
                                >
                                    {status.label}
                                </span>
                            </div>
                            <span className="text-xs text-night-700/60 dark:text-cream-50/60">
                                {formatDate(review.created_at)}
                            </span>
                        </div>

                        {/* متن نظر و امتیاز */}
                        <div>
                            {review.rating && (
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
                            )}
                            <p className="text-sm leading-7 text-night-700 dark:text-cream-50/90 whitespace-pre-wrap">
                                {review.body}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
