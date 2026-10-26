// app/dashboard/edit/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ────────────────────────────────────────────────────────
// اکشن آپلود عکس
// ────────────────────────────────────────────────────────
export async function uploadAvatarAction(formData) {
    const file = formData.get("avatar");
    if (!file || file.size === 0) {
        return { error: "فایلی انتخاب نشده است." };
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: "دسترسی غیرمجاز." };
    }

    // ساخت نام و مسیر یکتا برای عکس
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // ۱. آپلود فایل به باکت avatars
    const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

    if (uploadError) {
        console.error("STORAGE UPLOAD ERROR >>>", uploadError);
        return { error: "خطا در آپلود عکس." };
    }

    // ۲. دریافت لینک عمومی عکس
    const {
        data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // ۳. آپدیت فیلد avatar_url در جدول profiles
    const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

    if (updateError) {
        // لاگ کامل خطا برای دیباگ
        console.error("AVATAR URL UPDATE ERROR >>>", {
            code: updateError.code,
            message: updateError.message,
            details: updateError.details,
            hint: updateError.hint,
        });
        return { error: "خطا در ذخیره لینک عکس." };
    }

    revalidatePath("/dashboard/edit");
    revalidatePath("/dashboard"); // برای آپدیت عکس در هدر
    return { success: true, url: publicUrl };
}

// ────────────────────────────────────────────────────────
// اکشن آپدیت اطلاعات پروفایل
// ────────────────────────────────────────────────────────
export async function updateProfileAction(prevState, formData) {
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const gender = formData.get("gender")?.toString().trim();
    const nationalId = formData.get("nationalId")?.toString().trim();
    const jobTitle = formData.get("jobTitle")?.toString().trim() || null;
    const email = formData.get("email")?.toString().trim() || null;
    const address = formData.get("address")?.toString().trim() || null;

    // اعتبارسنجی
    const errors = {};
    if (!firstName) errors.firstName = "نام الزامی است.";
    if (!lastName) errors.lastName = "نام خانوادگی الزامی است.";
    if (!gender) errors.gender = "انتخاب جنسیت الزامی است.";
    if (!nationalId || nationalId.length !== 10)
        errors.nationalId = "کد ملی باید ۱۰ رقم باشد.";

    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            errors,
            message: "لطفاً خطاهای فرم را برطرف کنید.",
            ts: Date.now(),
        };
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return {
            ok: false,
            errors: {},
            message: "دسترسی غیرمجاز.",
            ts: Date.now(),
        };
    }

    // آپدیت دیتابیس (RLS اجازه آپدیت پروفایل خود کاربر را می‌دهد)
    const { error } = await supabase
        .from("profiles")
        .update({
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            national_id: nationalId,
            job_title: jobTitle,
            email: email,
            address: address,
        })
        .eq("id", user.id);

    if (error) {
        console.error("PROFILE UPDATE ERROR >>>", {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
        });
        let msg = "خطا در ذخیره اطلاعات.";
        if (error.code === "23505") msg = "کد ملی وارد شده تکراری است.";
        return { ok: false, errors: {}, message: msg, ts: Date.now() };
    }

    revalidatePath("/dashboard/edit");
    revalidatePath("/dashboard");

    return {
        ok: true,
        errors: {},
        message: "اطلاعات با موفقیت به‌روزرسانی شد.",
        ts: Date.now(),
    };
}
