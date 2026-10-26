import { getCurrentProfile } from "@/lib/profile";
import AnalogClock from "./AnalogClock";
import PersianDate from "./PersianDate";
import WavingHand from "./WavingHand";

async function HeaderDashboard() {
    const profile = await getCurrentProfile();
    const fullName =
        `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() ||
        "نام و نام خانوادگی";

    return (
        <header className="text-[0.8rem] sm:text-[1rem] flex items-center justify-between bg-cream-50 dark:bg-night-800 h-[4rem] px-4 border-b border-cream-200 dark:border-night-700">
            <div className="flex items-center gap-2 text-night-700/70 dark:text-cream-50/50">
                <WavingHand />
                خوش آمدید{" "}
                <span className="text-night-700 dark:text-cream-50">
                    {fullName}
                </span>{" "}
                عزیز
            </div>
            <div>
                <AnalogClock />
                <PersianDate />
            </div>
        </header>
    );
}

export default HeaderDashboard;
