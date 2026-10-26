// app/dashboard/layout.jsx
import { createClient } from "@/lib/supabase/server";
import SideNavigation from "@/app/components/SideNavigation";
import WelcomeToast from "@/app/components/WelcomeToast";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import HeaderDashboard from "../components/HeaderDashboard";

export default async function DashboardLayout({ children }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // دریافت پروفایل کاربر همراه با آواتار و نقش
    const { data: profile } = await supabase
        .from("profiles")
        .select("role, first_name, last_name, is_active, avatar_url")
        .eq("id", user.id)
        .single();

    // اگر پروفایل نبود یا غیرفعال بود
    if (!profile || !profile.is_active) {
        await supabase.auth.signOut();
        redirect("/login?error=inactive");
    }

    // بررسی کوکی برای Toast خوش‌آمدگویی
    const cookieStore = await cookies();
    const showWelcome = cookieStore.get("welcome_toast")?.value === "1";

    // محاسبه Badgeها (فقط برای ادمین)
    let badges = {};
    if (profile.role === "admin") {
        const [reviewsCount, ticketsCount] = await Promise.all([
            supabase
                .from("reviews")
                .select("*", { count: "exact", head: true })
                .eq("status", "pending"),
            supabase
                .from("tickets")
                .select("*", { count: "exact", head: true })
                .eq("status", "open"),
        ]);

        badges = {
            pendingReviews: reviewsCount.count ?? 0,
            openTickets: ticketsCount.count ?? 0,
        };
    }

    return (
        <div className="flex min-h-screen">
            {/* Toast برای ورود موفق */}
            <WelcomeToast show={showWelcome} />

            {/* سایدبار با نقش و بج‌های مربوطه */}
            <SideNavigation
                role={profile.role}
                badges={badges}
            />

            {/* محتوای اصلی */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* هدر (می‌تونی پروفایل رو پاس بدی تا آواتار رو نشون بده) */}
                <HeaderDashboard profile={profile} />
                <main className="flex-1 pb-20 md:pb-0">{children}</main>
            </div>
        </div>
    );
}
