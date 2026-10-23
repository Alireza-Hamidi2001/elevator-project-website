// app/dashboard/review/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(prevState, formData) {
    const body = String(formData.get("body") || "").trim();
    const rating = formData.get("rating")
        ? Number(formData.get("rating"))
        : null;

    // ۱. اعتبارسنجی سمت سرور
    if (body.length < 10) {
        return {
            ok: false,
            message: "متن نظر باید حداقل ۱۰ کاراکتر باشد.",
            ts: Date.now(),
        };
    }
    if (body.length > 2000) {
        return {
            ok: false,
            message: "متن نظر نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد.",
            ts: Date.now(),
        };
    }
    if (rating !== null && (rating < 1 || rating > 5)) {
        return {
            ok: false,
            message: "امتیاز وارد شده معتبر نیست.",
            ts: Date.now(),
        };
    }

    const supabase = await createClient();

    // ۲. گرفتن کاربر لاگین‌کرده
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return {
            ok: false,
            message: "برای ثبت نظر باید وارد حساب خود شوید.",
            ts: Date.now(),
        };
    }

    // ۳. ثبت در دیتابیس (وضعیت به صورت خودکار pending ست میشه)
    const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        body: body,
        rating: rating,
        // status رو ست نمی‌کنیم چون default دیتابیس 'pending' هست
    });

    if (error) {
        console.error("Submit Review Error:", error);
        return {
            ok: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
            ts: Date.now(),
        };
    }

    // ۴. آپدیت کش صفحه‌های مربوطه
    revalidatePath("/dashboard/review"); // صفحه نظرات من (اگه داشته باشیم)
    revalidatePath("/dashboard/admin/reviews"); // صفحه بررسی ادمین

    return {
        ok: true,
        message:
            "نظر شما با موفقیت ثبت شد و پس از تایید مدیریت نمایش داده می‌شود.",
        ts: Date.now(),
    };
}
