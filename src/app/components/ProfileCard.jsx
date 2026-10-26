// app/components/ProfileCard.jsx
import {
    FaUser,
    FaPhone,
    FaIdCard,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { estedad } from "../_fonts/fonts";
import PersianNumber from "./PersianNumber";

export default function ProfileCard({ profile }) {
    const fullName =
        `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() ||
        "نام و نام خانوادگی";

    const roleLabel =
        profile?.position ?? (profile?.role === "admin" ? "مدیر" : "کاربر");

    const infoItems = [
        {
            icon: FaPhone,
            label: "شماره تلفن",
            value: profile?.phone,
            ltr: true,
            numeric: true,
        },
        {
            icon: FaIdCard,
            label: "کد ملی",
            value: profile?.national_id,
            numeric: true,
        },
        {
            icon: FaEnvelope,
            label: "ایمیل",
            value: profile?.email,
            ltr: true,
        },
        {
            icon: FaMapMarkerAlt,
            label: "آدرس",
            value: profile?.address,
        },
    ];

    return (
        <div
            className={`${estedad.className} rounded-lg bg-cream-50 dark:bg-night-800 border border-cream-200 dark:border-night-700 shadow-sm overflow-hidden`}
        >
            <div className="p-6 sm:p-8">
                {/* بخش بالا: آواتار + نام + نقش */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-sm shadow-blue-500/30 overflow-hidden">
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={fullName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                profile?.first_name?.[0] ?? <FaUser />
                            )}
                        </div>
                        <span className="absolute bottom-0.5 left-0.5 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white dark:border-night-800" />
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-right flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50">
                            {fullName}
                        </h2>
                        <span className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {roleLabel}
                        </span>
                    </div>
                </div>

                {/* خط جداکننده */}
                <div className="my-6 h-px w-full bg-gradient-to-l from-transparent via-night-700/10 dark:via-cream-50/10 to-transparent" />

                {/* اطلاعات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {infoItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-night-900/60 border border-night-700/5 dark:border-cream-50/5"
                            >
                                <div className="w-9 h-9 rounded-lg bg-night-700/5 dark:bg-cream-50/5 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-night-700/70 dark:text-cream-50/70" />
                                </div>
                                <div className="flex items-center min-w-0">
                                    <p className="text-xs text-night-700/50 dark:text-cream-50/50">
                                        {item.label}: &nbsp;
                                    </p>
                                    <p
                                        className="text-sm font-medium text-night-900 dark:text-cream-50 truncate"
                                        dir={item.ltr ? "ltr" : undefined}
                                    >
                                        {item.numeric && item.value ? (
                                            <PersianNumber value={item.value} />
                                        ) : (
                                            item.value || "..."
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
