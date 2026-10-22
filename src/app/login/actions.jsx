"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { toAuthEmail } from "@/lib/auth";

export async function loginAction(prevState, formData) {
    const phone = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");
    const email = toAuthEmail(phone);

    // اعتبارسنجی سبک سمت سرور
    if (!/^09\d{9}$/.test(phone)) {
        return {
            ok: false,
            message: "شماره موبایل معتبر نیست.",
            ts: Date.now(),
        };
    }
    if (password.length < 6) {
        return {
            ok: false,
            message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
            ts: Date.now(),
        };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        if (error.message.includes("Invalid login credentials")) {
            return {
                ok: false,
                message: "شماره موبایل یا رمز عبور اشتباه است.",
                ts: Date.now(),
            };
        }
        if (error.message.includes("Email not confirmed")) {
            return {
                ok: false,
                message: "ایمیل حساب تایید نشده است. با پشتیبانی تماس بگیرید.",
                ts: Date.now(),
            };
        }
        if (error.status === 429) {
            return {
                ok: false,
                message: "تعداد تلاش‌ها زیاد است. کمی بعد امتحان کنید.",
                ts: Date.now(),
            };
        }
        return {
            ok: false,
            message: "خطایی رخ داد. دوباره تلاش کنید.",
            ts: Date.now(),
        };
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", data.user.id)
        .single();

    if (profileError || !profile) {
        await supabase.auth.signOut();
        return {
            ok: false,
            message: "حساب کاربری شما کامل نیست. با پشتیبانی تماس بگیرید.",
            ts: Date.now(),
        };
    }

    if (!profile.is_active) {
        await supabase.auth.signOut();
        return {
            ok: false,
            message: "حساب شما غیرفعال شده است.",
            ts: Date.now(),
        };
    }

    // ── کوکی welcome برای نمایش toast تو داشبورد ──
    const cookieStore = await cookies();
    cookieStore.set("welcome_toast", "1", {
        maxAge: 10,
        path: "/",
        sameSite: "lax",
    });

    redirect(profile.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
}

export async function logoutAction() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) return { error: error.message };
    return { ok: true };
}
