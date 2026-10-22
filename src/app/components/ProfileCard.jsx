// app/dashboard/components/ProfileCard.jsx
import { FaUser } from "react-icons/fa";

export default function ProfileCard({ profile }) {
    const fullName =
        `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() ||
        "نام و نام خانوادگی";

    return (
        <div className="flex justify-between gap-4 px-8 py-4 shadow-sm bg-cream-200 dark:bg-night-800 rounded-lg">
            <div className="flex items-center gap-4">
                <div className="bg-cream-200 dark:bg-night-700 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <FaUser className="text-night-700 dark:text-cream-50 w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <p className="text-night-700 dark:text-cream-50 font-medium">
                        {fullName}
                    </p>
                    <p className="text-night-700/50 dark:text-cream-50/50 text-sm">
                        {profile?.position ??
                            (profile?.role === "admin" ? "مدیر" : "کاربر")}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <p className="text-night-700 dark:text-cream-50">
                    شماره تلفن:{" "}
                    <span
                        className="text-night-700/50 dark:text-cream-50/50"
                        dir="ltr"
                    >
                        {profile?.phone ?? "—"}
                    </span>
                </p>
                <p className="text-night-700 dark:text-cream-50">
                    کد ملی:{" "}
                    <span className="text-night-700/50 dark:text-cream-50/50">
                        {profile?.national_id ?? "—"}
                    </span>
                </p>
                <p className="text-night-700 dark:text-cream-50">
                    ایمیل:{" "}
                    <span
                        className="text-night-700/50 dark:text-cream-50/50"
                        dir="ltr"
                    >
                        {profile?.email ?? "—"}
                    </span>
                </p>
                <p className="text-night-700 dark:text-cream-50">
                    آدرس:{" "}
                    <span className="text-night-700/50 dark:text-cream-50/50">
                        {profile?.address ?? "—"}
                    </span>
                </p>
            </div>
        </div>
    );
}
