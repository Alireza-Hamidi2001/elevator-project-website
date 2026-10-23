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

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, first_name, last_name, is_active")
        .eq("id", user.id)
        .single();

    if (!profile || !profile.is_active) {
        await supabase.auth.signOut();
        redirect("/login?error=inactive");
    }

    // ← فقط بخون، پاک نکن
    const cookieStore = await cookies();
    const showWelcome = cookieStore.get("welcome_toast")?.value === "1";

    let badges = {};
    if (profile.role === "admin") {
        const countQuery = (table, status) =>
            supabase
                .from(table)
                .select("*", { count: "exact", head: true })
                .eq("status", status);

        const [reviews, tickets] = await Promise.all([
            countQuery("reviews", "pending"),
            countQuery("tickets", "open"),
        ]);

        badges = {
            pendingReviews: reviews.count ?? 0,
            openTickets: tickets.count ?? 0,
        };
    }

    return (
        <div className="flex">
            <WelcomeToast show={showWelcome} />
            <SideNavigation
                role={profile.role}
                badges={badges}
            />
            <div className="flex flex-col flex-1 min-w-0">
                <HeaderDashboard />
                <main className="flex-1 pb-20 md:pb-0">{children}</main>
            </div>
        </div>
    );
}
