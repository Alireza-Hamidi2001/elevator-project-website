import { getCurrentProfile } from "@/lib/profile";
import AnalogClock from "./AnalogClock";
import PersianDate from "./PersianDate";

async function HeaderDashboard() {
    const profile = await getCurrentProfile();
    const fullName =
        `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() ||
        "نام و نام خانوادگی";

    return (
        <header className="flex items-center justify-between bg-cream-50 dark:bg-night-800 h-[4rem] px-4 border-b border-cream-200 dark:border-night-700">
            <p className="text-night-700/70 dark:text-cream-50/50">
                خوش آمدید{" "}
                <span className="font-semibold text-night-700 dark:text-cream-50">
                    {fullName}
                </span>{" "}
                عزیز
            </p>
            <div>
                <AnalogClock />
                <PersianDate />
            </div>
        </header>
    );
}

export default HeaderDashboard;
