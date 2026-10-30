"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { toAuthEmail } from "@/lib/auth";

export async function registerAction(prevState, formData) {
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
    const contractStartDate = formData
        .get("contractStartDate")
        ?.toString()
        .trim();
    const contractEndDate = formData.get("contractEndDate")?.toString().trim();

    // 👈 لاگ برای دیباگ
    console.log("📥 RAW FORM DATA >>>", {
        firstName,
        lastName,
        gender,
        nationalId,
        phone,
        email,
        role,
        jobTitle,
        contractStartDate,
        contractEndDate,
        hasPassword: !!password,
        hasConfirmPassword: !!confirmPassword,
    });

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
    if (!contractStartDate)
        errors.contractStartDate = "تاریخ شروع قرارداد الزامی است.";
    if (!contractEndDate)
        errors.contractEndDate = "تاریخ پایان قرارداد الزامی است.";

    if (Object.keys(errors).length > 0) {
        console.log("❌ VALIDATION ERRORS >>>", errors);
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
            message: "دسترسی غیرمجاز. لطفاً وارد شوید.",
            ts: Date.now(),
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
            ts: Date.now(),
        };
    }

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
            ts: Date.now(),
        };
    }

    const authEmail = toAuthEmail(phone);
    const { data: authData, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
            email: authEmail,
            password: password,
            email_confirm: true,
            user_metadata: { first_name: firstName, last_name: lastName },
        });

    if (authError) {
        console.error("❌ AUTH CREATE ERROR >>>", {
            message: authError.message,
            status: authError.status,
            code: authError.code,
        });
        let msg = "خطا در ساخت حساب کاربری.";
        if (authError.message.includes("already been registered")) {
            msg = "کاربری با این شماره موبایل از قبل وجود دارد.";
        }
        return { ok: false, errors: {}, message: msg, ts: Date.now() };
    }

    const newUserId = authData.user.id;

    // 👈 لاگ مقادیر تاریخ قبل از insert
    console.log("📅 DATE VALUES BEFORE INSERT >>>", {
        contractStartDate,
        contractEndDate,
        startType: typeof contractStartDate,
        endType: typeof contractEndDate,
    });

    const insertData = {
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
        contract_start_date: contractStartDate || null,
        contract_end_date: contractEndDate || null,
    };

    console.log("📦 INSERT DATA >>>", insertData);

    const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert(insertData);

    if (profileError) {
        // 👈 لاگ کامل خطا
        console.error("❌ PROFILE INSERT ERROR DETAILS >>>", {
            code: profileError.code,
            message: profileError.message,
            details: profileError.details,
            hint: profileError.hint,
        });
        await supabaseAdmin.auth.admin.deleteUser(newUserId);

        let msg = "خطا در ذخیره اطلاعات کاربر.";
        if (profileError.code === "23505") {
            msg = "کد ملی یا شماره موبایل تکراری است.";
        }
        return { ok: false, errors: {}, message: msg, ts: Date.now() };
    }

    return {
        ok: true,
        errors: {},
        message: "حساب کاربری با موفقیت ایجاد شد.",
        ts: Date.now(),
    };
}
