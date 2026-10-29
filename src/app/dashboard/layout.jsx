import { createClient } from "@/lib/supabase/server";
import SideNavigation from "@/app/components/SideNavigation";
import WelcomeToast from "@/app/components/WelcomeToast";
import ContractAlert from "@/app/components/ContractAlert"; // 👈 اضافه شد
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import HeaderDashboard from "../components/HeaderDashboard";

export default async function DashboardLayout({ children }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select(
            "role, first_name, last_name, is_active, avatar_url, contract_end_date",
        )
        .eq("id", user.id)
        .single();

    if (!profile || !profile.is_active) {
        await supabase.auth.signOut();
        redirect("/login?error=inactive");
    }

    const cookieStore = await cookies();
    const showWelcome = cookieStore.get("welcome_toast")?.value === "1";

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

    // 👈 محاسبه روزهای باقی‌مانده تا پایان قرارداد (فقط برای کاربر عادی)
    let remainingDays = null;
    if (profile.role === "user" && profile.contract_end_date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endDate = new Date(profile.contract_end_date);
        endDate.setHours(0, 0, 0, 0);
        const diff = endDate - today;
        remainingDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        if (remainingDays > 30) remainingDays = null; // اگر بیشتر از ۳۰ روز بود، هشدار نده
    }

    return (
        <div className="flex min-h-screen">
            <WelcomeToast show={showWelcome} />
            <SideNavigation
                role={profile.role}
                badges={badges}
            />
            <div className="flex flex-col flex-1 min-w-0">
                <HeaderDashboard />
                {profile.role === "user" && remainingDays !== null && (
                    <ContractAlert remainingDays={remainingDays} />
                )}

                <main className="flex-1 pb-20 md:pb-0">{children}</main>
            </div>
        </div>
    );
}
