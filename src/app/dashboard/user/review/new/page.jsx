// app/dashboard/user/review/new/page.jsx
import ReviewForm from "./ReviewForm";

export const metadata = { title: "ثبت نظر" };

export default function ReviewPage() {
    return (
        <div className="p-6 text-night-700 dark:text-cream-50 min-h-[calc(100vh-4rem)] bg-white dark:bg-night-900 shadow-sm rounded-xl">
            <div className="mb-6">
                <h1 className="text-lg font-bold mb-1">ثبت نظر</h1>
                <p className="text-sm text-night-700/60 dark:text-cream-50/60">
                    نظر یا تجربه‌ی خود را با ما به اشتراک بگذارید. نظر شما پس از
                    تایید مدیریت در سایت نمایش داده می‌شود.
                </p>
            </div>

            <ReviewForm />
        </div>
    );
}
