// app/components/TestimonialsList.jsx
import { createClient } from "@/lib/supabase/server";
import TestimonialsSlider from "./TestimonialsSlider";

// ماسک کردن ۴ رقم وسط شماره تلفن
function maskPhone(phone) {
    if (!phone) return "—";
    const str = String(phone);
    if (str.length !== 11) return str;
    return `${str.slice(0, 4)}***${str.slice(7)}`;
}

export default async function TestimonialsList() {
    const supabase = await createClient();

    // ۱. بررسی اینکه کاربر لاگین‌کرده ادمین است یا نه
    const {
        data: { user },
    } = await supabase.auth.getUser();

    let isAdmin = false;
    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
        isAdmin = profile?.role === "admin";
    }

    // ۲. دریافت نظرات تایید شده با اطلاعات کاربر
    const { data: reviews, error } = await supabase
        .from("reviews")
        .select(
            `
            id,
            body,
            created_at,
            profiles:user_id (
                first_name,
                last_name,
                phone
            )
        `,
        )
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);

    if (error) {
        console.error("TESTIMONIALS FETCH ERROR >>>", error);
        return (
            <div className="text-center border border-red-900/15 dark:border-white/10 bg-red-100/40 dark:bg-red-100/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-red-200/60 dark:hover:bg-red-100/10 group p-8">
                خطا در دریافت نظرات.
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center border border-night-900/15 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group p-8">
                هنوز نظری ثبت نشده است.
            </div>
        );
    }

    // ۳. فرمت‌دهی دیتا برای ارسال به اسلایدر
    const formattedReviews = reviews.map((review) => ({
        id: review.id,
        text: review.body,
        name:
            `${review.profiles?.first_name || ""} ${
                review.profiles?.last_name || ""
            }`.trim() || "کاربر",
        phone: maskPhone(review.profiles?.phone),
    }));

    return (
        <TestimonialsSlider
            testimonials={formattedReviews}
            isAdmin={isAdmin}
        />
    );
}
