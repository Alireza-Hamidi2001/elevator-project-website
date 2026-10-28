// app/dashboard/admin/reviews/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateReviewStatusAction(reviewId, newStatus) {
    const supabase = await createClient();

    // ۱. بررسی ادمین بودن
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "دسترسی غیرمجاز" };

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin" || !profile.is_active) {
        return { error: "شما دسترسی به این عملیات را ندارید." };
    }

    // ۲. آپدیت وضعیت
    const { error } = await supabase
        .from("reviews")
        .update({
            status: newStatus,
            reviewed_by: user.id,
            reviewed_at: new Date().toISOString(),
        })
        .eq("id", reviewId);

    if (error) {
        console.log("Update Review Error:", error);
        return { error: "خطا در تغییر وضعیت نظر" };
    }

    revalidatePath("/dashboard/admin/reviews");
    // برای آپدیت شدن badge در سایدبار
    revalidatePath("/dashboard/admin", "layout");

    return { success: true };
}

export async function deleteReviewAction(reviewId) {
    const supabase = await createClient();

    // ۱. چک کردن ادمین بودن کاربر جاری
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "دسترسی غیرمجاز." };

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin" || !profile.is_active) {
        return { error: "شما دسترسی به این عملیات را ندارید." };
    }

    // ۲. حذف نظر از دیتابیس
    const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

    if (error) {
        console.error("DELETE REVIEW ERROR >>>", error);
        return { error: "خطا در حذف نظر." };
    }

    // ۳. رفرش کش
    revalidatePath("/dashboard/admin/reviews");
    revalidatePath("/"); // برای صفحه اصلی

    return { success: true };
}