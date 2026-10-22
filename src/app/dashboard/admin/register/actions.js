// app/dashboard/admin/register/actions.js
"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin, toAuthEmail } from "@/lib/auth";

const schema = z
    .object({
        firstName: z.string().trim().min(2, "نام را وارد کنید"),
        lastName: z.string().trim().min(2, "نام خانوادگی را وارد کنید"),
        gender: z.string().min(1, "جنسیت را انتخاب کنید"),
        nationalId: z.string().regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
        phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
        role: z.enum(["user", "admin"], { message: "نقش نامعتبر است" }),
        jobTitle: z.string().trim().optional(),
        email: z
            .union([z.literal(""), z.string().email("ایمیل معتبر نیست")])
            .optional(),
        password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر باشد"),
        confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        path: ["confirmPassword"],
        message: "تکرار رمز عبور مطابقت ندارد",
    });

export async function registerAction(prevState, formData) {
    // ۱) فقط ادمین
    if (!(await requireAdmin())) {
        return { ok: false, errors: {}, message: "شما دسترسی لازم را ندارید." };
    }

    // ۲) اعتبارسنجی سمت سرور (اعتبارسنجی کلاینت قابل دور زدنه)
    const parsed = schema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        const errors = {};
        parsed.error.issues.forEach((i) => (errors[i.path[0]] ??= i.message));
        return {
            ok: false,
            errors,
            message: "لطفاً خطاهای فرم را برطرف کنید.",
        };
    }
    const d = parsed.data;

    // ۳) ساخت کاربر در Auth (رمز اینجا هش می‌شه)
    const { data: created, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
            email: toAuthEmail(d.phone),
            password: d.password,
            email_confirm: true,
        });
    if (authError) {
        const dup = /already|registered|exists/i.test(authError.message);
        return {
            ok: false,
            errors: dup ? { phone: "این شماره قبلاً ثبت شده است" } : {},
            message: dup
                ? "کاربری با این شماره وجود دارد."
                : "ساخت کاربر ناموفق بود.",
        };
    }

    // ۴) ساخت پروفایل؛ اگه شکست خورد، کاربر Auth رو برمی‌گردونیم عقب
    const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({
            id: created.user.id,
            first_name: d.firstName,
            last_name: d.lastName,
            gender: d.gender,
            national_id: d.nationalId,
            phone: d.phone,
            email: d.email || null,
            job_title: d.jobTitle || null,
            role: d.role,
        });
    if (profileError) {
        await supabaseAdmin.auth.admin.deleteUser(created.user.id);
        const dupNid = profileError.message.includes("national_id");
        return {
            ok: false,
            errors: dupNid
                ? { nationalId: "این کد ملی قبلاً ثبت شده است" }
                : {},
            message: dupNid
                ? "کد ملی تکراری است."
                : "ثبت اطلاعات کاربر ناموفق بود.",
        };
    }

    revalidatePath("/dashboard/admin/users");
    return { ok: true, errors: {}, message: "کاربر با موفقیت ایجاد شد." };
}
