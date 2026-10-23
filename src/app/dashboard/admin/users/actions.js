// app/dashboard/admin/users/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleUserStatusAction(userId, currentStatus) {
    const supabase = await createClient();

    // ۱. گرفتن کاربر لاگین‌کرده
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "دسترسی غیرمجاز" };

    // ۲. بررسی اینکه کاربر فعلی ادمین است
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
        return { error: "خطا در تغییر وضعیت کاربر" };
    }

    // ۵. رفرش کش صفحه
    revalidatePath("/dashboard/admin/users");
    return { success: true };
}
