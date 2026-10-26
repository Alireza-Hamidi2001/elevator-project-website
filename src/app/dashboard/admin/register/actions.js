// app/dashboard/admin/register/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { toAuthEmail } from "@/lib/auth";

export async function registerAction(prevState, formData) {
    // ۱. استخراج داده‌ها از فرم
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const gender = formData.get("gender")?.toString().trim();
    const nationalId = formData.get("nationalId")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const email = formData.get("email")?.toString().trim() || null;
    const role = formData.get("role")?.toString() || "user";
    const jobTitle = formData.get("jobTitle")?.toString().trim() || null;
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    // ۲. اعتبارسنجی ساده سمت سرور
    const errors = {};
    if (!firstName) errors.firstName = "نام الزامی است.";
    if (!lastName) errors.lastName = "نام خانوادگی الزامی است.";
    if (!gender) errors.gender = "انتخاب جنسیت الزامی است.";
    if (!nationalId || nationalId.length !== 10)
        errors.nationalId = "کد ملی باید ۱۰ رقم باشد.";
    if (!phone || !/^09\d{9}$/.test(phone))
        errors.phone = "شماره موبایل معتبر نیست.";
    if (!password || password.length < 8)
        errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    if (password !== confirmPassword)
        errors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند.";

    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            errors,
            message: "لطفاً خطاهای فرم را برطرف کنید.",
        };
    }

    // ۳. چک کردن ادمین بودن کاربر فعلی (Security Check)
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            ok: false,
            errors: {},
            message: "دسترسی غیرمجاز. لطفاً وارد شوید.",
        };
    }

    const { data: adminProfile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    if (adminProfile?.role !== "admin" || !adminProfile.is_active) {
        return {
            ok: false,
            errors: {},
            message: "شما دسترسی به این عملیات را ندارید.",
        };
    }

    // ۴. چک کردن اینکه شماره موبایل تکراری نباشد
    const { data: existingPhone } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("phone", phone)
        .maybeSingle();

    if (existingPhone) {
        return {
            ok: false,
            errors: { phone: "این شماره موبایل قبلاً ثبت شده است." },
            message: "کاربری با این شماره وجود دارد.",
        };
    }

    // ۵. ساخت کاربر در auth.users با کلید ادمین
    const authEmail = toAuthEmail(phone); // تبدیل شماره به ایمیل جعلی
    const { data: authData, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
            email: authEmail,
            password: password,
            email_confirm: true, // تایید خودکار ایمیل
            user_metadata: {
                first_name: firstName,
                last_name: lastName,
            },
        });

    if (authError) {
        console.error("Auth Create Error:", authError);
        let msg = "خطا در ساخت حساب کاربری.";
        if (authError.message.includes("already been registered")) {
            msg = "کاربری با این شماره موبایل از قبل وجود دارد.";
        }
        return { ok: false, errors: {}, message: msg };
    }

    const newUserId = authData.user.id;

    // ۶. درج اطلاعات در جدول profiles
    const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({
            id: newUserId,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            national_id: nationalId,
            phone: phone,
            email: email,
            role: role,
            job_title: jobTitle,
            is_active: true,
        });

    // ۷. اگر درج در profiles خطا داد، کاربر Auth رو پاک می‌کنیم (Rollback)
    if (profileError) {
        console.error("Profile Insert Error:", profileError);
        await supabaseAdmin.auth.admin.deleteUser(newUserId);

        let msg = "خطا در ذخیره اطلاعات کاربر.";
        if (profileError.code === "23505") {
            // unique violation
            msg = "کد ملی یا شماره موبایل تکراری است.";
        }
        return { ok: false, errors: {}, message: msg };
    }

    // ۸. موفقیت
    return {
        ok: true,
        errors: {},
        message: "حساب کاربری با موفقیت ایجاد شد.",
        ts: Date.now(), // 👈 این خط اضافه شود
    };
}
