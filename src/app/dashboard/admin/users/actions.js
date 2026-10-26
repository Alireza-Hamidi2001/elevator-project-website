// app/dashboard/admin/users/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ────────────────────────────────────────────────────────
// تغییر وضعیت فعال/غیرفعال کاربر
// ────────────────────────────────────────────────────────
export async function toggleUserStatusAction(userId, currentStatus) {
    const supabase = await createClient();

    // ۱. چک کردن لاگین بودن
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "دسترسی غیرمجاز" };

    // ۲. چک کردن ادمین بودن
    const { data: adminProfile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    if (adminProfile?.role !== "admin" || !adminProfile.is_active) {
        return { error: "شما دسترسی به این عملیات را ندارید." };
    }

    // ۳. جلوگیری از غیرفعال کردن خود ادمین
    if (user.id === userId) {
        return { error: "شما نمی‌توانید وضعیت حساب خودتان را تغییر دهید." };
    }

    // ۴. آپدیت وضعیت
    const { error } = await supabase
        .from("profiles")
        .update({ is_active: !currentStatus })
        .eq("id", userId);

    if (error) {
        console.error("TOGGLE STATUS ERROR >>>", error);
        return { error: "خطا در تغییر وضعیت کاربر" };
    }

    // ۵. رفرش کش
    revalidatePath("/dashboard/admin/users");
    return { success: true };
}

// ────────────────────────────────────────────────────────
// دریافت اطلاعات کامل کاربر (On-Demand)
// ────────────────────────────────────────────────────────
export async function fetchUserDetailsAction(userId) {
    const supabase = await createClient();

    // ۱. چک کردن ادمین بودن
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "دسترسی غیرمجاز" };

    const { data: adminProfile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    if (adminProfile?.role !== "admin" || !adminProfile.is_active) {
        return { error: "شما دسترسی به این اطلاعات ندارید." };
    }

    // ۲. دریافت اطلاعات کامل کاربر
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error || !profile) {
        console.error("FETCH USER DETAILS ERROR >>>", error);
        return { error: "خطا در دریافت اطلاعات کاربر." };
    }

    return { success: true, profile };
}
