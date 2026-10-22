// middleware.js  (در Next 16 اسمش proxy.js و تابعش proxy هست)
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll(list) {
                    list.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    );
                    response = NextResponse.next({ request });
                    list.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    const redirectTo = (path) => {
        const url = request.nextUrl.clone();
        const [pathname, search] = path.split("?");
        url.pathname = pathname;
        url.search = search ? `?${search}` : "";
        const res = NextResponse.redirect(url);
        // کوکی‌های refresh که ممکنه تو این ریکوئست set شده باشن رو حفظ کن
        response.cookies.getAll().forEach((c) => res.cookies.set(c));
        return res;
    };

    // getUser() توکن رو واقعاً با سرور Supabase اعتبارسنجی می‌کنه (getSession این کار رو نمی‌کنه)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isDashboard = pathname.startsWith("/dashboard");
    const isAdminArea = pathname.startsWith("/dashboard/admin");
    const isUserArea = pathname.startsWith("/dashboard/user");
    const isLogin = pathname === "/login";

    // ── کاربر لاگین‌نکرده ─────────────────────────────
    if (!user) {
        // فقط مسیرهای داشبورد نیاز به لاگین دارن؛ بقیه آزاد
        return isDashboard ? redirectTo("/login") : response;
    }

    // ── کاربر لاگین‌کرده: پروفایل رو بخون ────────────
    const { data: profile } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    const isActiveAdmin = profile?.is_active && profile.role === "admin";
    const isActiveUser = profile?.is_active && profile.role === "user";

    // ── کاربر غیرفعال یا بدون پروفایل => خروج اجباری ─
    if (!profile || !profile.is_active) {
        await supabase.auth.signOut();
        return isLogin ? response : redirectTo("/login?error=inactive");
    }

    // ── کاربر لاگین‌کرده نباید صفحه لاگین رو ببینه ───
    if (isLogin) {
        return redirectTo(
            isActiveAdmin ? "/dashboard/admin" : "/dashboard/user",
        );
    }

    // ── محافظت از ناحیه ادمین ────────────────────────
    if (isAdminArea && !isActiveAdmin) {
        // کاربر معمولی که سعی کرده بره ناحیه ادمین
        return redirectTo("/dashboard/user");
    }

    // ── محافظت از ناحیه کاربر ────────────────────────
    if (isUserArea && !isActiveUser) {
        // ادمین که سعی کرده بره ناحیه کاربر
        return redirectTo("/dashboard/admin");
    }

    // ── /dashboard خالی => ریدایرکت بر اساس نقش ──────
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
        return redirectTo(
            isActiveAdmin ? "/dashboard/admin" : "/dashboard/user",
        );
    }

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
